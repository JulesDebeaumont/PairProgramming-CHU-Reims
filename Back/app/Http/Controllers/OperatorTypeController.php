<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatorTypeEditRequest;
use App\Models\OperatorType;
use Illuminate\Http\Request;

class OperatorTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $operatorTypes = OperatorType::all();

        return response()->json($operatorTypes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OperatorTypeEditRequest $request)
    {
        $operatorType = OperatorType::create($request->validated());

        return response()->json($operatorType, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OperatorType  $operatorType
     * @return \Illuminate\Http\Response
     */
    public function show(OperatorType $operatorType)
    {
        return response()->json($operatorType);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OperatorType  $operatorType
     * @return \Illuminate\Http\Response
     */
    public function update(OperatorTypeEditRequest $request, OperatorType $operatorType)
    {
        $operatorType->update($request->validated());

        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OperatorType  $operatorType
     * @return \Illuminate\Http\Response
     */
    public function destroy(OperatorType $operatorType)
    {
        $operatorType->delete();

        return response()->json();
    }
}
