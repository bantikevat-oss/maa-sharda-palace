<?php
// Server-side lock for every admin write endpoint (added 2026-10-13 after the
// Hostinger account compromise). The admin password only lives in the JS bundle,
// so it protects nothing on the server: without this file anyone on the internet
// could rewrite site-config.json (phone numbers included), posts and images.
// Writes stay OFF unless an operator creates api/.writes-enabled on the server by
// hand for the duration of an editing session, then removes it again. The marker
// is never part of the build, so a fresh deploy is always read-only.
if (!file_exists(__DIR__ . '/.writes-enabled')) {
    http_response_code(403);
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode(['error' => 'Editing is temporarily disabled. Please contact ByteFlow Technologies to make changes.']);
    exit;
}
