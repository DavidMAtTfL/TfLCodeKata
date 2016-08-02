module CQRSjs.Domain{

    export class AddTransactionCommand extends Framework.Command{

        private _transactionID: string;
        private _amount: number;

        get TransactionID(){
            return this._transactionID;
        }

        get Amount(){
            return this._amount;
        }

        constructor(batchID: string, userName: string, transactionID: string, amount: number){
            super(batchID, userName, "AddTransaction");

            this._transactionID = transactionID;
            this._amount = amount;
        }

    }

}