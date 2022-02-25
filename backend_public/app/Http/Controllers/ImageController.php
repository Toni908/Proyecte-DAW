<?php

namespace App\Http\Controllers;

use App\Models\Alergeno;

class ImageController extends Controller
{
    public function show($id_restaurant,$name) {
        $tempImage = env("LOCATION_IMAGES")."/".$id_restaurant."/".$name;
        return response()->download($tempImage, $name);
    }

    public function showAlergeno($id_alergeno) {
        $alorgeno = Alergeno::find($id_alergeno);
        $tempImage = public_path()."/alergenos/".$alorgeno->icono;
        return response()->download($tempImage, $alorgeno->icono);
    }
}
