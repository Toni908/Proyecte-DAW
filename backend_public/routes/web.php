<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

use App\Http\Controllers\HorarioController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\LocalidadController;
use App\Http\Controllers\ReservasController;
use App\Http\Controllers\UseracountController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartaController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\EtiquetasController;
use App\Http\Controllers\MunicipioController;

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

Route::get('/card/{id}', [CartaController::class, 'showCard']);

Route::get('/cheapest',[RestaurantController::class, 'cheapest']);
Route::get('/restaurant/{id}',[RestaurantController::class, 'show']);
Route::get('/restaurants',[RestaurantController::class, 'showRestaurantsWithMembresia']);
Route::get('/aforo/{id}',[RestaurantController::class,'aforo']);
Route::get('/filtrar',[RestaurantController::class, 'buscador']);
Route::post('/filtrar',[RestaurantController::class, 'buscador']);

Route::get('/localidad/{id}',[LocalidadController::class,'show']);

Route::get('/comments/{id}',[ComentarioController::class,'showAll']);
Route::get('/reservas/{id}',[ReservasController::class,'showAll']);
Route::get('/reservas/avg/{id}',[RestaurantController::class,'AVGReservasRestaurant']);
Route::get('/carta/{id}',[CartaController::class,'show']);

Route::post('/reserva',[ReservasController::class, 'create']);

// PRUEBA

Route::get('/sui/{id}/{day}/{month}/{year}',[ReservasController::class, 'showDate']);

// IMAGES
Route::get('/image/{id_restaurant}/{name}',[ImageController::class,'show']);
Route::get('/alergenos/{id_alergeno}',[ImageController::class,'showAlergeno']);


Route::get('/user/{id}',[UseracountController::class, 'show']);
Route::get('/users',[UseracountController::class, 'showUsers']);
Route::get('/adminUsers',[UseracountController::class, 'showUserWhereIsAdmin']);

Route::get('/comentar',[ReservasController::class, 'login']);
Route::get('/comprobar',[ReservasController::class, 'comprobate']);

Route::post('/createcomment',[ComentarioController::class, 'create']);

Route::get('/horario/{id}',[HorarioController::class, 'show']);

Route::get('/etiquetas',[EtiquetasController::class, 'showAll']);

Route::get('/localidad',[MunicipioController::class, 'showAll']);
Route::get('/capitales',[MunicipioController::class, 'showMunicipios']);

Route::get('/economic',[RestaurantController::class, 'cheapest']);
