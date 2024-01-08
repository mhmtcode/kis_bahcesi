using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace kis_bahcesi.Models
{
    public class Tavanlar
    {
        public int ID { get; set; }
        public string CAM_NAME { get; set; }
        public string CAM_ID { get; set; }
        public string IMAGES { get; set; }
        public int GENISLIK { get; set; }
        public int YUKSEKLIK { get; set; }
        public int DERINLIK { get; set; }
        
    }
}