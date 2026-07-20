<?php

declare(strict_types=1);

if (!function_exists('_')) {
    function _(string $message): string
    {
        return $message;
    }
}

$GLOBALS['d'] = '';
$GLOBALS['english'] = true;

require_once __DIR__ . '/../src/Partial.php';
