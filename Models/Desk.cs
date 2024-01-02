using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MG_Admin_GUI.Models
{
    public class Desk : INotifyPropertyChanged
    {

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

        private int _numberOfSeats;
        public int numberOfSeats
        {
            get { return _numberOfSeats; }
            set
            {
                if (numberOfSeats != value)
                {
                    _numberOfSeats = value;
                    OnPropertyChanged(nameof(numberOfSeats));
                }
            }
        }

        public override string ToString()
        {
            return $"Asztalszám: {id}, Ülőhely: {numberOfSeats}";
        }


        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
