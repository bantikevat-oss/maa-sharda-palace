<?php
/**
 * Lists every image available in /images so the admin media library
 * can offer them for reuse instead of forcing a re-upload.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store');

$dir = __DIR__ . '/../images/';
$images = [];

if (is_dir($dir)) {
    foreach (scandir($dir) as $file) {
        if ($file === '.' || $file === '..') continue;
        if (!preg_match('/\.(jpg|jpeg|png|webp|gif|svg)$/i', $file)) continue;
        $path = $dir . $file;
        if (!is_file($path)) continue;
        $images[] = ['name' => $file, 'mtime' => filemtime($path)];
    }
}

// Newest first — freshly uploaded images appear at the top of the library.
usort($images, function ($a, $b) { return $b['mtime'] - $a['mtime']; });

echo json_encode(['images' => array_column($images, 'name')]);
