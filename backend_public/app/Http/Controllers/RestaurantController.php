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
        if ($data['visible'] && $data['validated']) {
            return json_decode(json_encode($data), true);
        }
        return null;
    }

    public function showRestaurantsWithMembresia()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')->get()->whereNotNull('id_membresia')->toArray();
        $restaurant = $this->fullValidationRestaurant($restaurant);
        return json_decode(json_encode($restaurant), true);
    }

    public function showRestaurants()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')->orderBy('id_restaurante', 'asc')->get()->toArray();
        $restaurant = $this->getOnlyValidatedRestaurants($restaurant);
        $restaurant = $this->getOnlyVisibleRestaurants($restaurant);
        return json_decode(json_encode($restaurant), true);
    }


    // HELPER FUNCTIONS


    public function fullValidationRestaurant($array): ?array
    {
        $array = $this->getOnlyValidatedRestaurants($array);
        $array = $this->getOnlyVisibleRestaurants($array);
        $array = $this->getOnlyRestaurantWithImg($array);

        if ($array==null) {
            return $this->showRestaurants();
        }
        return $array;
    }

    public function getOnlyRestaurantWithImg($array): ?array
    {
        if ($array==null) {
            return null;
        }
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

    public function getOnlyVisibleRestaurants($array): ?array
    {
        if ($array==null) {
            return null;
        }
        $restaurants = [];
        if (count($array) != 0) {
            for ($i = 0; $i < count($array); $i++) {
                if ($array[$i]['visible']!=false) {
                    array_push($restaurants,$array[$i]);
                }
            }
        } else {
            return null;
        }
        return $restaurants;
    }

    public function getOnlyValidatedRestaurants($array): ?array
    {
        if ($array==null) {
            return null;
        }
        $restaurants = [];
        if (count($array) != 0) {
            for ($i = 0; $i < count($array); $i++) {
                if ($array[$i]['validated']!=false) {
                    array_push($restaurants,$array[$i]);
                }
            }
        } else {
            return null;
        }
        return $restaurants;
    }
}
