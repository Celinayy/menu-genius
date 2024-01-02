using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MG_Admin_GUI
{
    internal class AppConfig
    {
        public static string DbServer => ConfigurationManager.AppSettings["DbServer"];
        public static string DbName => ConfigurationManager.AppSettings["DbName"];
        public static string DbUser => ConfigurationManager.AppSettings["DbUser"];
        public static string DbPassword => ConfigurationManager.AppSettings["DbPassword"];
    }
}
