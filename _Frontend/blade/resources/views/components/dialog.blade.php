<div id="{{ $id }}"
    class="fixed left-0 top-0 opacity-0 hidden w-screen h-screen transition-opacity duration-500"
    style="background-color: rgba(0,0,0,0.6)">
    {{-- <div style="background-color: rgba(0,0,0,0.6); position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: -1"></div> --}}
    <div class="rounded shadow-md p-8 mx-auto my-20 lg:w-1/4 w-80 text-center" id="pop_modal">
        {{ $slot }}
    </div>
</div>
