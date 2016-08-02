namespace CQRSjs.Framework{
    
    export class Command{
        AggregateRootID: string;
        UserName: string;
        Time: number;
        CommandName: string;
        
        constructor(aggregateRootID: string, userName: string, commandName: string){
            this.AggregateRootID = aggregateRootID;
            this.UserName = userName;
            this.Time = TimeService.Instance.nowTicks();
            this.CommandName = commandName;
        }
    }
    
}