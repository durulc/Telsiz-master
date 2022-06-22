$(document).ready(function () {

    var fileupload = $("#FileUpload1");
    fileupload.change(function () {

        var v_projeturukayitno = $("select#listeProjeTuru").val();

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
                        else
                        {
                            if (result.KontrolEdilecekmi == "0")
                            {
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
                jsEkliDosyaBilgisiYazdir(v_projeturukayitno);
                //  jsEkliDosyaListele();
            }

        });

    });

    var fileUploadDiger = $("#FileUploadDiger");
    fileUploadDiger.change(function () {

        var v_projeturukayitno = $("select#listeProjeTuru").val();

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
                jsDigerEkliDosyalariYazdir();
                //  jsEkliDosyaListele();
            }

        });

    });


    
    UploadSessionOlustur();
    
});

function jsProjeHaritaCiz() {

    var v_ProjeTuru = $("#listeProjeTuru").val();


    var url = "haritacizim.aspx?zProjeNo=" + v_ProjeTuru;
   
    fn_ModalAc();

    $('#frame_haritaCizim').prop('src', url);

}
function jsHaritaKapat() {
    $('#m_modal_cizimharita').modal('hide');
}


function jsProjeYok()
{
    var v_ProjeTuru = $("#listeProjeTuru").val();

    var v_MilletBahcesi = $("select#listeMilletBahcesi");
    var v_Sehir = $("select#listeSehir");
    var v_Ilce = $("select#listeIlce");
    var v_Guzergah = $("#txtGuzergahAdi");
    var v_EtapAdi = $("#txtEtapAdi");

    if (v_ProjeTuru == '6') {
        $("#row_noproje_01").attr("style", "display:none");
        $("#row_noproje_02").attr("style", "display:none");
        $("#row_noproje_03").attr("style", "display:none");
        $("#row_noproje_04").attr("style", "display:none");
        $("#row_noproje_05").attr("style", "display:none");
        $("#row_noproje_06").attr("style", "display:none");
        $("#row_noproje_07").attr("style", "display:none");
        $("#row_noproje_08").attr("style", "display:none");
    }
    else
    {
        $("#row_noproje_01").attr("style", "display:block");
        $("#row_noproje_02").attr("style", "display:block");
        $("#row_noproje_03").attr("style", "display:block");
        $("#row_noproje_04").attr("style", "display:block");
        $("#row_noproje_05").attr("style", "display:block");
        $("#row_noproje_06").attr("style", "display:block");
        $("#row_noproje_07").attr("style", "display:block");
        $("#row_noproje_08").attr("style", "display:block");
    }
}





