using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using kis_bahcesi.Context;
using kis_bahcesi.Models;

namespace kis_bahcesi.Context
{
    public class db
    {
        private Connect con;
        public db()
        {

            con = new Connect();
        }
        public Task<DataTable> get_model_listesi()
        {
            try
            {
                con.Open_Connection();
                con.Sql_Query("SELECT * FROM MODEL");
                DataTable dataTable = new DataTable();
                dataTable = con.Get_Table();
                con.Close_Connection();
                return Task.FromResult(dataTable);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public Task<DataTable> get_servis_listesi()
        {
            try
            {
                con.Open_Connection();
                con.Sql_Query("SELECT * FROM SERVIS");
                DataTable dataTable = new DataTable();
                dataTable = con.Get_Table();
                con.Close_Connection();
                return Task.FromResult(dataTable);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public Task<DataTable> get_tavan_listesi()
        {
            try
            {
                con.Open_Connection();
                con.Sql_Query("SELECT * FROM CAM");
                DataTable dataTable = new DataTable();
                dataTable = con.Get_Table();
                con.Close_Connection();
                return Task.FromResult(dataTable);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public Task<DataTable> get_renk_listesi()
        {
            try
            {
                con.Open_Connection();
                con.Sql_Query("SELECT * FROM RENK");
                DataTable dataTable = new DataTable();
                dataTable = con.Get_Table();
                con.Close_Connection();
                return Task.FromResult(dataTable);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public Task<DataTable> get_yan_listesi()
        {
            try
            {
                con.Open_Connection();
                con.Sql_Query("SELECT * FROM YAN_KAPAMA");
                DataTable dataTable = new DataTable();
                dataTable = con.Get_Table();
                con.Close_Connection();
                return Task.FromResult(dataTable);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public Task<DataTable> get_on_yan_listesi()
        {
            try
            {
                con.Open_Connection();
                con.Sql_Query("SELECT * FROM ON_KAPAMA");
                DataTable dataTable = new DataTable();
                dataTable = con.Get_Table();
                con.Close_Connection();
                return Task.FromResult(dataTable);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        public Task<Return_Fiyat> get_Fiyat_getir(string model_id, string servis_id, string cam_id, int ayak, int tiefe, int geislik)
        {
            try
            {
                int tiefe_son;
                int genislik_mod;
                int tiefe_mod;
                int geislik_son;
                tiefe_mod = (tiefe % 50);
                if (tiefe_mod == 0)
                {
                    tiefe_son = tiefe;
                }
                else
                {
                    tiefe_son = (tiefe - (tiefe % 50)) + 50;
                }

                if (tiefe_son >= 0 && tiefe_son < 200)
                    tiefe_son = 200;

                genislik_mod = (geislik % 100);
                if (genislik_mod == 0)
                {
                    geislik_son = geislik;
                }
                else
                {
                    geislik_son = (geislik - (geislik % 100)) + 100;
                }

                if (geislik_son >= 0 && geislik_son < 300)
                    geislik_son = 300;


                con.Open_Connection();
                con.Sql_Query(@"SELECT * FROM FIYAT
                              WHERE
                              MODEL_ID=@MODEL_ID AND
                              SERVIS_ID=@SERVIS_ID AND 
                              CAM_ID=@CAM_ID AND 
                              AYAK=@AYAK AND
                              TIEFE=@TIEFE");
                con.Add_Param("@MODEL_ID", model_id);
                con.Add_Param("@SERVIS_ID", servis_id);
                con.Add_Param("@CAM_ID", cam_id);
                con.Add_Param("@AYAK", ayak);
                con.Add_Param("@TIEFE", tiefe_son);
                if (con.Get_Table().Rows.Count > 0)
                {
                    string colon = $"_{geislik_son}";
                    Return_Fiyat retun_page = new Return_Fiyat()
                    {
                        
                        Return_ = Convert.ToInt32(con.Get_Table().Rows[0][$"{colon}"])
                    };
                        con.Close_Connection();
                        return Task.FromResult(retun_page);
                }
                else
                {
                    Return_Fiyat retun_page = new Return_Fiyat();
                    con.Close_Connection();
                    return Task.FromResult(retun_page);
                }    
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

}

        public Task<Return_Fiyat> get_Led_Fiyat_getir(string model_id, string cam_id, int tiefe, int geislik)
        {
            try
            {
                int tiefe_son;
                int genislik_mod;
                int tiefe_mod;
                int geislik_son;
                tiefe_mod = (tiefe % 50);
                if (tiefe_mod == 0)
                {
                    tiefe_son = tiefe;
                }
                else
                {
                    tiefe_son = (tiefe - (tiefe % 50)) + 50;
                }

                if (tiefe_son >= 0 && tiefe_son < 200)
                    tiefe_son = 200;

                genislik_mod = (geislik % 100);
                if (genislik_mod == 0)
                {
                    geislik_son = geislik;
                }
                else
                {
                    geislik_son = (geislik - (geislik % 100)) + 100;
                }

                if (geislik_son >= 0 && geislik_son < 300)
                    geislik_son = 300;


                con.Open_Connection();
                con.Sql_Query(@"SELECT * FROM LED
                              WHERE
                              MODEL_ID=@MODEL_ID AND
                              CAM_ID=@CAM_ID AND 
                              TIEFE=@TIEFE");
                con.Add_Param("@MODEL_ID", model_id);
                con.Add_Param("@CAM_ID", cam_id);
                con.Add_Param("@TIEFE", tiefe_son);
                if (con.Get_Table().Rows.Count > 0)
                {
                    string colon = $"_{geislik_son}";
                    Return_Fiyat retun_page = new Return_Fiyat()
                    {

                        Return_ = Convert.ToInt32(con.Get_Table().Rows[0][$"{colon}"])
                    };
                    con.Close_Connection();
                    return Task.FromResult(retun_page);
                }
                else
                {
                    Return_Fiyat retun_page = new Return_Fiyat();
                    con.Close_Connection();
                    return Task.FromResult(retun_page);
                }
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }

        public Task<Return_Fiyat> get_Dort_Fiyat_getir(string model_id, string cam_id, int tiefe, int geislik)
        {
            try
            {
                int tiefe_son;
                int genislik_mod;
                int tiefe_mod;
                int geislik_son;
                tiefe_mod = (tiefe % 50);
                if (tiefe_mod==0)
                {
                    tiefe_son = tiefe;
                }
                else
                {
                    tiefe_son = (tiefe - (tiefe % 50)) + 50;
                }
               
                if (tiefe_son >= 0 && tiefe_son < 200)
                    tiefe_son = 200;

                genislik_mod = (geislik % 100);
                if (genislik_mod==0)
                {
                    geislik_son = geislik;
                }
                else
                {
                    geislik_son = (geislik - (geislik % 100)) + 100;
                }
                
                if (geislik_son >= 0 && geislik_son < 300)
                    geislik_son = 300;

                con.Open_Connection();
                con.Sql_Query(@"SELECT * FROM DORT_AYAK_EK
                              WHERE
                              MODEL_ID=@MODEL_ID AND
                              CAM_ID=@CAM_ID AND 
                              TIEFE=@TIEFE");
                con.Add_Param("@MODEL_ID", model_id);
                con.Add_Param("@CAM_ID", cam_id);
                con.Add_Param("@TIEFE", tiefe_son);
                if (con.Get_Table().Rows.Count > 0)
                {
                    string colon = $"_{geislik_son}";
                    Return_Fiyat retun_page = new Return_Fiyat()
                    {

                        Return_ = Convert.ToInt32(con.Get_Table().Rows[0][$"{colon}"])
                    };
                    con.Close_Connection();
                    return Task.FromResult(retun_page);
                }
                else
                {
                    Return_Fiyat retun_page = new Return_Fiyat();
                    con.Close_Connection();
                    return Task.FromResult(retun_page);
                }
            }

            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }
    }
}