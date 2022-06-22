using DevExpress.Xpo;
using FiciTakip.Entity.Important;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tblkapigecis")]
    public class tblkapigecis: TabloObject
    {
        public tblkapigecis(Session session) : base(session) { }

        string _epc = "";
        [Persistent("epc")]
        [Size(150)]
        public string epc
        {
            get { return _epc; }
            set { SetPropertyValue<string>("epc", ref _epc, value); }
        }

    }
}
