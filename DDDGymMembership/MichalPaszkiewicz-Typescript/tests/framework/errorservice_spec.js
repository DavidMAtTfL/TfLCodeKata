/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        describe("the error service", function () {
            var _errorMessage = "test error";
            it("should perform onThrow events correctly", function () {
                var lastLog = "";
                CQRSjs.Framework.ErrorService.Instance.clearOnThrowEvents();
                CQRSjs.Framework.ErrorService.Instance.onThrow(function (message) { lastLog = message; });
                CQRSjs.Framework.ErrorService.Instance.throw(_errorMessage);
                expect(lastLog).toBe(_errorMessage);
            });
            it("should perform static onThrow events correctly", function () {
                var lastLog = "";
                CQRSjs.Framework.ErrorService.Instance.clearOnThrowEvents();
                CQRSjs.Framework.ErrorService.Instance.onThrow(function (message) { lastLog = message; });
                CQRSjs.Framework.ErrorService.throw(_errorMessage);
                expect(lastLog).toBe(_errorMessage);
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
