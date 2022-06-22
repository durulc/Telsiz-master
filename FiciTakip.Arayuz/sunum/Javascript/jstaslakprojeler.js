$(document).ready(function () {

    var fileupload = $("#FileUpload1");
    fileupload.change(function () {

        var v_projeturukayitno = $("#listeProjeTuru").val();


        var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];

        var files = $("#FileUpload1").get(0).files;

        var fileData = new FormData();

        for (var i = 0; i < files.length; i++) {
            fileData.append("fileInput", files[i]);
        }

        $.ajax({
            type: "POST",
            url: "Handler.ashx?ProjeNo=" + v_projeturukayitno,
            dataType: "json",

            //contentType: false, // Not to set any content header

            contentType: false,

            processData: false, // Not to process data
            data: fileData,
            success: function (result, status, xhr) {

                if (result.Sonuc == "1") {

                    if (result.HataliUzanti == "1") {
                        swal({
                            buttons: {
                                confirm: "TAMAM"
                            },
                            title: "HATA",
                            text: "PROJE DOSYASI OLARAK SADECE KML VEYA KMZ UZANTILI DOSYALAR YÜKLEYEBİLİRSİNİZ",
                            icon: "warning",
                            dangerMode: true
                        })
                            .then((willDelete) => {

                            });
                    }

                    else {
                        if (result.KontrolEdilecekmi == "1") {

                            if (result.PolygonVarmi == "1") {
                                if (result.SadecePolygonMuVar == "1") {
                                    BasariliIslem('Dosya başarı ile yüklendi');
                                }
                                else {
                                    swal({
                                        buttons: {
                                            confirm: "TAMAM"
                                        },
                                        title: "UYARI",
                                        text: "DOSYANIZ BAŞARI İLE YÜKLENDİ. ANCAK DOSYA İÇERİSİNDE FARKLI TÜRDE ÇİZİMLER BULUNDU",
                                        icon: "warning",
                                        dangerMode: true
                                    })
                                        .then((willDelete) => {

                                        });
                                }
                            }
                        }
                        else {
                            if (result.KontrolEdilecekmi == "0") {
                                BasariliIslem('Dosya başarı ile yüklendi');
                            }
                        }

                    }

                }
                else {
                    swal({
                        buttons: {
                            confirm: "TAMAM"
                        },
                        title: "HATA",
                        text: "Dosya yükleme işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz",
                        icon: "error",
                        dangerMode: true
                    })
                        .then((willDelete) => {

                        });
                }

            },
            error: function (xhr, status, error) {


            },
            complete: function () {
                jsEkliDosyaBilgisiYazdir();
                //  jsEkliDosyaListele();
            }

        });

    });

    var fileUploadDiger = $("#FileUploadDiger");
    fileUploadDiger.change(function () {

        var v_projeturukayitno = $("#listeProjeTuru").val();

        var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];

        var files = $("#FileUploadDiger").get(0).files;

        var fileData = new FormData();

        for (var i = 0; i < files.length; i++) {
            fileData.append("fileInput", files[i]);
        }

        $.ajax({
            type: "POST",
            url: "handlerdigerdosya.ashx?ProjeNo=" + v_projeturukayitno,
            dataType: "json",

            //contentType: false, // Not to set any content header

            contentType: false,

            processData: false, // Not to process data
            data: fileData,
            success: function (result, status, xhr) {

                if (result.Sonuc == "1") {

                    BasariliIslem('Dosya başarı ile yüklendi');

                }
                else {

                    if (result.Sonuc == "-102") {
                        swal({
                            buttons: {
                                confirm: "TAMAM"
                            },
                            title: "HATA",
                            text: "Sadece " + result.IzinliUzanti + " uzantılı dosyaları yükleyebilirsiniz",
                            icon: "error",
                            dangerMode: true
                        })
                            .then((willDelete) => {

                            });

                    }
                    else {
                        swal({
                            buttons: {
                                confirm: "TAMAM"
                            },
                            title: "HATA",
                            text: "Dosya yükleme işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyiniz",
                            icon: "error",
                            dangerMode: true
                        })
                            .then((willDelete) => {

                            });
                    }
                }

            },
            error: function (xhr, status, error) {


            },
            complete: function () {
                //jsDigerEkliDosyalariYazdir(v_projeturukayitno);
                //  jsEkliDosyaListele();
                fnProjeDosyalariniGetir();
            }

        });

    });



    jsProjeAra();
});



function jsProjeSil(v_SessionGuid) {
    $.ajax({
        type: "POST",
        url: "api/ProjeBilgiSil",

        data: JSON.stringify
            ({
                SessionGuid: v_SessionGuid
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
                    text: "PROJE BİLGİLERİ BAŞARI İLE SİLİNDİ EDİLDİ",
                    icon: "success",
                    dangerMode: false,
                })
                    .then((willDelete) => {
                        window.location.href = 'taslakprojeler.aspx';
                    });


            }
        },
        complete: function () {


        }
    });

}




function jsProjeSilOnay(v_SessionGuid) {
    swal({
        buttons: {
            cancel: "iPTAL",
            confirm: "TAMAM"
        },
        title: "Onay?",
        text: "Projeye ait bilgiler silinecek. Devam etmek istiyor musunuz?",
        icon: "warning",
        dangerMode: false
    })
        .then((willDelete) => {
            if (willDelete) {

                jsProjeSil(v_SessionGuid);
            }
        });
}




