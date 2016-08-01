module CQRSjs.ApplicationServices{

    export class AddMonthlyPackageCommandValidator extends CommandValidator{

        constructor(){
            super("AddMonthlyPackage");
        }

        validate(command: Domain.AddMonthlyPackageCommand){
            var customer = Domain.AggregateRootService.Instance.getByID(Domain.Customer, command.CustomerID);

            if(!!customer.MonthlyPackage){
                Framework.ErrorService.throw("this customer already has a monthly package.");
            }
        }
    }
    CommandHandlerService.Instance.registerValidator(new AddMonthlyPackageCommandValidator());

}