using ModelEF.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelEF.DAO
{
    public class ProductDAO
    {
        private NguyenTranAnhTuanContext DB;

        public ProductDAO()
        {
            DB = new NguyenTranAnhTuanContext();
        }
        public List<Product> GetAllProduct()
        {
            var produts = DB.Products
                                    .OrderBy(p => p.Quantity)
                                    .ThenByDescending(p => p.UnitCost)
                                .ToList();
            return produts;
        }
        public Product GetDetails(int id)
        {
            try
            {
                var produt = DB.Products.Find(id);
                return produt;
            }
            catch (Exception)
            {
                return null;
            }

        }
        public bool Insert(Product p)
        {
            try
            {
                DB.Products.Add(p);
                DB.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