function jsTaslakKaydet() {

    var v_ProjeTuru = $("select#listeProjeTuru").val();
    var v_MilletBahcesi = $("select#listeMilletBahcesi").val();
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

    var v_Ozkaynak = $("#txtOzkaynakMiktari").val();

    var v_IlbankKredi = $("#txtIlbankHibeMiktari").val();

    var v_IpaMiktari = $("#txtIpaMiktari").val();

    var v_KullanilanKredi = $("#txtKrediMiktari").val();

    var v_DigerKaynak = $("#txtDigerKaynak").val();

    var v_IlbankHibeMiktari = $("#txtIlbankHibe").val();

    var v_ToplamUzunluk = $("#txtToplamUzunluk").val();



    $.ajax({
        type: "POST",
        url: "api/ProjeVeriKayit",
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
                ilbankhibe: v_IlbankHibeMiktari,
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
                    text: "Proje verileri başarı ile kayıt edildi",
                    icon: "success",
                    dangerMode: false
                })
                    .then((willDelete) => {
                        window.location.href = 'bilgigirisi.aspx';
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


function jsKaydetTamamla()
{
   
    var v_ProjeTuru = $("select#listeProjeTuru").val();
    var v_MilletBahcesi = $("select#listeMilletBahcesi").val();
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

    var v_IlbankHibeMiktari = $("#txtIlbankHibe").val();
    var v_IlbankHibeDisplay = $("#txtIlbankHibe").is(":visible");

    var v_ToplamUzunluk = $("#txtToplamUzunluk").val();
    var v_KmzDosyaId = $("#txtDosyaId").val();
   

    


    // Boşluk Kontrol
    // Millet Bahçesi projesi ise kontrol 
    if (v_MilletBahcesi == '1')
    {

        //if (v_BakanlikHibeDisplay == true) {
        //    if (v_BakanlikHibe.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen BAKANLIK HİBE MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtBakanlikDestekMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_OzkaynakDisplay == true) {
        //    if (v_Ozkaynak.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen ÖZKAYNAK MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtOzkaynakMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_IlbankKrediDisplay == true) {
        //    if (v_IlbankKredi.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen İLBANK KREDİ MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtIlbankHibeMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_IpaMiktariDisplay == true) {
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
        //}

        //if (v_KullanilanKrediDisplay == true) {
        //    if (v_KullanilanKredi.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen KULLANILAN KREDİ MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtKrediMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_DigerKaynakDisplay == true) {
        //    if (v_DigerKaynak.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen DİĞER KAYNAK MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtDigerKaynak").focus();
        //            });

        //        return false;
        //    }
        //}
        
        //if (v_IlbankHibeDisplay == true) {
        //    if (v_IlbankHibeMiktari.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen İLBANK HİBE MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#v_IlbankHibeMiktari").focus();
        //            });

        //        return false;
        //    }
        //}
        
        //if (v_BisikletYolTuru == "8") {
        //    if (v_BYolTuruDigerAciklama.length <= 5) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen AÇIKLAMA bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtYolTuruDiger").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_VeriKaynak == '0') {
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
        //}

        if (v_ProjeDurumuDisplay == true)
        {

            if (v_ProjeDurumu == '0')
            {


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

        //if (v_TarihBirDisplay == true) {
        //    if (v_TarihBir.length <= 5) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen TARİH bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtTarihBir").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_TarihIkiDisplay == true) {
        //    if (v_TarihIki.length <= 5) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen TARİH bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtTarihIki").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_ProjeDurumu == '6') {
        //    if (v_IptalGerekce.length <= 5) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen İPTAL GEREKÇESİ bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtIptalGerekcesi").focus();
        //            });

        //        return false;
        //    }
        //}
    }

    // Millet bahçesinden bağımsız proje
    if (v_MilletBahcesi == '2')
    {
        //if (v_BakanlikHibeDisplay == true) {
        //    if (v_BakanlikHibe.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen BAKANLIK HİBE MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtBakanlikDestekMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_OzkaynakDisplay == true) {
        //    if (v_Ozkaynak.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen ÖZKAYNAK MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtOzkaynakMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_IlbankKrediDisplay == true) {
        //    if (v_IlbankKredi.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen İLBANK KREDİ MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtIlbankHibeMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_IpaMiktariDisplay == true) {
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
        //}

        //if (v_KullanilanKrediDisplay == true) {
        //    if (v_KullanilanKredi.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen KULLANILAN KREDİ MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtKrediMiktari").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_DigerKaynakDisplay == true) {
        //    if (v_DigerKaynak.length <= 2) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen DİĞER KAYNAK MİKTARI (₺) bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtDigerKaynak").focus();
        //            });

        //        return false;
        //    }
        //}

        if (v_ProjeTuru == '1' || v_ProjeTuru == '4')
        {

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

            //if (v_BisikletYolTuru == '8') {

            //    if (v_BYolTuruDigerAciklama.length <= 3) {
            //        swal({
            //            buttons: {
            //                confirm: "TAMAM"
            //            },
            //            title: "UYARI",
            //            html: true,
            //            text: "Lütfen BİSİKLET YOLU TÜRÜ AÇIKLAMA bilgisi giriniz",
            //            icon: "warning",
            //            dangerMode: true
            //        })
            //            .then((willDelete) => {
            //                $("#txtYolTuruDiger").focus();
            //            });

            //        return false;
            //    }
            //}

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

            //if (v_MasterPlanDurumu == '1') {
            //    if (v_MasterPlanEntegrasyon == '0') {
            //        swal({
            //            buttons: {
            //                confirm: "TAMAM"
            //            },
            //            title: "UYARI",
            //            html: true,
            //            text: "Lütfen MASTER PLAN BİSİKLET YOLU ENTEGRASYONU bilgisi seçiniz",
            //            icon: "warning",
            //            dangerMode: true
            //        })
            //            .then((willDelete) => {
            //                $("select#listeEntegrayonMasterDurumu").focus();
            //            });

            //        return false;
            //    }
            //}

            //if (v_Entegrasyon == '0') {
            //    swal({
            //        buttons: {
            //            confirm: "TAMAM"
            //        },
            //        title: "UYARI",
            //        html: true,
            //        text: "Lütfen ENTEGRASYON bilgisi seçiniz",
            //        icon: "warning",
            //        dangerMode: true
            //    })
            //        .then((willDelete) => {
            //            $("select#listeEntegrasyonDurumu").focus();
            //        });

            //    return false;
            //}
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

        //if (v_BakanlikOnayDurumu == '0') {
        //    if (v_MilletBahcesi == '2') {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen BAKANLIK ONAY DURUMU bilgisi seçiniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("select#listeBakanlikOnayDurumu").focus();
        //            });

        //        return false;
        //    }
        //}

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
       
        //if (v_ProjeDurumu == '6') {
        //    if (v_IptalGerekce.length <= 5) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen İPTAL GEREKÇESİ bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtIptalGerekcesi").focus();
        //            });

        //        return false;
        //    }
        //}

        //if (v_TarihBirDisplay == true) {
        //    if (v_TarihBir.length <= 5) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen TARİH bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtTarihBir").focus();
        //            });

        //        return false;
        //    }

        //}

        //if (v_TarihIkiDisplay == true) {
        //    if (v_TarihIki.length <= 5) {
        //        swal({
        //            buttons: {
        //                confirm: "TAMAM"
        //            },
        //            title: "UYARI",
        //            html: true,
        //            text: "Lütfen TARİH bilgisi giriniz",
        //            icon: "warning",
        //            dangerMode: true
        //        })
        //            .then((willDelete) => {
        //                $("#txtTarihIki").focus();
        //            });

        //        return false;
        //    }

        //}

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

        //if (v_KmzDosyaId.length <= 0) {
        //    swal({
        //        buttons: {
        //            confirm: "TAMAM"
        //        },
        //        title: "UYARI",
        //        html: true,
        //        text: "Lütfen projeye ait KML/ KMZ DOSYASI yükleyiniz",
        //        icon: "warning",
        //        dangerMode: true
        //    })
        //        .then((willDelete) => {
        //            $("#txtDosyaAdi").focus();
        //        });

        //    return false;
        //}       

    }



    if (v_MilletBahcesi != '1' && v_MilletBahcesi != '2')
    {
        UyariMesajiVer('Sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyiniz');
        return false;
    }

    $.ajax({
        type: "POST",
        url: "api/ProjeVeriKayit",
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
                ilbankhibe: v_IlbankHibeMiktari,
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
                    text: "Proje verileri başarı ile kayıt edildi",
                    icon: "success",
                    dangerMode: false
                })
                    .then((willDelete) => {
                        window.location.href = 'bilgigirisi.aspx';
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







function jsEkliDosyaBilgisiYazdir(v_tblprojeturuid) {
    $.ajax({
        type: "POST",
        url: "api/EkliDosyaBilgiiListele",

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

                $("#txtDosyaAdi").val(msg.DosyaAdi);

                $("#txtDosyaUzunluk").val(msg.DosyaUzunluk);

                $("#txtDosyaId").val(msg.TabloId);
            }

        },
        complete: function () {


        }
    });
}



function PencereAcKapa() {

    var v_ProjeTuru = $("select#listeProjeTuru").val();
    var v_MilletBahcesi = $("select#listeMilletBahcesi").val();          

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

  


    if (v_ProjeTuru == '1' || v_ProjeTuru == '4')
    {
        $(".divBisiklet").show();
    }
    else
    {
        $(".divBisiklet").hide();
    }

   

    if (v_MilletBahcesi == '1')
    {
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

    if (v_MilletBahcesi == '2') {
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


    jsModal02Ac();
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

    //İlbank Hibe divParaYedi
    if (vSeciliDegerler.indexOf("7") == "-1") {
        $('.divParaYedi').hide();
        $('#txtIlbankHibe').val('');
    }

    else {
        $('.divParaYedi').show();
    }
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
            PencereAcKapa();
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

function jsDevamFormuYukle()
{
    BisikletYolTuruListele();
    
}

function UploadSessionOlustur() {

    $.ajax({
        type: "POST",
        url: "api/UploadGuid",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

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
            //$('#txtToplamUzunluk').mask('000.000.000.000.000,00', { reverse: true });
            $('#txtDosyaUzunluk').mask('000.000.000.000.000,00', { reverse: true });

        },
        complete: function () {
            jsListeMilletBahcesiDurumuDoldur();
        }
    });
}

function jsDevamEt()
{
    var v_ProjeTuru = $("select#listeProjeTuru").val();
    var v_MilletBahcesi = $("select#listeMilletBahcesi").val();
    var v_Sehir = $("select#listeSehir").val();
    var v_Ilce = $("select#listeIlce").val();
    var v_Guzergah = $("#txtGuzergahAdi").val();
    var v_EtapAdi = $("#txtEtapAdi").val();


    if (v_ProjeTuru == '6') {


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
                    $("select#listeSehir").focus();
                });

            return false;
        }


        swal({
            buttons: {
                cancel: "İPTAL",
                confirm: "TAMAM"
            },
            title: "UYARI",
            html: true,
            text: "Bağlı bulunduğunuz şehirde yeşil veri projesi kapsamında çalışma gerçekleştirilmediğini belirttiniz. Devam etmek istiyor musunuz?",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {
                if (willDelete)
                {

                    $.ajax({
                        type: "POST",
                        url: "api/ProjesizSehir",
                        data: JSON.stringify
                            ({                             
                                tblsehirid: v_Sehir
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
                                    text: "Proje verileri başarı ile kayıt edildi",
                                    icon: "success",
                                    dangerMode: false
                                })
                                    .then((willDelete) => {
                                        window.location.href = 'bilgigirisi.aspx';
                                    });
                            }
                            else
                            {
                                UyariMesajiVer('Sistemsel bir hata oluştu');
                            }

                        },
                        complete: function () {
                            

                        }
                    });


                    //
                   
                }
                
            });

        return false;
    }




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
                $("select#listeProjeTuru").focus();
            });

        return false;
    }

    if (v_MilletBahcesi == '0')
    {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            html: true,
            text: "Lütfen MİLLET BAHÇESİ ENTEGRASYONU bilgisi seçiniz",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {
                $("select#listeMilletBahcesi").focus();
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
                $("select#listeSehir").focus();
            });

        return false;
    }

    if (v_Ilce == '0') {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            html: true,
            text: "Lütfen İLÇE bilgisi seçiniz",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {
                $("select#listeIlce").focus();
            });

        return false;
    }

    if (v_Guzergah.length <= 4) {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            html: true,
            text: "Lütfen GÜZERGAH ADI bilgisi giriniz",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {
                $("#txtGuzergahAdi").focus();
            });

        return false;
    }

    jsIlkModalKapat();

    jsDevamFormuYukle();

}

