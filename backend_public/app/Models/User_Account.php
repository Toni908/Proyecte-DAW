<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User_Account extends Model
{
    use HasFactory;

    protected $table = "user_acount";
    public $timestamps = false;
    protected $primaryKey = 'id_user';

    public function restaurantes()
    {
        return $this->hasMany(Restaurante::class,"id_restaurante");
    }
}
