<?php

namespace Database\Seeders;

use App\Models\Criteria;
use App\Models\Operator;
use App\Models\Rule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $allCriterias = Criteria::where('name', 'Être majeur')->orWhere('name', 'Être un homme')->get();
        $operator = Operator::where('value', '=')->first();
        $criteriasForRule = [];
        
        foreach ($allCriterias as $criteria) {
                $criteriasForRule[$criteria['id']] = ['operator_id' => $operator->id];
        }

        $rule = new Rule();
        $rule->setAttribute('name', 'Homme majeur');
        $rule->save();

        $rule->criterias()->sync($criteriasForRule);
    }
}
