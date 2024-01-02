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
    public class Reservation : INotifyPropertyChanged
    {


        public int id { get; set; }
        public int numberOfGuests { get; set; }
        public DateTime arrivalTime { get; set; }
        public DateTime getawayTime { get; set; }
        public string name { get; set; }
        public string phone { get; set; }
        public Desk deskId { get; set; }

        //private ObservableCollection<Desk> _reservationDesks;
        //public ObservableCollection<Desk> reservationDesks
        //{
        //    get { return _reservationDesks; }
        //    set
        //    {
        //        if (value != _reservationDesks)
        //        {
        //            _reservationDesks = value;
        //            OnPropertyChanged(nameof(reservationDesks));
        //            UpdateReservationDesksAsString();
        //        }
        //    }
        //}


        //private string _reservationDesksAsString;
        //public string reservationDesksAsString
        //{
        //    get { return _reservationDesksAsString; }
        //    private set
        //    {
        //        if (_reservationDesksAsString != value)
        //        {
        //            _reservationDesksAsString = value;
        //            OnPropertyChanged(nameof(reservationDesksAsString));
        //        }
        //    }
        //}

        //private void UpdateReservationDesksAsString()
        //{
        //    reservationDesksAsString = string.Join(", ", reservationDesks?.Select(desk => desk.numberOfSeats) ?? Enumerable.Empty<int>());
        //    OnPropertyChanged(nameof(reservationDesksAsString));
        //}



        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }


    }
}
