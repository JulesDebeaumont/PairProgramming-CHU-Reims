<?php

namespace Database\Seeders;

use App\Models\Operator;
use App\Models\Term;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('criterias')->insert([
            'name' => 'Être majeur',
            'term_id' => Term::where('name', 'Age')->first()->id,
            'operator_id' => Operator::where('value', '>')->first()->id,
            'value' => '17',
        ]);

        DB::table('criterias')->insert([
            'name' => 'Être un homme',
            'term_id' => Term::where('name', 'Sexe')->first()->id,
            'operator_id' => Operator::where('value', '=')->first()->id,
            'value' => 'H',
        ]);
    }
}
