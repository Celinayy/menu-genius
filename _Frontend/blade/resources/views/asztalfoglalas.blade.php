<x-global-layout>
    <div class="lg:container lg:mx-auto lg:pt-12 pt-6">
        <div class="text-center lg:text-left lg:grid lg:grid-cols-2 gap-2">
            <div class="animate-floating_from_left pb-6">
                <h1 class="name_text">Menu Genius</h1>
                <hr style="border-width: 1px; width: 30%; opacity: 100%" class="hidden lg:block"/>
                <h1 class="table_text lg:text-5xl text-4xl">ASZTALFOGLALÁS</h1>
                <p class="text-3xl">
                    Amennyiben szeretné leadni asztalfoglalását, azt az alábbi űrlap
                    kitöltésével teheti meg
                </p>
                <br />
                <p class="text-3xl">
                    A lefoglalt asztalokat a foglalási időpont kezdete után legfeljebb
                    <span style="font-weight: bold; color: white">25 percig</span>
                    tartjuk fenn.<br>Esetleges késésüket kérjük előre jelezzék
                    <span style="font-weight: bold; color: white">telefonon.</span>
                </p>
            </div>
            <div  class="animate-floating_from_right">
                <div class="lg:grid grid-cols-2">
                    <div class="floating_from_right">
                        <input type="text" class="input" placeholder="Név" /><br />
                        <input type="number" class="input" min="1" max="12"
                            placeholder="Személyek száma" /><br />
                        <input type="date" class="input" placeholder="Dátum" /><br />
                    </div>
                    <div>
                        <input type="tel" id="phone" pattern="[0-9]{2}-[0-9]{2}-[0-9]{7}" class="input"
                            placeholder="Telefon (06 30 6351102)" /><br />
                        <input type="email" class="input" placeholder="Email" /><br />
                    </div>
                </div>
                <textarea style="resize: none" rows="4" cols="40" placeholder="Üzenet"></textarea><br />
                <form class="pb-2">
                    <div class="checkbox_and_text">
                        <label class="container_checkbox">
                            <input type="checkbox" />
                            <svg viewBox="0 0 64 64" height="2em" width="2em">
                                <path
                                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                                    pathLength="575.0541381835938" class="path"></path>
                            </svg>
                        </label>
                        <span class="text_aszf">Elolvastam és elfogadom az
                            <a style="font-weight: bold; color: white">adatkezelési szabályzat</a>ban
                            foglaltakat.</span><br>
                        <button class="button">Asztalfoglalás küldése</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-global-layout>