function jsTaslakKaydet()
{
    var v_ProjeTuru = $("#listeProjeTuru").val();
    var v_MilletBahcesi = $("#listeMilletBahcesi").val();
    var v_Sehir = $("select#listeSehir").val();
    var v_Ilce = $("select#listeIlce").val();
    var v_Guzergah = $("#txtGuzergahAdi").val();
    var v_BisikletYolYonu = $("select#listeYolYonu").val();
    var v_BisikletYolTuru = $("select#listeBisikletYolTuru").val();
    var v_BYolTuruDigerAciklama = $("#txtYolTuruDiger").val();
    var v_EtapAdi = $("#txtEtapAdi").val();
    var v_VeriKaynak = $("select#listeVeriKaynak").val();
    var v_Entegrasyon = $("select#listeEntegrasyonDurumu").val();
    var v_BakanlikOnayDurumu = $("select#listeBakanlikOnayDurumu").val();
    var v_ProjeDurumu = $("select#listeProjeDurumu").val();
    var v_ProjeDurumuDisplay = $("select#listeProjeDurumu").is(":visible");
    var v_TarihBirDisplay = $("#txtTarihBir").is(":visible");
    var v_TarihBir = $("#txtTarihBir").val();
    var v_TarihIkiDisplay = $("#txtTarihIki").is(":visible");
    var v_TarihIki = $("#txtTarihIki").val();
    var v_IptalGerekce = $("#txtIptalGerekcesi").val();
    var v_MasterPlanDurumu = $("select#listeMasterPlanDurumu").val();
    var v_MasterPlanAciklama = $("#txtMasterPlanAciklama").val();
    var v_MasterPlanEntegrasyon = $("select#listeEntegrayonMasterDurumu").val();
    var v_KesifBedeli = $("#txtKesifBedeli").val();
    var v_SozlesmeBedeli = $("#txtSozlesmeBedeli").val();
    var v_Aciklama = $("#txtAciklama").val();
    var v_ToplamYapimButcesi = $("#txtToplamYapimButcesi").val();
    var v_IhaleMakami = $("select#listeIhaleMakami").val();
    var v_FinansalDestekTurleri = $("select#listeFinansalDestekTuru").val();

    var v_BakanlikHibe = $("#txtBakanlikDestekMiktari").val();
    var v_BakanlikHibeDisplay = $("#txtBakanlikDestekMiktari").is(":visible");

    var v_Ozkaynak = $("#txtOzkaynakMiktari").val();
    var v_OzkaynakDisplay = $("#txtOzkaynakMiktari").is(":visible");

    var v_IlbankKredi = $("#txtIlbankHibeMiktari").val();
    var v_IlbankKrediDisplay = $("#txtIlbankHibeMiktari").is(":visible");

    var v_IpaMiktari = $("#txtIpaMiktari").val();
    var v_IpaMiktariDisplay = $("#txtIpaMiktari").is(":visible");

    var v_KullanilanKredi = $("#txtKrediMiktari").val();
    var v_KullanilanKrediDisplay = $("#txtKrediMiktari").is(":visible");

    var v_DigerKaynak = $("#txtDigerKaynak").val();
    var v_DigerKaynakDisplay = $("#txtDigerKaynak").is(":visible");

    var v_IlbankHibe = $("#txtIlbankHibe").val();
    var v_IlbankHibekDisplay = $("#txtIlbankHibe").is(":visible");

    var v_ToplamUzunluk = $("#txtToplamUzunluk").val();
    var v_KmzDosyaId = $("#txtDosyaId").val();
   


    $.ajax({
        type: "POST",
        url: "api/ProjeVeriGuncelle",
        data: JSON.stringify
            ({
                finansaldestekturleri: v_FinansalDestekTurleri,
                tblprojeturuid: v_ProjeTuru,
                tblmilletbahcesidurumuid: v_MilletBahcesi,
                tblsehirid: v_Sehir,
                tblilceid: v_Ilce,
                tblbisikletyolyonuid: v_BisikletYolYonu,
                tblbisikletyolturuid: v_BisikletYolTuru,
                yolturuaciklama: v_BYolTuruDigerAciklama,
                etapadi: v_EtapAdi,
                guzergahadi: v_Guzergah,
                tblverikaynakid: v_VeriKaynak,
                tblentegrasyondurumid: v_Entegrasyon,
                tblbakanlikonayid: v_BakanlikOnayDurumu,
                tblmasterplandurumuid: v_MasterPlanDurumu,
                masterplandurumuaciklama: v_MasterPlanAciklama,
                tblmasterplanentegrasyonid: v_MasterPlanEntegrasyon,
                tblihalemakamiid: v_IhaleMakami,
                kesifbedeli: v_KesifBedeli,
                sozlesmebedeli: v_SozlesmeBedeli,
                toplambutce: v_ToplamYapimButcesi,
                bakanlikhibe: v_BakanlikHibe,
                ozkaynak: v_Ozkaynak,
                ilbankkredi: v_IlbankKredi,
                ipa: v_IpaMiktari,
                kredi: v_KullanilanKredi,
                digerkaynak: v_DigerKaynak,
                ilbankhibe: v_IlbankHibe,
                tblmevcutprojedurumid: v_ProjeDurumu,
                taslakproje: '1',
                tarihbir: v_TarihBir,
                tarihiki: v_TarihIki,
                toplamuzunluk: v_ToplamUzunluk,
                aciklama: v_Aciklama,
                iptalgerekce: v_IptalGerekce


            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //   debugger;
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
                    text: "Proje verileri başarı ile güncellendi",
                    icon: "success",
                    dangerMode: false
                })
                    .then((willDelete) => {
                        window.location.href = 'taslakprojeler.aspx';
                    });
            }
            else {
                UyariMesajiVer('Sistemsel bir hata oluştu');
            }
        },
        complete: function () {

        }
    });

}

