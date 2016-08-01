var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = "123";
        var _userName = "testing event handlers";
        var TestEvent = (function (_super) {
            __extends(TestEvent, _super);
            function TestEvent(testProperty) {
                _super.call(this, _aggregateRootID, "testEvent", _userName);
                this.TestProperty = testProperty;
            }
            return TestEvent;
        }(CQRSjs.Framework.Event));
        describe("an event handler", function () {
            var lastEventTestProperty = "none";
            var TestEventHandler = (function () {
                function TestEventHandler() {
                    this.HandlesEvent = "testEvent";
                }
                TestEventHandler.prototype.handle = function (event) {
                    lastEventTestProperty = event.TestProperty;
                };
                return TestEventHandler;
            }());
            var testEventHandler = new TestEventHandler();
            var testEvent = new TestEvent("test 1");
            testEventHandler.handle(testEvent);
            it("correctly handles an event", function () {
                expect(lastEventTestProperty).toBe("test 1");
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