function jsListeMilletBahcesiDurumuDoldur() {

    var ddlListe = $("select#listeMilletBahcesi");


    $.ajax({
        type: "POST",
        url: "api/MilletBahcesiDurumuListele",
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
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].MilletBahcesiDurumAdi));
                }
            }
        },
        complete: function () {
            jsProjeTuruListele();
        }
    });
}

function IlceListesiGetir() {
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
                ddlListe.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].TabloId).html(vYanitDizi[iSayac].IlceAdi));
                }
            }

        },
        complete: function () {


        }
    });

}

function jsProjeTuruListele() {

    var ddlSehir = $("select#listeProjeTuru");

    $.ajax({
        type: "POST",
        url: "api/ProjeTuru",
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
                var vProjeDizisi = msg.Proje;

                ddlSehir.empty(); // Clear the please wait  
                ddlSehir.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vProjeDizisi.length; iSayac++) {
                    ddlSehir.append($("<option></option>").val(vProjeDizisi[iSayac].TabloId).html(vProjeDizisi[iSayac].ProjeAdi));
                }
            }

        },
        complete: function () {
            jsSehirYukle();

        }
    });
}

function jsSehirYukle()
{
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
                ddlListe.append($("<option></option>").val('0').html('SEÇİNİZ'));

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    ddlListe.append($("<option></option>").val(vYanitDizi[iSayac].SehirKodu).html(vYanitDizi[iSayac].SehirAdi));
                }
            }

        },
        complete: function () {
            jsIlkModalAc();
        }
    });
}

