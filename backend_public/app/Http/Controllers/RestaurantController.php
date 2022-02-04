<?php

namespace App\Http\Controllers;

use App\Models\Restaurante;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{

    public function showRestaurant($id)
    {
        $data = Restaurante::with('imgs','cartas','etiquetas','periodos','user','reservas')->find($id);
        return new JsonResponse($data);
    }

    public function showRestaurantsWithMembresia()
    {
        $restaurant = Restaurante::with('imgs','cartas','etiquetas','periodos','user','reservas')->get()->whereNotNull('id_membresia')->toArray();
        return new JsonResponse($restaurant);
    }

    public function showRestaurants()
    {
        $restaurant = Restaurante::with('imgs','cartas','etiquetas','periodos','user','reservas')->get()->toArray();
        return new JsonResponse($restaurant);
    }
}
