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
            'term_type_id' => TermType::where('name', 'Int')->first()->id,
        ]);

        DB::table('terms')->insert([
            'name' => 'Sexe',
            'term_type_id' => TermType::where('name', 'String')->first()->id,
        ]);

        DB::table('terms')->insert([
            'name' => 'Date de venue',
            'term_type_id' => TermType::where('name', 'DateTime')->first()->id,
        ]);

        DB::table('terms')->insert([
            'name' => 'Nom',
            'term_type_id' => TermType::where('name', 'String')->first()->id,
        ]);

        DB::table('terms')->insert([
            'name' => 'Taille',
            'term_type_id' => TermType::where('name', 'Int')->first()->id,
        ]);
    }
}
