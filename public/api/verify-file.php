<?php
/**
 * Search-engine site-verification files.
 *
 * Google Search Console, Bing and Yandex all ask you to drop a small
 * file at the website root. This endpoint lets the hotel do that from
 * the admin panel instead of needing FTP access.
 *
 *   GET                       → list the verification files present
 *   POST {filename, content}  → write one
 *   POST {filename, delete:1} → remove one
 *
 * Only the narrow set of filenames the search engines actually use is
 * accepted, and only plain text is ever written.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store');

$root = realpath(__DIR__ . '/..');

/** Filenames the search engines ask for — nothing else may be written. */
function is_allowed_name($name) {
    return preg_match('/^google[a-z0-9]{6,40}\.html$/i', $name)
        || preg_match('/^BingSiteAuth\.xml$/i', $name)
        || preg_match('/^yandex_[a-z0-9]{6,40}\.(html|txt)$/i', $name)
        || preg_match('/^pinterest-[a-z0-9]{4,40}\.html$/i', $name)
        || preg_match('/^[a-z0-9_-]{1,40}-site-verification\.(html|txt)$/i', $name);
}

/** Everything currently sitting at the web root that looks like a verification file. */
function list_files($root) {
    $out = [];
    foreach (scandir($root) as $f) {
        if ($f === '.' || $f === '..') continue;
        if (!is_file($root . '/' . $f)) continue;
        if (!is_allowed_name($f)) continue;
        $out[] = [
            'name'     => $f,
            'size'     => filesize($root . '/' . $f),
            'modified' => date('Y-m-d H:i', filemtime($root . '/' . $f)),
            'content'  => substr((string) file_get_contents($root . '/' . $f), 0, 300),
        ];
    }
    return $out;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['files' => list_files($root)]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$name = isset($data['filename']) ? basename((string) $data['filename']) : '';

if ($name === '' || !is_allowed_name($name)) {
    http_response_code(400);
    echo json_encode([
        'error' => 'That filename is not a recognised verification file. Expected something like google1234abcd.html, BingSiteAuth.xml or yandex_1234abcd.html.',
    ]);
    exit;
}

$target = $root . '/' . $name;

if (!empty($data['delete'])) {
    if (is_file($target)) unlink($target);
    echo json_encode(['success' => true, 'files' => list_files($root)]);
    exit;
}

$content = isset($data['content']) ? (string) $data['content'] : '';

// Verification files are tiny plain-text markers — reject anything else.
if (strlen($content) > 4096) {
    http_response_code(400);
    echo json_encode(['error' => 'File is too large for a verification file.']);
    exit;
}
if (preg_match('/<\?php|<\?=|<script/i', $content)) {
    http_response_code(400);
    echo json_encode(['error' => 'Executable content is not allowed in a verification file.']);
    exit;
}

if (file_put_contents($target, $content) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not write the file. Check folder permissions.']);
    exit;
}

echo json_encode(['success' => true, 'url' => '/' . $name, 'files' => list_files($root)]);
