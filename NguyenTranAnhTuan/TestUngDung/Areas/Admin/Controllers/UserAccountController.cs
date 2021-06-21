using ModelEF.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestUngDung.Areas.Admin.Controllers
{
    public class UserAccountController : Controller
    {
        private UserAccountDAO UD;
        public UserAccountController()
        {
            UD = new UserAccountDAO();
        }
        // GET: Admin/UserAccount
        public ActionResult Index(int Page)
        {
            var model = UD.GetAllUser(Page);
            @ViewBag.page = Page;
            @ViewBag.maxpage = UD.CountPageUser();
            return View(model);
        }
        public ActionResult Delete(int id, int page)
        {
            UD.DeleteUser(id);
            return RedirectToAction("Index", "UserAccount", new { Page = page });
        }
    }
}