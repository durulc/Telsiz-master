$(document).ready(function () {

    fnModalAc();    
});

function jsBilgileriGoruntule(v_KullaniciAdi)
{

}

function jsSifreResetle(v_KullaniciAdi)
{
    swal({
        buttons: {
            cancel: "iPTAL",
            confirm: "TAMAM"
        },
        title: "Onay?",
        text: v_KullaniciAdi + " kullanıcısının şifresi Aa12345 olarak değiştirilsin mi?",
        icon: "warning",
        dangerMode: false
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    type: "POST",
                    url: "api/SifreReset",
                    data: JSON.stringify
                        ({
                            KullaniciAdi: v_KullaniciAdi,
                            SifreReset: '1'
                        }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {

                    },
                    error: function (request, status, error) {                       
                        UyariMesajiVer('Sistemsel Hata Oluştu');
                    },
                    success: function (msg) {
                        if (msg.Sonuc == "1")
                        {
                            swal({
                                buttons: {
                                    confirm: "TAMAM"
                                },
                                title: "İşlem Tamamlandı",
                                text: v_KullaniciAdi+" kullanıcısının şifrei Aa12345 olarak değiştirildi",
                                icon: "success",
                                dangerMode: false
                            })
                                .then((willDelete) => {
                                    window.location.href = 'kullanicitanim.aspx';
                                });
                        }
                    },
                    complete: function () {

                    }
                });
            }
        });
}



function jsKullaniciAra()
{
    var v_Ad = $("#txtAd").val().trim();
    var v_Soyad = $("#txtSoyad").val().trim();
    var v_KullaniciAdi = $("#txtKullaniciAdi").val().trim();


    $.ajax({
        type: "POST",
        url: "api/KullaniciListesi",
        data: JSON.stringify
            ({
                Ad: v_Ad,
                Soyad: v_Soyad,
                KullaniciAdi: v_KullaniciAdi
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
                var vYanitDizi = msg.Dizi;

                var vSayac = 1;

                var content = '';

                for (var iSayac = 0; iSayac < vYanitDizi.length; iSayac++) {
                    content += '<tr>';
                    content += "<td>" + vYanitDizi[iSayac].Ad+"</td>";
                    content += "<td>" + vYanitDizi[iSayac].Soyad + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].KullaniciAdi + "</td>";
                    content += "<td>" + vYanitDizi[iSayac].YetkiAdi + "</td>";
                    content += "<td style='text-align:center'></td>";
                    content += "</tr>";
                }

                $('#m_table_1 tbody').html(content);

               
            }

        },
        complete: function () {

            $('#m_table_1').DataTable({
                paging: true,
                searching: false,              
                dom : 'Bfrtip',
                lengthMenu: [5, 10, 15],

                buttons :[
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
                ],

                columnDefs: [
                    {
                        targets: -1,
                        data: 'name',
                        title: '',
                        orderable: false,
                        render: function (data, type, full, meta) {

                            return `
                        <span class="dropdown">
                            <a href="#" class="btn m-btn m-btn--hover-success m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="dropdown" aria-expanded="true">
                              <i class="la la-ellipsis-h"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#" onclick="jsBilgileriGoruntule('`+ full[2] + `');"><i class="la la-edit"></i>Bilgileri Güncelle</a>
                                <a class="dropdown-item" href="#" onclick="jsSifreResetle('`+ full[2] + `');"><i class="la la-key"></i> Şifreyi Sıfırla</a>
                            </div>
                        </span>
                        `;
                        },
                    }],
            });

        }
    });

}

function fnModalAc() {
    $('#m_modal_KullaniciListesi').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}


function jsAnaSayfa() {
    window.location.href = "Anasayfa.aspx";
}