using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookShop
{
    class Program
    {
        static void Main(string[] args)
        {
            int cost = 0;
            string input = string.Empty;
            while(!input.ToLower().Equals("exit"))
            {
                Console.WriteLine("enter books");
                input = Console.ReadLine();
                if (input.Equals("book1"))
                {
                    cost = cost + 8;
                }
                if (input.Equals("book2"))
                {
                    cost = cost + 8;
                }
                Console.WriteLine("cost:" + cost);
            }
        }
    }
}
