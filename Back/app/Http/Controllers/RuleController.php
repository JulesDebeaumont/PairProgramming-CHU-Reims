<?php

namespace App\Http\Controllers;

use App\Http\Requests\RuleEditRequest;
use App\Http\Requests\RulePostRequest;
use App\Models\Criteria;
use App\Models\Rule;
use Illuminate\Http\Request;

class RuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rules = Rule::whereHas('subRules')->with([
            'subRules',
            'subRuleOperators',
            'subRules.criterias',
            'subRules.criteriaOperators',
            'subRules.criterias.operator',
            'subRules.criterias.term',
            'subRules.criterias.operator',
            'subRules.criterias.term',
        ])->orderBy('created_at', 'ASC')->get();

        return response()->json($rules);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RulePostRequest $request)
    {
        $attributes = $request->validated();

        $rule = new Rule();
        $rule->setAttribute('name', $attributes['name']);
        $rule->save();

        $subRulesPivot = [];

        foreach ($attributes['sub_rules'] as $subRule) {
            $newSubRule = new Rule();
            $newSubRule->save();
            $criteriasPivot = [];

            foreach ($subRule['criterias'] as $criteria) {
                $newCriteria = new Criteria();
                $newCriteria->setAttribute('term_id', $criteria['term_id']);
                $newCriteria->setAttribute('operator_id', $criteria['operator_id']);
                $newCriteria->setAttribute('value', $criteria['value']);
                $newCriteria->save();

                $criteriasPivot[$newCriteria['id']] = ['operator_id' => $criteria['pivot']['operator_id']];
            }

            $newSubRule->criterias()->sync($criteriasPivot);
            $subRulesPivot[$newSubRule['id']] = [
                'operator_id' => $subRule['pivot']['operator_id'],
                'child_id' => $newSubRule->id,
            ];
        }
        $rule->subRules()->sync($subRulesPivot);

        return response()->json($rule->load(
            'subRules',
            'subRuleOperators',
            'subRules.criterias',
            'subRules.criteriaOperators',
            'subRules.criterias.operator',
            'subRules.criterias.term',
            'subRules.criterias.operator',
            'subRules.criterias.term',
        ), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rule  $rule
     * @return \Illuminate\Http\Response
     */
    public function show(Rule $rule)
    {
        return response()->json($rule->load(
            'subRules',
            'subRuleOperators',
            'subRules.criterias',
            'subRules.criteriaOperators',
            'subRules.criterias.operator',
            'subRules.criterias.term',
            'subRules.criterias.operator',
            'subRules.criterias.term',
        ));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Rule  $rule
     * @return \Illuminate\Http\Response
     */
    public function update(RuleEditRequest $request, Rule $rule)
    {
        $attributes = $request->validated();
        
        $rule->setAttribute('name', $attributes['name']);

        $subRulesPivot = [];

        foreach ($attributes['sub_rules'] as $subRule) {
            if (isset($subRule['id'])) {
                $editedSubRule = Rule::find($subRule['id']);
            } else {
                $editedSubRule = new Rule();
                $editedSubRule->save();
            }

            $criteriasPivot = [];

            foreach ($subRule['criterias'] as $criteria) {
                if (isset($criteria['id'])) {
                    $editedCriteria = Criteria::find($criteria['id']);
                    $editedCriteria->setAttribute('term_id', $criteria['term_id']);
                    $editedCriteria->setAttribute('operator_id', $criteria['operator_id']);
                    $editedCriteria->setAttribute('value', $criteria['value']);
                } else {
                    $editedCriteria = new Criteria();
                    $editedCriteria->setAttribute('term_id', $criteria['term_id']);
                    $editedCriteria->setAttribute('operator_id', $criteria['operator_id']);
                    $editedCriteria->setAttribute('value', $criteria['value']);
                    $editedCriteria->save();
                }

                $criteriasPivot[$editedCriteria['id']] = ['operator_id' => $criteria['pivot']['operator_id']];
            }

            $editedSubRule->criterias()->sync($criteriasPivot);
            $subRulesPivot[$editedSubRule['id']] = [
                'operator_id' => $subRule['pivot']['operator_id'],
                'child_id' => $editedSubRule->id,
            ];
        }
        $rule->subRules()->sync($subRulesPivot);

        return response()->json($rule->load(
            'subRules',
            'subRuleOperators',
            'subRules.criterias',
            'subRules.criteriaOperators',
            'subRules.criterias.operator',
            'subRules.criterias.term',
            'subRules.criterias.operator',
            'subRules.criterias.term',
        ));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Rule  $rule
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rule $rule)
    {
        $rule->delete();

        return response()->json($rule->id);
    }
}
