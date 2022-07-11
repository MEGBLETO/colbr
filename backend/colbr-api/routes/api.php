<?php

use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
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



Route::post('/inscription', [userController::class, 'createUser']);
Route::post('/connexion', [userController::class, 'connectUser']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
