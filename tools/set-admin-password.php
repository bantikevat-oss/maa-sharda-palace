<?php
/**
 * Provision or reset the admin login (CLI only — never deploy this into public_html).
 *
 *   php set-admin-password.php --file=/home/u937373134/domains/<site>/.admin-auth.json [--username=admin]
 *
 * Reads the new password from stdin (one line), so it never appears in the shell
 * history or the process list. Empty stdin = generate a strong random password and
 * print it once. Writing a new store also rotates the token secret, so every
 * existing admin session is signed out.
 */
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

$opts = getopt('', ['file:', 'username::']);
if (empty($opts['file'])) {
    fwrite(STDERR, "usage: php set-admin-password.php --file=<path/.admin-auth.json> [--username=<name>] < password\n");
    exit(2);
}
$file = $opts['file'];

$password = trim((string) fgets(STDIN));
$generated = false;
if ($password === '') {
    $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    for ($i = 0; $i < 16; $i++) $password .= $alphabet[random_int(0, strlen($alphabet) - 1)];
    $generated = true;
}
if (strlen($password) < 10) {
    fwrite(STDERR, "password must be at least 10 characters\n");
    exit(2);
}

$store = [
    'hash'    => password_hash($password, PASSWORD_DEFAULT),
    'secret'  => bin2hex(random_bytes(32)),
    'created' => gmdate('c'),
];
if (isset($opts['username']) && $opts['username'] !== false && $opts['username'] !== '') {
    $store['username'] = $opts['username'];
}

$tmp = $file . '.tmp';
if (file_put_contents($tmp, json_encode($store, JSON_PRETTY_PRINT), LOCK_EX) === false) {
    fwrite(STDERR, "could not write $tmp\n");
    exit(1);
}
chmod($tmp, 0600);
rename($tmp, $file);

echo "admin login written to $file" . (isset($store['username']) ? " (username: {$store['username']})" : '') . "\n";
if ($generated) echo "generated password: $password\n";