function jsKayitDevam() {
    var v_ProjeTuru = $("#listeProjeTuru").val();
    var v_MilletBahcesi = $("#listeMilletBahcesi").val();
    var v_Sehir = $("select#listeSehir").val();
    var v_Ilce = $("select#listeIlce").val();
    var v_Guzergah = $("#txtGuzergahAdi").val();
    var v_BisikletYolYonu = $("select#listeYolYonu").val();
    var v_BisikletYolTuru = $("select#listeBisikletYolTuru").val();
    var v_BYolTuruDigerAciklama = $("#txtYolTuruDiger").val();
    var v_EtapAdi = $("#txtEtapAdi").val();
    var v_VeriKaynak = $("select#listeVeriKaynak").val();
    var v_Entegrasyon = $("select#listeEntegrasyonDurumu").val();
    var v_BakanlikOnayDurumu = $("select#listeBakanlikOnayDurumu").val();
    var v_ProjeDurumu = $("select#listeProjeDurumu").val();
    var v_ProjeDurumuDisplay = $("select#listeProjeDurumu").is(":visible");
    var v_TarihBirDisplay = $("#txtTarihBir").is(":visible");
    var v_TarihBir = $("#txtTarihBir").val();
    var v_TarihIkiDisplay = $("#txtTarihIki").is(":visible");
    var v_TarihIki = $("#txtTarihIki").val();
    var v_IptalGerekce = $("#txtIptalGerekcesi").val();
    var v_MasterPlanDurumu = $("select#listeMasterPlanDurumu").val();
    var v_MasterPlanAciklama = $("#txtMasterPlanAciklama").val();
    var v_MasterPlanEntegrasyon = $("select#listeEntegrayonMasterDurumu").val();
    var v_KesifBedeli = $("#txtKesifBedeli").val();
    var v_SozlesmeBedeli = $("#txtSozlesmeBedeli").val();
    var v_Aciklama = $("#txtAciklama").val();
    var v_ToplamYapimButcesi = $("#txtToplamYapimButcesi").val();
    var v_IhaleMakami = $("select#listeIhaleMakami").val();
    var v_FinansalDestekTurleri = $("select#listeFinansalDestekTuru").val();

    var v_BakanlikHibe = $("#txtBakanlikDestekMiktari").val();
    var v_BakanlikHibeDisplay = $("#txtBakanlikDestekMiktari").is(":visible");

    var v_Ozkaynak = $("#txtOzkaynakMiktari").val();
    var v_OzkaynakDisplay = $("#txtOzkaynakMiktari").is(":visible");

    var v_IlbankKredi = $("#txtIlbankHibeMiktari").val();
    var v_IlbankKrediDisplay = $("#txtIlbankHibeMiktari").is(":visible");

    var v_IpaMiktari = $("#txtIpaMiktari").val();
    var v_IpaMiktariDisplay = $("#txtIpaMiktari").is(":visible");

    var v_KullanilanKredi = $("#txtKrediMiktari").val();
    var v_KullanilanKrediDisplay = $("#txtKrediMiktari").is(":visible");

    var v_DigerKaynak = $("#txtDigerKaynak").val();
    var v_DigerKaynakDisplay = $("#txtDigerKaynak").is(":visible");

    var v_IlbankHibe = $("#txtIlbankHibe").val();
    var v_IlbankHibekDisplay = $("#txtIlbankHibe").is(":visible");

    var v_ToplamUzunluk = $("#txtToplamUzunluk").val();
    var v_KmzDosyaId = $("#txtDosyaId").val();
    var v_KmzDosyaAdi = $("#lblYaziBir").val();
   

    // Boşluk Kontrol
    // Millet Bahçesi projesi ise kontrol 
    if (v_MilletBahcesi == '1') {

        if (v_BakanlikHibeDisplay == true)
        {
            //if (v_BakanlikHibe.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen BAKANLIK HİBE MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtBakanlikDestekMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_OzkaynakDisplay == true)
        {
            //if (v_Ozkaynak.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen ÖZKAYNAK MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtOzkaynakMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_IlbankKrediDisplay == true)
        {
            //if (v_IlbankKredi.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen İLBANK KREDİ MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtIlbankHibeMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_IpaMiktariDisplay == true)
        {
        //    if (v_IpaMiktari.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen İPA MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtIpaMiktari").focus();
        //            });

        //        return false;
        //    }
        }

        if (v_KullanilanKrediDisplay == true)
        {
            //if (v_KullanilanKredi.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen KULLANILAN KREDİ MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtKrediMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_DigerKaynakDisplay == true)
        {
            //if (v_DigerKaynak.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen DİĞER KAYNAK MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtDigerKaynak").focus();
            //        });

            //    return false;
            //}
        }

        if (v_IlbankHibekDisplay == true)
        {
            //if (v_IlbankHibe.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen İLBANK HİBE MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtIlbankHibe").focus();
            //        });

            //    return false;
            //}
        }

        if (v_BisikletYolTuru == "8")
        {
            //if (v_BYolTuruDigerAciklama.length <= 5) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen AÇIKLAMA bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtYolTuruDiger").focus();
            //        });

            //    return false;
            //}
        }

        if (v_VeriKaynak == '0')
        {
            swal({
                buttons: {
                    confirm: "TAMAM"
                },
                title: "UYARI",
                html: true,
                text: "Lütfen VERİ KAYNAĞI bilgisi seçiniz",
                icon: "warning",
                dangerMode: true
            })
                .then((willDelete) => {
                    $("select#listeVeriKaynak").focus();
                });

            return false;
        }

        if (v_ProjeDurumuDisplay == true) {

            if (v_ProjeDurumu == '0') {


                swal({
                    buttons: {
                        confirm: "TAMAM"
                    },
                    title: "UYARI",
                    html: true,
                    text: "Lütfen PROJE DURUMU bilgisi seçiniz",
                    icon: "warning",
                    dangerMode: true
                })
                    .then((willDelete) => {
                        $("select#listeProjeDurumu").focus();
                    });

                return false;
            }
        }

        if (v_TarihBirDisplay == true) {
            //if (v_TarihBir.length <= 5) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen TARİH bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtTarihBir").focus();
            //        });

            //    return false;
            //}

        }

        if (v_TarihIkiDisplay == true) {
            //if (v_TarihIki.length <= 5) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen TARİH bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtTarihIki").focus();
            //        });

            //    return false;
            //}

        }

        if (v_ProjeDurumu == '6') {
            if (v_IptalGerekce.length <= 5) {
                swal({
                    buttons: {
                        confirm: "TAMAM"
                    },
                    title: "UYARI",
                    html: true,
                    text: "Lütfen İPTAL GEREKÇESİ bilgisi giriniz",
                    icon: "warning",
                    dangerMode: true
                })
                    .then((willDelete) => {
                        $("#txtIptalGerekcesi").focus();
                    });

                return false;
            }
        }
    }

    // Millet bahçesinden bağımsız proje
    if (v_MilletBahcesi == '2') {
        if (v_BakanlikHibeDisplay == true) {
            //if (v_BakanlikHibe.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen BAKANLIK HİBE MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtBakanlikDestekMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_OzkaynakDisplay == true) {
            //if (v_Ozkaynak.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen ÖZKAYNAK MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtOzkaynakMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_IlbankKrediDisplay == true) {
            //if (v_IlbankKredi.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen İLBANK KREDİ MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtIlbankHibeMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_IpaMiktariDisplay == true) {
            //if (v_IpaMiktari.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen İPA MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtIpaMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_KullanilanKrediDisplay == true) {
            //if (v_KullanilanKredi.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen KULLANILAN KREDİ MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtKrediMiktari").focus();
            //        });

            //    return false;
            //}
        }

        if (v_DigerKaynakDisplay == true) {
            //if (v_DigerKaynak.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen DİĞER KAYNAK MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtDigerKaynak").focus();
            //        });

            //    return false;
            //}
        }

        if (v_IlbankHibekDisplay == true) {
            //if (v_IlbankHibe.length <= 2) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen DİĞER KAYNAK MİKTARI (₺) bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtDigerKaynak").focus();
            //        });

            //    return false;
            //}
        }
        if (v_ProjeTuru == '1' || v_ProjeTuru == '4') {

            //if (v_BisikletYolYonu == '0') {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen BİSİKLET YOLU YÖNÜ bilgisi seçiniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("select#listeYolYonu").focus();
            //        });

            //    return false;
            //}

            //if (v_BisikletYolTuru == '0') {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen BİSİKLET YOLU TÜRÜ bilgisi seçiniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("select#listeBisikletYolTuru").focus();
            //        });

            //    return false;
            //}

            if (v_BisikletYolTuru == '8') {

                //if (v_BYolTuruDigerAciklama.length <= 3) {
                //    swal({
                //        buttons: {
                //            confirm: "TAMAM"
                //        },
                //        title: "UYARI",
                //        html: true,
                //        text: "Lütfen BİSİKLET YOLU TÜRÜ AÇIKLAMA bilgisi giriniz",
                //        icon: "warning",
                //        dangerMode: true
                //    })
                //        .then((willDelete) => {
                //            $("#txtYolTuruDiger").focus();
                //        });

                //    return false;
                //}
            }

            if (v_MasterPlanDurumu == '0') {
                //swal({
                //    buttons: {
                //        confirm: "TAMAM"
                //    },
                //    title: "UYARI",
                //    html: true,
                //    text: "Lütfen MASTER PLAN DURUMU bilgisi seçiniz",
                //    icon: "warning",
                //    dangerMode: true
                //})
                //    .then((willDelete) => {
                //        $("select#listeMasterPlanDurumu").focus();
                //    });

                //return false;
            }

            if (v_MasterPlanDurumu == '1') {
                //if (v_MasterPlanEntegrasyon == '0') {
                //    swal({
                //        buttons: {
                //            confirm: "TAMAM"
                //        },
                //        title: "UYARI",
                //        html: true,
                //        text: "Lütfen MASTER PLAN BİSİKLET YOLU ENTEGRASYONU bilgisi seçiniz",
                //        icon: "warning",
                //        dangerMode: true
                //    })
                //        .then((willDelete) => {
                //            $("select#listeEntegrayonMasterDurumu").focus();
                //        });

                //    return false;
                //}
            }

            if (v_Entegrasyon == '0') {
                //swal({
                //    buttons: {
                //        confirm: "TAMAM"
                //    },
                //    title: "UYARI",
                //    html: true,
                //    text: "Lütfen ENTEGRASYON bilgisi seçiniz",
                //    icon: "warning",
                //    dangerMode: true
                //})
                //    .then((willDelete) => {
                //        $("select#listeEntegrasyonDurumu").focus();
                //    });

                //return false;
            }
        }

        if (v_VeriKaynak == '0') {
            //swal({
            //    buttons: {
            //        confirm: "TAMAM"
            //    },
            //    title: "UYARI",
            //    html: true,
            //    text: "Lütfen VERİ KAYNAĞI bilgisi seçiniz",
            //    icon: "warning",
            //    dangerMode: true
            //})
            //    .then((willDelete) => {
            //        $("select#listeVeriKaynak").focus();
            //    });

            //return false;
        }

        if (v_BakanlikOnayDurumu == '0') {
            //if (v_MilletBahcesi == '2') {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen BAKANLIK ONAY DURUMU bilgisi seçiniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("select#listeBakanlikOnayDurumu").focus();
            //        });

            //    return false;
            //}
        }

        if (v_ProjeDurumu == '0') {
            //swal({
            //    buttons: {
            //        confirm: "TAMAM"
            //    },
            //    title: "UYARI",
            //    html: true,
            //    text: "Lütfen PROJE DURUMU bilgisi seçiniz",
            //    icon: "warning",
            //    dangerMode: true
            //})
            //    .then((willDelete) => {
            //        $("select#listeProjeDurumu").focus();
            //    });

            //return false;
        }

        if (v_ProjeDurumu == '6') {
            if (v_IptalGerekce.length <= 5) {
                swal({
                    buttons: {
                        confirm: "TAMAM"
                    },
                    title: "UYARI",
                    html: true,
                    text: "Lütfen İPTAL GEREKÇESİ bilgisi giriniz",
                    icon: "warning",
                    dangerMode: true
                })
                    .then((willDelete) => {
                        $("#txtIptalGerekcesi").focus();
                    });

                return false;
            }
        }

        if (v_TarihBirDisplay == true) {
            //if (v_TarihBir.length <= 5) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen TARİH bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtTarihBir").focus();
            //        });

            //    return false;
            //}

        }

        if (v_TarihIkiDisplay == true) {
            //if (v_TarihIki.length <= 5) {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen TARİH bilgisi giriniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("#txtTarihIki").focus();
            //        });

            //    return false;
            //}

        }

        if (v_ToplamUzunluk.length <= 1) {
            swal({
                buttons: {
                    confirm: "TAMAM"
                },
                title: "UYARI",
                html: true,
                text: "Lütfen TOPLAM UZUNLUK (KM) bilgisi giriniz",
                icon: "warning",
                dangerMode: true
            })
                .then((willDelete) => {
                    $("#txtToplamUzunluk").focus();
                });

            return false;
        }

        if (v_KmzDosyaAdi.length <= 0) {
            swal({
                buttons: {
                    confirm: "TAMAM"
                },
                title: "UYARI",
                html: true,
                text: "Lütfen projeye ait KML/ KMZ DOSYASI yükleyiniz",
                icon: "warning",
                dangerMode: true
            })
                .then((willDelete) => {
                    $("#txtDosyaAdi").focus();
                });

            return false;
        }
    }

    $.ajax({
        type: "POST",
        url: "api/ProjeVeriGuncelle",
        data: JSON.stringify
            ({
                finansaldestekturleri: v_FinansalDestekTurleri,
                tblprojeturuid: v_ProjeTuru,
                tblmilletbahcesidurumuid: v_MilletBahcesi,
                tblsehirid: v_Sehir,
                tblilceid: v_Ilce,
                tblbisikletyolyonuid: v_BisikletYolYonu,
                tblbisikletyolturuid: v_BisikletYolTuru,
                yolturuaciklama: v_BYolTuruDigerAciklama,
                etapadi: v_EtapAdi,
                guzergahadi: v_Guzergah,
                tblverikaynakid: v_VeriKaynak,
                tblentegrasyondurumid: v_Entegrasyon,
                tblbakanlikonayid: v_BakanlikOnayDurumu,
                tblmasterplandurumuid: v_MasterPlanDurumu,
                masterplandurumuaciklama: v_MasterPlanAciklama,
                tblmasterplanentegrasyonid: v_MasterPlanEntegrasyon,
                tblihalemakamiid: v_IhaleMakami,
                kesifbedeli: v_KesifBedeli,
                sozlesmebedeli: v_SozlesmeBedeli,
                toplambutce: v_ToplamYapimButcesi,
                bakanlikhibe: v_BakanlikHibe,
                ozkaynak: v_Ozkaynak,
                ilbankkredi: v_IlbankKredi,
                ipa: v_IpaMiktari,
                kredi: v_KullanilanKredi,
                digerkaynak: v_DigerKaynak,
                ilbankhibe: v_IlbankHibe,
                tblmevcutprojedurumid: v_ProjeDurumu,
                taslakproje: '0',
                tarihbir: v_TarihBir,
                tarihiki: v_TarihIki,
                toplamuzunluk: v_ToplamUzunluk,
                aciklama: v_Aciklama,
                iptalgerekce: v_IptalGerekce


            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //   debugger;
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
                    text: "Proje verileri başarı ile güncellendi",
                    icon: "success",
                    dangerMode: false
                })
                    .then((willDelete) => {
                        window.location.href = 'tumprojeler.aspx';
                    });
            }
            else {
                UyariMesajiVer('Sistemsel bir hata oluştu');
            }
        },
        complete: function () {

        }
    });

}

function jsProjeKaydetTamamla() {
    swal({
        buttons: {
            cancel: "iPTAL",
            confirm: "TAMAM"
        },
        title: "Onay?",
        text: "Projeye ait bilgiler güncellenecek. Devam etmek istiyor musunuz?",
        icon: "warning",
        dangerMode: false
    })
        .then((willDelete) => {
            if (willDelete) {

                jsKayitDevam();
            }
        });
}

function jsFileUploadAc() {

    swal({
        buttons: {
            cancel: "iPTAL",
            confirm: "TAMAM"
        },
        title: "Onay?",
        text: "Projeye ait kml/kmz dosyasını değiştirmek istediğinize emin misiniz ?",
        icon: "warning",
        dangerMode: false
    })
        .then((willDelete) => {

            if (willDelete) {
                var fileupload = $("#FileUpload1");

                fileupload.click();
            }
        });




}

function jsProjeDosyasiIndir() {
    var v_Link = $("#dosyalink");



    if (v_Link != null) {
        // v_Link.click();
        v_Link.find('span').trigger("click");
    }
}

function jsYukleDigerDosyalar() {

    $.ajax({
        type: "POST",
        url: "api/ToplamDosyaSayisi",
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
                var fileuploadDiger = $("#FileUploadDiger");

                fileuploadDiger.click();
            }
            else {
                if (msg.Sonuc == "-2") {

                    swal({
                        buttons: {
                            confirm: "TAMAM"
                        },
                        title: "UYARI",
                        text: "SİSTEME YÜKLEYEBİLECEĞİNİZ DOSYA SAYISI SINIRINA ULAŞTINIZ",
                        icon: "warning",
                        dangerMode: true
                    })
                        .then((willDelete) => {

                        });

                    return false;

                }
            }
        },
        complete: function () {

        }
    });
}

