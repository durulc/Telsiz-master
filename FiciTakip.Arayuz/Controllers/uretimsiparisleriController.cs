﻿using FiciTakip.Arayuz.Request;
using FiciTakip.Arayuz.Response;
using System.Web.Http;

namespace FiciTakip.Arayuz.Manager
{
    public class uretimsiparisleriController : ApiController
    {
        [HttpPost]
        [Route("api/Degistir")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public uretimsiparisListeleResponse Degistir(uretimsiparisListeleRequest v_Gelen)
        {
            return new uretimsiparisleriManager().fn_Degistir(v_Gelen);
        }

        [HttpPost]
        [Route("api/Baslat")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public uretimsiparisListeleResponse Baslat(uretimsiparisListeleRequest v_Gelen)
        {
            return new uretimsiparisleriManager().fn_Baslat(v_Gelen);
        }


        [HttpPost]
        [Route("api/BekleyenListele")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public uretimsiparisListeleResponse BekleyenListele(uretimsiparisListeleRequest v_Gelen)
        {
            return new uretimsiparisleriManager().fn_BekleyenListele(v_Gelen);
        }

        [HttpPost]
        [Route("api/uretimsiparisListele")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public uretimsiparisListeleResponse uretimsiparisListele(uretimsiparisListeleRequest v_Gelen)
        {
            return new uretimsiparisleriManager().fn_uretimsiparisListele(v_Gelen);
        }

        [HttpPost]
        [Route("api/OkumaTemizle")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public uretimsiparisListeleResponse OkumaTemizle(uretimsiparisListeleRequest v_Gelen)
        {
            return new uretimsiparisleriManager().fn_OkumaTemizle(v_Gelen);
        }
    }
}
