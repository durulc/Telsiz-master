$(document).ready(function () {

    fn_DegerleriListele();

});


function fn_DegerleriListele() {

    $.ajax({
        type: "POST",
        url: "api/uretimsiparisListele",
        data: JSON.stringify
            ({
                zdeger: '1'
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

                $('#txtTelsiz').html(msg.ztabloyazisi);
                $('#m_table_1 tbody').html(msg.zbodyYazisi);

            }
            else {
                UyariMesajiVer('Sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyiniz');
            }
        },

        complete: function () {

        }
    });
}