function fnProjeBilgileriYukle() {

    $.ajax({
        type: "POST",
        url: "api/ProjeFromSessionBilgileri",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {


        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.Sonuc == "1")
            {
                var v_ProjeTuru = msg.ProjeTurId;
                var v_MilletBahcesi = msg.tblmilletbahcesidurumuid;

                $("#listeProjeTuru").val(v_ProjeTuru);
                $("#listeMilletBahcesi").val(v_MilletBahcesi);




                if (v_ProjeTuru == '1' || v_ProjeTuru == '4') {
                    $(".divBisiklet").show();
                }
                else {
                    $(".divBisiklet").hide();
                }

               
                if (v_MilletBahcesi == '1') {
                    $("#basic-alan03").hide();
                    $("#basic-alan04").hide();
                    $("#basic-alan11").hide();
                    $("#basic-alan12").hide();
                    $("#basic-alan17").hide();
                    $("#basic-alan18").hide();
                    $("#basic-alan25").hide();
                    $("#basic-alan26").hide();
                    $("#basic-alan27").hide();
                }
                else {
                    $("#basic-alan03").show();
                    $("#basic-alan04").show();
                    $("#basic-alan11").show();
                    $("#basic-alan12").show();
                    $("#basic-alan17").show();
                    $("#basic-alan18").show();
                    $("#basic-alan25").show();
                    $("#basic-alan26").show();
                    $("#basic-alan27").show();
                }


                // Verileri Ekrana Yaz
                $("#txtProjeTuru").val(msg.ProjeTuru);
                $("#listeProjeTuru").val(msg.tblmilletbahcesidurumuid);
                $("#listeProjeTuru").val(msg.ProjeTurId);
                $("#txtMilletBahcesiDurumu").val(msg.MilletBahcesiEntegrasyon);
                $("select#listeSehir").val(msg.tblsehirid);
                IlceListesiGetir(msg.tblilceid);
                $("select#listeYolYonu").val(msg.tblbisikletyolyonuid);
                $("select#listeBisikletYolTuru").val(msg.tblbisikletyolturuid);
                jsYolTuruDigerPanelAcKapa();
                $("#txtGuzergahAdi").val(msg.guzergahadi);
                $("#txtYolTuruDiger").val(msg.yolturuaciklama);
                $("#txtEtapAdi").val(msg.etapadi);
                $("select#listeVeriKaynak").val(msg.tblverikaynakid);
                $("select#listeEntegrasyonDurumu").val(msg.tblentegrasyondurumid);
                $("select#listeBakanlikOnayDurumu").val(msg.tblbakanlikonayid);
                $("select#listeProjeDurumu").val(msg.tblmevcutprojedurumid);
                TarihTurYazi(msg.tahminibitistarihi, msg.projebitistarihi, msg.projebaslangictarihi, msg.tahminibaslangictarihi, msg.iptalgerekce);

                $("select#listeMasterPlanDurumu").val(msg.tblmasterplandurumuid);

                jsEntegrasyonDurumuSor();

                $("#txtMasterPlanAciklama").val(msg.masterplandurumuaciklama);
                $("select#listeEntegrayonMasterDurumu").val(msg.tblmasterplanentegrasyonid);

                $("#txtKesifBedeli").val(msg.kesifbedeli);

                $("#txtSozlesmeBedeli").val(msg.sozlesmebedeli);

                $("#txtToplamYapimButcesi").val(msg.toplambutce);

                $("select#listeIhaleMakami").val(msg.tblihalemakamiid);

                $('#lblKmlLinki').html(msg.dosyalinki);
                //$('#txtDosyaAdi').val(msg.dosyaadi);

                // Finansal Destek
                var deger = msg.destekturleri;

                const degerDizi = [];

                var parcala = deger.split(",");

                for (i = 0; i < parcala.length; i++) {
                    degerDizi.push(parcala[i]);
                }

                var cars = [1, 6, 3, 4, 5];
                $("select#listeFinansalDestekTuru").val(degerDizi);
                jsButceKalemiAc();

                $("#txtBakanlikDestekMiktari").val(msg.bakanlikhibe);
                $("#txtOzkaynakMiktari").val(msg.ozkaynak);
                $("#txtIlbankHibeMiktari").val(msg.ilbankkredi);
                $("#txtIpaMiktari").val(msg.ipa);
                $("#txtKrediMiktari").val(msg.kredi);
                $("#txtDigerKaynak").val(msg.digerkaynak);
                $("#txtIlbankHibe").val(msg.ilbankhibe);
                $("#txtToplamUzunluk").val(msg.toplamuzunluk);
                $("#txtAciklama").val(msg.aciklama);
            }
        },
        complete: function () {

            fnProjeDosyalariniGetir();
            //fnDetayModalAc();
        }
    });
}

