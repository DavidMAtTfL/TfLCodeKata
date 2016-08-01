/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));

module CQRSjs.Test{
    var _aggregateRootID = "123";
    var _eventName = "testEvent";
    var _userName = "test";
    
    describe("a basic event", function(){
        var event = new Framework.Event(_aggregateRootID, _eventName, _userName);

        it("has the correct aggregateRootID", function(){
            expect(event.AggregateRootID).toBe(_aggregateRootID);
        });

        it("has the correct eventName", function(){
            expect(event.EventName).toBe(_eventName); 
        });

        it("has the correct userName", function(){
            expect(event.UserName).toBe(_userName);
        })
    });

    describe("a new event class", function(){
        class TestEvent extends Framework.Event{

        }
        var event = new Framework.Event(_aggregateRootID, _eventName, _userName);

        it("has the correct aggregateRootID", function(){
            expect(event.AggregateRootID).toBe(_aggregateRootID);
        });

        it("has the correct eventName", function(){
            expect(event.EventName).toBe(_eventName); 
        });

        it("has the correct userName", function(){
            expect(event.UserName).toBe(_userName);
        })
    });
}