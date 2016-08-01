/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));

module CQRSjs.Test{

    describe("a default projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();

        it("should have no entries to start with", function(){
            expect(testProjectionStore.Tables.length).toBe(0);
        });

    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");

        it("should allow addition of tables", function(){
            expect(testProjectionStore.Tables.length).toBe(1);
            expect(testProjectionStore.Tables[0].Name).toBe("testTable");
            expect(testProjectionStore.Tables[0].Rows.length).toBe(0);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowToTable("testTable", testRow);

        it("should allow addition of rows to a table", function(){
            expect(testProjectionStore.Tables.length).toBe(1);
            expect(testProjectionStore.Tables[0].Name).toBe("testTable");
            expect(testProjectionStore.Tables[0].Rows.length).toBe(1);
            expect(testProjectionStore.Tables[0].Rows[0]).toBe(testRow);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);

        it("should allow addition of multiple rows to a table", function(){
            expect(testProjectionStore.Tables.length).toBe(1);
            expect(testProjectionStore.Tables[0].Name).toBe("testTable");
            expect(testProjectionStore.Tables[0].Rows.length).toBe(3);
            expect(testProjectionStore.Tables[0].Rows[0]).toBe(testRow);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("badTable1");
        testProjectionStore.addTable("testTable");
        testProjectionStore.addTable("badTable2");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);

        it("should get the correct table", function(){
            expect(testProjectionStore.Tables.length).toBe(3);
            expect(testProjectionStore.getTable("testTable").Name).toBe("testTable");
            expect(testProjectionStore.getTable("testTable").Rows.length).toBe(3);
            expect(testProjectionStore.getTable("testTable").Rows[0]).toBe(testRow);
        });
    });

    describe("a projection store", function(){

        var testProjectionStore = new Projections.ProjectionStore();
        testProjectionStore.addTable("testTable");
        var testRow = new Projections.Row({"one":1,"two":2});
        testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);
        testProjectionStore.clear();

        it("should allow clearing of the tables", function(){
            expect(testProjectionStore.Tables.length).toBe(0);
        });
    });

    describe("a projection store", function(){
        var testProjectionStore = new Projections.ProjectionStore();
        var testString: string = null;
        
        testProjectionStore.overrideClear(() => {
            testString = "lol";
        });

        it("should allow overriding of the clear method", function(){
            testProjectionStore.clear();
            expect(testString).toBe("lol");
        });
    });

    describe("a projection store", function(){
        var testProjectionStore = new Projections.ProjectionStore();
        var testTable = new Projections.Table("lol");

        testProjectionStore.overrideGetTable((name: string) => {
            return testTable;
        });

        it("should allow overriding of the get table method", function(){
            expect(testProjectionStore.getTable("haha")).toBe(testTable);
        });
    });

    describe("a projection store", function(){
        var testProjectionStore = new Projections.ProjectionStore();
        var testString = null;

        testProjectionStore.overrideAddTable((name: string) => {
            testString = "lol";
        });

        it("should allow overriding of the add table method", function(){
            testProjectionStore.addTable("test");
            expect(testString).toBe("lol");
        });
    });

    describe("a projection store", function(){
        var testProjectionStore = new Projections.ProjectionStore();
        var testString = null;        
        
        testProjectionStore.overrideAddRowToTable((tableName, row) => {
            testString = "lol";
        });

        it("should allow overriding of the add row to table method", function(){
            testProjectionStore.addRowToTable("blah", new Projections.Row({one:1}));
            expect(testString).toBe("lol");
        });
    });

    describe("a projection store", function(){
        var testProjectionStore = new Projections.ProjectionStore();
        var testString = null;                
        
        testProjectionStore.overrideAddRowsToTable((tableName, rows) => {
            testString = "lol";            
        });

        it("should allow overriding of the add rows to table method", function(){
            testProjectionStore.addRowsToTable("blah", [new Projections.Row({one:1})]);
            expect(testString).toBe("lol");
        });
    });

    describe("a projection store", function(){
        var testProjectionStore = new Projections.ProjectionStore();
        var testTable = new Projections.Table("testTable");

        testProjectionStore.overrideGetTables(() => { return [testTable] });

        it("should allow overriding of the get tables method", function(){
            expect(testProjectionStore.Tables[0]).toBe(testTable);
        });
    });

}