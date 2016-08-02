/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));

module CQRSjs.test{

    describe("a batch", function(){

        var testBatch = new Domain.Batch(IDGenerator.generate());

        it("should be an instance of entity base", function(){
            expect(testBatch instanceof Domain.EntityBase).toBeTruthy();
        });

        it("should have transactions", function(){
            expect(testBatch.Transactions.length).toBe(0);
            var addTestTransactionCommand = new Domain.AddTransactionCommand(testBatch.ID, "transaction test", IDGenerator.generate(), 42);
            testBatch.addTransaction(addTestTransactionCommand);
            expect(testBatch.Transactions.length).toBe(1);
        });

    });

    describe("a batch", function(){

        var testBatch = new Domain.Batch(IDGenerator.generate());
        
        it("should throw an error if adding the same transaction twice", function(){
            var addTransactionCommand = new Domain.AddTransactionCommand(testBatch.ID, "transaction test", IDGenerator.generate(), 42);
            
            testBatch.addTransaction(addTransactionCommand);

            expect(() => { testBatch.addTransaction(addTransactionCommand); }).toThrowError();
        });

        it("should throw an error if adding a transaction with an amount less than 10", function(){
            var addTransactionCommand = new Domain.AddTransactionCommand(testBatch.ID, "transaction test", IDGenerator.generate(), 9.9);
            expect(() => { testBatch.addTransaction(addTransactionCommand); }).toThrowError();
        });
    });

    describe("a transaction", function(){

        var testTransaction = new Domain.Transaction(IDGenerator.generate(), 42);

        it("should be an instance of entity base", function(){
            expect(testTransaction instanceof Domain.EntityBase).toBeTruthy();
        });

    });



}