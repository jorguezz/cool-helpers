/*! cool-helpers - v0.0.2 - @author: bq.com -2015-03-22 */
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['handlebars', 'moment'], function(Handlebars, moment) {
            return (root.CoolHelpers = root.CoolH = factory(root, Handlebars, moment));
        });
    } else if (typeof exports !== 'undefined') {
        var Handlebars = require('handlebars'),
            moment = require('moment');
        module.exports = factory(root, Handlebars, moment);
    } else {
        root.CoolHelpers = root.CoolH = factory(root, root.Handlebars, root.moment);
    }

}(this, function(root, Handlebars, moment) {

    'use strict';

    var helpers = {
        register: function() {
            for (var i = 0, length = arguments.length; i < length; i++) {
                for (var helper in arguments[i]) {
                    if (arguments[i].hasOwnProperty(helper)) {
                        Handlebars.registerHelper(helper, arguments[i][helper]);
                    }
                }
            };
        }
    };
    

    /**
     * Common helpers set
     * @namespace comparison
     */
    
    
    function extend() {
        for (var i = 1; i < arguments.length; i++)
            for (var key in arguments[i])
                if (arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }
    
    var common = {
    
        /**
         * Generates a new helper with name key
         * @memberof common
         * @param  {string} name Helper name
         *
         * @example
         *
         * {{#macro "mymacro" options=""}}
         *     {{#each options}}
         *     {{/each}}
         * {{/macro}}
         *
         * {{mymacro options=options}}
         *
         */
        macro: function(name, defaults) {
            Handlebars.registerHelper(name, function(options) {
                var e = extend(this, defaults.hash, options.hash);
                return new Handlebars.SafeString(defaults.fn(e));
            });
        },
    
        /**
         * Changes each nl to a br tag
         * @memberof common
         * @param  {string} text Text to apply nl2br
         *
         * @example
         * {{nl2br title}}
         */
        nl2br: function(text) {
            var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
            return new Handlebars.SafeString(nl2br);
        },
    
        /**
         * Log one or multiple values to the console:
         * @memberof common
         *
         * @example
         * {{log value}}
         */
        log: function() {
            console.log(['Values:'].concat(
                Array.prototype.slice.call(arguments, 0, -1)
            ));
        },
    
        /**
         * Log one or multiple values to the console, with the current context:
         * {{debug foo bar}
         * @memberof common
         *
         * @example
         * {{debug value1 value2}}
         */
        debug: function() {
            console.log('Context:', this);
            console.log(['Values:'].concat(
                Array.prototype.slice.call(arguments, 0, -1)
            ));
        }
    
    };
    

    /**
     * Comparsion helpers set
     * @namespace comparison
     */
    var comparison = {
        /**
         * Conditionally render a block if string matches pattern
         * @memberof comparison
         * @param  {string} str     Value to be compared with pattern
         * @param  {string} pattern Patter which value will be compared to
         *
         * @example
         *
         * {{#contains title "pattern"}}
         *     text
         * {{/contains}}
         */
        contains: function(str, pattern, options) {
            if (str.indexOf(pattern) !== -1) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if list is empty
         * @memberof comparison
         * @param  {Array} list     Array to be checked
         *
         * @example
         *
         * {{#isEmpty list }}
         *     text
         * {{/isEmpty}}
         */
        isEmpty: function(list, options) {
            if (Array.isArray(list) && list.length === 0) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if list isnt empty
         * @memberof comparison
         * @param  {Array} list     Array to be checked
         *
         * @example
         *
         * {{#isntEmpty list }}
         *     text
         * {{/isEmpty}}
         */
        isntEmpty: function(list, options) {
            if (Array.isArray(list) && list.length > 0) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if obj is undefined
         * @memberof comparison
         * @param  {Object} obj     Object to be checked
         *
         * @example
         *
         * {{#isUndefined obj }}
         *     text
         * {{/isUndefined}}
         */
        isUndefined: function(obj, options) {
            if (obj === void 0 || obj === undefined) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if obj exists
         * @memberof comparison
         * @param  {Object} obj     Object to be checked
         *
         * @example
         *
         * {{#exists obj }}
         *     text
         * {{/exists}}
         */
        exists: function(obj, options) {
            if (obj && obj !== void 0) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if both a and b properties exists and are not null or undefined
         * @memberof comparison
         * @param  {primitive} a first property
         * @param  {primitive} b second property
         *
         * @example
         *
         * {{#and title name}}
         *     text
         * {{/and}}
         */
        and: function(a, b, options) {
            if (a && b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if value > test
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test element with first value will be compared to
         *
         * @example
         *
         * {{#gt 5 2}}
         *     text
         * {{/gt}}
         */
        gt: function(value, test, options) {
            if (value > test) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if value >= test
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test element with first value will be compared to
         *
         * @example
         *
         * {{#gte 5 2}}
         *     text
         * {{/gte}}
         */
        gte: function(value, test, options) {
            if (value >= test) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if value === test
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test element with first value will be compared to
         *
         * @example
         *
         * {{#is name "John Doe"}}
         *     text
         * {{/is}}
         */
        is: function(value, test, options) {
            if (value === test) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if value !== test
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test element with first value will be compared to
         *
         * @example
         *
         * {{#is name "John Doe"}}
         *     text
         * {{/is}}
         */
        isnt: function(value, test, options) {
            if (value !== test) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if value < test
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test element with first value will be compared to
         *
         * @example
         *
         * {{#lt 2 5}}
         *     text
         * {{/lt}}
         */
        lt: function(value, test, options) {
            if (value < test) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if value <= test
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test element with first value will be compared to
         *
         * @example
         *
         * {{#lt 2 5}}
         *     text
         * {{/lt}}
         */
        lte: function(value, test, options) {
            if (value <= test) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if a || b
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test element with first value will be compared to
         *
         * @example
         *
         * {{#or name surname}}
         *     text
         * {{/or}}
         */
        or: function(a, b, options) {
            if (a || b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * Conditionally render a block if nr%v === 0
         * @memberof comparison
         * @param  {primitive} value value to test
         * @param  {primitive} test eleme
         *
         * @example
         *
         * {{#ifNth 10 2}}
         *     text
         * {{/ifNth}}
         */
        ifNth: function(nr, v, options) {
            v = v + 1;
            if (v % nr === 0) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
    
        /**
         * {{#compare}}...{{/compare}}
         *
         * @memberof comparison
         *
         * @credit: OOCSS
         * @param left value
         * @param operator The operator, must be between quotes ">", "=", "<=", etc...
         * @param right value
         * @param options option object sent by handlebars
         * @return {String} formatted html
         *
         * @example
         *   {{#compare unicorns "<" ponies}}
         *     I knew it, unicorns are just low-quality ponies!
         *   {{/compare}}
         *
         *   {{#compare value ">=" 10}}
         *     The value is greater or equal than 10
         *     {{else}}
         *     The value is lower than 10
         *   {{/compare}}
         */
        compare: function(left, operator, right, options) {
            /*jshint eqeqeq: false*/
    
            if (arguments.length < 3) {
                throw new Error('Handlebars Helper "compare" needs 2 parameters');
            }
    
            if (options === undefined) {
                options = right;
                right = operator;
                operator = '===';
            }
    
            var operators = {
                '==': function(l, r) {
                    return l == r;
                },
                '===': function(l, r) {
                    return l === r;
                },
                '!=': function(l, r) {
                    return l != r;
                },
                '!==': function(l, r) {
                    return l !== r;
                },
                '<': function(l, r) {
                    return l < r;
                },
                '>': function(l, r) {
                    return l > r;
                },
                '<=': function(l, r) {
                    return l <= r;
                },
                '>=': function(l, r) {
                    return l >= r;
                },
                'typeof': function(l, r) {
                    return typeof l == r;
                }
            };
    
            if (!operators[operator]) {
                throw new Error('Handlebars Helper "compare" doesn\'t know the operator ' + operator);
            }
    
            var result = operators[operator](left, right);
    
            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    };
    

    /**
     * Date helpers set
     * @namespace date
     */
    var date = {
        /**
         * Returns given date with given format
         * @memberof date
         * @param  {string} date      Date to format
         * @param  {string} format    Date format
         * @param  {string} errorMsg  Error message key
         *
         * @example
         *
         * {{formatDate date 'yyyy/mm/dd'}}
         */
        formatDate: function(date, format) {
            return moment(date).format(format);
        },
    
        /**
         * Returns the difference between two dates in given format
         * @memerof date
         * @param  {string} startDate   Start date
         * @param  {string} endDate     End date
         * @param  {string} format      Date difference format
         * @return {string}             formated date
         */
        subtractDates: function(startDate, endDate, format) {
            return moment(moment(moment(startDate)).diff(moment(endDate))).format(format);
        },
    
    };
    

    /**
     * Math helpers set
     * @namespace math
     */
    var math = {
    
        /**
         * Returns value + addition
         * @memberof math
         * @param {number} value    [description]
         * @param {number} addition [description]
         *
         * @example
         *
         * {{add 5 1}}
         */
        add: function(value, addition) {
            return value + addition;
        },
    
        /**
         * Returns value - substraction
         * @memberof math
         * @param {number} value    [description]
         * @param {number} substraction [description]
         *
         * @example
         *
         * {{substract 5 1}}
         */
        subtract: function(value, substraction) {
            return value - substraction;
        },
    
        /**
         * Returns value % divisor
         * @memberof math
         * @param {number} value    [description]
         * @param {number} divisor [description]
         *
         * @example
         *
         * {{divide 6 3}}
         */
        divide: function(value, divisor) {
            return value / divisor;
        },
    
        /**
         * Returns value * multiplier
         * @memberof math
         * @param {number} value    [description]
         * @param {number} multiplier [description]
         *
         * @example
         *
         * {{multiply 3 2}}
         */
        multiply: function(value, multiplier) {
            return value * multiplier;
        },
    
        /**
         * Returns Math.floor(value)
         * @memberof math
         * @param {number} value    [description]
         *
         * @example
         *
         * {{floor 3.2222}}
         */
        floor: function(value) {
            return Math.floor(value);
        },
    
        /**
         * Returns Math.ceil(value)
         * @memberof math
         * @param {number} value    [description]
         *
         * {{ceil 3.2222}}
         */
        ceil: function(value) {
            return Math.ceil(value);
        },
    
        /**
         * Returns Math.round(value)
         * @memberof math
         * @param {number} value    [description]
         *
         * @example
         *
         * {{round 3.222}}
         */
        round: function(value) {
            return Math.round(value);
        }
    };
    

    helpers.register(
        common,
        comparison,
        date,
        math
    );

    return helpers;

}));
