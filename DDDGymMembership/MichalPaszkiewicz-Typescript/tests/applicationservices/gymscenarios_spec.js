/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
eval(loadModule("applicationservices"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        describe("an add monthly package command", function () {
            var gymID = CQRSjs.IDGenerator.generate();
            var customerID = CQRSjs.IDGenerator.generate();
            var userName = "testing command handlers";
            var packageID = CQRSjs.IDGenerator.generate();
            var name = "testPackage";
            var price = 42;
            var addMonthlyPackageCommand = new CQRSjs.Domain.AddMonthlyPackageCommand(gymID, customerID, userName, packageID, name, price);
            it("should have added the monthly package to the gym", function () {
                CQRSjs.ApplicationServices.CommandHandlerService.Instance.handle(addMonthlyPackageCommand);
                var gym = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Gym, gymID);
                var customer = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Customer, customerID);
                expect(gym.MonthlyPackages.length).toBe(1);
                expect(customer.MonthlyPackage).toBeDefined();
            });
        });
        describe("a set address command", function () {
            var customerID = CQRSjs.IDGenerator.generate();
            var userName = "testing command handlers";
            var city = "testCity";
            var province = "testProvince";
            var street = "testStreet";
            var setAddressCommand = new CQRSjs.Domain.SetAddressCommand(customerID, userName, city, province, street);
            it("should have set the address on the customer", function () {
                CQRSjs.ApplicationServices.CommandHandlerService.Instance.handle(setAddressCommand);
                var customer = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Customer, customerID);
                expect(customer.Address.City).toBe(city);
                expect(customer.Address.Province).toBe(province);
                expect(customer.Address.Street).toBe(street);
            });
        });
        describe("an add transaction command", function () {
            var batchID = CQRSjs.IDGenerator.generate();
            var userName = "testing command handlers";
            var transactionID = CQRSjs.IDGenerator.generate();
            var amount = 42;
            var addTransactionCommand = new CQRSjs.Domain.AddTransactionCommand(batchID, userName, transactionID, amount);
            it("should have added the transaction to the batch", function () {
                CQRSjs.ApplicationServices.CommandHandlerService.Instance.handle(addTransactionCommand);
                var batch = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Batch, batchID);
                expect(batch.Transactions.length).toBe(1);
                expect(batch.Transactions[0].ID).toBe(transactionID);
                expect(batch.Transactions[0].Amount).toBe(amount);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
