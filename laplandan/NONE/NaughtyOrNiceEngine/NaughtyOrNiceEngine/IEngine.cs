using NaughtyOrNiceEngine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NaughtyOrNiceEngine
{
    public interface IEngine
    {
        UserOutput JudgeUser(User user);
    }
}
