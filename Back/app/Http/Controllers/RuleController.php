<?php

namespace App\Http\Controllers;

use App\Http\Requests\RuleEditRequest;
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
        $rules = Rule::with(
            'criterias', 
            'criterias.term', 
            'criterias.operator', 
            'criterias.operator.type', 
            'criterias.term.type', 
            'rules',
        )->get();

        return response()->json($rules);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RuleEditRequest $request)
    {
        $rule = Rule::create($request->validated());

        return response()->json($rule, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Rule  $rule
     * @return \Illuminate\Http\Response
     */
    public function show(Rule $rule)
    {
        return response()->json($rule->with(
            'criterias', 
            'criterias.term', 
            'criterias.operator', 
            'criterias.operator.type', 
            'criterias.term.type', 
            'rules',
        )->get());
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
        $rule->update($request->validated());

        return response()->json();
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

        return response()->json();
    }
}
