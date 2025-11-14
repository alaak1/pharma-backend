<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MedicineController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/ping', function () {
    return response()->json(['status' => 'online']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/medicine', [MedicineController::class, 'index']);
Route::post('/medicine', [MedicineController::class, 'store']);
Route::put('/medicine/{id}', [MedicineController::class, 'update']);
