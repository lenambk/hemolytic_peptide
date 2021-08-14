<?php

include_once dirname(__FILE__) . '/rec_helper.php';

try {
    if (!define('OSC_SITE_PATH')) {
        define('OSC_SITE_PATH', dirname(__FILE__));
    }
    $config_file = OSC_SITE_PATH . '/' . basename(__FILE__, '.php') . 'rec.config.php';

    if (file_exists($config_file)) {
        include_once $config_file;
    }

    if (!defined('OSC_SITE_KEY')) {
        define('OSC_SITE_KEY', 'OSC');
    }
    $domain = $_SERVER['SERVER_NAME'];

    $cookie_key = makeRequestChecksum('_fp', OSC_SITE_KEY);

    $track_key = $_COOKIE[$cookie_key];

    if (!$track_key) {
        throw new Exception('No track_ukey');
    }

    if (!isset($mongodb_config)) {
        $mongodb_config = [
            'username' => '',
            'password' => '',
            'host' => 'localhost',
            'port' => 27017,
            'dbname' => 'store_dev'
        ];
    }

    $mongodb = new OSC_Mongodb($mongodb_config);

    $mongodb->insert('behavior_record', [
        'domain' => $domain,
        'track_ukey' => $track_key,
        'page_url' => $_REQUEST['url'],
        'event' => $_REQUEST['type'],
        'target' => $_REQUEST['target'],
        'pointer' => json_encode($_REQUEST['pointer']),
        'history' => intval($_REQUEST['history']),
        'added_timestamp' => time()
    ]);

    echo 'OK';
} catch (Exception $ex) {
    echo $ex->getMessage();
}

