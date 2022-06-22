var v_Devam = false;

$(document).ready(function () {

    fn_DegerleriListele('0');

});


function jsBaslat()
{
    v_Devam = true;
}


function jsTemizle()
{
    $.ajax({
        type: "POST",
        url: "api/OkumaTemizle",
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
            $('#txtTelsizGecenler').html('');
        },

        complete: function () {
            fn_DegerleriListele('0');
        }
    });
}


function jsDurdur()
{
    v_Devam = false;
}

function fn_DegerleriListele(v_Gelen) {

    $.ajax({
        type: "POST",
        url: "api/BekleyenListele",
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


            if (msg.zSonuc == "1")
            {
                if (v_Gelen == '0')
                {
                    $('#txtTelsiz').html(msg.ztabloyazisi);

                    $('#m_table_1 tbody').html(msg.zbodyYazisi);
                }
                else
                {
                    if (v_Devam == true)
                    {
                        $('#txtTelsiz').html(msg.ztabloyazisi);
                        $('#txtTelsizGecenler').html(msg.zOkunanTabloYazisi);

                        $('#m_table_1 tbody').html(msg.zbodyYazisi);
                    }
                }
            }
            else
            {
                //UyariMesajiVer('Sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyiniz');
            }
        },

        complete: function () {
            setTimeout("fn_DegerleriListele('1')", 250);
        }
    });
}