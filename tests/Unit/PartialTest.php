<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class PartialTest extends TestCase
{
    public function testBuildReportsMissingPartial(): void
    {
        ob_start();
        Partial::build('nonexistentPartial');
        $output = ob_get_clean();

        $this->assertStringContainsString(
            'Partial: src/partials/nonexistentPartial.php not found',
            $output
        );
    }

    public function testBuildRendersFooter(): void
    {
        ob_start();
        Partial::build('footer');
        $output = ob_get_clean();

        $this->assertStringContainsString('<footer id="Contact">', $output);
        $this->assertStringContainsString('hi@rmichels.com', $output);
    }
}
