/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));

module CQRSjs.Test{

    describe("the error service", function(){
        var _errorMessage = "test error";

        it("should perform onThrow events correctly", function(){
            var lastLog = "";

            Framework.ErrorService.Instance.clearOnThrowEvents();
            Framework.ErrorService.Instance.onThrow((message: string) => { lastLog = message; });

            Framework.ErrorService.Instance.throw(_errorMessage);

            expect(lastLog).toBe(_errorMessage);
        });

        it("should perform static onThrow events correctly", function(){
            var lastLog = "";

            Framework.ErrorService.Instance.clearOnThrowEvents();
            Framework.ErrorService.Instance.onThrow((message: string) => { lastLog = message; });

            Framework.ErrorService.throw(_errorMessage);

            expect(lastLog).toBe(_errorMessage);
        });

    });

}