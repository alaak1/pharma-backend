<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasUlids;

    protected $table = 'medicine';

    protected $fillable = [
        'med_name',
        'closet',
        'category',
        'description',
        'dose',
        'scientific_name',
        'price',
    ];
}
