using NaughtyOrNiceEngine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace NaughtyOrNiceEngine
{
    public class Engine : IEngine
    {
        public UserOutput JudgeUser(User user)
        {

            UserOutput userOutput = new UserOutput();
            userOutput.name = user.name.first + " " + user.name.last;
            userOutput.candyCanes = user.Nice.Count;
            userOutput.lumpsOfCoal = user.Naughty.Count;
            return userOutput;
        }

        public static void Main(string[] args)
        {
        }
    }
}
