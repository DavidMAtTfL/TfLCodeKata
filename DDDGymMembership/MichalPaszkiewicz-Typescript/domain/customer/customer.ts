module CQRSjs.Domain{

    export class Customer extends AggregateRoot{
        
        private _address: Address;
        private _monthlyPackage: MonthlyPackage;

        get Address(): Address{
            return this._address;
        }
        get MonthlyPackage(): MonthlyPackage{
            return this._monthlyPackage;
        }

        setAddress(command: SetAddressCommand){
            this.applyEvent(new Framework.AddressSetEvent(command.AggregateRootID, command.UserName, command.City, command.Province, command.Street));
        }

        setMonthlyPackage(command: AddMonthlyPackageCommand){
            this.applyEvent(new Framework.MonthlyPackageAddedToCustomerEvent(command.CustomerID, command.UserName, command.PackageID, command.Name, command.Price));
        }

        constructor(id: string){
            super(id);

            var self = this;

            self.registerEventAction(new EventAction("MonthlyPackageAddedToCustomer", (e: Framework.MonthlyPackageAddedToCustomerEvent) => {
                self._monthlyPackage = new MonthlyPackage(e.PackageID, e.Name, e.Price);
            }));

            self.registerEventAction(new EventAction("AddressSet", (e: Framework.AddressSetEvent) => {
                self._address = new Address(e.City, e.Province, e.Street);
            }));
        }
    }

}