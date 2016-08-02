namespace CQRSjs.ApplicationServices{
    
    export interface IAmACommandHandler{
        HandlesCommand: string;
        handle(command: Framework.Command): void;
    }
    
}