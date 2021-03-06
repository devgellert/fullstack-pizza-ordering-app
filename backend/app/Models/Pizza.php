<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'size', 'price'];

    public function orders(){
        return $this->belongsToMany(Order::class)->withTimestamps();
    }

    public function ingredients(){
        return $this->belongsToMany(Ingredient::class)->withTimestamps();
    }
}
