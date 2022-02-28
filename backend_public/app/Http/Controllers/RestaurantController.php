<?php

namespace App\Http\Controllers;

use App\Models\Carta;
use App\Models\Categoria;
use App\Models\Plato;
use App\Models\Reserva;
use Carbon\Traits\Date;
use Illuminate\Support\Facades\DB;
use App\Models\Restaurante;
use Illuminate\Http\Request;
use Nette\Utils\DateTime;

class RestaurantController extends Controller
{

    public function show($id)
    {
        $data = Restaurante::with("imgs","etiquetas")->select("user_acount.nombre as username","user_acount.correo as usercorreo","user_acount.telefono as userphone","restaurante.*", "localidad.*")
            ->join("user_acount","user_acount.id_user","=","restaurante.id_user")
            ->join("localidad","localidad.id_localidad","=","restaurante.id_localidad")
            ->find($id);
        if ($data['visible'] && $data['validated']) {
            return json_decode(json_encode($data), true);
        }
        return null;
    }

    public function showRestaurantsWithMembresia()
    {
        $restaurant = Restaurante::with('localidad','imgs','etiquetas','periodos')
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
        $restaurant = Restaurante::with('localidad','imgs','etiquetas','periodos')
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

    public function AVGReservasRestaurant($id){
        $restaurant["info"] = Restaurante::select("restaurante.id_restaurante",DB::raw('Round(AVG(comentarios.valoracion_sitio),2) as valoracion_sitio'),DB::raw('Round(AVG(comentarios.valoracion_servicio),2) as valoracion_servicio'),DB::raw('Round(AVG(comentarios.valoracion_comida),2) as valoracion_comida'),DB::raw('Count(comentarios.id_reserva) as count'))
            ->join("reserva","restaurante.id_restaurante","=","reserva.id_restaurante")
            ->join('comentarios', 'reserva.id_reserva', '=', 'comentarios.id_reserva')
            ->groupBy("restaurante.id_restaurante")
            ->find($id);
        return $restaurant;
    }

    public function cartRestaurantActive($id){
        $carta = Carta::first()->select("carta.*")
            ->join('restaurante', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
            ->where("carta.visible","=",1)
            ->where("restaurante.id_restaurante","=",$id)
            ->groupBy("carta.id_carta")
            ->get()->toArray();
        $platos = $this->platoWithCategory($id);
        $categories = $this->categoryCartaActive($id);

        // INSTANCIAR CADA CATEGORIA CON UNA LISTA DE PLATOS
        for ($c = 0; $c < count($categories); $c++) {
            $categories[$c]["platos"] = [];
        }

        for ($p = 0; $p < count($platos); $p++) {
            for ($c = 0; $c < count($categories); $c++) {
                if ($platos[$p]["id_categoria"]===$categories[$c]["id_categoria"]) {
                    array_push($categories[$c]["platos"],$platos[$p]);
                }
            }
        }

        $fullCarta["carta"] = head($carta);
        $fullCarta["carta"]["categorias"] = $categories;
        return $fullCarta;
    }

    public function categoryCartaActive($id) {
        $categories = Categoria::select("categoria_platos.id_categoria","categoria_platos.nombre")
            ->join("carta","carta.id_carta","=","categoria_platos.id_carta")
            ->join("restaurante","restaurante.id_restaurante","=","carta.id_restaurante")
            ->where("carta.visible","=",1)
            ->where("restaurante.id_restaurante","=",$id)
            ->groupBy("categoria_platos.id_categoria")
            ->get()->toArray();
        return $categories;
    }

    public function platoWithCategory($id) {
        $platos = Plato::with("ingredientes","alergeno")->select("platos.*")
            ->join("categoria_platos","categoria_platos.id_categoria","=","platos.id_categoria")
            ->join("carta","carta.id_carta","=","categoria_platos.id_carta")
            ->join("restaurante","restaurante.id_restaurante","=","carta.id_restaurante")
            ->where("carta.visible","=",1)
            ->where("restaurante.id_restaurante","=",$id)
            ->groupBy("platos.id_plato")
            ->get()->toArray();
        return $platos;
    }

    /*public function buscador(Request $request)
    {

        $etiqueta = $request->input('etiqueta');
        $lugar = $request->input('lugar');
        $precio = (int)$request->input('precio');

        $restaurant = Restaurante::select('restaurante.*')
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
            $restaurant->having(DB::raw('Round(AVG(platos.precio),0)'), '<=', $precio);
        }

        $restaurant->groupBy('restaurante.id_restaurante');


    return $restaurant->get();

    }*/

    public function buscador(Request $request)
    {

        $etiqueta = $request->input('etiqueta');
        $lugar = $request->input('lugar');
        $precio = (int)$request->input('precio');

        $restaurant = Restaurante::with('localidad','imgs','etiquetas','periodos')->select('restaurante.*')
        ->join('carta', 'carta.id_restaurante', '=', 'restaurante.id_restaurante')
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
            if($precio == 1){
                $restaurant->having(DB::raw('Round(AVG(platos.precio),0)'), '<=', 15);
            }else if($precio == 2){
                $restaurant->having(DB::raw('Round(AVG(platos.precio),0)'), '<=', 60)->having(DB::raw('Round(AVG(platos.precio),0)'), '>=', 15);
            }else if($precio == 3){
                $restaurant->having(DB::raw('Round(AVG(platos.precio),0)'), '>=', 60);
            }
        }
            

        $restaurant->groupBy('id_restaurante')->orderBy('id_membresia', 'desc');
        

    return $restaurant->get();

    }

    

    // HELPER FUNCTIONS 

    /*public function cartas($array): ?array
    {
        ->join('categoria_platos', 'categoria_platos.id_carta', '=', 'carta.id_carta')
        ->join('platos', 'platos.id_categoria', '=', 'categoria_platos.id_categoria')
        , DB::raw('Round(AVG(platos.precio),2) as valMed')
    }*/

    public function aforo($id) {
        $date_start = DateTime::createFromFormat('Y-m-d', date("Y-m-d"))->setTime(0, 0);
        $date_end = DateTime::createFromFormat('Y-m-d', date("Y-m-d"))->setTime(24, 0);

        $aforos = Reserva::all()
            ->where("fecha",">=",$date_start)
            ->where("fecha","<=",$date_end)
            ->where('id_restaurante','==',$id);

        $sum = 0;
        if (count($aforos) != 0) {
            foreach($aforos as $v){
                $sum += $v['personas'];
            }
        }
        return json_decode(json_encode($sum), true);
    }
}
