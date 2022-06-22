using System;
using System.Web.Security;

namespace FiciTakip.Arayuz.Modal
{
    public class UserRoleProvider : RoleProvider
    {
        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }

        public override string[] GetRolesForUser(string username)
        {

            int _Sayac = 0;

            //#region Değişkenler
            //string _Sql = "";

            //DataTable _dTable = new DataTable();

            //cVeriTabani _myIslem = new cVeriTabani();

            //NpgsqlCommand _Komut = new NpgsqlCommand();
            //#endregion

            //_Sql = "select t1.yetkikodu as kod from tblyetki t1 " +
            //      "  inner join tblkullaniciyetki t2 on t1.tabloid = t2.tblyetkiid " +
            //      "  inner join tblkullanici t3 on t3.tabloid = t2.tblkullaniciid " +
            //      "  where t3.kullaniciadi = @kullaniciadi";

            //_Komut = new NpgsqlCommand(_Sql);
            //_Komut.Parameters.Clear();
            //_Komut.Parameters.AddWithValue("@kullaniciadi", username);

            //_dTable = _myIslem._fnDataTable(_Komut);

            //var userRoles=_dTable.AsEnumerable().Take(1).ToArray();

            //string[] userRoles = new string[_dTable.Rows.Count];

            string[] userRoles = { "roleadmin" };

            //for (int intSayac = 0; intSayac < _dTable.Rows.Count; intSayac++)
            //{
            //    userRoles[intSayac] = _dTable.Rows[intSayac]["kod"].ToString();
            //}

            return userRoles;

            //using (EmployeeContext _Context = new EmployeeContext())
            //{
            //    var userRoles = (from user in _Context.Users
            //                     join roleMapping in _Context.UserRoleMappings
            //                     on user.Id equals roleMapping.UserId
            //                     join role in _Context.Roles
            //                     on roleMapping.RoleId equals role.Id
            //                     where user.Username == username
            //                     select role.RoleName).ToArray();
            //    return userRoles;
            //}
        }
    }
}