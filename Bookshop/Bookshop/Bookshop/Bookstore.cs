using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bookshop
{
    public class Bookstore
    {
        public List<Book> Books;
        public double ShoppingCartBalance { get; set; }

        public void Purchase(IList<string> bookNames )
        {
            var bookToPurchase = Books.Where(x => bookNames.Contains(x.Name));

            ShoppingCartBalance = bookToPurchase.Sum(x => x.Price);
        }
    }
}
