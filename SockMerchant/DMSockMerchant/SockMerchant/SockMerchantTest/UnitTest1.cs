using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SockMerchant;

namespace SockMerchantTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void OneSock_NotPaired()
        {
            var inputArray = new string[] { "red" };
            var result = SockPairer.Process(inputArray);

            Assert.AreEqual(0, result);
        }

        [TestMethod]
        public void TwoSocksSameColour_Pair()
        {
            var inputArray = new string[] { "red", "red" };
            var result = SockPairer.Process(inputArray);

            Assert.AreEqual(1, result);
        }
    }
}