function fnProjeDosyalariniGetir() {
    $.ajax({
        type: "POST",
        url: "api/DigerDosyaBilgisi",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#tabloEkliDosyalar tbody").html('');
        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {



            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    content += '<tr>';
                    content += "<td style='text-align: center;'><a href=# onclick = \"jsYukluDigerDosyaSil('" + vYanitDizi[iSayac].Ticket + "','" + vYanitDizi[iSayac].TabloId + "','" + vYanitDizi[iSayac].DosyaAdi + "')\";>Dosyayı Sil</a></td>";
                    content += "<td style='text-align:right'>" + vSayac + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].DosyaLink + " </td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].Uzanti + "</td>";
                    content += "</tr>";

                    vSayac = vSayac + 1;
                }

                $('#tabloEkliDosyalar tbody').html(content);
            }
        },
        complete: function () {
            //burası
            fnDetayModalAc();

        }
    });

}

function jsLogKapat() {


    $('#m_modal_log').modal('hide');
}

function jsKayitGecmisi(v_SessionGuid) {


    $.ajax({
        type: "POST",
        url: "api/ProjeLogBilgileri",

        data: JSON.stringify
            ({
                SessionGuid: v_SessionGuid
            }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#tabloLogBilgileri tbody").html('');
        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {
            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    content += '<tr>';
                    content += "<td style='text-align:right'>" + vSayac + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].IslemAciklama + " </td>";
                    content += "<td>" + vYanitDizi[iSayac].IslemTarihi + " </td>";
                    content += "<td>" + vYanitDizi[iSayac].IslemYapanKullanici + " </td>";
                    content += "</tr>";

                    vSayac = vSayac + 1;
                }

                $('#tabloLogBilgileri tbody').html(content);
            }
        },
        complete: function () {

            $('#m_modal_log').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });
        }
    });












}

