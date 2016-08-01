/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        describe("a default projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            it("should have no entries to start with", function () {
                expect(testProjectionStore.Tables.length).toBe(0);
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            testProjectionStore.addTable("testTable");
            it("should allow addition of tables", function () {
                expect(testProjectionStore.Tables.length).toBe(1);
                expect(testProjectionStore.Tables[0].Name).toBe("testTable");
                expect(testProjectionStore.Tables[0].Rows.length).toBe(0);
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            testProjectionStore.addTable("testTable");
            var testRow = new CQRSjs.Projections.Row({ "one": 1, "two": 2 });
            testProjectionStore.addRowToTable("testTable", testRow);
            it("should allow addition of rows to a table", function () {
                expect(testProjectionStore.Tables.length).toBe(1);
                expect(testProjectionStore.Tables[0].Name).toBe("testTable");
                expect(testProjectionStore.Tables[0].Rows.length).toBe(1);
                expect(testProjectionStore.Tables[0].Rows[0]).toBe(testRow);
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            testProjectionStore.addTable("testTable");
            var testRow = new CQRSjs.Projections.Row({ "one": 1, "two": 2 });
            testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);
            it("should allow addition of multiple rows to a table", function () {
                expect(testProjectionStore.Tables.length).toBe(1);
                expect(testProjectionStore.Tables[0].Name).toBe("testTable");
                expect(testProjectionStore.Tables[0].Rows.length).toBe(3);
                expect(testProjectionStore.Tables[0].Rows[0]).toBe(testRow);
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            testProjectionStore.addTable("badTable1");
            testProjectionStore.addTable("testTable");
            testProjectionStore.addTable("badTable2");
            var testRow = new CQRSjs.Projections.Row({ "one": 1, "two": 2 });
            testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);
            it("should get the correct table", function () {
                expect(testProjectionStore.Tables.length).toBe(3);
                expect(testProjectionStore.getTable("testTable").Name).toBe("testTable");
                expect(testProjectionStore.getTable("testTable").Rows.length).toBe(3);
                expect(testProjectionStore.getTable("testTable").Rows[0]).toBe(testRow);
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            testProjectionStore.addTable("testTable");
            var testRow = new CQRSjs.Projections.Row({ "one": 1, "two": 2 });
            testProjectionStore.addRowsToTable("testTable", [testRow, testRow, testRow]);
            testProjectionStore.clear();
            it("should allow clearing of the tables", function () {
                expect(testProjectionStore.Tables.length).toBe(0);
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            var testString = null;
            testProjectionStore.overrideClear(function () {
                testString = "lol";
            });
            it("should allow overriding of the clear method", function () {
                testProjectionStore.clear();
                expect(testString).toBe("lol");
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            var testTable = new CQRSjs.Projections.Table("lol");
            testProjectionStore.overrideGetTable(function (name) {
                return testTable;
            });
            it("should allow overriding of the get table method", function () {
                expect(testProjectionStore.getTable("haha")).toBe(testTable);
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            var testString = null;
            testProjectionStore.overrideAddTable(function (name) {
                testString = "lol";
            });
            it("should allow overriding of the add table method", function () {
                testProjectionStore.addTable("test");
                expect(testString).toBe("lol");
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            var testString = null;
            testProjectionStore.overrideAddRowToTable(function (tableName, row) {
                testString = "lol";
            });
            it("should allow overriding of the add row to table method", function () {
                testProjectionStore.addRowToTable("blah", new CQRSjs.Projections.Row({ one: 1 }));
                expect(testString).toBe("lol");
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            var testString = null;
            testProjectionStore.overrideAddRowsToTable(function (tableName, rows) {
                testString = "lol";
            });
            it("should allow overriding of the add rows to table method", function () {
                testProjectionStore.addRowsToTable("blah", [new CQRSjs.Projections.Row({ one: 1 })]);
                expect(testString).toBe("lol");
            });
        });
        describe("a projection store", function () {
            var testProjectionStore = new CQRSjs.Projections.ProjectionStore();
            var testTable = new CQRSjs.Projections.Table("testTable");
            testProjectionStore.overrideGetTables(function () { return [testTable]; });
            it("should allow overriding of the get tables method", function () {
                expect(testProjectionStore.Tables[0]).toBe(testTable);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
