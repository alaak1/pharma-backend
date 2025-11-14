<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Medicine;
use Illuminate\Support\Str;

class ImportMedicine extends Command
{
    protected $signature = 'import:medicine';
    protected $description = 'Import medicine from CSV file';

    public function handle()
    {
        $path = storage_path('app/vitamins_clean.csv');

        if (!file_exists($path)) {
            $this->error("CSV file not found at: $path");
            return;
        }

        $file = fopen($path, 'r');

        // Skip header
        fgetcsv($file);

        while (($row = fgetcsv($file)) !== false) {

            list($med_name, $scientific_name, $closet, $category, $description, $dose, $price) = $row;

            Medicine::create([
                'id' => Str::ulid(),
                'med_name' => $med_name,
                'scientific_name' => $scientific_name,
                'closet' => $closet,
                'category' => $category ?: null,
                'description' => $description ?: null,
                'dose' => $dose ?: null,
                'price' => $price ?: 0.00,
            ]);
        }

        fclose($file);

        $this->info("Medicine import completed successfully!");
    }
}
