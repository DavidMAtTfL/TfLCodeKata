namespace CQRSjs.Framework{
    
    export class EventStoreService{
        
        private static _instance: EventStoreService;
        
        static get Instance(): EventStoreService{
            if(EventStoreService._instance == null){
                EventStoreService._instance = new EventStoreService();
            }
            return EventStoreService._instance;
        }

        constructor(){
            var self = this;
            self.onAdded((event)=>{
                self._eventsStored.push(event)
            });
        }
        
        private _eventsStored: Event[] = [];
        private _funcsOnAdded: ((event: Event) => void)[] = [];
        private _getEvents(): Event[]{
            return this._eventsStored;
        }
        
        get EventsStored(): Event[]{
            return this._getEvents();
        }

        getEventsWithID(id: string){
            return this._getEvents().filter((e: Event)=>{return e.AggregateRootID == id});
        }

        overrideGetEvents(func: ()=>Event[]){
            this._getEvents = func;
        }

        overrideGetEventsWithID(func: (id:string)=>Event[]){
            this.getEventsWithID = func;
        }
        
        store(event: Event){
            this._funcsOnAdded.forEach((func) => {
                func(event);
            })
        }
        
        onAdded(func: (event: Event) => void){
            this._funcsOnAdded.push(func);
        }
        
        clearOnAdded(){
            this._funcsOnAdded = [];
        }
        
    }
    
}