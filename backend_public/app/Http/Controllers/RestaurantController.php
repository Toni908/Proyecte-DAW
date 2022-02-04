<?php

namespace App\Http\Controllers;

use App\Models\Restaurante;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function showRestaurant($id)
    {
        $data = Restaurante::with('imgs','cartas','etiquetas','periodos','user','reservas')->find(1);
        return new JsonResponse($data);
    }

    public function showRestaurantsWithMembresia()
    {
        $restaurants = Restaurante::all()->whereNotNull('id_membresia');
        return $restaurants->toJson(JSON_PRETTY_PRINT);
    }

    public function showRestaurants()
    {
        $restaurants = Restaurante::all();
        return $restaurants->toJson(JSON_PRETTY_PRINT);
    }
}
