<?php

namespace App\Http\Controllers;

use App\Http\Requests\TermEditRequest;
use App\Http\Requests\TermPostRequest;
use App\Models\Term;
use Illuminate\Http\Request;

class TermController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $terms = Term::with('type')->get();

        return response()->json($terms);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TermPostRequest $request)
    {
        $term = Term::create($request->validated());

        return response()->json($term->load('type'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Term  $term
     * @return \Illuminate\Http\Response
     */
    public function show(Term $term)
    {
        return response()->json($term->with('type')->get());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Term  $term
     * @return \Illuminate\Http\Response
     */
    public function update(TermEditRequest $request, Term $term)
    {
        $term->update($request->validated());

        return response()->json($term->load('type'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Term  $term
     * @return \Illuminate\Http\Response
     */
    public function destroy(Term $term)
    {
        $term->delete();

        return response()->json($term->id);
    }
}
