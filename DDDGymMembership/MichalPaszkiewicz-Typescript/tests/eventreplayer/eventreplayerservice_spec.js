var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));
eval(loadModule("eventreplayer"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var testEventReplayerService = new CQRSjs.EventReplayer.EventReplayerService();
        var _aggregateRootID = CQRSjs.IDGenerator.generate();
        var _userName = "testing eventreplayer";
        var num = 0;
        var CreateTableEvent = (function (_super) {
            __extends(CreateTableEvent, _super);
            function CreateTableEvent() {
                _super.call(this, _aggregateRootID, "CreateTableEvent", _userName);
            }
            return CreateTableEvent;
        }(CQRSjs.Framework.Event));
        var CreateTableEventHandler = (function () {
            function CreateTableEventHandler() {
                this.HandlesEvent = "CreateTableEvent";
            }
            CreateTableEventHandler.prototype.handle = function (event) {
                num = 0;
                CQRSjs.Projections.ProjectionStore.Instance.addTable("testTable");
            };
            return CreateTableEventHandler;
        }());
        CQRSjs.Projections.EventHandlerService.Instance.register(new CreateTableEventHandler());
        var TestEvent = (function (_super) {
            __extends(TestEvent, _super);
            function TestEvent() {
                _super.call(this, _aggregateRootID, "testEvent", _userName);
            }
            return TestEvent;
        }(CQRSjs.Framework.Event));
        var TestEventHandler = (function () {
            function TestEventHandler() {
                this.HandlesEvent = "testEvent";
            }
            TestEventHandler.prototype.handle = function (event) {
                var row = new CQRSjs.Projections.Row({ "num": num });
                num++;
                CQRSjs.Projections.ProjectionStore.Instance.addRowToTable("testTable", row);
            };
            return TestEventHandler;
        }());
        CQRSjs.Projections.EventHandlerService.Instance.register(new TestEventHandler());
        describe("an event replayer service", function () {
            CQRSjs.Framework.EventStoreService.Instance.store(new CreateTableEvent());
            for (var i = 0; i < 10; i++) {
                CQRSjs.Framework.EventStoreService.Instance.store(new TestEvent());
            }
            CQRSjs.Framework.TimeService.Instance.addMinutes(1);
            var intermediateTime = CQRSjs.Framework.TimeService.Instance.now();
            CQRSjs.Framework.TimeService.Instance.addMinutes(1);
            for (var i = 0; i < 10; i++) {
                CQRSjs.Framework.EventStoreService.Instance.store(new TestEvent());
            }
            it("should not have replayed the last 10 events if replaying to intermediateTime", function () {
                testEventReplayerService.replayTo(intermediateTime);
                expect(CQRSjs.Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(10);
                expect(num).toBe(10);
            });
            it("should have all the events if replaying to future", function () {
                testEventReplayerService.replayAll();
                expect(CQRSjs.Projections.ProjectionStore.Instance.getTable("testTable").Rows.length).toBe(20);
                expect(num).toBe(20);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
