<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'hotel_id',
        'nom_client',
        'email',
        'telephone',
        'date_debut',
        'date_fin',
        'statut',
    ];

    public function hotel()
    {
        return $this->belongsTo(Hotel::class);
    }
}