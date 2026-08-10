<?php

namespace App\Http\Controllers;

use App\Models\MessageContact;
use Illuminate\Http\Request;

class MessageContactController extends Controller
{
    public function index()
    {
        return MessageContact::orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $messageContact = MessageContact::create($validated);

        return response()->json($messageContact, 201);
    }

    public function repondre(Request $request, string $id)
    {
        $messageContact = MessageContact::find($id);

        if (!$messageContact) {
            return response()->json(['message' => 'Message non trouvé'], 404);
        }

        $validated = $request->validate([
            'reponse' => 'required|string',
        ]);

        $messageContact->update([
            'reponse' => $validated['reponse'],
            'statut' => 'repondu',
        ]);

        return response()->json($messageContact);
    }

    public function destroy(string $id)
    {
        $messageContact = MessageContact::find($id);

        if (!$messageContact) {
            return response()->json(['message' => 'Message non trouvé'], 404);
        }

        $messageContact->delete();

        return response()->json(['message' => 'Message supprimé']);
    }

    // Pour qu'un client connecté voie SES messages et réponses
    public function mesMessages(Request $request)
    {
        return MessageContact::where('email', $request->user()->email)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}