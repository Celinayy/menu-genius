using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace MG_Admin_GUI.Models
{
    public class DataUpdater
    {
        private Timer timer;

        public event EventHandler DataUpdated;

        public DataUpdater()
        {
            // Timer inicializálása
            timer = new Timer(5000); // 5 másodperces periódus
            timer.Elapsed += TimerElapsed;
        }

        public void StartTimer()
        {
            // Timer indítása
            timer.Start();
        }

        private void TimerElapsed(object sender, ElapsedEventArgs e)
        {
            // Az adatok frissítését kiváltó esemény kiváltása
            OnDataUpdated();
        }

        private void OnDataUpdated()
        {
            // Esemény kiváltása
            DataUpdated?.Invoke(this, EventArgs.Empty);
        }
    }
}
