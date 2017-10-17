using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookshopKata
{
    public class Basket
    {
        static void Main(string[] args)
        {
            string input = Console.ReadLine();
            char[] delim = { ',' };
            var keys = input.Split(delim);
            var dict = new Dictionary<string, int>();
            foreach (var key in keys)
            {
                if (dict.ContainsKey(key))
                {
                    dict[key]++;
                }
                else
                {
                    dict[key] = 1;
                }
            }
            var result = Calculate(dict);
            Console.ReadLine();
        }

        public static decimal Calculate(Dictionary<string, int> dict)
        {
            return 8.0m;
        }

    }
}
