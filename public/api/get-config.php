<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$path = __DIR__ . '/site-config.json';
if (file_exists($path)) {
    echo file_get_contents($path);
} else {
    echo '{}';
}