function jsTarihTurYazilariniYaz() {
    var varSeciliId = $("select#listeProjeDurumu").val();

    $(".iptalPaneli").hide();

    //SEÇİNİZ
    if (varSeciliId == '0') {

        $(".divTarihBir").hide();
        $(".divTarihIki").hide();


        $('#lblTarihBir').html('PROJE BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('PROJE BİTİŞ TARİHİ');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:block");
    }


    // KULLANIMDA
    if (varSeciliId == '1') {
        $(".divTarihBir").show();
        $(".divTarihIki").show();

        $('#lblTarihBir').html('PROJE BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('PROJE BİTİŞ TARİHİ');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:block");
    }


    // YAPIMI DEVAM ETMEKTE
    if (varSeciliId == '2') {
        $(".divTarihBir").show();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('TAHMİNİ BİTİŞ TARİHİ');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:none");
    }


    // İHALE AŞAMASINDA
    if (varSeciliId == '3') {
        $(".divTarihBir").show();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('TAHMİNİ BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:none");
    }


    // PROJELENDİRME AŞAMASINDA
    if (varSeciliId == '4') {
        $(".divTarihBir").show();
        $(".divTarihIki").hide();


        $('#lblTarihBir').html('TAHMİNİ BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:none");
    }

    // KOMİSYON DEĞERLENDİRME AŞAMASINDA
    if (varSeciliId == '5') {


        $(".divTarihBir").hide();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('&nbsp;');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", true);
        $("#txtTarihBir").attr("style", "display:none");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", true);
        $("#txtTarihIki").attr("style", "display:none");
    }



    // İPTAL EDİLDİ
    if (varSeciliId == '6') {
        $(".iptalPaneli").show();

        $(".divTarihBir").hide();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('&nbsp;');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", true);
        $("#txtTarihBir").attr("style", "display:none");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", true);
        $("#txtTarihIki").attr("style", "display:none");
    }


}

function TarihTurYazi(tahminibitistarihi, projebitistarihi, projebaslangictarihi, tahminibaslangictarihi, iptalgerekce) {
    var varSeciliId = $("select#listeProjeDurumu").val();

    $(".iptalPaneli").hide();

    //SEÇİNİZ
    if (varSeciliId == '0') {

        $(".divTarihBir").hide();
        $(".divTarihIki").hide();


        $('#lblTarihBir').html('PROJE BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('PROJE BİTİŞ TARİHİ');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:block");
    }


    // KULLANIMDA
    if (varSeciliId == '1') {
        $(".divTarihBir").show();
        $(".divTarihIki").show();

        $('#lblTarihBir').html('PROJE BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val(projebaslangictarihi);
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('PROJE BİTİŞ TARİHİ');
        $("#txtTarihIki").val(projebitistarihi);
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:block");
    }


    // YAPIMI DEVAM ETMEKTE
    if (varSeciliId == '2') {
        $(".divTarihBir").show();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('TAHMİNİ BİTİŞ TARİHİ');
        $("#txtTarihBir").val(tahminibitistarihi);
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:none");
    }


    // İHALE AŞAMASINDA
    if (varSeciliId == '3') {
        $(".divTarihBir").show();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('TAHMİNİ BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val(tahminibaslangictarihi);
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:none");
    }


    // PROJELENDİRME AŞAMASINDA
    if (varSeciliId == '4') {
        $(".divTarihBir").show();
        $(".divTarihIki").hide();


        $('#lblTarihBir').html('TAHMİNİ BAŞLANGIÇ TARİHİ');
        $("#txtTarihBir").val(tahminibaslangictarihi);
        $("#txtTarihBir").prop("disabled", false);
        $("#txtTarihBir").attr("style", "display:block");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", false);
        $("#txtTarihIki").attr("style", "display:none");
    }

    // KOMİSYON DEĞERLENDİRME AŞAMASINDA
    if (varSeciliId == '5') {


        $(".divTarihBir").hide();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('&nbsp;');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", true);
        $("#txtTarihBir").attr("style", "display:none");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');
        $("#txtTarihIki").prop("disabled", true);
        $("#txtTarihIki").attr("style", "display:none");
    }



    // İPTAL EDİLDİ
    if (varSeciliId == '6') {
        $(".iptalPaneli").show();

        $(".divTarihBir").hide();
        $(".divTarihIki").hide();

        $('#lblTarihBir').html('&nbsp;');
        $("#txtTarihBir").val('');
        $("#txtTarihBir").prop("disabled", true);
        $("#txtTarihBir").attr("style", "display:none");


        $('#lblTarihIki').html('&nbsp;');
        $("#txtTarihIki").val('');

        $("#txtTarihIki").prop("disabled", true);
        $("#txtTarihIki").attr("style", "display:none");

        $("#txtIptalGerekcesi").val(iptalgerekce);
    }


}

function jsEntegrasyonDurumuSor() {

    var varSeciliId = $("select#listeMasterPlanDurumu").val();
    $("#listeEntegrayonMasterDurumu").val('0');

    if (varSeciliId == '0' || varSeciliId == '2') {
        $(".divEntegrasyon").hide();
    }


    if (varSeciliId == '1') {
        $(".divEntegrasyon").show();
        $("#listeEntegrayonMasterDurumu").val('0');
    }

}

function jsYolTuruDigerPanelAcKapa() {
    var v_projeturukayitno = $("select#listeBisikletYolTuru").val();

    $("#txtYolTuruDiger").val('');

    if (v_projeturukayitno == "8") {
        $(".yolTuruDiger").show();
    }

    else {
        $(".yolTuruDiger").hide();
    }

}

function jsButceKalemiAc() {

    var vSeciliDegerler = $("#listeFinansalDestekTuru").val();

    //Bakanlık Hibe divParaBir
    if (vSeciliDegerler.indexOf("1") == "-1") {
        $('.divParaBir').hide();
        $('#txtBakanlikDestekMiktari').val('');
    }

    else {
        $('.divParaBir').show();
    }

    //Özkaynak Hibe divParaIki
    if (vSeciliDegerler.indexOf("2") == "-1") {
        $('.divParaIki').hide();
        $('#txtOzkaynakMiktari').val('');
    }

    else {
        $('.divParaIki').show();
    }

    //İlbank Hibe divParaUc
    if (vSeciliDegerler.indexOf("3") == "-1") {
        $('.divParaUc').hide();
        $('#txtIlbankHibeMiktari').val('');
    }

    else {
        $('.divParaUc').show();
    }

    //İpa divParaDort
    if (vSeciliDegerler.indexOf("4") == "-1") {
        $('.divParaDort').hide();
        $('#txtIpaMiktari').val('');
    }

    else {
        $('.divParaDort').show();
    }

    //Kredi divParaBes
    if (vSeciliDegerler.indexOf("5") == "-1") {
        $('.divParaBes').hide();
        $('#txtKrediMiktari').val('');
    }

    else {
        $('.divParaBes').show();
    }

    //Diğer Kaynak divParaAlti
    if (vSeciliDegerler.indexOf("6") == "-1") {
        $('.divParaAlti').hide();
        $('#txtDigerKaynak').val('');
    }

    else {
        $('.divParaAlti').show();
    }

    //İlbank Hibe  divParaYedi
    if (vSeciliDegerler.indexOf("7") == "-1") {
        $('.divParaYedi').hide();
        $('#txtIlbankHibe').val('');
    }

    else {
        $('.divParaYedi').show();
    }
}


function jsProjeAra()
{
    var v_ProjeTuru = '-1';

    var v_Sehir = '-1';

    var v_KayitTuru = '1';

    if (v_ProjeTuru == '0') {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            html: true,
            text: "Lütfen PROJE TÜRÜ bilgisi seçiniz",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {
                $("select#listeAramaProjeTuru").focus();
            });

        return false;
    }

    if (v_Sehir == '0') {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            html: true,
            text: "Lütfen ŞEHİR bilgisi seçiniz",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {
                $("select#listeAramaSehir").focus();
            });

        return false;
    }

    $.ajax({
        type: "POST",
        url: "api/ProjeListele",

        data: JSON.stringify
            ({
                SehirId: v_Sehir,
                ProjeTurId: v_ProjeTuru,
                KayitTuru: v_KayitTuru,
                ProjeDurum:'-1'
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {


            if ($.fn.dataTable.isDataTable('#m_table_1')) {
                table = $('#m_table_1').DataTable();

                table.clear();
                table.destroy();
            }

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Proje;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    content += '<tr>';
                    content += "<td style='text-align:right'>" + vSayac + "</td>";
                    content += "<td style='display: none!important;'>" + vYanitDizi[iSayac].SessionGuid + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].ProjeTurAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].SehirAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].ProjeAdi + "</td>";
                    content += "<td style='text-align:center'></td>";
                    content += "</tr>";

                    vSayac = vSayac + 1;
                }

                $('#m_table_1 tbody').html(content);
            }
        },
        complete: function () {

            $('#m_table_1').DataTable({
                paging: true,
                searching: false,

                lengthMenu: [5, 10, 15],

                columnDefs: [
                    {
                        targets: -1,
                        data: 'name',
                        title: '',
                        orderable: false,
                        render: function (data, type, full, meta) {



                            return `
                        <span class="dropdown" style='cursor:pointer !important;'>
                            <a href="#" style='cursor:pointer !important;' class="btn m-btn m-btn--hover-success m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="jsProjeGoruntuleGuncelle('`+ full[1] + `');"><i class="la la-edit"></i>Bilgileri Görüntüle</a>
                                <a class="dropdown-item" href="#" onclick="jsKayitGecmisi('`+ full[1] + `');"><i class="la la-history"></i>Kayıt Bilgileri</a>
                                <a class="dropdown-item" href="#" onclick="jsProjeSilOnay('`+ full[1] + `');"><i class="la la-remove"></i>Projeyi Sil</a>
                            </div>
                        </span>
                        `;
                        },
                    }],
            });

            fnModalAc();   
        }
    });


}

function jsProjeGoruntuleGuncelle(v_SessionGuid) {

    UploadSessionOlustur(v_SessionGuid);
    //BisikletYolTuruListele();

}

function UploadSessionOlustur(v_SessionGuid) {

    $.ajax({
        type: "POST",
        url: "api/ReloadGuid",
        data: JSON.stringify
            ({
                SessionGuid: v_SessionGuid
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.Sonuc == '1') {

                $('#txtSozlesmeBedeli').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtKesifBedeli').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtToplamYapimButcesi').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtBakanlikDestekMiktari').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtOzkaynakMiktari').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtIpaMiktari').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtKrediMiktari').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtDigerKaynak').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtIlbankHibe').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtIlbankHibeMiktari').mask('000.000.000.000.000,00', { reverse: true });
               // $('#txtToplamUzunluk').mask('000.000.000.000.000,00', { reverse: true });
                $('#txtDosyaUzunluk').mask('000.000.000.000.000,00', { reverse: true });
            }
            else {
                UyariMesajiVer('Sistemsel bir hata oluştu');
            }

        },
        complete: function () {
            // BisikletYolTuruListele();
            jsSehirYukle();
        }
    });
}

