/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));

module CQRSjs.Test{

    var _aggregateRootID = "123";
    var _userName = "test";

    describe("an instance of a bass command", function(){
        var testCommand = new Framework.Command(_aggregateRootID,_userName, "testCommand");

        it("has an aggregate root", function(){
            expect(testCommand.AggregateRootID).toBe(_aggregateRootID);
        });

        it("has username set", function(){
            expect(testCommand.UserName).toBe(_userName);
        });

        it("has a command name set", function(){
            expect(testCommand.CommandName).toBe("testCommand");
        });

        it("has time created set", function(){
            expect(testCommand.Time).toBeDefined();
        });
    });

    describe("a new command class", function(){

        class TestCommand extends Framework.Command{
        }

        var testCommandInstance = new TestCommand(_aggregateRootID, _userName, "testCommand");

        it("has an aggregate root", function(){
            expect(testCommandInstance.AggregateRootID).toBe(_aggregateRootID);
        });

        it("has username set", function(){
            expect(testCommandInstance.UserName).toBe(_userName);
        });

        it("has a command name set", function(){
            expect(testCommandInstance.CommandName).toBe("testCommand");
        });

        it("has time created set", function(){
            expect(testCommandInstance.Time).toBeDefined();
        });

    });

}