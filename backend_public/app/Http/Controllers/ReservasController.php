<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Restaurante;

class ReservasController extends Controller
{
    public function show($id)
    {
        $reserva = Reserva::find($id);
        return $reserva->toJson(JSON_PRETTY_PRINT);
    }

    public function showWithRestaurant($id) {
        $reservas = Reserva::select("reserva.*")
            ->join("restaurante","restaurante.id_restaurante","=","reserva.id_restaurante")
            ->where("restaurante.id_restaurante","=",$id)
            ->get()->toArray();
        return $reservas;
    }

    public function create(Reserva $reserva)
    {
        $restaurant = Restaurante::find($reserva->restaurante);
        if ($restaurant!=null) {
            $resultAforo = ($restaurant->aforo)-($reserva->personas);
            if ($resultAforo>=0) {
                $reserva->save();
            }
        }
    }

    public function login(Request $request)
    {
        $id = $request->input('id');
        $email = $request->input('email');

        $reserva = Reserva::find($id);

        if($reserva->correo === $email){
            return true;
        }else{
            return false;
        }
    }

    public function comprobate(Request $request)
    {
        $id = $request->input('id');

        $reserva = Reserva::select(DB::raw('Count(id_comentario) as coment'))
        ->join('comentarios', 'comentarios.id_reserva', '=', 'reserva.id_reserva')
        ->where('comentarios.id_reserva', '=', $id)
        ->get();

        return $reserva;
    }
}
