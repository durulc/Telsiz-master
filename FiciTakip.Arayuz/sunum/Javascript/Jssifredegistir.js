$(document).ready(function () {
    jsModalAc();
});


function jsUserSifreDegistir()
{
    var v_EskiSifre = $("#txtMevcutSifre").val().trim();
    var v_YeniSifre = $("#txtYeniSifre").val().trim();
    var v_YeniSifreTekrar = $("#txtYeniSifreTekrar").val().trim();


    $.ajax({
        type: "POST",
        url: "api/KullaniciSifreDegistir",
        data: JSON.stringify
            ({
                EskiSifre: v_EskiSifre,
                YeniSifre: v_YeniSifre,
                YeniSifreTekrar: v_YeniSifreTekrar
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.Sonuc == "1") {
                swal({
                    buttons: {
                        confirm: "TAMAM"
                    },
                    title: "İşlem Tamamlandı",
                    text: "Şifre başarı ile değiştirildi",
                    icon: "success",
                    dangerMode: false,
                })
                    .then((willDelete) => {
                        window.location.href = 'login.aspx';
                    });
            }

            else {
                swal({
                    buttons: {
                        confirm: "Hata"
                    },
                    title: "Hata",
                    text: "Hata açıklaması:"+msg.Aciklama,
                    icon: "error",
                    dangerMode: false,
                })
                    .then((willDelete) => {
                        
                    });
            }
        },
        complete: function () {
            

        }
    });

}

function jsModalAc() {
    //$('#m_modal_sifre').modal('show');

    $('#m_modal_sifre').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}
