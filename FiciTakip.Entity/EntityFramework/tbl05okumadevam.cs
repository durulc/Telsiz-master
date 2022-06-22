using DevExpress.Xpo;
using FiciTakip.Entity.Important;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tbl05okumadevam")]
    public class tbl05okumadevam : TabloObject
    {
        public tbl05okumadevam(Session session) : base(session) { }

        string _deger = "";
        [Persistent("deger")]
        [Size(150)]
        public string deger
        {
            get { return _deger; }
            set { SetPropertyValue<string>("deger", ref _deger, value); }
        }

        string _sirano = "";
        [Persistent("sirano")]
        [Size(150)]
        public string sirano
        {
            get { return _sirano; }
            set { SetPropertyValue<string>("sirano", ref _sirano, value); }
        }
    }
}
