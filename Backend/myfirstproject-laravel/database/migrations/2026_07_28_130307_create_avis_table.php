<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('avis', function (Blueprint $table) {
        $table->id();
        $table->foreignId('hotel_id')->constrained()->onDelete('cascade');
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->tinyInteger('note'); // 1 à 5
        $table->text('commentaire')->nullable();
        $table->timestamps();
    });
}

public function down(): void
{
    Schema::dropIfExists('avis');
}
};
