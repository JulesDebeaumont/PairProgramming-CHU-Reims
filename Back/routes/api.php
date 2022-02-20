<?php

use App\Http\Controllers\CriteriaController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\OperatorTypeController;
use App\Http\Controllers\RuleController;
use App\Http\Controllers\TermController;
use App\Http\Controllers\TermTypeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// https://laravel.com/docs/9.x/controllers#api-resource-routes

Route::apiResources([
    'terms'=> TermController::class,
    'termTypes' => TermTypeController::class,
    'criterias' => CriteriaController::class,
    'operators'=> OperatorController::class,
    'operatorTypes' => OperatorTypeController::class,
    'rules'=> RuleController::class
]);
