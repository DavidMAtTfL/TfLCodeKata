namespace CQRSjs.EventReplayer{
    
    export class EventReplayerService{
        
        private static _instance: EventReplayerService;
        
        static get Instance(): EventReplayerService{
            if(EventReplayerService._instance == null){
                EventReplayerService._instance = new EventReplayerService();
            }
            return EventReplayerService._instance;
        }
        
        clearCurrentState(){
            Projections.ProjectionStore.Instance.clear();
        }
        
        replayAll(){
            this.clearCurrentState();
            
            var eventsStored = Framework.EventStoreService.Instance.EventsStored;
            
            eventsStored.forEach((c: Framework.Event)=>{  
                Projections.EventHandlerService.Instance.handle(c);                
            });
            
        }
        
        replayTo(time: Date){
            this.clearCurrentState();
            
            var eventsBeforeTime = Framework.EventStoreService.Instance.EventsStored
                                        .filter((c: Framework.Event)=>{ return c.Time < time.getTime() });
            
            eventsBeforeTime.forEach((c: Framework.Event)=>{
                Projections.EventHandlerService.Instance.handle(c); 
            });
            
        }
        
    }
    
}