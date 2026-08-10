<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageContactController;
use App\Http\Controllers\AvisController;

Route::get('/hotels/{hotelId}/avis', [AvisController::class, 'parHotel']);
Route::delete('/avis/{id}', [AvisController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    // ... routes déjà protégées
    Route::post('/avis', [AvisController::class, 'store']);
});

Route::post('/messages', [MessageContactController::class, 'store']);
Route::get('/messages', [MessageContactController::class, 'index']);
Route::patch('/messages/{id}/repondre', [MessageContactController::class, 'repondre']);
Route::delete('/messages/{id}', [MessageContactController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {
    // ... routes déjà protégées (logout, me, reservations store)
    Route::get('/mes-messages', [MessageContactController::class, 'mesMessages']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::patch('/reservations/{id}/statut', [ReservationController::class, 'updateStatut']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/reservations', [ReservationController::class, 'store']);
});

Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('hotels', HotelController::class);