function jsAnaSayfa()
{
    window.location.href = "Anasayfa.aspx";
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



function jsFileUploadAc() {

    var v_projeturukayitno = $("select#listeProjeTuru").val();

    var v_YukluDosyaAdi = $("#txtDosyaAdi").val();

    v_YukluDosyaAdi = v_YukluDosyaAdi.trim();

    if (v_projeturukayitno == "0") {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            text: "LÜTFEN ÖNCE PROJE TÜRÜ SEÇİNİZ",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {

            });

        return false;
    }

    if (v_YukluDosyaAdi.length > 5) {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            text: "HER PROJE İÇİN SADECE 1 TANE KML/KMZ DOSYASI YÜKLEYEBİLİRİSİNİZ. LÜTFEN ÖNCE DOSYAYI SİLİNİZ",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {

            });

        return false;
    }


    var fileupload = $("#FileUpload1");

    fileupload.click();

}



function jsProjeDosyasiSil() {

    var v_tabloid = $("#txtDosyaId").val();
    v_tabloid = v_tabloid.trim();

    var v_YukluDosyaAdi = $("#txtDosyaAdi").val();
    v_YukluDosyaAdi = v_YukluDosyaAdi.trim();


    if (v_YukluDosyaAdi.length < 3) {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            text: "SİLİNECEK DOSYA BULUNAMADI",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {

            });

        return false;
    }


    swal({
        buttons: {
            cancel: "iPTAL",
            confirm: "TAMAM"
        },
        title: "Onay?",
        text: "" + v_YukluDosyaAdi + " isimli dosya silinsin mi ?",
        icon: "warning",
        dangerMode: false
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "POST",
                    url: "api/ProjeDosyaSil",
                    data: JSON.stringify
                        ({
                            TabloId: v_tabloid,
                            DosyaAdi: v_YukluDosyaAdi
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

                        $("#txtDosyaAdi").val('');

                        $("#txtDosyaId").val('');

                        $("#txtDosyaUzunluk").val('');
                    },

                    complete: function () {

                    }
                });
            }
        });
}

