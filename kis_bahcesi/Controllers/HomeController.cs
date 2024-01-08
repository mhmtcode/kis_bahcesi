using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using kis_bahcesi.Context;
using kis_bahcesi.Models;

namespace kis_bahcesi.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        db db = new db();
        public ActionResult Index()
        {

            return View();
        }
        public ActionResult Hesap()
        {
            //Listeler
            List<Modeller> Model_listesi = new List<Modeller>();
            List<Servisler> Servis_listesi = new List<Servisler>();

            //Converter
            Model_listesi = Converter.ConvertDataTable.ConvertToList<Modeller>(db.get_model_listesi().Result);
            Servis_listesi = Converter.ConvertDataTable.ConvertToList<Servisler>(db.get_servis_listesi().Result);
            //ViewBagler
            ViewBag.Model_List = Model_listesi;
            ViewBag.Servis_Listesi = Servis_listesi;
            return View();
        }

        public JsonResult Tavan_Listesi(string id)
        {
            List<Tavanlar> Tavan_Listesi = new List<Tavanlar>();
            Tavan_Listesi = Converter.ConvertDataTable.ConvertToList<Tavanlar>(db.get_tavan_listesi().Result);
            if (id != null)
            {
                return Json(Tavan_Listesi.Where(x => x.CAM_ID == id).ToList(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(Tavan_Listesi, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult Renk_Listesi(string id)
        {
            List<Color> Renk_Listesi = new List<Color>();
            Renk_Listesi = Converter.ConvertDataTable.ConvertToList<Color>(db.get_renk_listesi().Result);
            if (id != null)
            {
                return Json(Renk_Listesi.Where(x => x.ID == Convert.ToInt32(id)).ToList(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(Renk_Listesi, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult Yan_Listesi(string id)
        {
            List<Yanlar> Yan_Listesi = new List<Yanlar>();
            Yan_Listesi = Converter.ConvertDataTable.ConvertToList<Yanlar>(db.get_yan_listesi().Result);
            if (id != null)
            {
                return Json(Yan_Listesi.Where(x => x.ID == Convert.ToInt32(id)).ToList(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(Yan_Listesi, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult On_Listesi(string id)
        {
            List<On_Arka> On_Listesi = new List<On_Arka>();
            On_Listesi = Converter.ConvertDataTable.ConvertToList<On_Arka>(db.get_on_yan_listesi().Result);
            if (id != null)
            {
                return Json(On_Listesi.Where(x => x.ID == Convert.ToInt32(id)).ToList(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(On_Listesi, JsonRequestBehavior.AllowGet);
            }

        }


        [System.Web.Http.HttpPost]
        public JsonResult Fiyat_sonuc(string model_id, string servis_id, string cam_id, int ayak, int tiefe, int geislik)
        {
            return Json(db.get_Fiyat_getir(model_id, servis_id, cam_id, ayak, tiefe, geislik).Result, JsonRequestBehavior.AllowGet);

        }

        [System.Web.Http.HttpPost]
        public JsonResult Led_Fiyat_sonuc(string model_id, string cam_id, int tiefe, int geislik)
        {
            return Json(db.get_Led_Fiyat_getir(model_id, cam_id, tiefe, geislik).Result, JsonRequestBehavior.AllowGet);

        }

        [System.Web.Http.HttpPost]
        public JsonResult Dort_Fiyat_sonuc(string model_id, string cam_id, int tiefe, int geislik)
        {
            return Json(db.get_Dort_Fiyat_getir(model_id, cam_id, tiefe, geislik).Result, JsonRequestBehavior.AllowGet);

        }

    }
}