using FiciTakip.Arayuz.Manager;
using FiciTakip.Arayuz.Request;
using FiciTakip.Arayuz.Response;
using System.Web.Http;

namespace FiciTakip.Arayuz.Controllers
{
    public class formsecimController : ApiController
    {

        [HttpPost]
        [Route("api/KullaniciFormKayit")]
        public KullaniciFormKayitResponse KullaniciFormKayit(KullaniciFormKayitRequest v_gelen)
        {
            return new formsecimManager().fn_KullaniciFormKayit(v_gelen);
        }


        [HttpPost]
        [Route("api/UrunFormListele")]
        public UrunFormListeleResponse UrunFormListele(UrunFormListeleRequest v_gelen)
        {
            return new formsecimManager().fn_UrunFormListeler(v_gelen);
        }


        [HttpPost]
        [Route("api/KullaniciFormGetir")]
        public KullaniciFormGetirResponse KimliklendirmeMalzemeListesi(KullaniciFormGetirRequest v_gelen)
        {
            return new formsecimManager().fn_KullaniciFormGetir(v_gelen);
        }
    }
}
