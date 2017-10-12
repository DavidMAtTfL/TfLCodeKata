using System;
using System.Collections.Generic;
using Bookshop;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace BookshopTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            //given
            var bookstore = new Bookstore
            {
                Books = new List<Book>()
                {
                    new Book()
                    {
                        Name = "Harry Potter",
                        Price = 8.0
                    }
                }
            };
            //When
            bookstore.Purchase(new []{"Harry Potter"});

            //Then
            Assert.AreEqual(8.0, bookstore.ShoppingCartBalance); 
        }  
        [TestMethod]
        public void buying_two_books_final_value_should_be_discounted()
        {
            //given
            var bookstore = new Bookstore
            {
                Books = new List<Book>()
                {
                    new Book()
                    {
                        Name = "Harry Potter",
                        Price = 8.0
                    },
                    new Book()
                    {
                        Name = "Harry Potter1",
                        Price = 8.0
                    }
                }
            };
            //When
            bookstore.Purchase(new[] { "Harry Potter", "Harry Potter1" });

            //Then
            Assert.AreEqual(16, bookstore.ShoppingCartBalance); 
        }
    }
}
