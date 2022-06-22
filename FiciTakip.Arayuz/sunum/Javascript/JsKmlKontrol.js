$(document).ready(function ()
{
    fn_UpdateDurumGetir();
});


function jsKmlDurumKaydet()
{
    var v_SessionGuid = $('#txtSessionId').val();

    var v_vtblkmldurumid = $("select#listeKmlDurum").val();

    $.ajax({
        type: "POST",
        url: "api/KmlDurumGuncelle",
       
        contentType: "application/json; charset=utf-8",

        data: JSON.stringify
            ({
                vSessionGuid: v_SessionGuid,
                vtblkmldurumid: v_vtblkmldurumid
            }),


        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.zSonuc == "1") {
                BasariliIslem("İşlem Başarılı");

                $('#m_modal_2').modal('hide');
            }

        },
        complete: function () {
            jsListele();

        }
    });

}

function fn_UpdateDurumGetir() {

    var ddlSehir = $("select#listeKmlDurum");

    $.ajax({
        type: "POST",
        url: "api/KmlDurumTurleri",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.zSonuc == "1") {
                var vProjeDizisi = msg.Dizi;

                ddlSehir.empty(); // Clear the please wait  
              
                for (var iSayac = 0; iSayac < vProjeDizisi.length; iSayac++)
                {
                    ddlSehir.append($("<option></option>").val(vProjeDizisi[iSayac].zTabloId).html(vProjeDizisi[iSayac].zKmlDurumAdi));
                }
            }

        },
        complete: function () {
            jsKmlDurumListele();

        }
    });
}

function jsHaritaKapat() {
    $('#m_modal_harita').modal('hide');
}

function jsDurumGuncelle(v_SessionGuid)
{

    $('#txtSessionId').val(v_SessionGuid);

    $('#m_modal_2').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}

function jsHaritadaGoruntule(v_SessionGuid) {
    var url = "harita.aspx?Ticket=" + v_SessionGuid;

    $('#m_modal_harita').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });

    $('#abc_frame').prop('src', url);

    //var
    //    w = 770,
    //    h = 600,
    //    l = (screen.availWidth - w) / 2,
    //    t = (screen.availHeight - h) / 2,
    //    popPage = '.popup';


    //    window.open('harita.aspx?Ticket=' + v_SessionGuid, "window", "width= " + w + ",height=" + h + ",left=" + l + ",top=" + t + ", scrollbars = yes, location = no, toolbar = no, menubar = no, status = no");
    //    return false;


}

function jsListele()
{
    var ddlCalismaTuru = $("select#listeProjeTuru").val();

    var ddlKontrolDurumu = $("select#listeDurum").val();

    if (ddlCalismaTuru == "-1")
    {
        swal({
            buttons: {
                confirm: "TAMAM"
            },
            title: "UYARI",
            html: true,
            text: "Lütfen Çalışma Türü bilgisi seçiniz",
            icon: "warning",
            dangerMode: true
        })
            .then((willDelete) => {
                $("select#listeProjeTuru").focus();
            });

        return false;
    }


    $.ajax({
        type: "POST",
        url: "api/ListeleKmlDurum",

        data: JSON.stringify
            ({
                zProjeTuru: ddlCalismaTuru,
                zDurumId: ddlKontrolDurumu
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

            if (msg.zSonuc == "1") {

                var vYanitDizi = msg.zDizi;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    content += '<tr>';
                    content += "<td style='text-align:right'>" + vSayac + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zProjeAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zDurumAdi + "</td>";
                    content += "<td style='text-align: center;'><a href= '" + vYanitDizi[iSayac].zIndirmeLinki +"' class='m-link'>Dosya Indir</a></td>";
                    content += "<td style='text-align: center;'>" + vYanitDizi[iSayac].zHaritaGosterYazisi+"</td>";
                    content += "<td style='text-align: center;'>" + vYanitDizi[iSayac].zDurumGuncelleYazisi+"</td>";
                    content += "</tr>";

                    vSayac = vSayac + 1;
                }

                $('#m_table_1 tbody').html(content);
            }

        },
        complete: function () {
            var settings = {};
            settings.pageLength = 6;
            settings.searching = false;
            settings.info = false;
            settings.paging = true;
            settings.bInfo = false;

            $('#m_table_1').DataTable(settings);       

        }
    });


}

function jsKmlDurumListele() {

    var ddlSehir = $("select#listeDurum");

    $.ajax({
        type: "POST",
        url: "api/KmlDurumTurleri",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.zSonuc == "1") {
                var vProjeDizisi = msg.Dizi;

                ddlSehir.empty(); // Clear the please wait  
               // ddlSehir.append($("<option></option>").val('-2').html('SEÇİNİZ'));
                ddlSehir.append($("<option></option>").val('-1').html('HEPSİ'));
                ddlSehir.append($("<option></option>").val('0').html('KONTROL EDİLMEYENLER'));

                for (var iSayac = 0; iSayac < vProjeDizisi.length; iSayac++)
                {
                    ddlSehir.append($("<option></option>").val(vProjeDizisi[iSayac].zTabloId).html(vProjeDizisi[iSayac].zKmlDurumAdi));
                }
            }

        },
        complete: function () {
            jsProjeTuruListele();

        }
    });
}


function jsProjeTuruListele() {

    var ddlSehir = $("select#listeProjeTuru");

    $.ajax({
        type: "POST",
        url: "api/ProjeTurleri",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.zSonuc == "1") {
                var vProjeDizisi = msg.Dizi;

                ddlSehir.empty(); // Clear the please wait  
               // ddlSehir.append($("<option></option>").val('-1').html('SEÇİNİZ'));
                ddlSehir.append($("<option></option>").val('0').html('HEPSİ'));

                for (var iSayac = 0; iSayac < vProjeDizisi.length; iSayac++) {
                    ddlSehir.append($("<option></option>").val(vProjeDizisi[iSayac].zTabloId).html(vProjeDizisi[iSayac].zProjeAdi));
                }
            }

        },
        complete: function () {
            jsModalAc();

        }
    });
}


function jsAnaSayfa()
{
   
    window.location.href = "Anasayfa.aspx";
}

function jsModalAc()
{
    $('#m_modal_01').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}

