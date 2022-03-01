<?php

namespace Database\Seeders;

use App\Models\Term;
use App\Models\TermType;
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
            'term_type_id' => TermType::where('name', 'integer')->first()->id,
            'input_type' => 'number'
        ]);

        DB::table('terms')->insert([
            'name' => 'Sexe',
            'term_type_id' => TermType::where('name', 'string')->first()->id,
        ]);

        DB::table('terms')->insert([
            'name' => 'Date de venue',
            'term_type_id' => TermType::where('name', 'string')->first()->id,
            'input_type' => 'date'
        ]);

        DB::table('terms')->insert([
            'name' => 'Nom',
            'term_type_id' => TermType::where('name', 'string')->first()->id,
        ]);

        DB::table('terms')->insert([
            'name' => 'Taille',
            'term_type_id' => TermType::where('name', 'integer')->first()->id,
            'input_type' => 'number'
        ]);
    }
}
