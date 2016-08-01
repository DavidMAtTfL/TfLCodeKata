var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CQRSjs;
(function (CQRSjs) {
    var ApplicationServices;
    (function (ApplicationServices) {
        var CommandValidator = (function () {
            function CommandValidator(validatesCommand) {
                this.ValidatesCommand = validatesCommand;
            }
            CommandValidator.prototype.validate = function (command) {
                if (command.CommandName == null) {
                    CQRSjs.Framework.ErrorService.throw("Commands must have a Name");
                }
                if (command.AggregateRootID == null) {
                    CQRSjs.Framework.ErrorService.throw("Command " + command.CommandName + " must have an AggregateRootID");
                }
                if (command.UserName == null) {
                    CQRSjs.Framework.ErrorService.throw("Command " + command.CommandName + " must have a UserName");
                }
                if (command.Time == null) {
                    CQRSjs.Framework.ErrorService.throw("Command " + command.CommandName + " has no Time");
                }
            };
            return CommandValidator;
        }());
        ApplicationServices.CommandValidator = CommandValidator;
    })(ApplicationServices = CQRSjs.ApplicationServices || (CQRSjs.ApplicationServices = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var ApplicationServices;
    (function (ApplicationServices) {
        var CommandHandlerService = (function () {
            function CommandHandlerService() {
                this.CommandHandlers = [];
                this.CommandValidators = [];
            }
            Object.defineProperty(CommandHandlerService, "Instance", {
                get: function () {
                    if (CommandHandlerService._instance == null) {
                        CommandHandlerService._instance = new CommandHandlerService();
                    }
                    return CommandHandlerService._instance;
                },
                enumerable: true,
                configurable: true
            });
            CommandHandlerService.prototype.register = function (commandHandler) {
                this.CommandHandlers.push(commandHandler);
            };
            CommandHandlerService.prototype.registerValidator = function (commandValidator) {
                this.CommandValidators.push(commandValidator);
            };
            CommandHandlerService.prototype.handle = function (command) {
                var relevantValidators = this.CommandValidators
                    .filter(function (cv) { return cv.ValidatesCommand == command.CommandName; });
                relevantValidators.unshift(new ApplicationServices.CommandValidator(command.CommandName));
                relevantValidators.forEach(function (cv) {
                    cv.validate(command);
                });
                this.CommandHandlers
                    .filter(function (ch) { return ch.HandlesCommand == command.CommandName; })
                    .forEach(function (ch) {
                    ch.handle(command);
                });
            };
            return CommandHandlerService;
        }());
        ApplicationServices.CommandHandlerService = CommandHandlerService;
    })(ApplicationServices = CQRSjs.ApplicationServices || (CQRSjs.ApplicationServices = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var ApplicationServices;
    (function (ApplicationServices) {
        var AddTransactionCommandHandler = (function () {
            function AddTransactionCommandHandler() {
                this.HandlesCommand = "AddTransaction";
            }
            AddTransactionCommandHandler.prototype.handle = function (command) {
                var batch = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Batch, command.AggregateRootID);
                batch.addTransaction(command);
            };
            return AddTransactionCommandHandler;
        }());
        ApplicationServices.AddTransactionCommandHandler = AddTransactionCommandHandler;
        ApplicationServices.CommandHandlerService.Instance.register(new AddTransactionCommandHandler());
    })(ApplicationServices = CQRSjs.ApplicationServices || (CQRSjs.ApplicationServices = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var ApplicationServices;
    (function (ApplicationServices) {
        var SetAddressCommandHandler = (function () {
            function SetAddressCommandHandler() {
                this.HandlesCommand = "SetAddress";
            }
            SetAddressCommandHandler.prototype.handle = function (command) {
                var customer = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Customer, command.AggregateRootID);
                customer.setAddress(command);
            };
            return SetAddressCommandHandler;
        }());
        ApplicationServices.SetAddressCommandHandler = SetAddressCommandHandler;
        ApplicationServices.CommandHandlerService.Instance.register(new SetAddressCommandHandler());
    })(ApplicationServices = CQRSjs.ApplicationServices || (CQRSjs.ApplicationServices = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var ApplicationServices;
    (function (ApplicationServices) {
        var AddMonthlyPackageCommandHandler = (function () {
            function AddMonthlyPackageCommandHandler() {
                this.HandlesCommand = "AddMonthlyPackage";
            }
            AddMonthlyPackageCommandHandler.prototype.handle = function (command) {
                var customer = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Customer, command.CustomerID);
                var gym = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Gym, command.AggregateRootID);
                gym.addMonthlyPackage(command);
                customer.setMonthlyPackage(command);
            };
            return AddMonthlyPackageCommandHandler;
        }());
        ApplicationServices.AddMonthlyPackageCommandHandler = AddMonthlyPackageCommandHandler;
        ApplicationServices.CommandHandlerService.Instance.register(new AddMonthlyPackageCommandHandler());
    })(ApplicationServices = CQRSjs.ApplicationServices || (CQRSjs.ApplicationServices = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var ApplicationServices;
    (function (ApplicationServices) {
        var AddMonthlyPackageCommandValidator = (function (_super) {
            __extends(AddMonthlyPackageCommandValidator, _super);
            function AddMonthlyPackageCommandValidator() {
                _super.call(this, "AddMonthlyPackage");
            }
            AddMonthlyPackageCommandValidator.prototype.validate = function (command) {
                var customer = CQRSjs.Domain.AggregateRootService.Instance.getByID(CQRSjs.Domain.Customer, command.CustomerID);
                if (!!customer.MonthlyPackage) {
                    CQRSjs.Framework.ErrorService.throw("this customer already has a monthly package.");
                }
            };
            return AddMonthlyPackageCommandValidator;
        }(ApplicationServices.CommandValidator));
        ApplicationServices.AddMonthlyPackageCommandValidator = AddMonthlyPackageCommandValidator;
        ApplicationServices.CommandHandlerService.Instance.registerValidator(new AddMonthlyPackageCommandValidator());
    })(ApplicationServices = CQRSjs.ApplicationServices || (CQRSjs.ApplicationServices = {}));
})(CQRSjs || (CQRSjs = {}));