function jsYukleDigerDosyalar() {

    var v_projeturukayitno = $("select#listeProjeTuru").val();

    if (v_projeturukayitno == "0") {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            text: "LÜTFEN ÖNCE PROJE TÜRÜ SEÇİNİZ",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {

            });

        return false;
    }
    else {

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
                    content += "<td style='text-align: center;'><a href=# onclick = \"jsYukluDigerDosyaSil('" + vYanitDizi[iSayac].TabloId + "','" + vYanitDizi[iSayac].DosyaAdi + "')\";>Dosyayı Sil</a></td>";
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


        }
    });
}

function jsYukluDigerDosyaSil(v_tblprojeturuid, v_tabloid, v_dosyaadi) {
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
                    url: "api/DigerDosyaSil",
                    data: JSON.stringify
                        ({
                            TabloId: v_tblprojeturuid,
                            DosyaAdi: v_dosyaadi
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
                        jsDigerEkliDosyalariYazdir();
                    }
                });
            }
        });
}

function jsIlkModalAc()
{
    $('#m_modal_01').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}

function jsIlkModalKapat() {

    $('#m_modal_01').modal({
        show: false,
        keyboard: false,
        backdrop: 'static'
    });

}

function jsModal02Ac() {

    $('#m_modal_02').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });

}

function fn_ModalAc() {

    $('#m_modal_cizimharita').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });

}

