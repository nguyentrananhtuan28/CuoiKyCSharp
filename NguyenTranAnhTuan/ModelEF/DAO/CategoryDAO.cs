using ModelEF.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelEF.DAO
{
    public class CategoryDAO
    {
        private NguyenTranAnhTuanContext DB;

        public CategoryDAO()
        {
            DB = new NguyenTranAnhTuanContext();
        }
        public List<Category> GetAllCategories()
        {
            return DB.Categories.ToList();
        }
    }
}
