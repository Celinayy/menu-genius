<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/img/default-monochrome-white.svg" type="image/svg">
    @vite('resources/css/app.css')
</head>

<body class="flex flex-col">
    <x-fejlec />

    <div class="overflow-auto flex flex-1 flex-col">
        <div class="flex-grow">
            {{$slot}}
        </div>
        <x-lablec/>
    </div>
</body>

</html>
