<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('message_contacts', function (Blueprint $table) {
        $table->id();
        $table->string('nom');
        $table->string('email');
        $table->text('message');
        $table->text('reponse')->nullable();
        $table->string('statut')->default('en_attente'); // en_attente, repondu
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('message_contacts');
}
};
