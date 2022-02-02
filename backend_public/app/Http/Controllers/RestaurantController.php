<?php

namespace App\Http\Controllers;

use App\Models\Restaurante;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function showRestaurant($id)
    {
        $restaurant = Restaurante::find($id);
        return $restaurant->toJson(JSON_PRETTY_PRINT);
    }

    public function showRestaurants()
    {
        $restaurants = Restaurante::all();
        return $restaurants->toJson(JSON_PRETTY_PRINT);
    }
}
