module CQRSjs.Domain{

    export class AddMonthlyPackageCommand extends Framework.Command{
        
        private _packageID: string;
        private _name: string;
        private _price: number;
        private _customerID: string;

        get CustomerID(){
            return this._customerID;
        }

        get PackageID(){
            return this._packageID;
        }

        get Name(){
            return this._name;
        }

        get Price(){
            return this._price;
        }

        constructor(gymID: string, customerID: string, userName: string, packageID: string, name: string, price: number){
            super(gymID, userName, "AddMonthlyPackage");

            this._customerID = customerID;
            this._packageID = packageID;
            this._name = name;
            this._price = price;
        }

    }

}