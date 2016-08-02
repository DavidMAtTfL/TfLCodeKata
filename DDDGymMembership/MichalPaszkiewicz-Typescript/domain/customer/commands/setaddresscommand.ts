module CQRSjs.Domain{

    export class SetAddressCommand extends Framework.Command{

        private _city: string;
        private _province: string;
        private _street: string;

        get City(){
            return this._city;
        }

        get Province(){
            return this._province;
        }

        get Street(){
            return this._street;
        }

        constructor(customerID: string, userName: string, city: string, province: string, street: string){
            super(customerID, userName, "SetAddress");

            this._city = city;
            this._street = street;
            this._province = province;
        }

    }

}