<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservetion extends Model
{
    use HasFactory;

    protected $fillable = [
        'numberOfGuests',
        'arrivalTime',
        'getawayTime',
        'name',
        'phone',
        'deskId'
    ];

    public function desk()
    {
        return $this->belongsTo(Desk::class);
    }
}
