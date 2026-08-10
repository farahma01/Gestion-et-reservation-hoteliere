<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.(GET)
     */
    public function index()
    {
        return Hotel::all();
    }

    /**
     * Store a newly created resource in storage.(POST)
     */
    public function store(Request $request)  /*les données envoyées par React respectent les règles (type,unicité...)*/
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'prix' => 'required|numeric',
            'categorie' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'disponibilite' => 'boolean',
        ]);

        $hotel = Hotel::create($validated);

        return response()->json($hotel, 201);
    }

    /**
     * Display the specified resource.(GET par id)
     */
    public function show(string $id)
    {
        $hotel = Hotel::find($id);

        if (!$hotel) {
            return response()->json(['message' => 'Hôtel non trouvé'], 404);
        }

        return $hotel;
    }

    /**
     * Update the specified resource in storage.(PUT)
     */
    public function update(Request $request, string $id)
    {
        $hotel = Hotel::find($id);

        if (!$hotel) {
            return response()->json(['message' => 'Hôtel non trouvé'], 404);
        }

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'ville' => 'sometimes|required|string|max:255',
            'prix' => 'sometimes|required|numeric',
            'categorie' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'disponibilite' => 'boolean',
        ]);

        $hotel->update($validated);

        return response()->json($hotel);
    }

    /**
     * Remove the specified resource from storage.(DELETE)
     */
    public function destroy(string $id)
    {
        $hotel = Hotel::find($id);

        if (!$hotel) {
            return response()->json(['message' => 'Hôtel non trouvé'], 404);
        }

        $hotel->delete();

        return response()->json(['message' => 'Hôtel supprimé avec succès']);
    }
}