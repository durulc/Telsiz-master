$(document).ready(function () {
    jsProjeAra();
});


function jsProjeAra() {

    $.ajax({
        type: "POST",
        url: "api/HataliKml",
        data: "{}",
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
                    content += "<td>" + vYanitDizi[iSayac].ProjeTurAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].SehirAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].ProjeAdi + "</td>";
                    content += "<td style='text-align:center'>" + vYanitDizi[iSayac].DosyaAdresi + "</td>";
                    content += "</tr>";

                    vSayac = vSayac + 1;
                }

                $('#m_table_1 tbody').html(content);
            }
        },
        complete: function () {


            var settings = {};
            settings.paging = true;
            settings.dom = 'Bfrtip';
            settings.searching = false;
            settings.ordering = true;
            settings.info = true;

            settings.lengthMenu = [5, 10, 15];

            settings.buttons = [
                //{
                //    extend: 'pdf',
                //    customize: function (doc) {
                //        doc.content[1].table.widths =
                //            Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                //    }
                //},

                {
                    extend: 'excel'
                }
            ];

                

            $('#m_table_1').DataTable(settings);
           

            fnModalAc();
        }
    });
}

function jsAnaSayfa() {
    window.location.href = "Anasayfa.aspx";
}

function fnModalAc() {
    $('#m_modal_hatakml').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}
