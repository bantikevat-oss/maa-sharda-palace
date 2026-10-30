<?php
// Gate for every admin write endpoint. Until 2026-10-30 this was a marker-file
// lock (writes OFF unless api/.writes-enabled existed) because the admin password
// only lived in the JS bundle. Writes now need a valid admin token from auth.php,
// sent as X-Admin-Token — see _auth-lib.php.
if (isset($_SERVER['SCRIPT_FILENAME']) && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(403);
    exit;
}
require_once __DIR__ . '/_auth-lib.php';
require_admin();
