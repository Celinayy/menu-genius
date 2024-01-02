using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MG_Admin_GUI.Models
{
    public class Purchase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        public int id { get; set; }
        public DateTime date { get; set; }
        public int totalPay { get; set; }
        private List<KeyValuePair<Product, int>> _purchasedProducts;
        public List<KeyValuePair<Product, int>> purchasedProducts
        {
            get { return _purchasedProducts; }
            set
            {
                if (_purchasedProducts != value)
                {
                    _purchasedProducts = value;
                    OnPropertyChanged();
                }
            }
        }
        private OrderStatus _status;
        public OrderStatus status
        {
            get { return _status; }
            set
            {
                if (_status != value)
                {
                    _status = value;
                    OnPropertyChanged();
                    OnPropertyChanged(nameof(StatusAsString));
                }
            }
        }
        public string StatusAsString
        {
            get { return OrderStatusLocalization.GetLocalizedStatus(status); }
        }

        public bool paid { get; set; }
        public int userId { get; set; }
        public int deskId { get; set; }


        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

    public enum OrderStatus
    {
        ordered,
        cooked,
        served
    }

    public class OrderStatusLocalization
    {
        private static readonly Dictionary<OrderStatus, string> LocalizedStatuses = new Dictionary<OrderStatus, string>();

        static OrderStatusLocalization()
        {
            // Betöltjük az értékeket az App.config-ból
            foreach (OrderStatus status in Enum.GetValues(typeof(OrderStatus)))
            {
                string key = status.ToString();
                string value = ConfigurationManager.AppSettings[key];
                LocalizedStatuses.Add(status, value);
            }
        }

        public static string GetLocalizedStatus(OrderStatus status)
        {
            return LocalizedStatuses.TryGetValue(status, out string localizedStatus) ? localizedStatus : status.ToString();
        }
    }
}
