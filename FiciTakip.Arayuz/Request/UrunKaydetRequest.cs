using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FiciTakip.Arayuz.Request
{
    public class UrunKaydetRequest:OrtakRequest
    {

        public string zurun { get; set; }
        public string zetiketdeger { get; set; }
        public string zurunrengi { get; set; }

    }
}