$(document).ready(function () {

    fnYetkiTuruListesi();

    
});

function jsKullaniciKayit()
{
    var v_Ad = $("#txtAd").val().trim();
    var v_Soyad = $("#txtSoyad").val().trim();
    var v_KullaniciAdi = $("#txtKullaniciAdi").val().trim();
    var v_Yetki = $("select#listeYetkiTuru").val();
    var v_Sehir = $("select#listeSehir").val();
    var v_IsYeri = $("#txtIsyeri").val();
    var v_Unvan = $("#txtUnvan").val();

    if (v_Ad.length < 2) {
        UyariMesajiVer('Lütfen Ad bilgisi giriniz');
        return false;
    }

    if (v_Soyad.length < 2) {
        UyariMesajiVer('Lütfen Soyad bilgisi giriniz');
        return false;
    }

    if (v_KullaniciAdi.length < 3) {
        UyariMesajiVer('Lütfen Kullanıcı Adı bilgisi giriniz');
        return false;
    }

    if (v_Yetki=='0') {
        UyariMesajiVer('Lütfen Yetki Türü seçiniz');
        return false;
    }

    if (v_IsYeri.length < 3) {
        UyariMesajiVer('Lütfen Genel Müdürlük/İl Müdürlüğü bilgisi giriniz');
        return false;
    }

    if (v_Unvan.length < 3) {
        UyariMesajiVer('Lütfen Ünvan bilgisi giriniz');
        return false;
    }

    if (v_Yetki != '1' && v_Yetki != '2')
    {
        if (v_Sehir.length < 1) {
            UyariMesajiVer('Lütfen Şehir bilgisi giriniz');
            return false;
        }
    }

 

    $.ajax({
        type: "POST",
        url: "api/KullaniciKayit",
        data: JSON.stringify
            ({
                Ad: v_Ad,
                Soyad: v_Soyad,
                KullaniciAdi: v_KullaniciAdi,
                Isyeri: v_IsYeri,
                Unvan: v_Unvan,
                YetkiTuru: v_Yetki,
                SeciliIller: v_Sehir
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
                    text: "KULLANICI BİLGİLERİ BAŞARI İLE KAYIT EDİLDİ",
                    icon: "success",
                    dangerMode: false,
                })
                    .then((willDelete) => {
                        window.location.href = 'kullanicitanim.aspx';
                    });


            }
            else
            {
                if (msg.Sonuc == "2") {
                    UyariMesajiVer(msg.Aciklama);
                }
            }

        },
        complete: function () {
            

        }
    });

    
}


function fnSehirListesi() {
    var ddlListe = $("select#listeSehir");

    $.ajax({
        type: "POST",
        url: "api/TanimListeSehir",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                ddlListe.empty(); // Clear the please wait  
              //  ddlListe.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].SehirKodu).html(vYanitDizi[iSayac].SehirAdi));
                }


             

                var BootstrapSelect = function () {

                    //== Private functions
                    var demos = function () {
                        // minimum setup
                        ddlListe.selectpicker();
                    }

                    return {
                        // public functions
                        init: function () {
                            demos();
                        }
                    };
                }();

                jQuery(document).ready(function () {
                    BootstrapSelect.init();
                });


            }

        },
        complete: function () {
            fnModalAc();

        }
    });
}

function fnYetkiTuruListesi()
{
    var ddlListe = $("select#listeYetkiTuru");

    $.ajax({
        type: "POST",
        url: "api/YetkiTuru",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                ddlListe.empty(); // Clear the please wait  
                ddlListe.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].YetkiAdi));
                }
            }

        },
        complete: function () {
            fnSehirListesi();

        }
    });
}

function jsAnaSayfa() {
    window.location.href = "Anasayfa.aspx";
}

function fnModalAc()
{
    $('#m_modal_KullaniciTanim').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });    
}