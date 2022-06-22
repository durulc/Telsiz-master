using DevExpress.Xpo;
using FiciTakip.Entity.Important;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tblurun")]
    public class tblurun : TabloObject
    {
        public tblurun(Session session) : base(session) { }

        string _urunadi = "";
        [Persistent("urunadi")]
        [Size(150)]
        public string urunadi
        {
            get { return _urunadi; }
            set { SetPropertyValue<string>("urunadi", ref _urunadi, value); }
        }

   

        string _etiketkod = "";
        [Persistent("etiketkod")]
        [Size(150)]
        public string etiketkod
        {
            get { return _etiketkod; }
            set { SetPropertyValue<string>("etiketkod", ref _etiketkod, value); }
        }

        string _renk = "";
        [Persistent("renk")]
        [Size(150)]
        public string renk
        {
            get { return _renk; }
            set { SetPropertyValue<string>("renk", ref _renk, value); }
        }


        string _gecisdurum = "";
        [Persistent("gecisdurum")]
        [Size(150)]
        public string gecisdurum
        {
            get { return _gecisdurum; }
            set { SetPropertyValue<string>("gecisdurum", ref _gecisdurum, value); }
        }
    }
}
