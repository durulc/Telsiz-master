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
    public class uretimsiparisleriManager : ApiController
    {
        internal uretimsiparisListeleResponse fn_uretimsiparisListele(uretimsiparisListeleRequest v_Gelen)
        {
            uretimsiparisListeleResponse _Cevap = new uretimsiparisListeleResponse();
            string _TabloYazisi = "";
            string _BodyYazisi = "";
            int _bekleyenCount = 0;
            int _gecencount = 0;
            try
            {
                using (Session session = XpoManager.Instance.GetNewSession())
                {
                    List<tblurun> _Liste = session.Query<tblurun>().Where(k => k.aktif == 1).ToList();
                    _gecencount = session.Query<tblurun>().Where(k => k.aktif == 1&& k.gecisdurum.Equals("0")).Count();
                    _bekleyenCount= session.Query<tblurun>().Where(k => k.aktif == 1 && k.gecisdurum.Equals("1")).Count();

                    _BodyYazisi += "<tr>";
                    _BodyYazisi += "<td style='text-align:center;'>" + _gecencount.ToString()+ "</td>";
                    _BodyYazisi += "<td style='text-align:center;'>" + _bekleyenCount.ToString() + "</td>";
                    _BodyYazisi += "</tr>";

                    foreach (var item in _Liste)
                    {
                        if (_Liste != null)
                        {
                            
                            if (item.gecisdurum == "0")
                            {
                                _TabloYazisi += "<div class='fa-solid fa-walkie-talkie fa-2x' id='" + item.id + "' style='color:  red' ></div>";
                                
                            }
                            if (item.gecisdurum == "1")
                            {
                                _TabloYazisi += "<div class='fa-solid fa-walkie-talkie fa-2x' id='" + item.id + "' style='color:  blue' ></div>";
                                
                            }
                            _TabloYazisi += "<span>&nbsp</span>";

                        }
                    }



                    _Cevap.zAciklama = "";
                    _Cevap.zSonuc = 1;
                    _Cevap.zbekleyenCount = _bekleyenCount.ToString();
                    _Cevap.zgecencount = _gecencount.ToString();
                    _Cevap.ztabloyazisi = _TabloYazisi;
                    _Cevap.zbodyYazisi = _BodyYazisi;

                }

            }
            catch (Exception)
            {


                _Cevap.zAciklama = "";
                _Cevap.zSonuc = -1;
                _Cevap.ztabloyazisi = "";
                _Cevap.zbekleyenCount = "";
                _Cevap.zgecencount = "";
                _Cevap.zbodyYazisi = "";
            }
            return _Cevap;
        }
    }
}
