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
    public class ProductViewModel : INotifyPropertyChanged
    {
        private ObservableCollection<Product> _Products;
        public ObservableCollection<Product> Products 
        {
            get {  return _Products; }
            set
            {
                if (_Products != value)
                {
                    _Products = value;
                    OnPropertyChanged(nameof(Products));
                }
            }
        }

        //private ObservableCollection<Ingredient> _ingredients;
        //public ObservableCollection<Ingredient> ingredients
        //{
        //    get { return this._ingredients; }
        //    set
        //    {
        //        if (_ingredients != value)
        //        {
        //            _ingredients = value;
        //            OnPropertyChanged(nameof(ingredients));
        //        }
        //    }
        //}


        private Product _selectedProduct;
        public Product selectedProduct
        {
            get { return _selectedProduct; }
            set
            {
                if (_selectedProduct != value)
                {
                    _selectedProduct = value;
                    OnPropertyChanged(nameof(selectedProduct));
                    OnPropertyChanged(nameof(Product.FullImagePath));
                }
            }
        }

        public ProductViewModel()
        {
            Products = new ObservableCollection<Product>();
            selectedProduct = null;
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

    }
}
