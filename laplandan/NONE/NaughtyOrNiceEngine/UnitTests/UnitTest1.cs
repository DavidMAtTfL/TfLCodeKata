using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NaughtyOrNiceEngine;
using NaughtyOrNiceEngine.Models;
using System.Collections.Generic;

namespace UnitTests
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            // Arrange
            Engine naughtyEngine = new Engine();
            User user = new User();
            user.name = new Name()
            {
                title = "mrs",
                first = "Gloria",
                last = "Parra"
            };
            
            user.gender = "female";
            user.location = new Location()
            {
                city = "barcelona",
                street = "2743 avenida de andalucia",
                postcode = "26559"
            };
            
            user.phone = "960-308-520";
            user.Nice = new List<String>()
            {
                "gave your employees a pay rise",
                "volunteered a soup kitchen",
                "left a carrot out for rudolph",
                "went to church"
            };
            user.Naughty = new List<string>() { };
            UserOutput expectedUserOutput = new UserOutput()
            {
                name = "Gloria Parra",
                lumpsOfCoal = 0,
                candyCanes = 4
            };

            // Act
            UserOutput userOutput = naughtyEngine.JudgeUser(user);

            // Assert
            expectedUserOutput.
        }
    }
}
