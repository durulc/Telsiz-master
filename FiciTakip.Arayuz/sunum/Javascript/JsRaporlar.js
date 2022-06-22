$(document).ready(function () {



    jsModal02Ac();

});

function jsVeriGirmeyenSehirler()
{
    $.ajax({
        type: "POST",
        url: "api/Rapor05",
        data: JSON.stringify
            ({
                Ticket: '-156'
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

            if ($.fn.dataTable.isDataTable('#m_table_05')) {
                table = $('#m_table_05').DataTable();

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
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zSira + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zSehirAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zAd + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zSoyad + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zMailAdresi + "</td>";
                    content += "</tr>";
                }

                $('#m_table_05 tbody').html(content);


            }

        },
        complete: function () {

            var settings = {};
            settings.pageLength = 5;
            settings.paging = true;
            settings.dom = 'Bfrtip';
            settings.searching = false;
            settings.ordering = true;

            settings.lengthMenu = [5, 10, 15];

            //settings.columnDefs = [
            //    {
            //        targets: -1,
            //        data: 'name',
            //        title: '',
            //        orderable: false

            //    }],


            settings.buttons = [
                //{
                //    extend: 'pdf',
                //    customize: function (doc) {
                //        doc.content[1].table.widths =
                //            Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                //    }
                //},

                {
                    extend: 'excel',
                    exportOptions: {
                        columns: [0, 1,2,3,4]
                    }
                }
            ];

            $('#m_table_05').DataTable(settings);

            $('#m_modal_r05').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });



        }
    });
}

function jsProjeDurumTurButce() {


    $.ajax({
        type: "POST",
        url: "api/Rapor04",
        data: JSON.stringify
            ({
                Ticket: '-156'
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

            if ($.fn.dataTable.isDataTable('#m_table_04')) {
                table = $('#m_table_04').DataTable();

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
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zSira + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zProjeAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zProjeDurum + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zProjeSayisi + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zKesifBedeli + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zSozlesmeBedeli + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zToplamButce + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zBakanlikHibe + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zOzkaynak + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zIpa + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zKredi + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zDigerKaynak + "</td>";
                    content += "</tr>";
                }

                $('#m_table_04 tbody').html(content);


            }

        },
        complete: function () {

            var settings = {};
            settings.pageLength = 5;
            settings.paging = true;
            settings.dom = 'Bfrtip';
            settings.searching = false;
            settings.ordering = true;

            settings.lengthMenu = [5, 10, 15];

            //settings.columnDefs = [
            //    {
            //        targets: -1,
            //        data: 'name',
            //        title: '',
            //        orderable: false

            //    }],


            settings.buttons = [
                //{
                //    extend: 'pdf',
                //    customize: function (doc) {
                //        doc.content[1].table.widths =
                //            Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                //    }
                //},

                {
                    extend: 'excel',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11]
                    }
                }
            ];

            $('#m_table_04').DataTable(settings);

            $('#m_modal_r04').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });



        }
    });







}


function jsProjeButce() {


    $.ajax({
        type: "POST",
        url: "api/Rapor03",
        data: JSON.stringify
            ({
                Ticket: '-156'
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

            if ($.fn.dataTable.isDataTable('#m_table_03')) {
                table = $('#m_table_03').DataTable();

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
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zSira + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zProjeAdi + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zKesifBedeli + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zSozlesmeBedeli + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zToplamButce + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zBakanlikHibe + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zOzkaynak + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zIpa + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zKredi + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zDigerKaynak + "</td>";
                    content += "</tr>";
                }

                $('#m_table_03 tbody').html(content);


            }

        },
        complete: function () {

            var settings = {};
            settings.pageLength = 5;
            settings.paging = true;
            settings.dom = 'Bfrtip';
            settings.searching = false;
            settings.ordering = true;

            settings.lengthMenu = [5, 10, 15];

            //settings.columnDefs = [
            //    {
            //        targets: -1,
            //        data: 'name',
            //        title: '',
            //        orderable: false

            //    }],


            settings.buttons = [
                //{
                //    extend: 'pdf',
                //    customize: function (doc) {
                //        doc.content[1].table.widths =
                //            Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                //    }
                //},

                {
                    extend: 'excel',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5,6,7,8,9]
                    }
                }
            ];

            $('#m_table_03').DataTable(settings);

            $('#m_modal_r03').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });



        }
    });







}


