/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));

module CQRSjs.test{

    describe("an address with a null street", function(){

        it("should throw an error", function(){
            expect(() => new Domain.Address("testCity", "testProvince", null)).toThrowError();
        });

    });

    describe("an address with a null province", function(){

        it("should throw an error", function(){
            expect(() => new Domain.Address("testCity", null, "testCity")).toThrowError();
        });

    });

    describe("an address with a null city", function(){

        it("should throw an error", function(){
            expect(() => new Domain.Address(null, "testProvince", "testCity")).toThrowError();
        });

    });

    describe("an address with an empty string street", function(){

        it("should throw an error", function(){
            expect(() => new Domain.Address("testCity", "testProvince", "")).toThrowError();
        });

    });

    describe("an address with an empty string province", function(){

        it("should throw an error", function(){
            expect(() => new Domain.Address("testCity", "", "testCity")).toThrowError();
        });

    });

    describe("an address with an empty string city", function(){

        it("should throw an error", function(){
            expect(() => new Domain.Address("", "testProvince", "testCity")).toThrowError();
        });

    });

    describe("an address", function(){

        var street = "testStreet";
        var province = "testProvince";
        var city = "testCity";

        var address1 = new Domain.Address(city, province, street);
        var address2 = new Domain.Address(city, province, street);
        var address3 = new Domain.Address(city, province, "other street");

        it("should be equal to another address with the same street, city and province", function(){

            expect(address1.equals(address2)).toBeTruthy();

        });

        it("should be unequal to an address with a different street", function(){

            expect(address1.equals(address3)).toBeFalsy();

        });

    });

    describe("a customer", function(){

        var testCustomer = new Domain.Customer(IDGenerator.generate());

        it("should be an instance of entity base", function(){

            expect(testCustomer instanceof Domain.EntityBase).toBeTruthy();

        });

        it("should have an address", function(){

            var testCity = "testCity";
            var testProvince = "testProvince";
            var testStreet = "testStreet";
            var setAddressCommand = new Domain.SetAddressCommand(testCustomer.ID, "testing customer", testCity, testProvince, testStreet);

            testCustomer.setAddress(setAddressCommand);

            expect(testCustomer.Address.City).toBe(testCity);
            expect(testCustomer.Address.Province).toBe(testProvince);
            expect(testCustomer.Address.Street).toBe(testStreet);

        });     

        it("should have a monthly package", function(){

            var testMonthlyPackage = new Domain.MonthlyPackage(IDGenerator.generate(), "testPackage", 42);
            var addMonthlyPackageCommand = new Domain.AddMonthlyPackageCommand(
                IDGenerator.generate(), testCustomer.ID, 
                "testing customer", IDGenerator.generate(),
                "testPackage", 42);

            testCustomer.setMonthlyPackage(addMonthlyPackageCommand);

            var monthlyPackage = testCustomer.MonthlyPackage;

            expect(monthlyPackage.Name).toBe("testPackage");
            expect(monthlyPackage.Price).toBe(42);

        });

    });

}