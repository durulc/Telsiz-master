using FiciTakip.Arayuz.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FiciTakip.Arayuz.Response
{
    public class RdrKapiParametreKayitRequest : OrtakRequest
    {
        public string zReaderIp { get; set; }
        public string zReaderPower { get; set; }
        public string zRfidId { get; set; }
    }
}