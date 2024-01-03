<x-beallitasok-layout>
    <div class="grid lg:grid-cols-2 gap-8 bg-zinc-700 rounded-3xl lg:p-12 lg:m-16 p-6 m-2 w-100">
        <div>
            <p style="font-weight: bold" class="text-2xl">Személyes információk</p>
            <p>Itt tudod megváltoztatni a rád vonatkozó személyes adatokat.</p>
        </div>
        <div>
            <label style="font-weight: bold; padding-bottom: 4px">Felhasználó név</label>
            <input class="input" type="text">
            <label style="font-weight: bold;">E-mail cím</label>
            <input class="input" type="email">
        </div>
        <hr class=" lg:col-span-2">
        <div>
            <p style="font-weight: bold; padding-bottom: 4px" class="text-2xl">Jelszó megváltozatása</p>
            <p>Itt tudod megváltoztatni a jelszavadat.</p>
        </div>
        <div>
            <label style="font-weight: bold;">Jelenlegi jelszó</label>
            <input class="input" type="password">
            <label style="font-weight: bold;">Új jelszó</label>
            <input class="input" type="password">
            <label style="font-weight: bold;">Új jelszó ismét</label>
            <input class="input" type="password">
        </div>
        <hr class=" lg:col-span-2">

        <div>
            <p style="font-weight: bold; padding-bottom: 4px" class="text-2xl">Felhasználó törlése</p>
            <p>A továbbiakban nem szeretnéd használni a szolgáltatásainkat? Itt tudod törölni a felhasználódat. Ez a
                művelet NEM visszafordítható. Minden információ, amely ehhez a felhasználóhoz tartozik, az törölve lesz.
            </p>
        </div>
        <div class="mx-auto lg:pt-6">
            <button class="button button_cancel">Igen, törlöm a felhasználóm</button>
        </div>
        <hr class=" lg:col-span-2">

        <div class="text-center lg:col-span-2">
            <button class="button">Mentés</button>
        </div>
    </div>

</x-beallitasok-layout>
