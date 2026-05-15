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
$post = json_decode($input, true);

if (!$post || !isset($post['slug']) || !isset($post['title'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Sanitize slug
$slug = preg_replace('/[^a-z0-9-]/', '', strtolower($post['slug']));
if (empty($slug)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid slug']);
    exit;
}

$postsDir = __DIR__ . '/posts/';
if (!is_dir($postsDir)) {
    mkdir($postsDir, 0755, true);
}

// Save individual post file
$postFile = $postsDir . $slug . '.json';
$postData = [
    'slug' => $slug,
    'title' => strip_tags($post['title'] ?? ''),
    'excerpt' => strip_tags($post['excerpt'] ?? ''),
    'content' => $post['content'] ?? '',
    'category' => strip_tags($post['category'] ?? 'General'),
    'tags' => array_map('strip_tags', (array)($post['tags'] ?? [])),
    'featuredImage' => $post['featuredImage'] ?? '',
    'published' => (bool)($post['published'] ?? false),
    'publishedAt' => $post['publishedAt'] ?? date('Y-m-d'),
    'readTimeMinutes' => (int)($post['readTimeMinutes'] ?? 1),
    'updatedAt' => date('Y-m-d'),
];

file_put_contents($postFile, json_encode($postData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Rebuild index
$indexFile = $postsDir . 'index.json';
$index = ['posts' => [], 'categories' => []];
$files = glob($postsDir . '*.json');
$categories = [];

foreach ($files as $f) {
    if (basename($f) === 'index.json') continue;
    $p = json_decode(file_get_contents($f), true);
    if ($p) {
        $index['posts'][] = [
            'slug' => $p['slug'],
            'title' => $p['title'],
            'excerpt' => $p['excerpt'],
            'category' => $p['category'],
            'tags' => $p['tags'] ?? [],
            'featuredImage' => $p['featuredImage'],
            'published' => $p['published'],
            'publishedAt' => $p['publishedAt'],
            'readTimeMinutes' => $p['readTimeMinutes'],
        ];
        if ($p['category']) $categories[] = $p['category'];
    }
}

usort($index['posts'], fn($a, $b) => strcmp($b['publishedAt'], $a['publishedAt']));
$index['categories'] = array_values(array_unique($categories));

file_put_contents($indexFile, json_encode($index, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(['success' => true, 'slug' => $slug]);
