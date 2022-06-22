using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DevExpress.Xpo;
using FiciTakip.Arayuz.Request;
using FiciTakip.Arayuz.Response;
using FiciTakip.Entity.EntityFramework;
using FiciTakip.Entity.Important;

namespace FiciTakip.Arayuz.Manager
{
    public class UrunManager
    {
        internal UrunKaydetResponse fn_UrunKaydet(UrunKaydetRequest v_Gelen)
        {
            #region Değişkenler

            UrunKaydetResponse _cevap = new UrunKaydetResponse();

            #endregion

            try
            {
                using (Session session = XpoManager.Instance.GetNewSession())
                {
                    tblurun _urun = session.Query<tblurun>().FirstOrDefault(x => x.aktif == 1 && x.etiketkod.Equals(v_Gelen.zetiketdeger));
                    if (_urun==null)
                    {
                     
                        new tblurun(session)
                        {
                            aktif = 1,
                            createuser = HttpContext.Current.Session["KullaniciAdi"].ToString(),
                            databasekayitzamani = DateTime.Now,
                            etiketkod = v_Gelen.zetiketdeger,
                            gecisdurum = "0",
                            guncellemezamani = DateTime.Now,
                            id = Guid.NewGuid().ToString().ToUpper(),
                            lastupdateuser = HttpContext.Current.Session["KullaniciAdi"].ToString(),
                            renk = v_Gelen.zurunrengi,
                            urunadi = v_Gelen.zurun
                        }.Save();
                        _cevap.zSonuc = 1;
                    }
                    else
                    {
                        _cevap.zSonuc = 2;
                    }
                        
                }

                
                _cevap.zAciklama = "";

            }
            catch (Exception)
            {

                _cevap.zSonuc = -1;
                _cevap.zAciklama = "";
            }
            return _cevap;
        }

        internal UrunKaydetResponse fn_UrunListele(UrunKaydetRequest v_Gelen)
        {
            UrunKaydetResponse _Cevap = new UrunKaydetResponse();

            string _TabloYazisi = "";

            try
            {
                using (Session session = XpoManager.Instance.GetNewSession())
                {
                    List<tblurun> _Liste = session.Query<tblurun>().OrderBy(w=>w.etiketkod).ToList();

                    foreach (var item in _Liste)
                    {
                        _TabloYazisi += "<tr>";
                        _TabloYazisi += "<td>"+item.etiketkod+"</td>";
                        string _Deger = item.etiketkod.Trim().ToString();
                        
                        _TabloYazisi += "<td> <img src = \"resimler/"+ item.aktif + ".png\" style='cursor:pointer;' onclick=fn_Degistir('"+ _Deger + "'); /></td>";                      
                        _TabloYazisi += "</tr>";
                    }    
                }

                _Cevap.zAciklama = _TabloYazisi;
            }
            catch (Exception ex)
            {

            }
            return _Cevap;
        }
    }
}