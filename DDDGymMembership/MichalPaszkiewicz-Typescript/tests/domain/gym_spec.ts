/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));

module CQRSjs.test{
    
    
    describe("a gym aggregate root", function(){

        var testGym = new Domain.Gym(IDGenerator.generate());

        it("should be an instance of EntityBase", function(){
            expect(testGym instanceof Domain.EntityBase).toBeTruthy();
        });

        it("should have a collection of monthly packages", function(){
            expect(testGym.MonthlyPackages.length).toBe(0);
        });

        it("should increment count of monthly packages on adding a new monthly package", function(){
            var testGym = new Domain.Gym(IDGenerator.generate());          
            var addMonthlyPackageCommand = new Domain.AddMonthlyPackageCommand(
                testGym.ID, IDGenerator.generate(),
                "testing gym", IDGenerator.generate(),
                "testName", 42);

            testGym.addMonthlyPackage(addMonthlyPackageCommand);

            expect(testGym.MonthlyPackages.length).toBe(1);
        }); 

        it("should throw an exception if monthly package has already been added", function(){
            var testGym = new Domain.Gym(IDGenerator.generate());
            var addMonthlyPackageCommand = new Domain.AddMonthlyPackageCommand(
                testGym.ID, IDGenerator.generate(),
                "testing gym", IDGenerator.generate(),
                "testName", 42);

            testGym.addMonthlyPackage(addMonthlyPackageCommand);

            expect(() => { 
                testGym.addMonthlyPackage(addMonthlyPackageCommand);
            }).toThrowError();            

        });

    });

    describe("a monthly package", function(){

        var testName = "testName";
        var testPrice = 42;

        it("should be an instance of EntityBase", function(){
            var testMonthlyPackage = new Domain.MonthlyPackage(IDGenerator.generate(), testName, testPrice);

            expect(testMonthlyPackage instanceof Domain.EntityBase).toBeTruthy();
        });

        it("should have a name and a price", function(){
            var testMonthlyPackage = new Domain.MonthlyPackage(IDGenerator.generate(), testName, testPrice);

            expect(testMonthlyPackage.Name).toBe(testName);
            expect(testMonthlyPackage.Price).toBe(testPrice);
        });

    });

}