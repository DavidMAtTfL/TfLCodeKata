var CQRSjs;
(function (CQRSjs) {
    var EventReplayer;
    (function (EventReplayer) {
        var EventReplayerService = (function () {
            function EventReplayerService() {
            }
            Object.defineProperty(EventReplayerService, "Instance", {
                get: function () {
                    if (EventReplayerService._instance == null) {
                        EventReplayerService._instance = new EventReplayerService();
                    }
                    return EventReplayerService._instance;
                },
                enumerable: true,
                configurable: true
            });
            EventReplayerService.prototype.clearCurrentState = function () {
                CQRSjs.Projections.ProjectionStore.Instance.clear();
            };
            EventReplayerService.prototype.replayAll = function () {
                this.clearCurrentState();
                var eventsStored = CQRSjs.Framework.EventStoreService.Instance.EventsStored;
                eventsStored.forEach(function (c) {
                    CQRSjs.Projections.EventHandlerService.Instance.handle(c);
                });
            };
            EventReplayerService.prototype.replayTo = function (time) {
                this.clearCurrentState();
                var eventsBeforeTime = CQRSjs.Framework.EventStoreService.Instance.EventsStored
                    .filter(function (c) { return c.Time < time.getTime(); });
                eventsBeforeTime.forEach(function (c) {
                    CQRSjs.Projections.EventHandlerService.Instance.handle(c);
                });
            };
            return EventReplayerService;
        }());
        EventReplayer.EventReplayerService = EventReplayerService;
    })(EventReplayer = CQRSjs.EventReplayer || (CQRSjs.EventReplayer = {}));
})(CQRSjs || (CQRSjs = {}));
