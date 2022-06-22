$body = $("body");

$(document).on({
    ajaxStart: function () { $body.addClass("loading"); },
    ajaxStop: function () { $body.removeClass("loading"); }
});



function BasariliIslem(varMesaj) {
    $.notify({
        title: 'BAŞARILI',
        message: '' + varMesaj
    }, {
            type: 'success',
            delay: 1500,
            z_index: 2000,
        });
}


function UyariMesajiVer(varMesaj) {
    $.notify({
        title: 'HATA!!!',
        message: '' + varMesaj
    }, {
            type: 'danger',
            delay: 1500,
            z_index: 2000,
        });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}