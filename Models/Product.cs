using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.Metrics;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
using MG_Admin_GUI.ViewModels;

namespace MG_Admin_GUI.Models
{
    public class Product : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        private int _id;
        public int id
        {
            get { return _id; }
            set
            {
                if (_id != value)
                {
                    _id = value;
                    OnPropertyChanged(nameof(id));
                }
            }
        }

        private string _name;
        public string name
        {
            get { return _name; }
            set
            {
                if (_name != value)
                {
                    _name = value;
                    OnPropertyChanged(nameof(name));
                }
            }
        }

        private string _description;
        public string description
        {
            get { return _description; }
            set
            {
                if (_description != value)
                {
                    _description = value;
                    OnPropertyChanged(nameof(description));
                }
            }
        }

        private Category _category;
        public Category category
        {
            get { return _category; }
            set
            {
                if (_category != value)
                {
                    _category = value;
                    OnPropertyChanged(nameof(category));
                }
            }
        }

        private string _quantity;
        public string quantity
        {
            get { return _quantity; }
            set
            {
                if (_quantity != value)
                {
                    _quantity = value;
                    OnPropertyChanged(nameof(quantity));
                }
            }
        }

        private int _price;
        public int price
        {
            get { return _price; }
            set
            {
                if (_price != value)
                {
                    _price = value;
                    OnPropertyChanged(nameof(price));
                }
            }
        }

        private bool _isFood;
        public bool isFood
        {
            get { return _isFood; }
            set
            {
                if (_isFood != value)
                {
                    _isFood = value;
                    OnPropertyChanged(nameof(isFood));
                }
            }
        }

        private string _image;
        public string image
        {
            get { return _image; }
            set
            {
                if (_image != value)
                {
                    _image = value;
                    OnPropertyChanged(nameof(image));
                    OnPropertyChanged(nameof(FullImagePath));
                }
            }
        }

        private ObservableCollection<Ingredient> _ingredients;
        public ObservableCollection<Ingredient> ingredients
        {
            get { return _ingredients; }
            set
            {
                if (value != _ingredients)
                {
                    _ingredients = value;
                    OnPropertyChanged(nameof(ingredients));
                    UpdateIngredientsAsString();
                }
            }
        }

        private string _ingredientsAsString;
        public string ingredientsAsString
        {
            get { return _ingredientsAsString; }
            private set
            {
                if (_ingredientsAsString != value)
                {
                    _ingredientsAsString = value;
                    OnPropertyChanged(nameof(ingredientsAsString));
                }
            }
        }

        private string _imageFolderPath;

        public string FullImagePath
        {
            get { return Path.Combine(_imageFolderPath, _image); }
        }

        public Product(string imageFolderPath)
        {
            _ingredients = new ObservableCollection<Ingredient>();
            _imageFolderPath = imageFolderPath;
        }


        private void UpdateIngredientsAsString()
        {
            ingredientsAsString = string.Join(", ", ingredients?.Select(ingredient => ingredient.name) ?? Enumerable.Empty<string>());
            OnPropertyChanged(nameof(ingredientsAsString));
        }

        public string GetFullImagePath(string image)
        {
            return Path.Combine(_imageFolderPath, image);
        }

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
