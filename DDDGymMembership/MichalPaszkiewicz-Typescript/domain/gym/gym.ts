module CQRSjs.Domain{

    export class Gym extends AggregateRoot{
        
        MonthlyPackages: MonthlyPackage[] = [];

        addMonthlyPackage(command: AddMonthlyPackageCommand){
            var monthlyPackage = new MonthlyPackage(command.PackageID, command.Name, command.Price);
            
            if(this.MonthlyPackages.filter((mp: MonthlyPackage)=> mp.equals(monthlyPackage)).length > 0){
                Framework.ErrorService.throw(`a monthly package with ID ${monthlyPackage.ID} already exists`);
            }

            this.applyEvent(new Framework.MonthlyPackageAddedToGymEvent(command.AggregateRootID, command.UserName, command.PackageID, command.Name, command.Price));
        }

        constructor(id: string){
            super(id);
            var self = this;

            self.registerEventAction(new EventAction("MonthlyPackageAddedToGym", (e: Framework.MonthlyPackageAddedToGymEvent) => {
                var monthlyPackage = new MonthlyPackage(e.PackageID, e.Name, e.Price);
                self.MonthlyPackages.push(monthlyPackage);
                
            }));
        }
    }

}