<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\reservetion;
use App\Models\Desk;

class ReservationController extends Controller
{
    public function createReservation(Request $request)
    {
        try {
            $request->validate([
                'numberOfGuests' => 'required|integer',
                'arrivalTime' => 'required|date_format:Y-m-d H:i:s',
                'name' => 'required|string',
                'phone' => 'required|string',
            ]);

            $arrivalTime = strtotime($request->input('arrivalTime'));
            $getawayTime = date('Y-m-d H:i:s', $arrivalTime + 3 * 3600);

            $deskId = $this->findAvailableDesk($request->input('numberOfGuests'), $request->input('arrivalTime'));

            $reservation = new Reservation([
                'numberOfGuests' => $request->input('numberOfGuests'),
                'arrivalTime' => $request->input('arrivalTime'),
                'getawayTime' => $getawayTime,
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
                'deskId' => $deskId,
            ]);

            $reservation->save();

            return response()->json(['message' => 'Foglalás sikeresen létrehozva']);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['error' => 'Hiba történt a foglalás létrehozása során.'], 500);
        }
    }

    private function findAvailableDesk($numberOfGuests, $arrivalTime)
    {
        $availableDesk = Desk::where('numberOfSeats', '>=', $numberOfGuests)
            ->whereDoesntHave('reservations', function ($query) use ($arrivalTime) {
                $query->where('arrivalTime', '<', $arrivalTime)
                    ->where('getawayTime', '>', $arrivalTime);
            })
            ->orderBy('numberOfSeats', 'asc')
            ->first();

        if ($availableDesk) {
            return $availableDesk->id;
        }

        return null;
    }
}
