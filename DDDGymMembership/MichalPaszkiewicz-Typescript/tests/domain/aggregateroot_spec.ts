/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));

module CQRSjs.Test{

    var _aggregateRootID = "123";
    var _userName = "testing aggregate root";
    var _eventName = "test event";

    class TestAggregateRoot extends Domain.AggregateRoot{
        TestProperty: string;

        testMethod(command: Framework.Command){
            this.applyEvent(new Framework.Event(_aggregateRootID, _eventName, _userName));
        }

        constructor(id: string){
            super(id);
            var self = this;
            self.registerEventAction(new Domain.EventAction(_eventName, (e) => { self.TestProperty = e.EventName }));
        }
    }

    describe("a new aggregate root", function(){
    
        var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);

        it("has the correct ID", function(){
            expect(testAggregateRoot.ID).toBe(_aggregateRootID);
        });
        
    });

    describe("a new aggregate root", function(){
    
        var testEvent = new Framework.Event(_aggregateRootID, _eventName, _userName);
        var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);

        testAggregateRoot.applyEvent(testEvent);

        it("performs desired event actions", function(){
            expect(testAggregateRoot.TestProperty).toBe(_eventName);
        });
        
    });

    describe("a new aggregate root", function(){
        var testCommand = new Framework.Command(_aggregateRootID, _userName, "test command");
        var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);
        testAggregateRoot.testMethod(testCommand);

        it("sets an event off correctly after a command is applied to it", function(){
            expect(testAggregateRoot.TestProperty).toBe(_eventName);
        })
    });

}