<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

use App\Http\Controllers\UseracountController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartaController;
use App\Http\Controllers\RestaurantController;
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

Route::get('/restaurant/{id}',[RestaurantController::class, 'showRestaurant']);
Route::get('/restaurants',[RestaurantController::class, 'showRestaurants']);
Route::get('/bestrestaurants',[RestaurantController::class, 'showRestaurantsWithMembresia']);

Route::get('/user/{id}',[UseracountController::class, 'showUser']);
Route::get('/users',[UseracountController::class, 'showUsers']);
Route::get('/adminUsers',[UseracountController::class, 'showUserWhereIsAdmin']);

Route::get('/reserva/{id}',[UseracountController::class, 'showUser']);
Route::post('/reserva',[UseracountController::class, 'create']);
