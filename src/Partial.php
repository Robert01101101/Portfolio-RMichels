<?php

$mainDir = "../";

//namespace View;

// TODO: make sure that $partialName isn't overridden by extract
class Partial
{
    public static function build($partialName, $arguments = []){

        if (is_array($arguments)){
            extract($arguments);
        }

        // TODO: proper error detection
        $partialPath = 'src/partials/' . $partialName . '.php';
        if (isset($partialPath) && file_exists($partialPath)) {
            require($partialPath);
        } else {
            echo "Partial: " . $partialPath . " not found";
        }

    }
}