using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace Game2.Controllers
{
    public class GameController : Controller
    {
        // GET: Game
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetHtmlContent()
        {
            var files = Directory.GetFiles(Server.MapPath("~/App/Html/Properties"));
            List<string> htmlastext = new List<string>();

            foreach (var file in files)
            {
                htmlastext.Add(System.IO.File.ReadAllText(file));
            }
            
            return Json(htmlastext, JsonRequestBehavior.AllowGet);
        }
        

        public JsonResult GetHtmlMenus()
        {
            var files = Directory.GetFiles(Server.MapPath("~/App/Html/Menus"));
            List<string> htmlastext = new List<string>();

            foreach (var file in files)
            {
                htmlastext.Add(System.IO.File.ReadAllText(file));
            }

            return Json(htmlastext, JsonRequestBehavior.AllowGet);
        }
    }
}