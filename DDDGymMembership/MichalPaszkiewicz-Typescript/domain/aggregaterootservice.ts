namespace CQRSjs.Domain{
    
    export class AggregateRootService{
        
        private static _instance: AggregateRootService;
        
        static get Instance(): AggregateRootService{
            if(AggregateRootService._instance == null){
                AggregateRootService._instance = new AggregateRootService();   
            }            
            return AggregateRootService._instance;
        }
        
        getByID<T extends AggregateRoot>(a: {new(id: string): T;}, aggregateRootID: string): T{
            var relevantAggregateRoot = new a(aggregateRootID);

            Framework.EventStoreService.Instance.getEventsWithID(aggregateRootID).forEach((e: Framework.Event) => {
                relevantAggregateRoot.applyEvent(e);
            });

            return relevantAggregateRoot;
        }
    }
}