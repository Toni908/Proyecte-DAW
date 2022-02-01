<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartaController;
use App\Models\Carta;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('card/{id}', [CartaController::class, 'showCard']);

Route::get('/api/restaurant/{id}','RestaurantController@showRestaurant');
