using System;
using System.Web.UI;

namespace FiciTakip.Arayuz
{
    public partial class Site1 : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                try
                {
                    if (Session["isLogin"] == null || bool.Parse(Session["isLogin"].ToString()) == false)
                    {
                        Response.Redirect("login.aspx");
                    }

                    else
                    {

                    }
                }
                catch (Exception ex)
                {
                    Response.Redirect("login.aspx");
                }
            }
        }
    }
}