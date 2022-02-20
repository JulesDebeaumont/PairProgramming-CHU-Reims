<?php

namespace App\Http\Controllers;

use App\Http\Requests\TermTypeEditRequest;
use App\Models\TermType;
use Illuminate\Http\Request;

class TermTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $termTypes = TermType::all();

        return response()->json($termTypes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TermTypeEditRequest $request)
    {
        $termType = TermType::create($request->validated());

        return response()->json($termType, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TermType  $termType
     * @return \Illuminate\Http\Response
     */
    public function show(TermType $termType)
    {
        return response()->json($termType);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TermType  $termType
     * @return \Illuminate\Http\Response
     */
    public function update(TermTypeEditRequest $request, TermType $termType)
    {
        $termType->update($request->validated());

        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TermType  $termType
     * @return \Illuminate\Http\Response
     */
    public function destroy(TermType $termType)
    {
        $termType->delete();

        return response()->json();
    }
}
