<?php
declare(strict_types=1);

// Artil SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ArtilMakeContext
{
    public static function call(array $ctxmap, ?ArtilContext $basectx): ArtilContext
    {
        return new ArtilContext($ctxmap, $basectx);
    }
}
