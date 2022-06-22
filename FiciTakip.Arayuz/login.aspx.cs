using DevExpress.Xpo;
using FiciTakip.Entity.EntityFramework;
using FiciTakip.Entity.Important;
using FiciTakip.Entity.Md5;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FiciTakip.Arayuz
{
    public partial class login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            fn_LoginOl();
            //fn_LoginOl();
        }

        public string GetUserIP()
        {
            string strIP = String.Empty;
            HttpRequest httpReq = HttpContext.Current.Request;

            if (httpReq.ServerVariables["HTTP_CLIENT_IP"] != null)
            {
                strIP = httpReq.ServerVariables["HTTP_CLIENT_IP"].ToString();
            }
            else if (httpReq.ServerVariables["HTTP_X_FORWARDED_FOR"] != null)
            {
                strIP = httpReq.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            }

            else if
            (
                (httpReq.UserHostAddress.Length != 0)
                &&

                ((httpReq.UserHostAddress != "::1") || (httpReq.UserHostAddress != "localhost"))
            )
            {
                strIP = httpReq.UserHostAddress;
            }

            else
            {
                WebRequest request = WebRequest.Create("http://checkip.dyndns.org/");
                using (WebResponse response = request.GetResponse())
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    strIP = sr.ReadToEnd();
                }

                int i1 = strIP.IndexOf("Address: ") + 9;
                int i2 = strIP.LastIndexOf("</body>");
                strIP = strIP.Substring(i1, i2 - i1);
            }
            return strIP;
        }

        private void fn_LoginOl()
        {
            if (txtUserName.Text.Trim().Equals("Admin") == false || txtPassword.Text.Trim().Equals("Bursa123.") == false)
            {
                return;
            }

            Session["isLogin"] = true;
            Session["KullaniciAdi"] = txtUserName.Text.Trim();

            string _Yetki = "roleadmin";

            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, "Admin", DateTime.Now, DateTime.Now.AddMinutes(75), false, _Yetki, FormsAuthentication.FormsCookiePath);

            string encTicket = FormsAuthentication.Encrypt(ticket);
            HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);

            if (ticket.IsPersistent)
            {
                cookie.Expires = ticket.Expiration;
            }

            Response.Cookies.Add(cookie);

            Response.Redirect("anasayfa.aspx");
        }
    }
}