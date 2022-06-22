using DevExpress.Xpo;
using FiciTakip.Entity.Important;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tbl02kullaniciform")]
    public class tbl02kullaniciform : TabloObject
    {
        public tbl02kullaniciform(Session session) : base(session) { }

        string _kullaniciadi = "";
        [Persistent("kullaniciadi")]
        [Size(150)]
        public string kullaniciadi
        {
            get { return _kullaniciadi; }
            set { SetPropertyValue<string>("kullaniciadi", ref _kullaniciadi, value); }
        }

        string _urunformid = "";
        [Persistent("urunformid")]
        [Size(150)]
        public string urunformid
        {
            get { return _urunformid; }
            set { SetPropertyValue<string>("urunformid", ref _urunformid, value); }
        }
    }
}
