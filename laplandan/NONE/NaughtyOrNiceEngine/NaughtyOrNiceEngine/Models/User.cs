using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NaughtyOrNiceEngine.Models
{
    public class User
    {
        public Name name { get; set; }
        public string gender { get; set; }
        public Location location { get; set; }
        public string phone { get; set; }
        public List<string> Naughty { get; set; }
        public List<string> Nice { get; set; }
    }

    public class Name
    {
        public string title { get; set; }
        public string first { get; set; }
        public string last { get; set; }
    }

    public class Location
    {
        public string street { get; set; }
        public string city { get; set; }
        public string postcode { get; set; }
    }
}
