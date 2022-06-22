function jsKmlDegerlendirme()
{
    window.location.href = "kmlkontrol2.aspx";
}

function jsCizimModalKapat()
{
    $('#m_modal_cizim').modal('hide');
}

function jsCizimEkrani()
{
    var url = "cizimekrani.aspx";

    fn_ModalAc();

    $('#frame_Cizim').prop('src', url);
}

function fn_ModalAc() {

    $('#m_modal_cizim').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}


function jsVeriKayit()
{
    window.location.href = "bilgigirisi.aspx";
}

function jsKullaniciListesi() {
    window.location.href = "kullanicilistesi.aspx";
}

function jskayitliverileriac() {
    window.location.href = "tumprojeler.aspx";
}

function jsKullaniciTanim()
{
    window.location.href = "kullanicitanim.aspx";
}

function jsTaslakProjeler()
{
    window.location.href = "taslakprojeler.aspx";
}

function jsRaporlar() {
    window.location.href = "raporlar.aspx";
}

function jsHaritaAc() {
    window.location.href = "tamharita.aspx";
}

function jsHataliKml() {
    window.location.href = "hatalikml.aspx";
}