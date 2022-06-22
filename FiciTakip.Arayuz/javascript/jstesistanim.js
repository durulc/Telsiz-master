$(document).ready(function () {

    fn_Listele();

});

function fn_Degistir(v_Epc)
{
    $.ajax({
        type: "POST",
        url: "api/Degistir",
        data: JSON.stringify
            ({
                zepc: v_Epc
            }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {

        },
        error: function (request, status, error) {
            fn_Listele();
        },
        success: function (msg) {
           
        },
        complete: function () {
            fn_Listele();
        }
    });

}

function fn_Listele()
{
    $.ajax({
        type: "POST",
        url: "api/UrunListele",
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
        success: function (msg)
        {
            $('#m_table_2 tbody').html(msg.zAciklama);
        },
        complete: function () {


        }
    });
}



function js_Tamamla() {
    var v_gelenurun = $('#listeurun').val();
    var v_gelenetiketdeger = $('#txtetiketdeger').val();
    var v_gelenurunrengi = $('#listeurunrengi').val();

    $.ajax({
        type: "POST",
        url: "api/UrunKaydet",
        data: JSON.stringify
            ({
                zdeger: '1',
                zurun: v_gelenurun,
                zetiketdeger: v_gelenetiketdeger,
                zurunrengi: v_gelenurunrengi

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
                swal({
                    buttons: {
                        confirm: "TAMAM"
                    },
                    title: "İşlem Başarılı",
                    text: "Kaydetme işlemi başarı ile gerçekleştirilmiştir",
                    icon: "success",
                    dangerMode: false
                })
                    .then((willDelete) => {
                        window.location.href = 'tesistanim.aspx';
                    });
            }


            else {

                swal({
                    buttons: {
                        confirm: "TAMAM"
                    },
                    title: "İşlem Başarısız",
                    text: "Bu etiket değeri daha önce kaydedilmiştir..",
                    icon: "error",
                    dangerMode: false
                })
                    .then((willDelete) => {
                        window.location.href = 'tesistanim.aspx';
                    });

                //UyariMesajiVer('Sistemsel bir hata oluştu');
            }

        },
        complete: function () {


        }
    });

}
