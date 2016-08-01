/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
eval(loadModule("applicationservices"));

module CQRSjs.Test{

var _aggregateRootID = IDGenerator.generate();
    var _userName = "test command handler";
    var _errorMessage = "the test property is bad!";
    var _handled = false;

    class TestCommand extends Framework.Command{
        constructor(public TestProperty: string){
            super(_aggregateRootID, _userName, "testCommand");
        }
    }

    class TestCommandHandler implements ApplicationServices.IAmACommandHandler{
        HandlesCommand = "testCommand";

        handle(command: TestCommand){
            _handled = true;
        }
    }

    class TestCommandValidator extends ApplicationServices.CommandValidator{
        constructor(){
            super("testCommand");
        }

        validate(command: TestCommand){
            if(command.TestProperty == "bad"){
                Framework.ErrorService.throw(_errorMessage);
            }   
        }
    }

    describe("a command handler service", function(){
        _handled = false;        
            
        var commandHandlerService = new ApplicationServices.CommandHandlerService();

        commandHandlerService.register(new TestCommandHandler());
        commandHandlerService.registerValidator(new TestCommandValidator());

        it("handles correct commands correctly", function(){
            commandHandlerService.handle(new TestCommand("good"));            
            expect(_handled).toBeTruthy();
        });

    });

    describe("a command handler service", function(){
            
        var commandHandlerService = new ApplicationServices.CommandHandlerService();

        commandHandlerService.register(new TestCommandHandler());
        commandHandlerService.registerValidator(new TestCommandValidator());

        it("will reject bad commands", function(){
            _handled = false;                    
            expect(() => commandHandlerService.handle(new TestCommand("bad"))).toThrowError();
            expect(_handled).toBeFalsy();
        });

    });
}