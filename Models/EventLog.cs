using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MG_Admin_GUI.Models
{
    public class EventLog : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        public int id { get; set; }
        public string eventType { get; set; }
        public string affectedTable { get; set; }
        public int affectedId { get; set; }
        public string eventDescription { get; set; }
        public DateTime date { get; set; }
        public User userId { get; set; }
    }
}
