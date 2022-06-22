$(document).ready(function () {

    jsVeriGetir();
});

function jsDevamEt() {

    //$('#listeProjeTuru')
    var v_urunformid = $('#listeProjeTuru').val();

    $.ajax({
        type: "POST",
        url: "api/KullaniciFormKayit",//Controllerda ki uzantı
        data: JSON.stringify
            ({
                urunformid: v_urunformid
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {//çağırılmadan önce çağırılan 

        },
        error: function (request, status, error) {//hata olduğunda 

            // UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {//başarılı olduğunda

            jsAnaSayfa();

        },
        complete: function () {
           
        }
    });

}

function jsVeriGetir()
{
    $.ajax({
        type: "POST",
        url: "api/UrunFormListele",//Controllerda ki uzantı
        data: JSON.stringify
            ({
                zdeger: '1'
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {//çağırılmadan önce çağırılan 

        },
        error: function (request, status, error) {//hata olduğunda 

           // UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {//başarılı olduğunda

            $('#listeProjeTuru').html(msg.tabloyazisi);

        },
        complete: function ()
        {
            jsIlkModalAc();
        }
    });
}


function jsAnaSayfa()
{
    window.location.href = "Anasayfa.aspx";
}

function jsIlkModalAc() {
    $('#m_modal_01').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}