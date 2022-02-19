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
            'name' => 'String',
        ]);

        DB::table('term_types')->insert([
            'name' => 'Int',
        ]);

        DB::table('term_types')->insert([
            'name' => 'Float',
        ]);

        DB::table('term_types')->insert([
            'name' => 'Boolean',
        ]);

        DB::table('term_types')->insert([
            'name' => 'DateTime',
        ]);
    }
}
