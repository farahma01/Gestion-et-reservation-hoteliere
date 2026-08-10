<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hotel;

class HotelSeeder extends Seeder
{
    public function run(): void
    {
        $hotels = [
            [
                'nom' => 'Radisson',
                'ville' => 'Djerba',
                'prix' => 250,
                'categorie' => '5 étoiles',
                'description' => 'Hôtel de luxe en bord de mer avec spa et piscine.',
                'image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                'disponibilite' => true,
            ],
            [
                "nom"=> "Sunset Beach Resort",
                "ville"=>"Djerba",
                "prix"=> 210,
                "categorie"=> "4 étoiles",
                "description"=> "Resort en bord de mer avec vue panoramique sur le coucher de soleil et activités nautiques.",
                "image"=>"https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600",
                'disponibilite' => true,
            ],
            [
                "nom"=>"Hôtel Dar Sultan",
                "ville"=> "Tunis",
                "prix"=> 320,
                "categorie"=> "5 étoiles",
                "description"=> "Un hôtel de luxe au cœur de la médina, alliant architecture traditionnelle et confort moderne.",
                "image"=> "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
                'disponibilite' => true,
            ],
            [
                'nom' => 'Iberostar Selection',
                'ville' => 'Hammamet',
                'prix' => 180,
                'categorie' => '4 étoiles',
                'description' => 'Complexe familial avec accès direct à la plage.',
                'image' => 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
                'disponibilite' => true,
            ],
            [
                'nom' => 'Dar El Jeld Hotel',
                'ville' => 'Tunis',
                'prix' => 120,
                'categorie' => '4 étoiles',
                'description' => 'Riad traditionnel au cœur de la médina de Tunis.',
                'image' => 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
                'disponibilite' => true,
            ],
            [
                'nom' => 'Mövenpick Resort',
                'ville' => 'Sousse',
                'prix' => 200,
                'categorie' => '5 étoiles',
                'description' => 'Resort moderne avec plusieurs restaurants et centre de bien-être.',
                'image' => 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
                'disponibilite' => false,
            ],
            [
                'nom' => 'Golden Tulip',
                'ville' => 'Sfax',
                'prix' => 90,
                'categorie' => '3 étoiles',
                'description' => 'Hôtel confortable proche du centre-ville, idéal pour les voyages d\'affaires.',
                'image' => 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c',
                'disponibilite' => true,
            ],
        ];

        foreach ($hotels as $hotel) {
            Hotel::create($hotel);
        }
    }
}