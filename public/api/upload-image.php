<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['filename']) || !isset($data['base64'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing filename or base64']);
    exit;
}

$filename = basename($data['filename']);

// Whitelist allowed extensions only
if (!preg_match('/\.(jpg|jpeg|png|webp|gif)$/i', $filename)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Only jpg, jpeg, png, webp, gif allowed.']);
    exit;
}

// Sanitize filename
$filename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $filename);

$dir = __DIR__ . '/../images/';
if (!is_dir($dir)) {
    mkdir($dir, 0755, true);
}

$filepath = $dir . $filename;
$decoded = base64_decode($data['base64']);

if ($decoded === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid base64 data']);
    exit;
}

// Validate it's actually an image
$finfo = new finfo(FILEINFO_MIME_TYPE);
$tmpFile = tempnam(sys_get_temp_dir(), 'img');
file_put_contents($tmpFile, $decoded);
$mime = $finfo->file($tmpFile);
unlink($tmpFile);

if (!in_array($mime, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'])) {
    http_response_code(400);
    echo json_encode(['error' => 'File is not a valid image']);
    exit;
}

if (file_put_contents($filepath, $decoded) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save file']);
    exit;
}

echo json_encode(['success' => true, 'url' => '/images/' . $filename]);
