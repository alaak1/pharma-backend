<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicine', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('med_name');
            $table->string('closet');
            $table->string('category')->nullable();
            $table->string('description')->nullable();
            $table->string('dose')->nullable();
            $table->string('scientific_name')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('medicine');
    }
};
