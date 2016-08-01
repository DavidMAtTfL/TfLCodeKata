module CQRSjs.Domain{

    export class Batch extends AggregateRoot{

        Transactions: Transaction[] = [];

        addTransaction(command: AddTransactionCommand){
            var transaction = new Transaction(command.TransactionID, command.Amount);
            if(this.Transactions.some((t: Transaction)=>{return t.equals(transaction)})){
                Framework.ErrorService.throw(`a transaction with ID ${transaction.ID} already exists in this batch.`);
            }

            if(transaction.Amount < 10){
                Framework.ErrorService.throw("transaction amount cannot be less than £10");                
            }

            this.applyEvent(new Framework.TransactionAddedEvent(
                command.AggregateRootID, command.UserName,
                command.TransactionID, command.Amount));
        }

        constructor(id: string){
            super(id);

            var self = this;

            self.registerEventAction(new EventAction("TransactionAdded", (e: Framework.TransactionAddedEvent) => {
                var transaction = new Transaction(e.TransactionID, e.Amount);

                self.Transactions.push(transaction);
            }));
        }

    }

}