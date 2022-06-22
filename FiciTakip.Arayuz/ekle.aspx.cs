using DevExpress.Xpo;
using FiciTakip.Entity.EntityFramework;
using FiciTakip.Entity.Important;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FiciTakip.Arayuz
{
    public partial class ekle : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                using (Session session = XpoManager.Instance.GetNewSession())
                {

                    for (int intSayac = 300; intSayac <399 ; intSayac++)
                    {
                        string _Yazi = intSayac.ToString();

                        while (_Yazi.Length < 3)
                        {
                            _Yazi = "0" + _Yazi;
                        }


                        string _Kod = "FFFFAA000000000000003" + _Yazi;

                        new tblurun(session)
                        {
                            aktif = 1,
                            createuser = "",
                            databasekayitzamani = DateTime.Now,
                            etiketkod = _Kod,
                            gecisdurum = "0",
                            guncellemezamani = DateTime.Now,
                            id = Guid.NewGuid().ToString(),
                            lastupdateuser = "",
                            renk = "1",
                            urunadi = "1"

                        }.Save();
                    }
                }

                Response.Redirect("Anasayfa.aspx");
             }
        }
    }
}