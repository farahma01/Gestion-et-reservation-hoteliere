<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
        return Reservation::with('hotel')->get();
    }
    public function updateStatut(Request $request, string $id)
{
    $reservation = Reservation::find($id);

    if (!$reservation) {
        return response()->json(['message' => 'Réservation non trouvée'], 404);
    }

    $validated = $request->validate([
        'statut' => 'required|in:en_attente,confirmee,annulee',
    ]);

    $reservation->update($validated);

    // Si la réservation est annulée, on remet l'hôtel disponible
    if ($validated['statut'] === 'annulee') {
        $reservation->hotel()->update(['disponibilite' => true]);
    }

    return response()->json($reservation);
}
    public function store(Request $request)
{
    $validated = $request->validate([
        'hotel_id' => 'required|exists:hotels,id',
        'nom_client' => 'required|string|max:255',
        'email' => 'required|email',
        'telephone' => 'required|string|max:20',
        'date_debut' => 'required|date|after_or_equal:today',
        'date_fin' => 'required|date|after:date_debut',
    ]);

    // Vérifie s'il existe déjà une réservation qui chevauche ces dates
    $conflit = Reservation::where('hotel_id', $validated['hotel_id'])
        ->where('statut', '!=', 'annulee')
        ->where('date_debut', '<', $validated['date_fin'])
        ->where('date_fin', '>', $validated['date_debut'])
        ->exists();

    if ($conflit) {
        return response()->json([
            'message' => 'Cet hôtel est déjà réservé sur cette période. Merci de choisir d\'autres dates.',
        ], 409);
    }

    $reservation = Reservation::create($validated);

    // Marque l'hôtel comme indisponible après la réservation
    $reservation->hotel()->update(['disponibilite' => false]);

    return response()->json($reservation, 201);
}

    public function show(string $id)
    {
        $reservation = Reservation::with('hotel')->find($id);

        if (!$reservation) {
            return response()->json(['message' => 'Réservation non trouvée'], 404);
        }

        return $reservation;
    }

    public function destroy(string $id)
{
    $reservation = Reservation::find($id);

    if (!$reservation) {
        return response()->json(['message' => 'Réservation non trouvée'], 404);
    }

    $reservation->hotel()->update(['disponibilite' => true]);
    $reservation->delete();

    return response()->json(['message' => 'Réservation annulée']);
}
}