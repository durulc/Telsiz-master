$(document).ready(function () {
    fn_ListeGetir();
});

function jsAnaSayfa() {
    window.location.href = "Anasayfa.aspx";
}

function jsKaydet()
{
    var v_SessionGuid = $('#txtSessionGuid').val();
    v_SessionGuid = v_SessionGuid.trim();

    $.ajax({
        type: "POST",
        url: "api/IstisnaKayit",
        data: JSON.stringify
            ({
                zSessionGuid: v_SessionGuid
            }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.zSonuc == "1")
            {
                BasariliIslem('İşlem başarılı');
            }

        },
        complete: function () {
            fn_ListeGetir();

        }
    });


}



function fn_ListeGetir()
{   

    $.ajax({
        type: "POST",
        url: "api/IstisnaListele",
        data: JSON.stringify
            ({
                Ticket: '123-753'
            }),

        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            UyariMesajiVer('Sistemsel bir hata oluştu');
        },
        success: function (msg) {

            if (msg.zSonuc == "1") {

                var vYanitDizi = msg.zDizi;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++)
                {
                    console.log(vYanitDizi[iSayac].zTabloId);

                    content += '<tr>';                   
                    content += "<td style='text-align: center;>" + vYanitDizi[iSayac].zTabloId + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zSehirAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zIlceAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zProjeAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zGuzergahAdi + "</td>";
                    content += "<td></td>";
                    content += "</tr>";

                }

                console.log(content);

                $('#m_table_1 tbody').html(content);
            }

        },
        complete: function () {
            jsModalAc();

        }
    });
}


function jsModalAc() {
    $('#m_modal_01').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}