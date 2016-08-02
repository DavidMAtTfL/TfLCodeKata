declare namespace CQRSjs.Framework {
    class Command {
        AggregateRootID: string;
        UserName: string;
        Time: number;
        CommandName: string;
        constructor(aggregateRootID: string, userName: string, commandName: string);
    }
}
declare namespace CQRSjs.Framework {
    class ErrorService {
        private static _instance;
        private _onThrowEvents;
        onThrow(onThrowEvent: (message: string) => void): void;
        clearOnThrowEvents(): void;
        static Instance: ErrorService;
        static throw(message: string): void;
        throw(message: string): void;
    }
}
declare namespace CQRSjs.Framework {
    class Event {
        AggregateRootID: string;
        UserName: string;
        EventName: string;
        Time: number;
        constructor(aggregateRootID: string, eventName: string, userName: string);
    }
}
declare namespace CQRSjs.Framework {
    class EventStoreService {
        private static _instance;
        static Instance: EventStoreService;
        constructor();
        private _eventsStored;
        private _funcsOnAdded;
        private _getEvents();
        EventsStored: Event[];
        getEventsWithID(id: string): Event[];
        overrideGetEvents(func: () => Event[]): void;
        overrideGetEventsWithID(func: (id: string) => Event[]): void;
        store(event: Event): void;
        onAdded(func: (event: Event) => void): void;
        clearOnAdded(): void;
    }
}
declare namespace CQRSjs.IDGenerator {
    function generate(): string;
}
declare namespace CQRSjs.Framework {
    class LogService {
        private static _instance;
        onLog(onLogEvent: (message: string) => void): void;
        static Instance: LogService;
        private _onLogEvents;
        log(message: string): void;
        clearLogEvents(): void;
    }
}
declare namespace CQRSjs.Framework {
    class TimeService {
        private static _instance;
        static Instance: TimeService;
        private _yearsAdded;
        private _monthsAdded;
        private _daysAdded;
        private _hoursAdded;
        private _minutesAdded;
        private _secondsAdded;
        private _millisecondsAdded;
        private getTime();
        reset(): void;
        addYears(years: number): void;
        addMonths(months: number): void;
        addDays(days: number): void;
        addHours(hours: number): void;
        addMinutes(minutes: number): void;
        addSeconds(seconds: number): void;
        addMilliseconds(milliseconds: number): void;
        now(): Date;
        nowTicks(): number;
        today(): Date;
    }
}
declare module CQRSjs.Framework {
    class TransactionAddedEvent extends Event {
        private _transactionID;
        private _amount;
        TransactionID: string;
        Amount: number;
        constructor(batchID: string, userName: string, transactionID: string, amount: number);
    }
}
declare module CQRSjs.Framework {
    class AddressSetEvent extends Event {
        private _street;
        private _province;
        private _city;
        Street: string;
        Province: string;
        City: string;
        constructor(customerID: string, userName: string, city: string, province: string, street: string);
    }
}
declare module CQRSjs.Framework {
    class MonthlyPackageAddedToCustomerEvent extends Event {
        private _packageID;
        private _name;
        private _price;
        PackageID: string;
        Name: string;
        Price: number;
        constructor(customerID: string, userName: string, packageID: string, name: string, price: number);
    }
}
declare module CQRSjs.Framework {
    class MonthlyPackageAddedToGymEvent extends Event {
        private _packageID;
        private _name;
        private _price;
        PackageID: string;
        Name: string;
        Price: number;
        constructor(gymID: string, userName: string, packageID: string, name: string, price: number);
    }
}
