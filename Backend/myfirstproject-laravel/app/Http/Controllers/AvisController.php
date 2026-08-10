<?php

namespace App\Http\Controllers;

use App\Models\Avis;
use Illuminate\Http\Request;

class AvisController extends Controller
{
    // Tous les avis d'un hôtel précis
    public function parHotel(string $hotelId)
    {
        return Avis::with('user')
            ->where('hotel_id', $hotelId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'note' => 'required|integer|min:1|max:5',
            'commentaire' => 'nullable|string|max:1000',
        ]);

        $user = $request->user();

        // Un client ne peut laisser qu'un seul avis par hôtel
        $existe = Avis::where('hotel_id', $validated['hotel_id'])
            ->where('user_id', $user->id)
            ->exists();

        if ($existe) {
            return response()->json([
                'message' => 'Vous avez déjà laissé un avis pour cet hôtel.',
            ], 409);
        }

        $avis = Avis::create([
            ...$validated,
            'user_id' => $user->id,
        ]);

        return response()->json($avis->load('user'), 201);
    }

    public function destroy(string $id)
    {
        $avis = Avis::find($id);

        if (!$avis) {
            return response()->json(['message' => 'Avis non trouvé'], 404);
        }

        $avis->delete();

        return response()->json(['message' => 'Avis supprimé']);
    }
}