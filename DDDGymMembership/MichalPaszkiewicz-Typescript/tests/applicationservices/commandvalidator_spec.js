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
        var _errorMessage = "the test property is bad!";
        var validated = false;
        var TestCommand = (function (_super) {
            __extends(TestCommand, _super);
            function TestCommand(TestProperty) {
                _super.call(this, _aggregateRootID, _userName, "testCommand");
                this.TestProperty = TestProperty;
            }
            return TestCommand;
        }(CQRSjs.Framework.Command));
        var TestCommandValidator = (function (_super) {
            __extends(TestCommandValidator, _super);
            function TestCommandValidator() {
                _super.call(this, "testCommand");
            }
            TestCommandValidator.prototype.validate = function (command) {
                validated = true;
                if (command.TestProperty == "bad") {
                    CQRSjs.Framework.ErrorService.throw(_errorMessage);
                }
            };
            return TestCommandValidator;
        }(CQRSjs.ApplicationServices.CommandValidator));
        describe("a command validator", function () {
            var testCommandValidator = new TestCommandValidator();
            var testCommand = new TestCommand("good");
            it("correctly validates a good command", function () {
                testCommandValidator.validate(testCommand);
                expect(validated).toBe(true);
            });
        });
        describe("a command validator", function () {
            var testCommandValidator = new TestCommandValidator();
            var testCommand = new TestCommand("bad");
            it("correctly rejects a bad command", function () {
                expect(function () { return testCommandValidator.validate(testCommand); }).toThrowError();
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
