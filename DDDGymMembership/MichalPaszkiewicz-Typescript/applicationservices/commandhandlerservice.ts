namespace CQRSjs.ApplicationServices{
    
    export class CommandHandlerService{
        
        private static _instance: CommandHandlerService;
        
        static get Instance(): CommandHandlerService{
            if(CommandHandlerService._instance == null){
                CommandHandlerService._instance = new CommandHandlerService();
            }
            return CommandHandlerService._instance;
        }
        
        CommandHandlers: IAmACommandHandler[] = [];
        CommandValidators: CommandValidator[] = [];
        
        register(commandHandler: IAmACommandHandler){
            this.CommandHandlers.push(commandHandler);
        }
        
        registerValidator(commandValidator: CommandValidator){
            this.CommandValidators.push(commandValidator);
        }
        
        handle(command: Framework.Command){

            var relevantValidators = this.CommandValidators
                .filter((cv: CommandValidator)=>{ return cv.ValidatesCommand == command.CommandName });

            relevantValidators.unshift(new CommandValidator(command.CommandName))

            relevantValidators.forEach((cv: CommandValidator) => {
                cv.validate(command); 
            });

            this.CommandHandlers
                .filter((ch: IAmACommandHandler)=>{ return ch.HandlesCommand == command.CommandName })
                .forEach((ch: IAmACommandHandler) => { 
                    ch.handle(command);                    
                });
        }
        
    }    
    
}