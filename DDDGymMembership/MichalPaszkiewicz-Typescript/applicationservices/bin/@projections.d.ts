declare namespace CQRSjs.Projections {
    interface IAmAnEventHandler {
        HandlesEvent: string;
        handle(event: Framework.Event): any;
    }
}
declare namespace CQRSjs.Projections {
    class EventHandlerService {
        private static _instance;
        static Instance: EventHandlerService;
        EventHandlers: IAmAnEventHandler[];
        register(eventHandler: IAmAnEventHandler): void;
        handle(event: Framework.Event): void;
    }
}
declare namespace CQRSjs.Projections {
    class ProjectionStore {
        private static _instance;
        static Instance: ProjectionStore;
        private _tables;
        private _getTables;
        Tables: Table[];
        overrideGetTables(func: () => Table[]): void;
        private _clear;
        clear(): void;
        overrideClear(clearFunc: () => void): void;
        private _addTable;
        addTable(name: string): void;
        overrideAddTable(func: (name: string) => void): void;
        private _addRowToTable;
        addRowToTable(tableName: string, row: Row): void;
        overrideAddRowToTable(func: (tableName: string, row: Row) => void): void;
        private _addRowsToTable;
        addRowsToTable(tableName: string, rows: Row[]): void;
        overrideAddRowsToTable(func: (tableName: string, rows: Row[]) => void): void;
        private _getTable;
        getTable(name: string): Table;
        overrideGetTable(func: (name: string) => Table): void;
    }
}
declare namespace CQRSjs.Projections {
    class Row {
        Data: string;
        constructor(data: Object);
    }
}
declare namespace CQRSjs.Projections {
    class Table {
        Name: string;
        Rows: Row[];
        getData(): any[];
        clear(): void;
        constructor(tableName: string);
    }
}
