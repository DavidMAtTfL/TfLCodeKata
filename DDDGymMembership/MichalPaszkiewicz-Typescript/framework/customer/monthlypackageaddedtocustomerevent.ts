module CQRSjs.Framework{

    export class MonthlyPackageAddedToCustomerEvent extends Event{

        private _packageID: string;
        private _name: string;
        private _price: number;

        get PackageID(): string{
            return this._packageID;
        }

        get Name(){
            return this._name;
        }

        get Price(){
            return this._price;
        }

        constructor(customerID: string, userName: string, packageID: string, name: string, price: number){
            super(customerID, "MonthlyPackageAddedToCustomer", userName);

            this._packageID = packageID;
            this._name = name;
            this._price = price;
        }

    }

}