function jsProjeSehirUzunluk() {


    $.ajax({
        type: "POST",
        url: "api/Rapor02",
        data: JSON.stringify
            ({
                Ticket: '-156'
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

            if ($.fn.dataTable.isDataTable('#m_table_02')) {
                table = $('#m_table_02').DataTable();

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

                    var v_Deger = vYanitDizi[iSayac].zToplamUzunluk;
                    v_Deger = v_Deger / 1000;

                    content += '<tr>';
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zSira + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zSehirAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zProjeAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zDurumAdi + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zProjeSayisi + "</td>";
                    content += "<td style='text-align:right'>" + v_Deger + "</td>";
                    content += "</tr>";
                }

                $('#m_table_02 tbody').html(content);


            }

        },
        complete: function () {

            var settings = {};
            settings.pageLength = 5;
            settings.paging = true;
            settings.dom = 'Bfrtip';
            settings.searching = false;
            settings.ordering = true;

            settings.lengthMenu = [5, 10, 15];

            //settings.columnDefs = [
            //    {
            //        targets: -1,
            //        data: 'name',
            //        title: '',
            //        orderable: false

            //    }],


            settings.buttons = [
                //{
                //    extend: 'pdf',
                //    customize: function (doc) {
                //        doc.content[1].table.widths =
                //            Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                //    }
                //},

                {
                    extend: 'excel',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                }
            ];

            $('#m_table_02').DataTable(settings);

            $('#m_modal_r02').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });



        }
    });







}



function jsProjeUzunluk()
{


    $.ajax({
        type: "POST",
        url: "api/Rapor01",
        data: JSON.stringify
            ({
                Ticket:'-156'
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

            if ($.fn.dataTable.isDataTable('#m_table_01')) {
                table = $('#m_table_01').DataTable();

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

                    var v_Deger = vYanitDizi[iSayac].zToplamUzunluk;
                    v_Deger = v_Deger / 1000;

                    content += '<tr>';
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zSira + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zProjeAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].zDurumAdi + "</td>";
                    content += "<td style='text-align:right'>" + vYanitDizi[iSayac].zProjeSayisi + "</td>";
                    content += "<td style='text-align:right'>" + v_Deger + "</td>";
                    content += "</tr>";
                }

                $('#m_table_01 tbody').html(content);


            }

        },
        complete: function () {

            var settings = {};
            settings.pageLength = 5;
            settings.paging = true;
            settings.dom = 'Bfrtip';
            settings.searching = false;
            settings.ordering = true;

            settings.lengthMenu = [5, 10, 15];

            //settings.columnDefs = [
            //    {
            //        targets: -1,
            //        data: 'name',
            //        title: '',
            //        orderable: false
                    
            //    }],


                settings.buttons = [
                    //{
                    //    extend: 'pdf',
                    //    customize: function (doc) {
                    //        doc.content[1].table.widths =
                    //            Array(doc.content[1].table.body[0].length + 1).join('*').split('');
                    //    }
                    //},

                    {
                        extend: 'excel',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4]
                        }
                    }
                ];

            $('#m_table_01').DataTable(settings);

         $('#m_modal_01').modal({
                show: true,
                keyboard: false,
                backdrop: 'static'
            });



        }
    });






   
}


function jsModal02Ac() {

    $('#m_modal_02').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });

}

function jsAnaSayfa() {
    window.location.href = "Anasayfa.aspx";
}