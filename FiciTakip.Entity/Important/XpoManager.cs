using DevExpress.Xpo;
using DevExpress.Xpo.DB;
using DevExpress.Xpo.Metadata;
using System.Configuration;
using System.Reflection;

namespace FiciTakip.Entity.Important
{
    public class XpoManager : Singleton<XpoManager>
    {
        private string _connectionString;

        public string ConnectionString
        {
            get { return _connectionString; }
        }

        //public void InitServiceXpo(String connectionString)
        //{
        //    _connectionString = connectionString;
        //    UpdateDatabase();
        //}






        public void InitXpo()
        {


            SimpleDataLayer.SuppressReentrancyAndThreadSafetyCheck = true;


            string Server = ConfigurationSettings.AppSettings["BaglantiSunucuIp"].ToString().Trim();
            string UserID = ConfigurationSettings.AppSettings["BaglantiKullaniciAdi"].ToString().Trim();
            string password = ConfigurationSettings.AppSettings["BaglantiSifre"].ToString().Trim();
            string Database = ConfigurationSettings.AppSettings["BaglantiDatabase"].ToString().Trim();
            string Port = ConfigurationSettings.AppSettings["BaglantiPort"].ToString().Trim();

            _connectionString = PostgreSqlConnectionProvider.GetConnectionString(Server, int.Parse(Port), UserID, password, Database);

            UpdateDatabase();
        }

        private XpoManager() { }

        public Session GetNewSession()
        {


            string Server = ConfigurationSettings.AppSettings["BaglantiSunucuIp"].ToString().Trim();
            string UserID = ConfigurationSettings.AppSettings["BaglantiKullaniciAdi"].ToString().Trim();
            string password = ConfigurationSettings.AppSettings["BaglantiSifre"].ToString().Trim();
            string Database = ConfigurationSettings.AppSettings["BaglantiDatabase"].ToString().Trim();
            string Port = ConfigurationSettings.AppSettings["BaglantiPort"].ToString().Trim();

            _connectionString = PostgreSqlConnectionProvider.GetConnectionString(Server, int.Parse(Port), UserID, password, Database);

            using (IDataLayer dal = XpoDefault.GetDataLayer(_connectionString, AutoCreateOption.DatabaseAndSchema))
            {
                return new Session(DataLayer);
            }
        }



        public UnitOfWork GetNewUnitOfWork()
        {
            return new UnitOfWork(DataLayer);
        }

        private readonly object _lockObject = new object();

        volatile IDataLayer _fDataLayer;

        IDataLayer DataLayer
        {
            get
            {
                if (_fDataLayer == null)
                {
                    lock (_lockObject)
                    {
                        if (_fDataLayer == null)
                        {
                            _fDataLayer = GetDataLayer();
                        }
                    }
                }
                return _fDataLayer;
            }
        }

        private IDataLayer GetDataLayer()
        {

            XpoDefault.Session = null;
            XPDictionary dict = new ReflectionDictionary();
            dict.GetDataStoreSchema(Assembly.GetExecutingAssembly());

            return XpoDefault.GetDataLayer(_connectionString, AutoCreateOption.DatabaseAndSchema);

        }





        private void UpdateDatabase()
        {

            string Server = ConfigurationSettings.AppSettings["BaglantiSunucuIp"].ToString().Trim();
            string UserID = ConfigurationSettings.AppSettings["BaglantiKullaniciAdi"].ToString().Trim();
            string password = ConfigurationSettings.AppSettings["BaglantiSifre"].ToString().Trim();
            string Database = ConfigurationSettings.AppSettings["BaglantiDatabase"].ToString().Trim();
            string Port = ConfigurationSettings.AppSettings["BaglantiPort"].ToString().Trim();

            _connectionString = PostgreSqlConnectionProvider.GetConnectionString(Server, int.Parse(Port), UserID, password, Database);

            using (IDataLayer dal = XpoDefault.GetDataLayer(_connectionString, AutoCreateOption.DatabaseAndSchema))
            {
                using (Session session = new Session(dal))
                {
                    Assembly asm = Assembly.GetExecutingAssembly();
                    session.UpdateSchema(asm);
                    session.CreateObjectTypeRecords(asm);
                }
            }
        }
    }
}
