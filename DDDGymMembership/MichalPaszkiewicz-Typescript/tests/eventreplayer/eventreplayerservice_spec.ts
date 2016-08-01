/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));
eval(loadModule("eventreplayer"));

module CQRSjs.Test{

    var testEventReplayerService = new EventReplayer.EventReplayerService();
    var _aggregateRootID = IDGenerator.generate();
    var _userName = "testing eventreplayer";
    var num = 0;

    class CreateTableEvent extends Framework.Event{
        constructor(){
            super(_aggregateRootID, "CreateTableEvent", _userName);
        }
    }

    class CreateTableEventHandler implements Projections.IAmAnEventHandler{
        HandlesEvent = "CreateTableEvent";
        
        handle(event: CreateTableEvent){
            num = 0;
            Projections.ProjectionStore.Instance.addTable("testTable");
        }
    }
    Projections.EventHandlerService.Instance.register(new CreateTableEventHandler());

    class TestEvent extends Framework.Event{
        constructor(){
            super(_aggregateRootID, "testEvent", _userName);
        }
    }

    class TestEventHandler implements Projections.IAmAnEventHandler{
        HandlesEvent = "testEvent";

        handle(event: TestEvent){
            var row = new Projections.Row({"num":num});
            num++;
            Projections.ProjectionStore.Instance.addRowToTable("testTable", row);
        }
    }
    Projections.EventHandlerService.Instance.register(new TestEventHandler());

    describe("an event replayer service", function(){
        
        Framework.EventStoreService.Instance.store(new CreateTableEvent());
        for(var i = 0; i < 10; i++){
            Framework.EventStoreService.Instance.store(new TestEvent());
        }

        Framework.TimeService.Instance.addMinutes(1);
        var intermediateTime = Framework.TimeService.Instance.now();

        Framework.TimeService.Instance.addMinutes(1);
        for(var i = 0; i < 10; i++){
            Framework.EventStoreService.Instance.store(new TestEvent());
        }
    
        it("should not have replayed the last 10 events if replaying to intermediateTime", function(){
            testEventReplayerService.replayTo(intermediateTime);
            expect(Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(10);
            expect(num).toBe(10);
        });

        it("should have all the events if replaying to future", function(){
            testEventReplayerService.replayAll();
            expect(Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(20);
            expect(num).toBe(20);
        });

    });

}
