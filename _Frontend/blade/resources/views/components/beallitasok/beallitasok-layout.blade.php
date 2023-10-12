<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @vite('resources/css/settings.css')
    <title>Beállítások</title>
</head>

<body class="flex flex-col">
    <div class="overflow-auto flex flex-1 flex-col">
        <div class="flex-grow lg:pt-8 lg:pb-8 h-100">

            <div class="container items-center mx-auto gap-8 bg-zinc-800 h-100"
                style="border: 4px solid #25bdd6; border-radius: 8px">
                <x-beallitasok-cimsor />
                <x-beallitasok-menu />
                {{ $slot }}
            </div>
        </div>
        <x-lablec />
    </div>
</body>

</html>
