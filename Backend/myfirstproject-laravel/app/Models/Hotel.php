<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;
    public function avis()
{
    return $this->hasMany(Avis::class);
}

    protected $fillable = [
        'nom',
        'ville',
        'prix',
        'categorie',
        'description',
        'image',
        'disponibilite',
    ];
}