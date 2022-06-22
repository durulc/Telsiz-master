using DevExpress.Xpo;
using FiciTakip.Entity.Important;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tbl01kullanici")]
    public class tbl01kullanici : TabloObject
    {
        public tbl01kullanici(Session session) : base(session) { }

        string _kullaniciadi = "";
        [Persistent("kullaniciadi")]
        [Size(150)]
        public string kullaniciadi
        {
            get { return _kullaniciadi; }
            set { SetPropertyValue<string>("kullaniciadi", ref _kullaniciadi, value); }
        }

        string _sifre = "";
        [Persistent("sifre")]
        [Size(150)]
        public string sifre
        {
            get { return _sifre; }
            set { SetPropertyValue<string>("sifre", ref _sifre, value); }
        }
    }
}
