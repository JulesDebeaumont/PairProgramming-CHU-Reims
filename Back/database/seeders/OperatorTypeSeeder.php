<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OperatorTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('operator_types')->insert([
            'name' => 'Logical',
        ]);

        DB::table('operator_types')->insert([
            'name' => 'Comparison',
        ]);
    }
}