function DestekTuruListele() {

    var ddlListe = $("select#listeFinansalDestekTuru");

    $.ajax({
        type: "POST",
        url: "api/DestekTuruListe",
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
                //ddlListe.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].DestekAdi));
                }

                var BootstrapSelect = function () {

                    //== Private functions
                    var demos = function () {
                        // minimum setup
                        $('.m_selectpicker').selectpicker();
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
            BaslangicAyarlari();
            //VerileriYukle();

            //fnDetayModalAc();

            //jsDigerEkliDosyalariYazdir();
        }
    });
}

function jsSehirYukle() {
    var ddlListe = $("select#listeSehir");

    $.ajax({
        type: "POST",
        url: "api/SehirListe",
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
                //ddlListe.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].SehirKodu).html(vYanitDizi[iSayac].SehirAdi));
                }
            }

        },
        complete: function () {
            BisikletYolTuruListele();
        }
    });
}

function IlceListesiGetir(v_tblilceid) {
    var v_sehirkodu = $("select#listeSehir").val();

    var ddlListe = $("select#listeIlce");

    $.ajax({
        type: "POST",
        url: "api/IlceListele",

        data: JSON.stringify
            ({
                tblsehirid: v_sehirkodu
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
                var vYanitDizi = msg.Dizi;

                ddlListe.empty(); // Clear the please wait  
                //ddlListe.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].IlceAdi));
                }
            }

        },
        complete: function () {

            ddlListe.val(v_tblilceid);
        }
    });

}

