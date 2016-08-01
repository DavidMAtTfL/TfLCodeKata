namespace CQRSjs.Projections{
    
    export class EventHandlerService{
        
        private static _instance: EventHandlerService;
        
        static get Instance(): EventHandlerService{
            if(EventHandlerService._instance == null){
                EventHandlerService._instance = new EventHandlerService();
            }
            return EventHandlerService._instance;
        }
        
        EventHandlers: IAmAnEventHandler[] = [];
        
        register(eventHandler: IAmAnEventHandler){
            this.EventHandlers.push(eventHandler);
        }
        
        handle(event: Framework.Event){
            
            this.EventHandlers.filter((eh: IAmAnEventHandler) => { return eh.HandlesEvent == event.EventName })
                .forEach((eh: IAmAnEventHandler)=>{ eh.handle(event); })
            
        }
        
    }
    
    Framework.EventStoreService.Instance.onAdded((e: Framework.Event) => { EventHandlerService.Instance.handle(e) });
    
}