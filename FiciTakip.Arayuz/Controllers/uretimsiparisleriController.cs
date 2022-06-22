using DevExpress.Xpo;
using FiciTakip.Arayuz.Request;
using FiciTakip.Arayuz.Response;
using FiciTakip.Entity.EntityFramework;
using FiciTakip.Entity.Important;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FiciTakip.Arayuz.Manager
{
    public class uretimsiparisleriController : ApiController
    {
        [HttpPost]
        [Route("api/uretimsiparisListele")]
        [System.Web.Mvc.ValidateAntiForgeryToken]
        [Authorize(Roles = "roleadmin")]
        public uretimsiparisListeleResponse uretimsiparisListele(uretimsiparisListeleRequest v_Gelen)
        {
            return new uretimsiparisleriManager().fn_uretimsiparisListele(v_Gelen);
        }
    }
}
