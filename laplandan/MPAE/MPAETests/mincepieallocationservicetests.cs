using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MPAE;
using System.Collections.Generic;
using System.Linq;

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

            for(var i = 0; i < 3; i++){
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

            for (var i = 0; i < 3; i++)
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

        [TestMethod]
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

        [TestMethod]
        public void LumpsOfCoalAdd1MincePiePerLineUsed()
        {
            var random = new Random();

            var account = new Account()
            {
                Name = "Bob",
                LumpsOfCoal = random.Next(1, 3),
                CandyCanes = 0
            };

            var journey1 = new Journey()
                {
                    Line = "SomeLine",
                    From = "Ornament",
                    To = "Blackfiars",
                    Stops = 5
                };
            var journey2 = new Journey()
            {
                Line = "TestLine",
                From = "TestStart",
                To = "TestStop",
                Stops = 3
            };

            var journeyHistory = new List<Journey>(){
                journey1, journey2
            };

            var cost = MincePieAllocationService.CalculateFare(account, journeyHistory);

            Assert.AreEqual(4 + journeyHistory.GroupBy(j => j.Line).Count() * account.LumpsOfCoal ,cost);
        }

        [TestMethod]
        public void DailyCapOf30MincePiesIsApplied()
        {
            var random = new Random();

            var account = new Account()
            {
                Name = "Bob",
                LumpsOfCoal = random.Next(1, 3),
                CandyCanes = 3
            };

            var journey = new Journey()
            {
                Stops = 60
            };
            var journeyHistory = new List<Journey>(){journey};
            var dailyCap = 30 - account.CandyCanes;
            var cost = MincePieAllocationService.CalculateFare(account, journeyHistory);
            Assert.AreEqual(dailyCap, cost);
        }

        [TestMethod]
        public void PeopleWithElfInTheirNameTravelForFree()
        {
            Random random = new Random();

            var account = new Account()
            {
                Name = "Danny Elfman",
                LumpsOfCoal = 0,
                CandyCanes = 0
            };

            var totalStopAmount = 0;

            var journeyHistory = new List<Journey>();

            for (var i = 0; i < 3; i++)
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
            var expected = 0;
            Assert.AreEqual(expected, cost);
        }

        [TestMethod]
        public void PeopleWithLowerCaseElfInTheirNameTravelForFree()
        {
            Random random = new Random();

            var account = new Account()
            {
                Name = "Mr. Shelf",
                LumpsOfCoal = 0,
                CandyCanes = 0
            };

            var totalStopAmount = 0;

            var journeyHistory = new List<Journey>();

            for (var i = 0; i < 3; i++)
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
            var expected = 0;
            Assert.AreEqual(expected, cost);
        }
    }
}