function BaslangicAyarlari() {
    $("#txtTarihBir").datepicker({
        todayHighlight: true,
        weekStart: 1,
        orientation: "bottom left",
        autoclose: true,
        language: 'tr'
    });

    $("#txtTarihIki").datepicker({
        todayHighlight: true,
        weekStart: 1,
        orientation: "bottom left",
        autoclose: true,
        language: 'tr'
    });



    $(".iptalPaneli").hide();

    $(".divEntegrasyon").hide();

    $(".divTarihBir").hide();
    $(".divTarihIki").hide();

    $(".divParaBir").hide();
    $(".divParaIki").hide();
    $(".divParaUc").hide();
    $(".divParaDort").hide();
    $(".divParaBes").hide();
    $(".divParaAlti").hide();
    $(".divParaYedi").hide();

    $(".yolTuruDiger").hide();

   

    $("#txtDosyaId").hide();
    $("#txtDosyaIdDevam").hide();

  


    //  $("#divVeriler").scrollIntoView();

    //fnDetayModalAc();    
    fnProjeBilgileriYukle();
}

function jsDigerEkliDosyalariYazdir() {
    $.ajax({
        type: "POST",
        url: "api/DigerDosyaBilgisi",

        data: "{}",

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#tabloEkliDosyalar tbody").html('');
        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            //var obj = JSON.parse(msg.d);

            //if (obj.Sonuc == "1") {

            //    $("#tabloEkliDosyalar tbody").html(obj.TabloYazisi);
            //}

            if (msg.Sonuc == "1") {
                var vYanitDizi = msg.Dizi;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    content += '<tr>';
                    content += "<td style='text-align: center;'><a href=# onclick = \"jsYukluDigerDosyaSil('" + vYanitDizi[iSayac].TabloId + "','" + vYanitDizi[iSayac].TabloId + "','" + vYanitDizi[iSayac].DosyaAdi + "')\";>Dosyayı Sil</a></td>";
                    content += "<td style='text-align:right'>" + vSayac + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].DosyaAdi + " </td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].Uzanti + "</td>";
                    content += "</tr>";

                    vSayac = vSayac + 1;
                }

                $('#tabloEkliDosyalar tbody').html(content);
            }
        },
        complete: function () {
            //burası
            //fnDetayModalAc();

        }
    });
}

function jsEkliDosyaBilgisiYazdir(v_tblprojeturuid) {
    $.ajax({
        type: "POST",
        url: "api/EkliDosyaBilgiiListele",

        data: JSON.stringify
            ({
                ProjeTuruId: v_tblprojeturuid
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

                $("#txtDosyaAdi").val(msg.DosyaAdi);

                $("#txtDosyaUzunluk").val(msg.DosyaUzunluk);

                $("#txtDosyaId").val(msg.TabloId);
            }

        },
        complete: function () {


        }
    });
}

function jsYukluDigerDosyaSil(v_Ticket, vTabloId, v_dosyaadi) {




    swal({
        buttons: {
            cancel: "iPTAL",
            confirm: "TAMAM"
        },
        title: "Onay?",
        text: "" + v_dosyaadi + " isimli dosya silinsin mi ?",
        icon: "warning",
        dangerMode: false
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "POST",
                    url: "api/DosyaSakla",
                    data: JSON.stringify
                        ({
                            Ticket: v_Ticket,
                            TabloId: vTabloId
                        }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {

                    },
                    error: function (request, status, error) {
                        UyariMesajiVer('Sistemsel Hata Oluştu');
                    },
                    success: function (msg) {
                        BasariliIslem('Dosya başarı ile silindi');


                    },

                    complete: function () {
                        fnProjeDosyalariniGetir();
                    }
                });
            }
        });
}

function ProjeDurumuListele() {

    var ddlListe = $("select#listeProjeDurumu");

    $.ajax({
        type: "POST",
        url: "api/ProjeDurumuListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].DurumAdi));
                }
            }
        },
        complete: function () {
            $('#lblTarihBir').html('PROJE BAŞLANGIÇ TARİHİ');
            $("#txtTarihBir").val('');
            $("#txtTarihBir").prop("disabled", false);
            $("#txtTarihBir").attr("style", "display:block");


            $('#lblTarihIki').html('PROJE BİTİŞ TARİHİ');
            $("#txtTarihIki").val('');
            $("#txtTarihIki").prop("disabled", false);
            $("#txtTarihIki").attr("style", "display:block");

            MasterPlanDurumuListele();
        }
    });
}

function IhaleMakamiListele() {

    var ddlListe = $("select#listeIhaleMakami");

    $.ajax({
        type: "POST",
        url: "api/IhaleMakamiListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].MakamAdi));
                }
            }
        },
        complete: function () {
            DestekTuruListele();
        }
    });
}

function MasterPlanEntegrasyonDurumuListele() {

    var ddlListe = $("select#listeEntegrayonMasterDurumu");


    $.ajax({
        type: "POST",
        url: "api/MasterPlanEntegrasyonDurumuListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].PlanEntegrasyonDurum));
                }
            }
        },
        complete: function () {
            IhaleMakamiListele();
        }
    });
}

function MasterPlanDurumuListele() {

    var ddlListe = $("select#listeMasterPlanDurumu");


    $.ajax({
        type: "POST",
        url: "api/MasterPlanDurumuListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].PlanDurumu));
                }
            }
        },
        complete: function () {
            MasterPlanEntegrasyonDurumuListele();
        }
    });
}

function BakanlikProjeDurumuListele() {

    var ddlListe = $("select#listeBakanlikOnayDurumu");


    $.ajax({
        type: "POST",
        url: "api/BakanlikProjeDurumuListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].DurumAdi));
                }
            }
        },
        complete: function () {
            ProjeDurumuListele();
        }
    });
}

function EntegrasyonDurumuListele() {

    var ddlListe = $("select#listeEntegrasyonDurumu");

    $.ajax({
        type: "POST",
        url: "api/EntegrasyonDurumuListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].DurumAdi));
                }
            }
        },
        complete: function () {
            BakanlikProjeDurumuListele();
        }
    });
}

function VeriKaynakListele() {

    var ddlListe = $("select#listeVeriKaynak");

    $.ajax({
        type: "POST",
        url: "api/VeriKaynakListe",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].VeriKaynakAdi));
                }
            }

        },
        complete: function () {
            EntegrasyonDurumuListele();
        }
    });
}

function BisikletYolYonuListele() {

    var ddlListe = $("select#listeYolYonu");

    $.ajax({
        type: "POST",
        url: "api/BisikletYolYonuListe",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].YolYonuAdi));
                }
            }

        },
        complete: function () {
            VeriKaynakListele();
        }
    });
}

function BisikletYolTuruListele() {

    var ddlListe = $("select#listeBisikletYolTuru");

    $.ajax({
        type: "POST",
        url: "api/BisikletYolTuruListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].YolTuruAdi));
                }
            }
        },
        complete: function () {
            BisikletYolYonuListele();
        }
    });
}

function jsAnaSayfa() {
    window.location.href = "Anasayfa.aspx";
}

function fnDetayModalAc() {
    $('#m_modal_guncelle').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}

function jsDetayModelKapat() {
    $('#m_modal_guncelle').modal('hide');
}

function fnModalAc() {
    $('#m_modal_TumProjeler').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}