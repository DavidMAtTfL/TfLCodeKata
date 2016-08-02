var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = "123";
        var _userName = "testing aggregate root";
        var _eventName = "test event";
        var TestAggregateRoot = (function (_super) {
            __extends(TestAggregateRoot, _super);
            function TestAggregateRoot(id) {
                _super.call(this, id);
                var self = this;
                self.registerEventAction(new CQRSjs.Domain.EventAction(_eventName, function (e) { self.TestProperty = e.EventName; }));
            }
            TestAggregateRoot.prototype.testMethod = function (command) {
                this.applyEvent(new CQRSjs.Framework.Event(_aggregateRootID, _eventName, _userName));
            };
            return TestAggregateRoot;
        }(CQRSjs.Domain.AggregateRoot));
        describe("a new aggregate root", function () {
            var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);
            it("has the correct ID", function () {
                expect(testAggregateRoot.ID).toBe(_aggregateRootID);
            });
        });
        describe("a new aggregate root", function () {
            var testEvent = new CQRSjs.Framework.Event(_aggregateRootID, _eventName, _userName);
            var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);
            testAggregateRoot.applyEvent(testEvent);
            it("performs desired event actions", function () {
                expect(testAggregateRoot.TestProperty).toBe(_eventName);
            });
        });
        describe("a new aggregate root", function () {
            var testCommand = new CQRSjs.Framework.Command(_aggregateRootID, _userName, "test command");
            var testAggregateRoot = new TestAggregateRoot(_aggregateRootID);
            testAggregateRoot.testMethod(testCommand);
            it("sets an event off correctly after a command is applied to it", function () {
                expect(testAggregateRoot.TestProperty).toBe(_eventName);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
