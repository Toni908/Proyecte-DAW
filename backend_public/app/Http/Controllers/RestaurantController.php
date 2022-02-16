<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\Restaurante;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Object_;

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
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')
            ->get()
            ->where('validated', '=', 1)
            ->where('visible', '=', 1)
            ->whereNotNull('id_membresia')
            ->toArray();
        if ($restaurant==null) {
            return $this->showRestaurants();
        }
        return json_decode(json_encode($restaurant), true);
    }

    public function showRestaurants()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','user','reservas')
            ->orderBy('id_restaurante', 'asc')
            ->where('validated', '=', 1)
            ->where('visible', '=', 1)
            ->get()
            ->toArray();
        return json_decode(json_encode($restaurant), true);
    }

    public function showPrice(){
        $restaurant = Restaurante::select('*')
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->get();

        return $restaurant->toJson();
        //$restaurant = Restaurante::with('cartas')->get()->whereNotNull('id_membresia')->toArray();
        //$restaurant = $this->fullValidationRestaurant($restaurant);
        //return json_decode(json_encode($restaurant), true);
    }


    // HELPER FUNCTIONS

    /*public function cartas($array): ?array
    {
    }*/

    public function aforo($id) {
        $aforos = Reserva::all('id_restaurante','personas')->where('id_restaurante','==',$id);

        $sum = 0;
        if (count($aforos) != 0) {
            foreach($aforos as $v){
                $sum += $v['personas'];
            }
        }
        return json_decode(json_encode($sum), true);
    }
}
