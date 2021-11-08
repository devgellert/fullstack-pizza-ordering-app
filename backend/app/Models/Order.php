<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['status', 'destination', 'customer_name', 'customer_phone', 'accepted_at', 'cooked_at' ,'delivered_at', 'accepted_by', 'cooked_by', 'delivered_by' ];

    public function acceptedBy(){
        return $this->belongsTo(User::class, 'accepted_by');
    }

    public function deliveredBy(){
        return $this->belongsTo(User::class, 'delivered_by');
    }

    public function cookedBy(){
        return $this->belongsTo(User::class, 'cooked_by');
    }

    public function pizzas(){
        return $this->belongsToMany(Pizza::class)->withTimestamps()->withPivot(['count']);
    }

    /*
        Pizzak
    */
}
