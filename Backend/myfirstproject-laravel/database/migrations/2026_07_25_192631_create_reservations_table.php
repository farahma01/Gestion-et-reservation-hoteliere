<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('reservations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('hotel_id')->constrained()->onDelete('cascade');
        $table->string('nom_client');
        $table->string('email');
        $table->string('telephone');
        $table->date('date_debut');
        $table->date('date_fin');
        $table->string('statut')->default('en_attente'); // en_attente, confirmee, annulee
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('reservations');
}
};
