using System;
using System.Data;
using System.Data.SQLite;
using System.Web;

namespace kis_bahcesi.Context
{
    public class Connect
    {
        private SQLiteConnection _Connection;
        private SQLiteDataAdapter _DataAdapter;
        private SQLiteDataReader _DataReader;
        public SQLiteCommand _SqlCommand;
        private DataTable _DataTable;
        public string sql_cm { get; set; }


        public void Dispose()
        {
            if (_Connection != null)
            {
                _Connection.Dispose();
                _Connection = null;
            }
            if (_DataAdapter != null)
            {
                _DataAdapter.Dispose();
                _DataAdapter = null;
            }
            if (_DataReader != null)
            {
                _DataReader.Dispose();
                _DataReader = null;
            }
            if (_SqlCommand != null)
            {
                _SqlCommand.Dispose();
                _SqlCommand = null;
            }
            if (_DataTable != null)
            {
                _DataTable.Dispose();
                _DataTable = null;
            }

        }
        //constructor reads connection information and sets it as sql connection string
        public Connect()
        {

            //create connection string
            try
            {
                //build connection
                _Connection = new SQLiteConnection("Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/data.db"));

            }
            catch (Exception e)
            {
                Create_Log(string.Format("{0} Cannot create connection or connection string error. ({1})", DateTime.Now, e.Message));
            }
        }

        public void Create_EternalDB_Con()
        {
            //create connection string
            try
            {
                //build connection
                _Connection = new SQLiteConnection("Data Source=" + HttpContext.Current.Server.MapPath("~/App_Data/db1.db"));
            }
            catch
            {
                //Create_Log(string.Format("{0} Cannot create connection or connection string error. ({1})", DateTime.Now, e.Message));

            }
        }

        //define open connection method
        public void Open_Connection()
        {
            try
            {
                _Connection.Open();

            }
            catch
            {

                // Create_Log(string.Format("{0} Connection time out(con.open). ({1})", DateTime.Now, e.Message));

            }
        }

        //define close connection method
        public void Close_Connection()
        {
            _Connection.Close();
        }

        //define sql query method
        public void Sql_Query(string SQL_Query_Text)
        {
            _SqlCommand = new SQLiteCommand(SQL_Query_Text, _Connection);
            sql_cm = SQL_Query_Text; //hata sayfasına sorgu cümleciği gönderiyor
        }

        //define table getter method
        public DataTable Get_Table()
        {
            _DataAdapter = new SQLiteDataAdapter(_SqlCommand);
            _DataTable = new DataTable();
            _DataAdapter.Fill(_DataTable);
            return _DataTable;
        }

        //define nonexecute query method
        public void NonExec_Query()
        {
            _SqlCommand.ExecuteNonQuery();

        }

        //define one row or a cell reader method
        public string[] Get_Row(string SQL_Text, string Row)
        {
            string[] Readed_Data = new string[10];
            int i = 0;
            _SqlCommand = new SQLiteCommand(SQL_Text, _Connection);
            _DataReader = _SqlCommand.ExecuteReader();
            while (_DataReader.Read())
            {
                Readed_Data[i] = _DataReader[Row].ToString();
            }
            _DataReader.Close();
            return Readed_Data;
        }

        //define parameter adder to a query method
        public void Add_Param(string parameterno, object parameter)
        {
            _SqlCommand.Parameters.AddWithValue(parameterno, parameter);
        }

        //define logging method
        public void Create_Log(String lines)
        {
            //StreamWriter errorlogfile = File.AppendText(string.Format("{0}\\logs\\errorlogs.txt", Directory.GetCurrentDirectory()));
            //errorlogfile.WriteLine(lines);
            //errorlogfile.Close();
            //Process.Start("notepad.exe", string.Format("{0}\\logs\\errorlogs.txt", apppath));
            //System.Windows.Forms.Application.Exit();



        }



        public bool Is_Connect()
        {
            bool success;
            if (_Connection.State == ConnectionState.Open)
            {
                success = true;
            }
            else
            {
                success = false;
            }
            return success;
        }

        //define checking a data in a table method
        public bool IsExsist(string TableName)
        {
            bool Flag;
            string Result;
            Sql_Query("select count(*) as CountNumber from @d1");
            Add_Param("@d1", TableName);
            Result = Get_Row(_SqlCommand.ToString(), "CountNumber")[0];

            if (Convert.ToInt32(Result) == 0)
            {
                Flag = false;
            }
            else
            {
                Flag = true;
            }
            return Flag;
        }

        //c# date type to sql type converter
        public string Date_Convert(string date, string format)
        {
            string converted = "";
            if (format == "JustDate")
            {
                DateTime myDateTime = Convert.ToDateTime(date);
                converted = myDateTime.ToString("yyyy-MM-dd");
            }
            if (format == "DateAndHour")
            {
                DateTime myDateTime = Convert.ToDateTime(date);
                converted = myDateTime.ToString("yyyy-MM-dd HH:mm:ss");
            }
            return converted;
        }
    }
}