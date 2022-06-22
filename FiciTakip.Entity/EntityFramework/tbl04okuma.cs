using DevExpress.Xpo;
using FiciTakip.Entity.Important;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tbl04okuma")]
    public class tbl04okuma : TabloObject
    {
        public tbl04okuma(Session session) : base(session) { }

        string _gelenepc = "";
        [Persistent("gelenepc")]
        [Size(150)]
        public string gelenepc
        {
            get { return _gelenepc; }
            set { SetPropertyValue<string>("gelenepc", ref _gelenepc, value); }
        }
    }
}
