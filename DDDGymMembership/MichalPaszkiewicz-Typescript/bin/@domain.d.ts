declare namespace CQRSjs.Domain {
    class EntityBase {
        ID: string;
        constructor(id: string);
        equals(other: EntityBase): boolean;
    }
}
declare namespace CQRSjs.Domain {
    class EventAction {
        EventName: string;
        Action: (e: Framework.Event) => void;
        constructor(eventName: string, action: (e: Framework.Event) => void);
    }
    class AggregateRoot extends EntityBase {
        protected _eventActions: EventAction[];
        protected registerEventAction(eventAction: EventAction): void;
        applyEvent(event: Framework.Event): void;
        constructor(id: string);
    }
}
declare namespace CQRSjs.Domain {
    class AggregateRootService {
        private static _instance;
        static Instance: AggregateRootService;
        getByID<T extends AggregateRoot>(a: {
            new (id: string): T;
        }, aggregateRootID: string): T;
    }
}
declare namespace CQRSjs.Domain {
    class ValueObject {
        private objectsAreEqual(object1, object2, stackLevel);
        equals(other: ValueObject): any;
    }
}
declare module CQRSjs.Domain {
    class Batch extends AggregateRoot {
        Transactions: Transaction[];
        addTransaction(command: AddTransactionCommand): void;
        constructor(id: string);
    }
}
declare module CQRSjs.Domain {
    class Transaction extends EntityBase {
        Amount: number;
        constructor(id: string, amount: number);
    }
}
declare module CQRSjs.Domain {
    class AddTransactionCommand extends Framework.Command {
        private _transactionID;
        private _amount;
        TransactionID: string;
        Amount: number;
        constructor(batchID: string, userName: string, transactionID: string, amount: number);
    }
}
declare module CQRSjs.Domain {
    class Customer extends AggregateRoot {
        private _address;
        private _monthlyPackage;
        Address: Address;
        MonthlyPackage: MonthlyPackage;
        setAddress(command: SetAddressCommand): void;
        setMonthlyPackage(command: AddMonthlyPackageCommand): void;
        constructor(id: string);
    }
}
declare module CQRSjs.Domain {
    class SetAddressCommand extends Framework.Command {
        private _city;
        private _province;
        private _street;
        City: string;
        Province: string;
        Street: string;
        constructor(customerID: string, userName: string, city: string, province: string, street: string);
    }
}
declare module CQRSjs.Domain {
    class Address extends ValueObject {
        private _city;
        private _province;
        private _street;
        City: string;
        Province: string;
        Street: string;
        constructor(city: string, province: string, street: string);
    }
}
declare module CQRSjs.Domain {
    class Gym extends AggregateRoot {
        MonthlyPackages: MonthlyPackage[];
        addMonthlyPackage(command: AddMonthlyPackageCommand): void;
        constructor(id: string);
    }
}
declare module CQRSjs.Domain {
    class MonthlyPackage extends EntityBase {
        Name: string;
        Price: number;
        constructor(id: string, name: string, price: number);
    }
}
declare module CQRSjs.Domain {
    class AddMonthlyPackageCommand extends Framework.Command {
        private _packageID;
        private _name;
        private _price;
        private _customerID;
        CustomerID: string;
        PackageID: string;
        Name: string;
        Price: number;
        constructor(gymID: string, customerID: string, userName: string, packageID: string, name: string, price: number);
    }
}
declare module CQRSjs.Helpers {
    function ensureStringHasValue(text: string, propertyName: string): string;
}
