using DevExpress.Xpo;
using FiciTakip.Entity.EntityFramework;
using FiciTakip.Entity.Important;
using System;
using System.Linq;
using System.Web.UI;

namespace FiciTakip.Arayuz
{
    public partial class database : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!Page.IsPostBack)
            {
                using (Session session = XpoManager.Instance.GetNewSession())
                {
                    XpoManager.Instance.InitXpo();
                }

                
                using (Session session = XpoManager.Instance.GetNewSession())
                {
                    #region Admin Kullanıcı ekle
                    tbl01kullanici _KullaniciTemp = session.Query<tbl01kullanici>().FirstOrDefault(w => w.aktif == 1 && w.kullaniciadi.Equals("Admin"));

                    if (_KullaniciTemp == null)
                    {
                        string _Sifre = Entity.Md5.EncryptionHelper.ToMD5("Bursa123.");

                        new tbl01kullanici(session)
                        {
                            aktif=1,
                            createuser="Admin",
                            databasekayitzamani=DateTime.Now,
                            guncellemezamani=DateTime.Now,
                            id=Guid.NewGuid().ToString(),
                            kullaniciadi="Admin",
                            lastupdateuser="Admin",
                            sifre= _Sifre
                        }.Save();
                    }
                    #endregion

                    #region Ürün form

                    #region Çekirdek

                    tbl03urunform _Temp = session.Query<tbl03urunform>().FirstOrDefault(w => w.aktif == 1 && w.urunformadi.Equals("Çekirdek"));

                    if (_Temp == null)
                    {
                      
                        new tbl03urunform(session)
                        {
                           urunformadi= "Çekirdek",
                           aktif=1,
                           createuser="system",
                           databasekayitzamani=DateTime.Now,
                           guncellemezamani= DateTime.Now,
                           id=Guid.NewGuid().ToString(),
                           lastupdateuser= "system"
                        }.Save();
                    }

                    _Temp = session.Query<tbl03urunform>().FirstOrDefault(w => w.aktif == 1 && w.urunformadi.Equals("Tablet"));

                    if (_Temp == null)
                    {

                        new tbl03urunform(session)
                        {
                            urunformadi = "Tablet",
                            aktif = 1,
                            createuser = "system",
                            databasekayitzamani = DateTime.Now,
                            guncellemezamani = DateTime.Now,
                            id = Guid.NewGuid().ToString(),
                            lastupdateuser = "system"
                        }.Save();
                    }

                    _Temp = session.Query<tbl03urunform>().FirstOrDefault(w => w.aktif == 1 && w.urunformadi.Equals("Granülasyon"));

                    if (_Temp == null)
                    {

                        new tbl03urunform(session)
                        {
                            urunformadi = "Granülasyon",
                            aktif = 1,
                            createuser = "system",
                            databasekayitzamani = DateTime.Now,
                            guncellemezamani = DateTime.Now,
                            id = Guid.NewGuid().ToString(),
                            lastupdateuser = "system"
                        }.Save();
                    }

                    #endregion

                    #endregion
                }

               
            }
        }
    }
}