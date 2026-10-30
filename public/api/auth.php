<?php
/**
 * ADMIN LOGIN
 * ===========
 * POST {"action":"login","username"?,"password"}                    -> {"token","expires"}
 * POST {"action":"verify","token"}                                  -> {"valid":true|false}
 * POST {"action":"change","token","currentPassword","newPassword","newUsername"?}
 *                                                                   -> {"success":true,"token","expires"}
 *
 * The password is checked here, on the server, against a bcrypt hash in the
 * store outside the web root (see _auth-lib.php). The browser never sees it.
 */

require __DIR__ . '/_auth-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') admin_json_fail('Method not allowed', 405);

$raw = file_get_contents('php://input');
if (strlen($raw) > 8192) admin_json_fail('Request too large', 413);
$in = json_decode($raw, true);
if (!is_array($in)) admin_json_fail('Invalid request', 400);

$store = admin_store();
if (!$store) admin_json_fail('Admin login is not set up on this server yet. Please contact ByteFlow Technologies.', 503);

$action = isset($in['action']) ? $in['action'] : '';

if ($action === 'login') {
    admin_throttle_check();
    $username = (string) (isset($in['username']) ? $in['username'] : '');
    $password = (string) (isset($in['password']) ? $in['password'] : '');
    $userOk = empty($store['username']) || hash_equals((string) $store['username'], $username);
    $passOk = $password !== '' && strlen($password) <= 200 && password_verify($password, $store['hash']);
    if (!$userOk || !$passOk) {
        admin_throttle_bump();
        usleep(400000); // blunt the guessing rate
        admin_json_fail('Wrong username or password', 401);
    }
    admin_throttle_bump(true);
    echo json_encode(['token' => admin_make_token($store['secret']), 'expires' => time() + ADMIN_TOKEN_TTL]);
    exit;
}

if ($action === 'verify') {
    echo json_encode(['valid' => admin_token_valid(isset($in['token']) ? $in['token'] : '')]);
    exit;
}

if ($action === 'change') {
    if (!admin_token_valid(isset($in['token']) ? $in['token'] : '')) admin_json_fail('Not signed in — please log in again.', 401);
    admin_throttle_check();
    $current = (string) (isset($in['currentPassword']) ? $in['currentPassword'] : '');
    if (!password_verify($current, $store['hash'])) {
        admin_throttle_bump();
        admin_json_fail('Current password is wrong', 401);
    }
    $new = (string) (isset($in['newPassword']) ? $in['newPassword'] : '');
    $newUser = isset($in['newUsername']) ? trim((string) $in['newUsername']) : null;
    if ($new === '' && $newUser === null) admin_json_fail('Nothing to change', 400);
    if ($new !== '') {
        if (strlen($new) < 10) admin_json_fail('New password must be at least 10 characters', 400);
        if (strlen($new) > 200) admin_json_fail('New password is too long', 400);
        $store['hash'] = password_hash($new, PASSWORD_DEFAULT);
    }
    if ($newUser !== null) {
        if (!preg_match('/^[A-Za-z0-9._@-]{3,60}$/', $newUser)) admin_json_fail('Username: 3-60 letters, numbers, . _ @ -', 400);
        $store['username'] = $newUser;
    }
    // a new secret signs out every other session that used the old password
    $store['secret']  = bin2hex(random_bytes(32));
    $store['changed'] = gmdate('c');
    if (!admin_save_store($store)) admin_json_fail('Could not save the new password', 500);
    admin_throttle_bump(true);
    echo json_encode(['success' => true, 'token' => admin_make_token($store['secret']), 'expires' => time() + ADMIN_TOKEN_TTL]);
    exit;
}

admin_json_fail('Unknown action', 400);
