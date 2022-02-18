<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Restaurante;

class RestaurantController extends Controller
{

    public function show($id)
    {
        $data = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','reservas')->find($id);
        if ($data['visible'] && $data['validated']) {
            return json_decode(json_encode($data), true);
        }
        return null;
    }

    public function showRestaurantsWithMembresia()
    {
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','reservas')
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
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->groupBy('id_restaurante')
        ->orderBy('price', 'asc')
        ->take(8)
        ->get();

        return $restaurant->toJson();
    }

    public function buscador(){
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->groupBy('id_restaurante')
        ->get();

        return $restaurant->toJson();
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
