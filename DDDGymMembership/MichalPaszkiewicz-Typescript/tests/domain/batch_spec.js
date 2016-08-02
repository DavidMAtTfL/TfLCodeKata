/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
var CQRSjs;
(function (CQRSjs) {
    var test;
    (function (test) {
        describe("a batch", function () {
            var testBatch = new CQRSjs.Domain.Batch(CQRSjs.IDGenerator.generate());
            it("should be an instance of entity base", function () {
                expect(testBatch instanceof CQRSjs.Domain.EntityBase).toBeTruthy();
            });
            it("should have transactions", function () {
                expect(testBatch.Transactions.length).toBe(0);
                var addTestTransactionCommand = new CQRSjs.Domain.AddTransactionCommand(testBatch.ID, "transaction test", CQRSjs.IDGenerator.generate(), 42);
                testBatch.addTransaction(addTestTransactionCommand);
                expect(testBatch.Transactions.length).toBe(1);
            });
        });
        describe("a batch", function () {
            var testBatch = new CQRSjs.Domain.Batch(CQRSjs.IDGenerator.generate());
            it("should throw an error if adding the same transaction twice", function () {
                var addTransactionCommand = new CQRSjs.Domain.AddTransactionCommand(testBatch.ID, "transaction test", CQRSjs.IDGenerator.generate(), 42);
                testBatch.addTransaction(addTransactionCommand);
                expect(function () { testBatch.addTransaction(addTransactionCommand); }).toThrowError();
            });
            it("should throw an error if adding a transaction with an amount less than 10", function () {
                var addTransactionCommand = new CQRSjs.Domain.AddTransactionCommand(testBatch.ID, "transaction test", CQRSjs.IDGenerator.generate(), 9.9);
                expect(function () { testBatch.addTransaction(addTransactionCommand); }).toThrowError();
            });
        });
        describe("a transaction", function () {
            var testTransaction = new CQRSjs.Domain.Transaction(CQRSjs.IDGenerator.generate(), 42);
            it("should be an instance of entity base", function () {
                expect(testTransaction instanceof CQRSjs.Domain.EntityBase).toBeTruthy();
            });
        });
    })(test = CQRSjs.test || (CQRSjs.test = {}));
})(CQRSjs || (CQRSjs = {}));
