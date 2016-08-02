var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var EntityBase = (function () {
            function EntityBase(id) {
                this.ID = id;
            }
            EntityBase.prototype.equals = function (other) {
                if (!this.ID || !other.ID) {
                    return false;
                }
                return this.ID == other.ID;
            };
            return EntityBase;
        }());
        Domain.EntityBase = EntityBase;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
/// <reference path="./entitybase.ts" />
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var EventAction = (function () {
            function EventAction(eventName, action) {
                this.EventName = eventName;
                this.Action = action;
            }
            return EventAction;
        }());
        Domain.EventAction = EventAction;
        var AggregateRoot = (function (_super) {
            __extends(AggregateRoot, _super);
            function AggregateRoot(id) {
                _super.call(this, id);
                this._eventActions = [];
            }
            // event actions must be registered in constructor.
            AggregateRoot.prototype.registerEventAction = function (eventAction) {
                this._eventActions.push(eventAction);
            };
            AggregateRoot.prototype.applyEvent = function (event) {
                this._eventActions
                    .filter(function (ea) { return ea.EventName == event.EventName; })
                    .forEach(function (ea) { ea.Action(event); });
                CQRSjs.Framework.EventStoreService.Instance.store(event);
            };
            return AggregateRoot;
        }(Domain.EntityBase));
        Domain.AggregateRoot = AggregateRoot;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var AggregateRootService = (function () {
            function AggregateRootService() {
            }
            Object.defineProperty(AggregateRootService, "Instance", {
                get: function () {
                    if (AggregateRootService._instance == null) {
                        AggregateRootService._instance = new AggregateRootService();
                    }
                    return AggregateRootService._instance;
                },
                enumerable: true,
                configurable: true
            });
            AggregateRootService.prototype.getByID = function (a, aggregateRootID) {
                var relevantAggregateRoot = new a(aggregateRootID);
                CQRSjs.Framework.EventStoreService.Instance.getEventsWithID(aggregateRootID).forEach(function (e) {
                    relevantAggregateRoot.applyEvent(e);
                });
                return relevantAggregateRoot;
            };
            return AggregateRootService;
        }());
        Domain.AggregateRootService = AggregateRootService;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var ValueObject = (function () {
            function ValueObject() {
            }
            ValueObject.prototype.objectsAreEqual = function (object1, object2, stackLevel) {
                if (stackLevel > 3) {
                    CQRSjs.Framework.ErrorService.throw("stack overflow in value object comparison. avoid circular references in value objects");
                    return false;
                }
                var self = this;
                for (var prop in object1) {
                    if (object1.hasOwnProperty(prop)) {
                        if (object1[prop] == null && object2[prop] != null) {
                            return false;
                        }
                        else if (object1[prop].length && object1[prop].length != 0) {
                            if (object1[prop].length != object2[prop].length) {
                                return false;
                            }
                            for (var i = 0; i < object1[prop].length; i++) {
                                if (object1[prop][i] != object2[prop][i]) {
                                    return false;
                                }
                            }
                        }
                        else if (typeof (object1[prop].equals) === "function") {
                            return object1[prop].equals(object2[prop]);
                        }
                        else if (typeof (object1[prop]) === "object") {
                            return self.objectsAreEqual(object1[prop], object2[prop], stackLevel + 1);
                        }
                        else if (object1[prop] != object2[prop]) {
                            return false;
                        }
                    }
                }
                return true;
            };
            ValueObject.prototype.equals = function (other) {
                var me = this;
                return me.objectsAreEqual(me, other, 0);
            };
            return ValueObject;
        }());
        Domain.ValueObject = ValueObject;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var Batch = (function (_super) {
            __extends(Batch, _super);
            function Batch(id) {
                _super.call(this, id);
                this.Transactions = [];
                var self = this;
                self.registerEventAction(new Domain.EventAction("TransactionAdded", function (e) {
                    var transaction = new Domain.Transaction(e.TransactionID, e.Amount);
                    self.Transactions.push(transaction);
                }));
            }
            Batch.prototype.addTransaction = function (command) {
                var transaction = new Domain.Transaction(command.TransactionID, command.Amount);
                if (this.Transactions.some(function (t) { return t.equals(transaction); })) {
                    CQRSjs.Framework.ErrorService.throw("a transaction with ID " + transaction.ID + " already exists in this batch.");
                }
                if (transaction.Amount < 10) {
                    CQRSjs.Framework.ErrorService.throw("transaction amount cannot be less than £10");
                }
                this.applyEvent(new CQRSjs.Framework.TransactionAddedEvent(command.AggregateRootID, command.UserName, command.TransactionID, command.Amount));
            };
            return Batch;
        }(Domain.AggregateRoot));
        Domain.Batch = Batch;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var Transaction = (function (_super) {
            __extends(Transaction, _super);
            function Transaction(id, amount) {
                _super.call(this, id);
                this.Amount = amount;
            }
            return Transaction;
        }(Domain.EntityBase));
        Domain.Transaction = Transaction;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var AddTransactionCommand = (function (_super) {
            __extends(AddTransactionCommand, _super);
            function AddTransactionCommand(batchID, userName, transactionID, amount) {
                _super.call(this, batchID, userName, "AddTransaction");
                this._transactionID = transactionID;
                this._amount = amount;
            }
            Object.defineProperty(AddTransactionCommand.prototype, "TransactionID", {
                get: function () {
                    return this._transactionID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddTransactionCommand.prototype, "Amount", {
                get: function () {
                    return this._amount;
                },
                enumerable: true,
                configurable: true
            });
            return AddTransactionCommand;
        }(CQRSjs.Framework.Command));
        Domain.AddTransactionCommand = AddTransactionCommand;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var Customer = (function (_super) {
            __extends(Customer, _super);
            function Customer(id) {
                _super.call(this, id);
                var self = this;
                self.registerEventAction(new Domain.EventAction("MonthlyPackageAddedToCustomer", function (e) {
                    self._monthlyPackage = new Domain.MonthlyPackage(e.PackageID, e.Name, e.Price);
                }));
                self.registerEventAction(new Domain.EventAction("AddressSet", function (e) {
                    self._address = new Domain.Address(e.City, e.Province, e.Street);
                }));
            }
            Object.defineProperty(Customer.prototype, "Address", {
                get: function () {
                    return this._address;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Customer.prototype, "MonthlyPackage", {
                get: function () {
                    return this._monthlyPackage;
                },
                enumerable: true,
                configurable: true
            });
            Customer.prototype.setAddress = function (command) {
                this.applyEvent(new CQRSjs.Framework.AddressSetEvent(command.AggregateRootID, command.UserName, command.City, command.Province, command.Street));
            };
            Customer.prototype.setMonthlyPackage = function (command) {
                this.applyEvent(new CQRSjs.Framework.MonthlyPackageAddedToCustomerEvent(command.CustomerID, command.UserName, command.PackageID, command.Name, command.Price));
            };
            return Customer;
        }(Domain.AggregateRoot));
        Domain.Customer = Customer;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var SetAddressCommand = (function (_super) {
            __extends(SetAddressCommand, _super);
            function SetAddressCommand(customerID, userName, city, province, street) {
                _super.call(this, customerID, userName, "SetAddress");
                this._city = city;
                this._street = street;
                this._province = province;
            }
            Object.defineProperty(SetAddressCommand.prototype, "City", {
                get: function () {
                    return this._city;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SetAddressCommand.prototype, "Province", {
                get: function () {
                    return this._province;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SetAddressCommand.prototype, "Street", {
                get: function () {
                    return this._street;
                },
                enumerable: true,
                configurable: true
            });
            return SetAddressCommand;
        }(CQRSjs.Framework.Command));
        Domain.SetAddressCommand = SetAddressCommand;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var Address = (function (_super) {
            __extends(Address, _super);
            function Address(city, province, street) {
                _super.call(this);
                this._city = CQRSjs.Helpers.ensureStringHasValue(city, "city");
                this._province = CQRSjs.Helpers.ensureStringHasValue(province, "province");
                this._street = CQRSjs.Helpers.ensureStringHasValue(street, "street");
            }
            Object.defineProperty(Address.prototype, "City", {
                get: function () { return this._city; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "Province", {
                get: function () { return this._province; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Address.prototype, "Street", {
                get: function () { return this._street; },
                enumerable: true,
                configurable: true
            });
            return Address;
        }(Domain.ValueObject));
        Domain.Address = Address;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var Gym = (function (_super) {
            __extends(Gym, _super);
            function Gym(id) {
                _super.call(this, id);
                this.MonthlyPackages = [];
                var self = this;
                self.registerEventAction(new Domain.EventAction("MonthlyPackageAddedToGym", function (e) {
                    var monthlyPackage = new Domain.MonthlyPackage(e.PackageID, e.Name, e.Price);
                    self.MonthlyPackages.push(monthlyPackage);
                }));
            }
            Gym.prototype.addMonthlyPackage = function (command) {
                var monthlyPackage = new Domain.MonthlyPackage(command.PackageID, command.Name, command.Price);
                if (this.MonthlyPackages.filter(function (mp) { return mp.equals(monthlyPackage); }).length > 0) {
                    CQRSjs.Framework.ErrorService.throw("a monthly package with ID " + monthlyPackage.ID + " already exists");
                }
                this.applyEvent(new CQRSjs.Framework.MonthlyPackageAddedToGymEvent(command.AggregateRootID, command.UserName, command.PackageID, command.Name, command.Price));
            };
            return Gym;
        }(Domain.AggregateRoot));
        Domain.Gym = Gym;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var MonthlyPackage = (function (_super) {
            __extends(MonthlyPackage, _super);
            function MonthlyPackage(id, name, price) {
                _super.call(this, id);
                this.Name = name;
                this.Price = price;
            }
            return MonthlyPackage;
        }(Domain.EntityBase));
        Domain.MonthlyPackage = MonthlyPackage;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Domain;
    (function (Domain) {
        var AddMonthlyPackageCommand = (function (_super) {
            __extends(AddMonthlyPackageCommand, _super);
            function AddMonthlyPackageCommand(gymID, customerID, userName, packageID, name, price) {
                _super.call(this, gymID, userName, "AddMonthlyPackage");
                this._customerID = customerID;
                this._packageID = packageID;
                this._name = name;
                this._price = price;
            }
            Object.defineProperty(AddMonthlyPackageCommand.prototype, "CustomerID", {
                get: function () {
                    return this._customerID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddMonthlyPackageCommand.prototype, "PackageID", {
                get: function () {
                    return this._packageID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddMonthlyPackageCommand.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddMonthlyPackageCommand.prototype, "Price", {
                get: function () {
                    return this._price;
                },
                enumerable: true,
                configurable: true
            });
            return AddMonthlyPackageCommand;
        }(CQRSjs.Framework.Command));
        Domain.AddMonthlyPackageCommand = AddMonthlyPackageCommand;
    })(Domain = CQRSjs.Domain || (CQRSjs.Domain = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Helpers;
    (function (Helpers) {
        function ensureStringHasValue(text, propertyName) {
            if (!text) {
                CQRSjs.Framework.ErrorService.throw("property " + propertyName + " must have a value");
            }
            return text;
        }
        Helpers.ensureStringHasValue = ensureStringHasValue;
    })(Helpers = CQRSjs.Helpers || (CQRSjs.Helpers = {}));
})(CQRSjs || (CQRSjs = {}));
