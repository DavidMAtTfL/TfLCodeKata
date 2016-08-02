declare namespace CQRSjs.EventReplayer {
    class EventReplayerService {
        private static _instance;
        static Instance: EventReplayerService;
        clearCurrentState(): void;
        replayAll(): void;
        replayTo(time: Date): void;
    }
}
