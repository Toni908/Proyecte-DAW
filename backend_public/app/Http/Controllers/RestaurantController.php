<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Restaurante;
use Illuminate\Http\Request;
use Illuminate\Support\Optional;

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

    public function cheapest(){
        $restaurant = Restaurante::with('localidad','imgs','cartas','etiquetas','periodos','reservas')->select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
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

    public function buscador(Request $request)
    {

        $etiqueta = $request->input('etiqueta');
        $lugar = $request->input('lugar');
        $precio = (int)$request->input('precio');

        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->join('restaurante_etiquetas', 'restaurante_etiquetas.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('etiquetas', 'etiquetas.id_etiqueta', '=', 'restaurante_etiquetas.id_etiqueta')
        ->join('localidad', 'localidad.id_localidad', '=', 'restaurante.id_localidad')
        ->join('municipio', 'municipio.nombre_municipio', '=', 'localidad.nombre_municipio')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1);

        if($etiqueta != null){
            $restaurant->where('etiquetas.nombre', '=', $etiqueta);
        }
        if($lugar != null){
            $restaurant->where('municipio.nombre_municipio', '=', $lugar);
        }
        if($precio != null){
            $restaurant->where(DB::raw('Round(AVG(platos.precio),0)'), '<=', $precio);
        }

        $restaurant->groupBy('id_restaurante')
        ->get();
        
    return $restaurant->toJson();

    }
 
    /*if($etiqueta != null && $lugar != null && $precio != null){
        $restaurant
        ->where('etiquetas.nombre', '=', $etiqueta)
        ->Optional($lugar)->where('municipio.nombre_municipio', '=', $lugar)
        ->where('price', '<=', $precio)
        ->groupBy('id_restaurante')
        ->get();
    }else if($etiqueta != null && $lugar != null){
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->join('restaurante_etiquetas', 'restaurante_etiquetas.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('etiquetas', 'etiquetas.id_etiqueta', '=', 'restaurante_etiquetas.id_etiqueta')
        ->join('localidad', 'localidad.id_localidad', '=', 'restaurante.id_localidad')
        ->join('municipio', 'municipio.nombre_municipio', '=', 'localidad.nombre_municipio')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->where('etiquetas.nombre', '=', $etiqueta)
        ->where('municipio.nombre_municipio', '=', $lugar)
        ->groupBy('id_restaurante')
        ->get();
    }else if($etiqueta != null && $precio != null){
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->join('restaurante_etiquetas', 'restaurante_etiquetas.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('etiquetas', 'etiquetas.id_etiqueta', '=', 'restaurante_etiquetas.id_etiqueta')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->where('etiquetas.nombre', '=', $etiqueta)
        ->where('price', '<=', $precio)
        ->groupBy('id_restaurante')
        ->get();
    }else if($lugar != null && $precio != null){
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->join('localidad', 'localidad.id_localidad', '=', 'restaurante.id_localidad')
        ->join('municipio', 'municipio.nombre_municipio', '=', 'localidad.nombre_municipio')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->where('municipio.nombre_municipio', '=', $lugar)
        ->where('price', '<=', $precio)
        ->groupBy('id_restaurante')
        ->get();
    }else if($precio != null){
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->where('price', '<=', $precio)
        ->groupBy('id_restaurante')
        ->get();
    }else if($lugar != null){
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->join('localidad', 'localidad.id_localidad', '=', 'restaurante.id_localidad')
        ->join('municipio', 'municipio.nombre_municipio', '=', 'localidad.nombre_municipio')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->where('municipio.nombre_municipio', '=', $lugar)
        ->groupBy('id_restaurante')
        ->get();
    }else if($etiqueta != null){
        $restaurant = Restaurante::select('restaurante.*', DB::raw('Round(AVG(platos.precio),0) as price'))
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        ->join('restaurante_etiquetas', 'restaurante_etiquetas.id_restaurante', '=', 'restaurante.id_restaurante')
        ->join('etiquetas', 'etiquetas.id_etiqueta', '=', 'restaurante_etiquetas.id_etiqueta')
        ->where('restaurante.validated', '=', 1)
        ->where('restaurante.visible', '=', 1)
        ->where('carta.visible', '=', 1)
        ->where('etiquetas.nombre', '=', $etiqueta)
        ->groupBy('id_restaurante')
        ->get();
    }else{
        $restaurant = Restaurante::select('restaurante.*')
        ->take(0)
        ->get();
    }

    
} */


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
