namespace CQRSjs.ApplicationServices{
    
    export interface IAmACommandValidator{
        ValidatesCommand: string;
        validate(command: Framework.Command): void     
    }
    
    export class CommandValidator implements IAmACommandValidator{
        
        ValidatesCommand: string;
        
        constructor(validatesCommand: string){
            this.ValidatesCommand = validatesCommand;
        }
        
        validate(command: Framework.Command): void{
            
            if(command.CommandName == null){
               Framework.ErrorService.throw(`Commands must have a Name`);
            }

            if(command.AggregateRootID == null){
                Framework.ErrorService.throw(`Command ${command.CommandName} must have an AggregateRootID`)
            }

            if(command.UserName == null){
                Framework.ErrorService.throw(`Command ${command.CommandName} must have a UserName`)
            }

            if(command.Time == null){
                Framework.ErrorService.throw(`Command ${command.CommandName} has no Time`);
            }
        }
        
    }
    
}