using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MG_Admin_GUI.Models
{
    public class Ingredient : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public int id { get; set; }
        public string name { get; set; }
        public decimal inStock { get; set; }
        public string qUnit { get; set; }

        private ObservableCollection<Allergen> _ingredientAllergens;
        public ObservableCollection<Allergen> ingredientAllergens
        {
            get { return this._ingredientAllergens; }
            set
            {
                if (_ingredientAllergens != value)
                {
                    _ingredientAllergens = value;
                    OnPropertyChanged(nameof(ingredientAllergens));
                    UpdateAllergensAsString();
                }
            }
        }

        private string _allergensAsString;
        public string allergensAsString
        {
            get { return _allergensAsString; }
            private set
            {
                if (_allergensAsString != value)
                {
                    _allergensAsString = value;
                    OnPropertyChanged(nameof(allergensAsString));
                }
            }
        }

        private void UpdateAllergensAsString()
        {
            allergensAsString = string.Join(", ", ingredientAllergens?.Select(allergen => allergen.name) ?? Enumerable.Empty<string>());
            OnPropertyChanged(nameof(allergensAsString));
        }


    }
}
