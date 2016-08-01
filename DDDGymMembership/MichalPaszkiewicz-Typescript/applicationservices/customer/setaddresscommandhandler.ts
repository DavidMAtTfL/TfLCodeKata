module CQRSjs.ApplicationServices{

    export class SetAddressCommandHandler implements IAmACommandHandler{
        HandlesCommand = "SetAddress";

        handle(command: Domain.SetAddressCommand){
            var customer = Domain.AggregateRootService.Instance.getByID(Domain.Customer, command.AggregateRootID);
            customer.setAddress(command);
        }
    }
    CommandHandlerService.Instance.register(new SetAddressCommandHandler());

}