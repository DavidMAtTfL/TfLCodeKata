/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));

module CQRSjs.Test{

    var _aggregateRootID = "123";
    var _userName = "testing event handlers"

    class TestEvent extends Framework.Event{
        TestProperty: string;
        
        constructor(testProperty: string){
            super(_aggregateRootID, "testEvent", _userName);
            this.TestProperty = testProperty;
        }
    }

    var lastEventTestProperty = "none";

    class TestEventHandler implements Projections.IAmAnEventHandler{
        HandlesEvent = "testEvent";

        handle(event: TestEvent){
            lastEventTestProperty = event.TestProperty;
        }
    } 

    var testEventHandler = new TestEventHandler();
    var testEvent = new TestEvent("test 1");       

    describe("an event handler service", function(){
        var testEventHandlerService = new Projections.EventHandlerService();

        testEventHandlerService.register(testEventHandler);
        testEventHandlerService.handle(testEvent);

        it("should handle the event with the correct EventHandler", function(){
            expect(lastEventTestProperty).toBe("test 1");
        });
    });

    describe("an event handler service", function(){
        var testEventHandlerService = new Projections.EventHandlerService();

        class SecondEventHandler implements Projections.IAmAnEventHandler{
            HandlesEvent = "none";

            handle(event: TestEvent){
                lastEventTestProperty = "this is now changed";
            }
        }

        testEventHandlerService.register(testEventHandler);
        testEventHandlerService.register(new SecondEventHandler());
        testEventHandlerService.handle(testEvent);

        it("does not handle with wrong seconds event handler", function(){
            expect(lastEventTestProperty).toBe("test 1");
        });
    });

    describe("an event handler service", function(){
        var testEventHandlerService = new Projections.EventHandlerService();

        class SecondEventHandler implements Projections.IAmAnEventHandler{
            HandlesEvent = "none";

            handle(event: TestEvent){
                lastEventTestProperty = "this is now changed";
            }
        }

        testEventHandlerService.register(testEventHandler);
        testEventHandlerService.register(new SecondEventHandler());

        it("has registered all the events it should have", function(){
            expect(testEventHandlerService.EventHandlers.length).toBe(2);
        });
    });

}