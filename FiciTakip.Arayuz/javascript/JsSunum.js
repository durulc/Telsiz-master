


function fn_HaritaCiz()
{
    var map = L.map('map').setView([0.00085447747469, 28.514484565], 20);

    var tile_04_50_kotu = L.tileLayer('04_50_kotu/{z}/{x}/{y}.png', {
        maxZoom: 25,
        tms: true,
        attribution: 'Aniventi'
    }).addTo(map);


    var tile_00_00_kotu = L.tileLayer('00_00_kotu/{z}/{x}/{y}.png', {
        maxZoom: 25,
        tms: true,
        attribution: 'Aniventi'
    }).addTo(map);

    var tile_05_00_kotu = L.tileLayer('05_00_kotu/{z}/{x}/{y}.png', {
        maxZoom: 25,
        tms: true,
        attribution: 'Aniventi'
    }).addTo(map);


}