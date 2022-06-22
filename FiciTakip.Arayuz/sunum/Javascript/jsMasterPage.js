$body = $("body");

$(document).ready(function () {
    KullaniciBilgileriYukle();
});

function KullaniciBilgileriYukle() {
    $.ajax({
        type: "POST",
        url: "api/KullaniciBilgileri",
        data: "{}",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
                       
        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyiniz');
        },
        success: function (msg) {

            var vSiraNo = msg.SiraNo;

            if (vSiraNo != "-1") {
                $("#spnAdSoyAd").text(msg.AdSoyad);
                $("#spnEMail").text(msg.KullaniciAdi);
            
            }

            // var obj = JSON.parse(msg.d);



            //if (obj.Sonuc == "1") {

            //    //$("#txtDosyaUzunluk").val(obj.DosyaUzunluk);

            //    $("#txtDosyaAdiDevam").val(obj.DosyaAdi);

            //    $("#txtDosyaIdDevam").val(obj.TabloId);
            //}

        },
        complete: function () {


        }
    });
}