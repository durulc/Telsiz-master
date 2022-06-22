using FiciTakip.Arayuz.Manager;
using FiciTakip.Arayuz.Request;
using FiciTakip.Arayuz.Response;
using System.Web.Http;

namespace FiciTakip.Arayuz.Controllers
{
    public class UrunController : ApiController
    {

        [HttpPost]
        [Route("api/UrunKaydet")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public UrunKaydetResponse KullaniciSifreDegistir(UrunKaydetRequest v_Gelen)
        {
            return new UrunManager().fn_UrunKaydet(v_Gelen);
        }

        [HttpPost]
        [Route("api/UrunListele")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public UrunKaydetResponse UrunListele(UrunKaydetRequest v_Gelen)
        {
            return new UrunManager().fn_UrunListele(v_Gelen);
        }

    }
}
