<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;

class ComentarioController extends Controller
{
    function create(Request $request)
    {
        $comment = new Comentario();

        $comment->id_reserva = $request->input('id');
        $comment->valoracion_sitio = $request->input('puntuacioSitio');
        $comment->valoracion_servicio = $request->input('puntuacioServicio');
        $comment->valoracion_comida = $request->input('puntuacioComida');
        $comment->comentario = $request->input('comentario');

        $comment->save();

        return true;

    }
}
