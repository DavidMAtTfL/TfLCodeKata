using Microsoft.VisualStudio.TestTools.UnitTesting;
using SockMerchant;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SockMerchant.Tests
{
    [TestClass()]
    public class OddSocksTests
    {
        [TestMethod()]
        public void CanPair_CanPairToEmpty_ReturnFalse()
        {
            var sut = new OddSocks();

            var result = sut.CanPair("red");

            Assert.IsFalse(result);
        }

        [TestMethod]
        public void CanPair_CanPairWithSameColour_ReturnTrue()
        {
            var sut = new OddSocks();

            sut.CanPair("red");
            var result = sut.CanPair("red");

            Assert.IsTrue(result);
        }
    }
}