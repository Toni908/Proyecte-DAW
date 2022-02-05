<?php

namespace App\Http\Controllers;

use App\Models\Restaurante;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{

    public function show($id)
    {
        $data = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')->find($id);
        return json_decode(json_encode($data), true);
    }

    public function showRestaurantsWithMembresia()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')->get()->whereNotNull('id_membresia')->toArray();
        return json_decode(json_encode($restaurant), true);
    }

    public function showRestaurantsComplet()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')->get()->whereNotNull('id_membresia')->toArray();
        if ($this->getOnlyRestaurantWithImg($restaurant)==null) {
            return $this->showRestaurantsWithImage();
        }
        return json_decode(json_encode($restaurant), true);
    }

    public function showRestaurants()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')->orderBy('id_restaurante', 'asc')->get()->toArray();
        return json_decode(json_encode($restaurant), true);
    }

    public function showRestaurantsWithImage()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')->orderBy('id_restaurante', 'asc')->get()->toArray();
        $restaurant =  $this->getOnlyRestaurantWithImg($restaurant);
        return json_decode(json_encode($restaurant), true);
    }

    public function getOnlyRestaurantWithImg($array){
        $arrayRestaurantComplet = [];
        if (count($array) != 0) {
            for ($i = 0; $i < count($array); $i++) {
                if (count($array[$i]['imgs'])!=0) {
                    array_push($arrayRestaurantComplet,$array[$i]);
                }
            }
        } else {
            return null;
        }
        return $arrayRestaurantComplet;
    }
}
