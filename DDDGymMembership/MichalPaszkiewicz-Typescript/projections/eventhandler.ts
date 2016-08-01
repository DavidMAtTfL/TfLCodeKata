namespace CQRSjs.Projections{
    
    export interface IAmAnEventHandler{
        HandlesEvent: string;
        handle(event: Framework.Event);
    }
    
}