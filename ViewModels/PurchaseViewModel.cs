using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using MG_Admin_GUI.Models;

namespace MG_Admin_GUI.ViewModels
{
    public class PurchaseViewModel : INotifyPropertyChanged
    {
        private ObservableCollection<Purchase> _Purchases;
        public ObservableCollection<Purchase> Purchases
        {
            get { return _Purchases; }
            set 
            {
                if (_Purchases != value)
                {
                    _Purchases = value;
                    OnPropertyChanged(nameof(Purchases));
                }
            }
        }



        public PurchaseViewModel()
        {
            Purchases = new ObservableCollection<Purchase>();
        }


        public event PropertyChangedEventHandler? PropertyChanged;
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }


    }
}
