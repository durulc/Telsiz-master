$(document).ready(function () {

    var url = "sunum.aspx";

    fn_ModalAc();

    $('#abc_frame').prop('src', url);
});


function fn_ModalAc() {
    $('#m_modal_harita').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}

function jsAnaSayfa() {
    window.location.href = "Anasayfa.aspx";
}
