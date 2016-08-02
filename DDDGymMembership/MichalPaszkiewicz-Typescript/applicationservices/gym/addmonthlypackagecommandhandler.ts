module CQRSjs.ApplicationServices{

    export class AddMonthlyPackageCommandHandler implements IAmACommandHandler{
        HandlesCommand = "AddMonthlyPackage";

        handle(command: Domain.AddMonthlyPackageCommand){
            var customer = Domain.AggregateRootService.Instance.getByID(Domain.Customer, command.CustomerID);
            var gym = Domain.AggregateRootService.Instance.getByID(Domain.Gym, command.AggregateRootID);

            gym.addMonthlyPackage(command);
            customer.setMonthlyPackage(command);
        }
    }
    CommandHandlerService.Instance.register(new AddMonthlyPackageCommandHandler());

}