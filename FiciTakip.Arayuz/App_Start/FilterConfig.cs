using System.Web;
using System.Web.Mvc;

namespace FiciTakip.Arayuz
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
