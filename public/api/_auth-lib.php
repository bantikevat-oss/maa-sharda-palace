<?php
/**
 * ADMIN AUTH — shared by auth.php and every admin write endpoint.
 * ===============================================================
 * Replaces the 2026-10-13 `.writes-enabled` marker lock. Before that, the admin
 * password lived only in the JS bundle (and in the public site-config.json), so
 * the server had no idea who was writing.
 *
 * - The credential store is .admin-auth.json ONE LEVEL ABOVE the web root
 *   (~/domains/<site>/), so it can never be downloaded and an rsync --delete of
 *   public_html can never wipe it. Override with the ADMIN_AUTH_FILE env var.
 * - It holds a bcrypt hash + an HMAC secret. Nothing is ever auto-seeded: if the
 *   file is missing, login is refused until an operator runs
 *   tools/set-admin-password.php over SSH. A wiped store must never fall back to
 *   a default password that is printed in the bundle.
 * - A login returns a 12-hour HMAC token; writes send it as X-Admin-Token.
 *   Changing the password rotates the secret, which signs out every old token.
 * - Failed logins are throttled per IP (8 tries / 15 min).
 *
 * PHP 7.4-compatible (Hostinger shared).
 */

if (isset($_SERVER['SCRIPT_FILENAME']) && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(403);
    exit;
}

define('ADMIN_TOKEN_TTL',    60 * 60 * 12);   // 12 hours
define('ADMIN_MAX_ATTEMPTS', 8);              // per IP
define('ADMIN_LOCKOUT',      15 * 60);        // 15 minutes

function admin_auth_file() {
    $env = getenv('ADMIN_AUTH_FILE');
    return $env ? $env : dirname(__DIR__, 2) . '/.admin-auth.json';
}

function admin_throttle_file() {
    return dirname(admin_auth_file()) . '/.admin-login-attempts.json';
}

function admin_json_fail($msg, $code) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['error' => $msg]);
    exit;
}

/** The store, or null when it has not been provisioned yet. */
function admin_store() {
    $f = admin_auth_file();
    if (!is_file($f)) return null;
    $d = json_decode((string) @file_get_contents($f), true);
    if (!is_array($d) || empty($d['hash']) || empty($d['secret'])) return null;
    return $d;
}

function admin_save_store($store) {
    $f = admin_auth_file();
    $tmp = $f . '.tmp';
    if (file_put_contents($tmp, json_encode($store, JSON_PRETTY_PRINT), LOCK_EX) === false) return false;
    @chmod($tmp, 0600);
    return rename($tmp, $f);
}

function admin_make_token($secret) {
    $exp = time() + ADMIN_TOKEN_TTL;
    return $exp . '.' . hash_hmac('sha256', (string) $exp, $secret);
}

function admin_token_valid($token) {
    $store = admin_store();
    if (!$store) return false;
    if (!is_string($token) || strpos($token, '.') === false) return false;
    list($exp, $sig) = explode('.', $token, 2);
    if (!ctype_digit($exp) || (int) $exp < time()) return false;
    return hash_equals(hash_hmac('sha256', $exp, $store['secret']), $sig);
}

/** Gate for every write endpoint: a valid X-Admin-Token or a JSON 401. */
function require_admin() {
    $token = isset($_SERVER['HTTP_X_ADMIN_TOKEN']) ? $_SERVER['HTTP_X_ADMIN_TOKEN'] : '';
    if (!admin_token_valid($token)) {
        admin_json_fail('Not signed in — please log in again.', 401);
    }
}

function admin_client_ip() {
    return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
}

function admin_throttle_check() {
    $f = admin_throttle_file();
    if (!is_file($f)) return;
    $d = json_decode((string) @file_get_contents($f), true);
    $ip = admin_client_ip();
    if (!is_array($d) || !isset($d[$ip])) return;
    $rec = $d[$ip];
    $count = isset($rec['count']) ? $rec['count'] : 0;
    $last  = isset($rec['last']) ? $rec['last'] : 0;
    if ($count >= ADMIN_MAX_ATTEMPTS && (time() - $last) < ADMIN_LOCKOUT) {
        $wait = (int) ceil((ADMIN_LOCKOUT - (time() - $last)) / 60);
        admin_json_fail("Too many failed attempts. Try again in {$wait} minute(s).", 429);
    }
}

function admin_throttle_bump($reset = false) {
    $f = admin_throttle_file();
    $d = is_file($f) ? json_decode((string) @file_get_contents($f), true) : [];
    if (!is_array($d)) $d = [];
    $ip  = admin_client_ip();
    $now = time();
    // forget anything older than the lockout window
    foreach ($d as $k => $v) {
        if ($now - (isset($v['last']) ? $v['last'] : 0) > ADMIN_LOCKOUT) unset($d[$k]);
    }
    if ($reset) {
        unset($d[$ip]);
    } else {
        $prev = isset($d[$ip]['count']) ? $d[$ip]['count'] : 0;
        $d[$ip] = ['count' => $prev + 1, 'last' => $now];
    }
    @file_put_contents($f, json_encode($d), LOCK_EX);
    @chmod($f, 0600);
}

/**
 * Credential-shaped keys never belong in the public config file. Exact names,
 * at any depth (an old settings page saved the password under siteInfo).
 */
function admin_strip_secrets($node) {
    if (!is_array($node)) return $node;
    foreach ($node as $k => $v) {
        if (is_string($k) && in_array($k, ['adminPassword', 'adminUsername', 'adminPass', 'password'], true)) {
            unset($node[$k]);
        } elseif (is_array($v)) {
            $node[$k] = admin_strip_secrets($v);
        }
    }
    return $node;
}
