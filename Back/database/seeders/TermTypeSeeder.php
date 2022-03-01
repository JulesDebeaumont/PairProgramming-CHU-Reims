<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TermTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('term_types')->insert([
            'name' => 'boolean',
        ]);

        DB::table('term_types')->insert([
            'name' => 'integer',
        ]);

        DB::table('term_types')->insert([
            'name' => 'double',
        ]);

        DB::table('term_types')->insert([
            'name' => 'string',
        ]);

        DB::table('term_types')->insert([
            'name' => 'array',
        ]);

        DB::table('term_types')->insert([
            'name' => 'object',
        ]);

        DB::table('term_types')->insert([
            'name' => 'resource',
        ]);

        DB::table('term_types')->insert([
            'name' => 'unknown type',
        ]);
    }
}
