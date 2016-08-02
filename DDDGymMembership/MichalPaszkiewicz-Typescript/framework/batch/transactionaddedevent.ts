module CQRSjs.Framework{

    export class TransactionAddedEvent extends Event{

        private _transactionID: string;
        private _amount: number;

        get TransactionID(){
            return this._transactionID;
        }

        get Amount(){
            return this._amount;
        }

        constructor(batchID: string, userName: string, transactionID: string, amount: number){
            super(batchID, "TransactionAdded", userName);

            this._transactionID = transactionID;
            this._amount = amount;
        }

    }

}