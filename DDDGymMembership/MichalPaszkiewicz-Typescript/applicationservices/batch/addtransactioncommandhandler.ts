module CQRSjs.ApplicationServices{

    export class AddTransactionCommandHandler implements IAmACommandHandler{
        HandlesCommand = "AddTransaction";

        handle(command: Domain.AddTransactionCommand){
            var batch = Domain.AggregateRootService.Instance.getByID(Domain.Batch, command.AggregateRootID);
            batch.addTransaction(command);
        }
    }
    CommandHandlerService.Instance.register(new AddTransactionCommandHandler());

}