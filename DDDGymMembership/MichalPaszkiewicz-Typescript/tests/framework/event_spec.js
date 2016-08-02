var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = "123";
        var _eventName = "testEvent";
        var _userName = "test";
        describe("a basic event", function () {
            var event = new CQRSjs.Framework.Event(_aggregateRootID, _eventName, _userName);
            it("has the correct aggregateRootID", function () {
                expect(event.AggregateRootID).toBe(_aggregateRootID);
            });
            it("has the correct eventName", function () {
                expect(event.EventName).toBe(_eventName);
            });
            it("has the correct userName", function () {
                expect(event.UserName).toBe(_userName);
            });
        });
        describe("a new event class", function () {
            var TestEvent = (function (_super) {
                __extends(TestEvent, _super);
                function TestEvent() {
                    _super.apply(this, arguments);
                }
                return TestEvent;
            }(CQRSjs.Framework.Event));
            var event = new CQRSjs.Framework.Event(_aggregateRootID, _eventName, _userName);
            it("has the correct aggregateRootID", function () {
                expect(event.AggregateRootID).toBe(_aggregateRootID);
            });
            it("has the correct eventName", function () {
                expect(event.EventName).toBe(_eventName);
            });
            it("has the correct userName", function () {
                expect(event.UserName).toBe(_userName);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
