using ModelEF.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft;

namespace ModelEF.DAO
{
    public class UserAccountDAO
    {
        private NguyenTranAnhTuanContext DB;

        public UserAccountDAO()
        {
            DB = new NguyenTranAnhTuanContext();
        }
        public bool CheckAccount(string userName, string pass)
        {
            pass = Common.CreateMD5(pass.Trim().ToLower());
            var Result = DB.UserAccounts.SingleOrDefault(
                    x => x.UserName.Trim().ToLower().Contains(userName.Trim().ToLower()) &&
                    x.PassWord.Trim().Contains(pass) &&
                    x.Status.Contains("Active")
                );
            if (Result == null)
            {
                return false;
            }
            return true;
        }
        public List<UserAccount> GetAllUser(int page)
        {
            //Bắt đầu lấy từ (page-1)*5
            var Result = DB.UserAccounts.OrderBy(x => x.ID).Skip((page - 1) * 5).Take(5).ToList();
            return Result;
        }
        public void DeleteUser(int id)
        {
            try
            {
                var User = DB.UserAccounts.Where(
                        u => u.ID == id &&
                        u.Status.Contains("Blocked")
                    ).SingleOrDefault();
                if (User != null)
                {
                    DB.UserAccounts.Remove(User);
                    DB.SaveChanges();
                }
            }
            catch (Exception) { }
        }
        public int CountPageUser()
        {
            int counter = DB.UserAccounts.Count();
            int maxpage = (int)Math.Round(counter / 5.0 + 0.5);
            return maxpage;
        }
    }
}
