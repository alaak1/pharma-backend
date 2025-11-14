<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'first_name' => 'Islam',
                'last_name'  => 'Ayyash',
                'phone'      => '00000000',
                'name'  => 'Agent',
                'role'       => 'admin',
                'email'      => 'admin@example.com',
                'password'   => Hash::make('Alaa@1234'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Support',
                'last_name'  => 'Agent',
                'name'  => 'Agent',
                'phone'      => '0000000',
                'role'       => 'support',
                'email'      => 'support@example.com',
                'password'   => Hash::make('Alaa@1234'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Regular',
                'last_name'  => 'User',
                'name'  => 'Agent',
                'phone'      => '0000000',
                'role'       => 'regular',
                'email'      => 'user@example.com',
                'password'   => Hash::make('Alaa@1234'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
