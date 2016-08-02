/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
eval(loadModule("applicationservices"));

module CQRSjs.Test{

    describe("an add monthly package command", function(){
        var gymID = IDGenerator.generate();
        var customerID = IDGenerator.generate();
        var userName = "testing command handlers";
        var packageID = IDGenerator.generate();
        var name = "testPackage";
        var price = 42;
        var addMonthlyPackageCommand = new Domain.AddMonthlyPackageCommand(
            gymID, customerID,
            userName, packageID,
            name, price);
        
        it("should have added the monthly package to the gym", function(){
            ApplicationServices.CommandHandlerService.Instance.handle(addMonthlyPackageCommand);
            var gym = Domain.AggregateRootService.Instance.getByID(Domain.Gym, gymID);
            var customer = Domain.AggregateRootService.Instance.getByID(Domain.Customer, customerID);
            expect(gym.MonthlyPackages.length).toBe(1);
            expect(customer.MonthlyPackage).toBeDefined();
        });
    });

    describe("a set address command", function(){
        var customerID = IDGenerator.generate();
        var userName = "testing command handlers";
        var city = "testCity";
        var province = "testProvince";
        var street = "testStreet";
        var setAddressCommand = new Domain.SetAddressCommand(customerID, userName, city, province, street);

        it("should have set the address on the customer", function(){
            ApplicationServices.CommandHandlerService.Instance.handle(setAddressCommand);
            var customer = Domain.AggregateRootService.Instance.getByID(Domain.Customer, customerID);
            expect(customer.Address.City).toBe(city);
            expect(customer.Address.Province).toBe(province);
            expect(customer.Address.Street).toBe(street);
        });
    });

    describe("an add transaction command", function(){
        var batchID = IDGenerator.generate();
        var userName = "testing command handlers";
        var transactionID = IDGenerator.generate();
        var amount = 42;

        var addTransactionCommand = new Domain.AddTransactionCommand(batchID, userName, transactionID, amount);

        it("should have added the transaction to the batch", function(){
            ApplicationServices.CommandHandlerService.Instance.handle(addTransactionCommand);
            var batch = Domain.AggregateRootService.Instance.getByID(Domain.Batch, batchID);
            expect(batch.Transactions.length).toBe(1);
            expect(batch.Transactions[0].ID).toBe(transactionID);
            expect(batch.Transactions[0].Amount).toBe(amount);
        });
    });

}