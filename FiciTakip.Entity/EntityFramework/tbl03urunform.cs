using DevExpress.Xpo;
using FiciTakip.Entity.Important;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tbl03urunform")]
    public class tbl03urunform : TabloObject
    {
        public tbl03urunform(Session session) : base(session) { }

        string _urunformadi = "";
        [Persistent("urunformadi")]
        [Size(150)]
        public string urunformadi
        {
            get { return _urunformadi; }
            set { SetPropertyValue<string>("urunformadi", ref _urunformadi, value); }
        }
    }
}
