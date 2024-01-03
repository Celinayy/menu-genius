<div class="flex flex-row items-end justify-end lg:mr-16 mx-auto" style="color: grey">
    <div class="pr-4 vertical_line">
        <span class="text_contact" onclick="showDialog('login-dialog')">Bejelentkezés</span><br>
        <span class="text_contact" onclick="showDialog('register-dialog')">Regisztrácó</span>
    </div>
    <img src="/img/profile.svg" alt="profile" class="w-16 pl-4">
</div>



{{-- login rész --}}
<x-dialog id="login-dialog">
    <div class="grid gap-1">
        <div><button class="button button_cancel float-right" onclick="hideDialog('login-dialog')">Bezárás</button></div>
        <img src="/img/avatar.svg" class="h-72 mx-auto hover:animate-pulse" id="avatar_pic">
        <input class="input m-auto" type="text" placeholder="Felhasználó név">
        <input class="input m-auto" type="password" placeholder="Jelszó">
        <button class="button" onclick="hideDialog('login-dialog')">Bejelentkezés</button>
    </div>
</x-dialog>

{{-- register rész --}}

<x-dialog id="register-dialog" >
        <div class="grid gap-1">
            <div><button class="button button_cancel float-right" onclick="hideDialog('register-dialog')">Bezárás</button></div>
            <img src="/img/avatar.svg" class="h-72 mx-auto hover:animate-pulse">
            <input class="input m-auto" type="text" placeholder="Felhasználó név">
            <input class="input m-auto" type="password" placeholder="Jelszó">
            <input class="input m-auto" type="password" placeholder="Jelszó újra">
            <button class="button" onclick="hideDialog('register-dialog')">Regisztráció</button>
        </div>
</x-dialog>

