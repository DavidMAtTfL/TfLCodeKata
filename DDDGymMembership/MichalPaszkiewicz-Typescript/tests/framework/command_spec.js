var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = "123";
        var _userName = "test";
        describe("an instance of a bass command", function () {
            var testCommand = new CQRSjs.Framework.Command(_aggregateRootID, _userName, "testCommand");
            it("has an aggregate root", function () {
                expect(testCommand.AggregateRootID).toBe(_aggregateRootID);
            });
            it("has username set", function () {
                expect(testCommand.UserName).toBe(_userName);
            });
            it("has a command name set", function () {
                expect(testCommand.CommandName).toBe("testCommand");
            });
            it("has time created set", function () {
                expect(testCommand.Time).toBeDefined();
            });
        });
        describe("a new command class", function () {
            var TestCommand = (function (_super) {
                __extends(TestCommand, _super);
                function TestCommand() {
                    _super.apply(this, arguments);
                }
                return TestCommand;
            }(CQRSjs.Framework.Command));
            var testCommandInstance = new TestCommand(_aggregateRootID, _userName, "testCommand");
            it("has an aggregate root", function () {
                expect(testCommandInstance.AggregateRootID).toBe(_aggregateRootID);
            });
            it("has username set", function () {
                expect(testCommandInstance.UserName).toBe(_userName);
            });
            it("has a command name set", function () {
                expect(testCommandInstance.CommandName).toBe("testCommand");
            });
            it("has time created set", function () {
                expect(testCommandInstance.Time).toBeDefined();
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
