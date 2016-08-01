/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));

module CQRSjs.Test{

    var _eventName = "test event";
    var _aggregateRootID = "123";
    var _userName = "eventstoreservice test";

    describe("the event store service", function(){
        var event = new Framework.Event(_aggregateRootID, _eventName, _userName);
        var lastLog = "no message";

        Framework.EventStoreService.Instance.clearOnAdded();
        Framework.EventStoreService.Instance.onAdded((event)=>{ lastLog = event.EventName });
        Framework.EventStoreService.Instance.store(event);

        it("should perform onAdded events correctly", function(){
            expect(lastLog).toBe(_eventName);
        });
    });

    describe("the event store service", function(){
        var event = new Framework.Event(_aggregateRootID, _eventName, _userName);
        var lastLog = "no message";

        Framework.EventStoreService.Instance.onAdded((event)=>{ lastLog = event.EventName });
        Framework.EventStoreService.Instance.clearOnAdded();
        Framework.EventStoreService.Instance.store(event);

        it("should clear onAdded events correctly", function(){
            expect(lastLog).toBe("no message");
        });
    });

    describe("the event store service", function(){
        var event = new Framework.Event(_aggregateRootID, _eventName, _userName);
        var lastLog = "no message";

        var testEventStore = new Framework.EventStoreService();
        testEventStore.store(event);

        it("should as default add items to the event store correctly", function(){
            expect(testEventStore.EventsStored[0].EventName).toBe(_eventName);
        });
    });

    describe("the event store service", function(){
        var testEventStore = new Framework.EventStoreService();
        var event1 = new Framework.Event(IDGenerator.generate(), "event 1", _userName);
        var event2 = new Framework.Event(IDGenerator.generate(), "event 2", _userName);
        testEventStore.overrideGetEvents(() => {return [event1, event2]});

        it("allows overriding of getEvents", function(){
            expect(testEventStore.EventsStored.length).toBe(2);
            expect(testEventStore.EventsStored[0]).toBe(event1);
            expect(testEventStore.EventsStored[1]).toBe(event2);
        });
    });

    describe("the event store service", function(){
        var testEventStore = new Framework.EventStoreService();
        var event1 = new Framework.Event(IDGenerator.generate(), "event 1", _userName);
        var event2 = new Framework.Event(IDGenerator.generate(), "event 2", _userName);
        testEventStore.overrideGetEventsWithID((id: string) => {return [event2]});

        it("allows overriding of getEventsWithID", function(){
            expect(testEventStore.getEventsWithID("asdfasdfasdf").length).toBe(1);
            expect(testEventStore.getEventsWithID("asdfasdfasdf")[0]).toBe(event2);
        });
    });

}