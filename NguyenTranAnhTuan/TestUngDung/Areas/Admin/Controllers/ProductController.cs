using ModelEF.DAO;
using ModelEF.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestUngDung.Areas.Admin.Controllers
{
    public class ProductController : Controller
    {
        // GET: Admin/Product
        public ActionResult Index()
        {
            ProductDAO PD = new ProductDAO();
            var model = PD.GetAllProduct();
            return View(model);
        }
        public ActionResult Details(int id)
        {
            ProductDAO PD = new ProductDAO();
            return View(PD.GetDetails(id));
        }
        [HttpPost]
        public ActionResult Create(Product model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var PD = new ProductDAO();
                    if (PD.Insert(model))
                    {
                        return RedirectToAction("Index");
                    }
                }
                SetViewBag();
                return View();
            }
            catch (Exception)
            {
                SetViewBag();
                return View();
            }
        }
        //GET
        public ActionResult Create()
        {
            SetViewBag();
            return View();
        }
        public void SetViewBag(long? selectedID = null)
        {
            CategoryDAO CD = new CategoryDAO();
            var model = CD.GetAllCategories();
            @ViewBag.CategoryID = new SelectList(model, "ID", "Name", selectedID);
        }
    }
}