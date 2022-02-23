<?php

namespace App\Http\Controllers;

class ImageController extends Controller
{
    public function show($id_restaurant,$name) {
        $tempImage = env("LOCATION_IMAGES")."/".$id_restaurant."/".$name;
        return response()->download($tempImage, $name);
    }
}
