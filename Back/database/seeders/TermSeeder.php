<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('terms')->insert([
            'name' => 'Age',
            'type' => 'int',
        ]);

        DB::table('terms')->insert([
            'name' => 'Sexe',
            'type' => 'string',
        ]);

        DB::table('terms')->insert([
            'name' => 'Date de venue',
            'type' => 'dateTime',
        ]);

        // Term::factory()->count(40)->create();
    }
}
