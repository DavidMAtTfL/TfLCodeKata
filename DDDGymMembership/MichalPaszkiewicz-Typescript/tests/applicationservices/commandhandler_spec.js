var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
eval(loadModule("applicationservices"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        var _aggregateRootID = CQRSjs.IDGenerator.generate();
        var _userName = "test command handler";
        var TestCommand = (function (_super) {
            __extends(TestCommand, _super);
            function TestCommand() {
                _super.call(this, _aggregateRootID, _userName, "testCommand");
            }
            return TestCommand;
        }(CQRSjs.Framework.Command));
        describe("a command handler", function () {
            var lastLog = "nothing";
            var TestCommandHandler = (function () {
                function TestCommandHandler() {
                    this.HandlesCommand = "testCommand";
                }
                TestCommandHandler.prototype.handle = function (command) {
                    lastLog = command.UserName;
                };
                return TestCommandHandler;
            }());
            var testCommandHandler2 = new TestCommandHandler();
            var testCommand = new TestCommand();
            it("should handle the command correctly", function () {
                testCommandHandler2.handle(testCommand);
                expect(lastLog).toBe(_userName);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
