using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MPAE;
using System.Collections.Generic;

namespace MPAETests
{
    [TestClass]
    public class MincePieAllocationServiceTests
    {
        [TestMethod]
        public void GivenOneJourneyCalculatesFare()
        {
            var account = new Account()
            {
                Name = "Callum",
                LumpsOfCoal = 0,
                CandyCanes = 0
            };
            var journey = new Journey()
            {
                Line = "Arctic Circle Line",
                From = "Ornament",
                To = "Blackfiars",
                Stops = 2
            };

            var cost = MincePieAllocationService.CalculateFare(account, new List<Journey> { journey });

            Assert.AreEqual(1, cost);
        }

        [TestMethod]
        public void GivenRandomStopsCalculatesFare()
        {
            Random random = new Random();
            var stopAmount = random.Next(5, 10);

            var account = new Account()
            {
                Name = "Callum",
                LumpsOfCoal = 0,
                CandyCanes = 0
            };
            var journey = new Journey()
            {
                Line = "Arctic Circle Line",
                From = "Ornament",
                To = "Blackfiars",
                Stops = stopAmount
            };

            var cost = MincePieAllocationService.CalculateFare(account, new List<Journey> { journey });
            var expected = Math.Floor((double)stopAmount / 2);
            Assert.AreEqual(expected, cost);
        }

        [TestMethod]
        public void GivenMultipleRandomJourneysCalculatesFare()
        {
            Random random = new Random();

            var account = new Account()
            {
                Name = "Callum",
                LumpsOfCoal = 0,
                CandyCanes = 0
            };

            var totalStopAmount = 0;

            var journeyHistory = new List<Journey>();

            for(var i = 0; i < 10; i++){
                var stopAmount = random.Next(5, 10);
                totalStopAmount += stopAmount;

                journeyHistory.Add(new Journey(){
                    Line = "Arctic Circle Line",
                    From = "Ornament",
                    To = "Blackfiars",
                    Stops = stopAmount
                });
            }

            var cost = MincePieAllocationService.CalculateFare(account, journeyHistory);
            var expected = Math.Floor((double)totalStopAmount / 2);
            Assert.AreEqual(expected, cost);
        }

        [TestMethod]
        public void BoatyMcBoatFaceBaseFareTest()
        {
            Random random = new Random();

            var account = new Account()
            {
                Name = "Callum",
                LumpsOfCoal = 0,
                CandyCanes = 0
            };

            var totalStopAmount = 0;

            var journeyHistory = new List<Journey>();

            for (var i = 0; i < 10; i++)
            {
                var stopAmount = random.Next(5, 10);
                totalStopAmount += stopAmount;

                journeyHistory.Add(new Journey()
                {
                    Line = "BoatyMcBoatFace",
                    From = "Ornament",
                    To = "Blackfiars",
                    Stops = stopAmount
                });
            }

            var cost = MincePieAllocationService.CalculateFare(account, journeyHistory);
            var expected = 8*journeyHistory.Count;
            Assert.AreEqual(expected, cost);
        }

        public void OutOfSleighInterchangesAreFree()
        {
            var account = new Account()
            {
                Name = "Callum",
                LumpsOfCoal = 0,
                CandyCanes = 0
            };
            var journey = new Journey()
            {
                Line = "Out Of Sleigh Interchange",
                From = "Ornament",
                To = "Blackfiars",
                Stops = 2
            };
            List<Journey> journeys = new List<Journey> { journey };
            var cost = MincePieAllocationService.CalculateFare(account, journeys);
            Assert.AreEqual(0, cost);
        }
    }
}
