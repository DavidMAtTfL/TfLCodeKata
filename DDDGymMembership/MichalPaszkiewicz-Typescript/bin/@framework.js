var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var Command = (function () {
            function Command(aggregateRootID, userName, commandName) {
                this.AggregateRootID = aggregateRootID;
                this.UserName = userName;
                this.Time = Framework.TimeService.Instance.nowTicks();
                this.CommandName = commandName;
            }
            return Command;
        }());
        Framework.Command = Command;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var ErrorService = (function () {
            function ErrorService() {
                this._onThrowEvents = [];
            }
            ErrorService.prototype.onThrow = function (onThrowEvent) {
                this._onThrowEvents.push(onThrowEvent);
            };
            ErrorService.prototype.clearOnThrowEvents = function () {
                this._onThrowEvents = [];
            };
            Object.defineProperty(ErrorService, "Instance", {
                get: function () {
                    if (!this._instance) {
                        this._instance = new ErrorService();
                        this._instance.onThrow(function (message) { throw new Error(message); });
                    }
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            ErrorService.throw = function (message) {
                ErrorService.Instance.throw(message);
            };
            ErrorService.prototype.throw = function (message) {
                this._onThrowEvents.forEach(function (onThrowEvent) {
                    onThrowEvent(message);
                });
            };
            return ErrorService;
        }());
        Framework.ErrorService = ErrorService;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var Event = (function () {
            function Event(aggregateRootID, eventName, userName) {
                this.AggregateRootID = aggregateRootID;
                this.UserName = userName;
                this.EventName = eventName;
                this.Time = Framework.TimeService.Instance.nowTicks();
            }
            return Event;
        }());
        Framework.Event = Event;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var EventStoreService = (function () {
            function EventStoreService() {
                this._eventsStored = [];
                this._funcsOnAdded = [];
                var self = this;
                self.onAdded(function (event) {
                    self._eventsStored.push(event);
                });
            }
            Object.defineProperty(EventStoreService, "Instance", {
                get: function () {
                    if (EventStoreService._instance == null) {
                        EventStoreService._instance = new EventStoreService();
                    }
                    return EventStoreService._instance;
                },
                enumerable: true,
                configurable: true
            });
            EventStoreService.prototype._getEvents = function () {
                return this._eventsStored;
            };
            Object.defineProperty(EventStoreService.prototype, "EventsStored", {
                get: function () {
                    return this._getEvents();
                },
                enumerable: true,
                configurable: true
            });
            EventStoreService.prototype.getEventsWithID = function (id) {
                return this._getEvents().filter(function (e) { return e.AggregateRootID == id; });
            };
            EventStoreService.prototype.overrideGetEvents = function (func) {
                this._getEvents = func;
            };
            EventStoreService.prototype.overrideGetEventsWithID = function (func) {
                this.getEventsWithID = func;
            };
            EventStoreService.prototype.store = function (event) {
                this._funcsOnAdded.forEach(function (func) {
                    func(event);
                });
            };
            EventStoreService.prototype.onAdded = function (func) {
                this._funcsOnAdded.push(func);
            };
            EventStoreService.prototype.clearOnAdded = function () {
                this._funcsOnAdded = [];
            };
            return EventStoreService;
        }());
        Framework.EventStoreService = EventStoreService;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var IDGenerator;
    (function (IDGenerator) {
        function generate() {
            var d = (new Date()).getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }
        IDGenerator.generate = generate;
        ;
    })(IDGenerator = CQRSjs.IDGenerator || (CQRSjs.IDGenerator = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var LogService = (function () {
            function LogService() {
                this._onLogEvents = [];
            }
            LogService.prototype.onLog = function (onLogEvent) {
                this._onLogEvents.push(onLogEvent);
            };
            Object.defineProperty(LogService, "Instance", {
                get: function () {
                    if (LogService._instance == null) {
                        LogService._instance = new LogService();
                        LogService._instance.onLog(function (message) {
                            console.log(message);
                        });
                    }
                    return LogService._instance;
                },
                enumerable: true,
                configurable: true
            });
            LogService.prototype.log = function (message) {
                this._onLogEvents.forEach(function (onLogEvent) {
                    onLogEvent(message);
                });
            };
            LogService.prototype.clearLogEvents = function () {
                this._onLogEvents = [];
            };
            return LogService;
        }());
        Framework.LogService = LogService;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var TimeService = (function () {
            function TimeService() {
                this._yearsAdded = 0;
                this._monthsAdded = 0;
                this._daysAdded = 0;
                this._hoursAdded = 0;
                this._minutesAdded = 0;
                this._secondsAdded = 0;
                this._millisecondsAdded = 0;
            }
            Object.defineProperty(TimeService, "Instance", {
                get: function () {
                    if (TimeService._instance == null) {
                        TimeService._instance = new TimeService();
                    }
                    return TimeService._instance;
                },
                enumerable: true,
                configurable: true
            });
            TimeService.prototype.getTime = function () {
                var realTime = new Date();
                realTime.setFullYear(realTime.getFullYear() + this._yearsAdded);
                realTime.setMonth(realTime.getMonth() + this._monthsAdded);
                realTime.setDate(realTime.getDate() + this._daysAdded);
                realTime.setHours(realTime.getHours() + this._hoursAdded);
                realTime.setMinutes(realTime.getMinutes() + this._minutesAdded);
                realTime.setSeconds(realTime.getSeconds() + this._secondsAdded);
                realTime.setMilliseconds(realTime.getMilliseconds() + this._millisecondsAdded);
                return realTime;
            };
            TimeService.prototype.reset = function () {
                this._yearsAdded = 0;
                this._monthsAdded = 0;
                this._daysAdded = 0;
                this._hoursAdded = 0;
                this._minutesAdded = 0;
                this._secondsAdded = 0;
                this._millisecondsAdded = 0;
            };
            TimeService.prototype.addYears = function (years) {
                if (Math.round(years) != years) {
                    Framework.ErrorService.throw("addYears only accepts integer values for years in the timeService");
                }
                this._yearsAdded += years;
            };
            TimeService.prototype.addMonths = function (months) {
                if (Math.round(months) != months) {
                    Framework.ErrorService.throw("addMonths only accepts integer values for months in the timeService");
                }
                this._monthsAdded += months;
            };
            TimeService.prototype.addDays = function (days) {
                if (Math.round(days) != days) {
                    Framework.ErrorService.throw("addDays only accepts integer values for days in the timeService");
                }
                this._daysAdded += days;
            };
            TimeService.prototype.addHours = function (hours) {
                if (Math.round(hours) != hours) {
                    Framework.ErrorService.throw("addHours only accepts integer values for hours in the timeService");
                }
                this._hoursAdded += hours;
            };
            TimeService.prototype.addMinutes = function (minutes) {
                if (Math.round(minutes) != minutes) {
                    Framework.ErrorService.throw("addMinutes only accepts integer values for minutes in the timeService");
                }
                this._minutesAdded += minutes;
            };
            TimeService.prototype.addSeconds = function (seconds) {
                if (Math.round(seconds) != seconds) {
                    Framework.ErrorService.throw("addSeconds only accepts integer values for seconds in the timeService");
                }
                this._secondsAdded += seconds;
            };
            TimeService.prototype.addMilliseconds = function (milliseconds) {
                if (Math.round(milliseconds) != milliseconds) {
                    Framework.ErrorService.throw("addMilliseconds only accepts integer values for milliseconds in the timeService");
                }
                this._millisecondsAdded += milliseconds;
            };
            TimeService.prototype.now = function () {
                return this.getTime();
            };
            TimeService.prototype.nowTicks = function () {
                return this.getTime().getTime();
            };
            TimeService.prototype.today = function () {
                var localTime = this.getTime();
                localTime.setHours(0);
                localTime.setMinutes(0);
                localTime.setSeconds(0);
                localTime.setMilliseconds(0);
                return localTime;
            };
            return TimeService;
        }());
        Framework.TimeService = TimeService;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var TransactionAddedEvent = (function (_super) {
            __extends(TransactionAddedEvent, _super);
            function TransactionAddedEvent(batchID, userName, transactionID, amount) {
                _super.call(this, batchID, "TransactionAdded", userName);
                this._transactionID = transactionID;
                this._amount = amount;
            }
            Object.defineProperty(TransactionAddedEvent.prototype, "TransactionID", {
                get: function () {
                    return this._transactionID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TransactionAddedEvent.prototype, "Amount", {
                get: function () {
                    return this._amount;
                },
                enumerable: true,
                configurable: true
            });
            return TransactionAddedEvent;
        }(Framework.Event));
        Framework.TransactionAddedEvent = TransactionAddedEvent;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var AddressSetEvent = (function (_super) {
            __extends(AddressSetEvent, _super);
            function AddressSetEvent(customerID, userName, city, province, street) {
                _super.call(this, customerID, "AddressSet", userName);
                this._street = street;
                this._province = province;
                this._city = city;
            }
            Object.defineProperty(AddressSetEvent.prototype, "Street", {
                get: function () {
                    return this._street;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressSetEvent.prototype, "Province", {
                get: function () {
                    return this._province;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AddressSetEvent.prototype, "City", {
                get: function () {
                    return this._city;
                },
                enumerable: true,
                configurable: true
            });
            return AddressSetEvent;
        }(Framework.Event));
        Framework.AddressSetEvent = AddressSetEvent;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var MonthlyPackageAddedToCustomerEvent = (function (_super) {
            __extends(MonthlyPackageAddedToCustomerEvent, _super);
            function MonthlyPackageAddedToCustomerEvent(customerID, userName, packageID, name, price) {
                _super.call(this, customerID, "MonthlyPackageAddedToCustomer", userName);
                this._packageID = packageID;
                this._name = name;
                this._price = price;
            }
            Object.defineProperty(MonthlyPackageAddedToCustomerEvent.prototype, "PackageID", {
                get: function () {
                    return this._packageID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MonthlyPackageAddedToCustomerEvent.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MonthlyPackageAddedToCustomerEvent.prototype, "Price", {
                get: function () {
                    return this._price;
                },
                enumerable: true,
                configurable: true
            });
            return MonthlyPackageAddedToCustomerEvent;
        }(Framework.Event));
        Framework.MonthlyPackageAddedToCustomerEvent = MonthlyPackageAddedToCustomerEvent;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
var CQRSjs;
(function (CQRSjs) {
    var Framework;
    (function (Framework) {
        var MonthlyPackageAddedToGymEvent = (function (_super) {
            __extends(MonthlyPackageAddedToGymEvent, _super);
            function MonthlyPackageAddedToGymEvent(gymID, userName, packageID, name, price) {
                _super.call(this, gymID, "MonthlyPackageAddedToGym", userName);
                this._packageID = packageID;
                this._name = name;
                this._price = price;
            }
            Object.defineProperty(MonthlyPackageAddedToGymEvent.prototype, "PackageID", {
                get: function () {
                    return this._packageID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MonthlyPackageAddedToGymEvent.prototype, "Name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MonthlyPackageAddedToGymEvent.prototype, "Price", {
                get: function () {
                    return this._price;
                },
                enumerable: true,
                configurable: true
            });
            return MonthlyPackageAddedToGymEvent;
        }(Framework.Event));
        Framework.MonthlyPackageAddedToGymEvent = MonthlyPackageAddedToGymEvent;
    })(Framework = CQRSjs.Framework || (CQRSjs.Framework = {}));
})(CQRSjs || (CQRSjs = {}));
