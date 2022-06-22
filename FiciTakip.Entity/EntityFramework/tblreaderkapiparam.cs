using DevExpress.Xpo;
using FiciTakip.Entity.Important;

namespace FiciTakip.Entity.EntityFramework
{
    [Persistent("tblreaderkapiparam")]
    public class tblreaderkapiparam : TabloObject
    {
        public tblreaderkapiparam(Session session) : base(session) { }

        string _kapiepc = "";
        [Persistent("kapiepc ")]
        [Size(150)]
        public string kapiepc
        {
            get { return _kapiepc; }
            set { SetPropertyValue<string>("kapiepc ", ref _kapiepc, value); }
        }

        string _kapiokumagucu = "";
        [Persistent("kapiokumagucu")]
        [Size(150)]
        public string kapiokumagucu
        {
            get { return _kapiokumagucu; }
            set { SetPropertyValue<string>("kapiokumagucu", ref _kapiokumagucu, value); }
        }

        string _kapiip = "";
        [Persistent("kapiip")]
        [Size(150)]
        public string kapiip
        {
            get { return _kapiip; }
            set { SetPropertyValue<string>("kapiip", ref _kapiip, value); }
        }





    }

}
