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

    describe("aggregate root service", function(){
        var testAggregateRootService = new Domain.AggregateRootService();

        it("should add an aggregate root correctly", function(){
            expect(testAggregateRootService.getByID(TestAggregateRoot, _aggregateRootID).ID).toBe(_aggregateRootID);
        })
    });
}