using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using BookshopKata;

namespace BookshopKataTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void OneBook_CalculatesCorrect()
        {
            var dict = new Dictionary<string, int>();
            dict.Add("1", 1);

            var result = Basket.Calculate(dict);

            Assert.AreEqual(8.0m, result);
        }
    }
}
