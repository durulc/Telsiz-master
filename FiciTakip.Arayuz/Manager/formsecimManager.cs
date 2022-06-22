using DevExpress.Xpo;
using FiciTakip.Arayuz.Request;
using FiciTakip.Arayuz.Response;
using FiciTakip.Entity.EntityFramework;
using FiciTakip.Entity.Important;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FiciTakip.Arayuz.Manager
{
    public class formsecimManager
    {
        internal KullaniciFormGetirResponse fn_KullaniciFormGetir(KullaniciFormGetirRequest v_gelen)
        {
            throw new NotImplementedException();
        }

        internal KullaniciFormKayitResponse fn_KullaniciFormKayit(KullaniciFormKayitRequest v_gelen)
        {
            KullaniciFormKayitResponse _Cevap = new KullaniciFormKayitResponse();

            using (Session session = XpoManager.Instance.GetNewSession())
            {
                string _KullaniciAdi = HttpContext.Current.Session["KullaniciAdi"].ToString().Trim();

                tbl02kullaniciform _Temp = session.Query<tbl02kullaniciform>().FirstOrDefault(w => w.kullaniciadi.Equals(_KullaniciAdi));

                if (_Temp != null)
                {
                    _Temp.Delete();
                }

                new tbl02kullaniciform(session)
                {
                    aktif = 1,
                    createuser = "system",
                    databasekayitzamani = DateTime.Now,
                    guncellemezamani = DateTime.Now,
                    id = Guid.NewGuid().ToString(),
                    kullaniciadi = _KullaniciAdi,
                    lastupdateuser = "system",
                    urunformid = v_gelen.urunformid
                }.Save();
            }

            return _Cevap;
        }

        internal UrunFormListeleResponse fn_UrunFormListeler(UrunFormListeleRequest v_gelen)
        {
            #region Değişkenler
            UrunFormListeleResponse _Cevap = new UrunFormListeleResponse();
            #endregion


            using (Session session = XpoManager.Instance.GetNewSession())
            {
                List<tbl03urunform> _Temp = session.Query<tbl03urunform>().Where(w => w.aktif == 1).OrderBy(w => w.urunformadi).ToList();

                string _ListeYazisi = "";

                _ListeYazisi = "";


                foreach (var item in _Temp)
                {
                    _ListeYazisi += "<option value='" + item.id + "'>" + item.urunformadi + "</option>";
                }

                _Cevap.tabloyazisi = _ListeYazisi;

            }

            return _Cevap;

           
        }
    }
}