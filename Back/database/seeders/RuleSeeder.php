<?php

namespace Database\Seeders;

use App\Models\Criteria;
use App\Models\Operator;
use App\Models\Rule;
use Illuminate\Database\Seeder;

class RuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         *  SubRule (w/o childs && w/ criterias)
         */
        $criterias = Criteria::where('name', 'Être majeur')->orWhere('name', 'Être un homme')->get();
        $operator = Operator::where('value', 'ET')->first();
        $criteriasForRule = [];

        $rule = new Rule();
        $rule->setAttribute('name', 'Homme majeur');
        $rule->save();

        foreach ($criterias as $criteria) {
            $criteriasForRule[$criteria['id']] = ['operator_id' => $operator->id];
        }
        $rule->criterias()->sync($criteriasForRule);


        /**
         *  SubRule (w/o childs && w/ criterias)
         */
        $criterias = Criteria::where('name', "S'appeler Didier")->orWhere('name', 'Mesurer plus de 180cm')->get();
        $operator = Operator::where('value', 'OU')->first();
        $criteriasForRule = [];

        $rule = new Rule();
        $rule->setAttribute('name', "S'appeler Didier ou mesurer plus de 180cm");
        $rule->save();

        foreach ($criterias as $criteria) {
            $criteriasForRule[$criteria['id']] = ['operator_id' => $operator->id];
        }
        $rule->criterias()->sync($criteriasForRule);


        /**
         * Rule (w/ childs && w/o criterias)
         */
        $rules = Rule::where('name', 'Homme majeur')->orWhere('name', "S'appeler Didier ou mesurer plus de 180cm")->get();
        $ruleOperator = Operator::where('value', 'ET')->first();
        $rulesForRule = [];

        $rule = new Rule();
        $rule->setAttribute('name', "Être un homme majeur et (s'appeler Didier ou mesurer plus de 180cm)");
        $rule->save();

        foreach ($rules as $r) {
            $rulesForRule[$r['id']] = [
                'operator_id' => $ruleOperator->id,
                'child_id' => $r->id,
            ];
        }
        $rule->subRules()->sync($rulesForRule);
    }
}
