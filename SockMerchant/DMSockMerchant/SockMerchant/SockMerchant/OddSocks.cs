using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SockMerchant
{
    public class OddSocks
    {
        Dictionary<string, bool> Socks = new Dictionary<string, bool>();

        bool ContainsSock(string colour)
        {
            return Socks.ContainsKey(colour);
        }

        public bool CanPair(string colour)
        {
            if(ContainsSock(colour))
            {
                return true;
            }
            else
            {
                AddSockToPile(colour);
                return false;
            }
            
        }

        private void AddSockToPile(string colour)
        {
            Socks.Add(colour, true);
        }
    }
}
