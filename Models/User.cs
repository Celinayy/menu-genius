using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MG_Admin_GUI.Models
{
    public class User : INotifyPropertyChanged
    {
        public int id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string phone { get; set; }
        public bool admin { get; set; }

        public override string ToString()
        {
            return $"ID: {id}, Név: {name}";
        }

        public User Login(string username, string password)
        {
            // Ellenőrzés az adatbázisban
            User loggedInUser = UserRepository.GetUserByUsernameAndPassword(username, password);

            if (loggedInUser != null && loggedInUser.IsAdmin)
            {
                // Sikeres bejelentkezés, átadás az actualUser-nek
                actualUser = loggedInUser;
                return loggedInUser;
            }
            else
            {
                // Sikertelen bejelentkezés
                return null;
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }


    }
}
