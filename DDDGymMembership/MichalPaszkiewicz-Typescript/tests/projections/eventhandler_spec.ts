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

    describe("an event handler", function(){
        var lastEventTestProperty = "none";

        class TestEventHandler implements Projections.IAmAnEventHandler{
            HandlesEvent = "testEvent";

            handle(event: TestEvent){
                lastEventTestProperty = event.TestProperty;
            }
        } 

        var testEventHandler = new TestEventHandler();
        var testEvent = new TestEvent("test 1");
        testEventHandler.handle(testEvent);

        it("correctly handles an event", function(){
            expect(lastEventTestProperty).toBe("test 1");
        });

    })

}