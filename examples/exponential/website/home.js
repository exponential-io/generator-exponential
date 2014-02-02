'use strict';

/**
 * Website home page.
 *
 * This MDF is a slight variation on exponential/crm/companies which is the main
 * module level MDF that is being used to flesh out the MDF format. Importantly,
 * most of what is in this file is not needed. However, it's kept here to make a
 * diff easy.
 *
 * @module exponential/website/home
 */
module.exports = function(_) {
    /**
     * Module Definition Format (ADF) is an object that contains all
     * app and/or module configuration. Use this object to define the entire mdf
     * object structure and to define default values.
     *
     * @type {Object}
     */
    var mdf = {
        project: require('../project')(),
        app: require('./app')(),
        module: {
            urlBase: '',
            angular: {
                use: false,
                template: '',
                controllers: {
                    create: '',
                    readAll: '',
                    readOne: '',
                    update: ''
                },
                module: '',
                service: ''
            },
            api: {
                use: false,
                template: ''
            },
            express: {
                use: true,
                template: 'website',
                url: '/',
                title: 'Build better apps, faster, with less effort.',
                view: 'website/home',
                viewExt: '.hbs',
                controller: 'website/home',
                controllerExt: '.js'
            },
            website: {
                // I think I can delete website. It was an earlier attempt at a
                // grouping that is not specific enough. It makes more sense to
                // use technology specific groupings, such as Express.
                use: false
            },
            name: {
                upperPlural: '',
                lowerPlural: '',
                upperSingular: '',
                lowerSingular: ''
            },
            schema: {
                name: '',
                collectMetrics: true,
                options: {},
                fields: [],
                indexes: []
            },
            model: {
                name: {
                    upperPlural: '',
                    lowerPlural: '',
                    upperSingular: '',
                    lowerSingular: ''
                },
                id: ''
            }
        }
    };

    // Module name examples
    //
    // Variable                        : Example
    // --------------------------------:-----------
    // mdf.module.name.upperPlural     : Customers
    // mdf.module.name.lowerPlural     : customers
    // mdf.module.name.lowerSingular   : customer

    /**
     * Module name upperPlural is to create JSDoc comments.
     * @type {string}
     */
    mdf.module.name.upperPlural = '';

    /**
     * Module name lower plural is used to create URLs in the routes file and to
     * name the controller file.
     * @type {string}
     */
    mdf.module.name.lowerPlural = '';

    /**
     * Module name upper singular is used to name the model.
     * @type {string}
     */
    mdf.module.name.upperSingular = 'Home';

    /**
     * Used in the routes file. Used as the model file name.
     * @type {string}
     */
    mdf.module.name.lowerSingular = 'home';

    /**
     * Name of the Angular Create controller.
     * @type {string}
     */
    mdf.module.angular.controllers.create = mdf.module.name.upperPlural + 'CreateCtrl';

    /**
     * Name of the Angular Read All controller.
     * @type {string}
     */
    mdf.module.angular.controllers.readAll = mdf.module.name.upperPlural + 'ReadAllCtrl';

    /**
     * Name of the Angular Read One controller.
     * @type {string}
     */
    mdf.module.angular.controllers.readOne = mdf.module.name.upperPlural + 'ReadOneCtrl';

    /**
     * Name of the Angular Update controller.
     * @type {string}
     */
    mdf.module.angular.controllers.update = mdf.module.name.upperPlural + 'Update';

    /**
     * The Angular module name is used to create a namespace for this module.
     * @type {string}
     */
    mdf.module.angular.module = mdf.module.name.lowerPlural + 'Mod';

    /**
     * The Angular service name is used to name the services provided by this
     * module.
     * @type {string}
     */
    mdf.module.angular.service = mdf.module.name.lowerPlural + 'Srv';

    // Schema sets the name of the schema object used in the module's model and
    // contains an array of keys.

    /**
     * Name of the schema object used in the module's model.
     * @type {string}
     */
    mdf.module.schema.name = mdf.module.name.lowerSingular + 'Schema';

    /**
     * Configure schema options.
     * @type {Object}
     */
    mdf.module.schema.options = {
        // autoIndex: true,
        // bufferCommands: true,
        // capped: { size: 1024, max: 1000, autoIndexId: true },
        // collection: '',
        // id: true,
        // _id: true,
        // read: 'primary',
        // safe: true,
        // shardKey: { tag: 1, name: 1 },
        // strict: true,
        // toJSON: { getters: true, virtuals: false },
        // toObject: { getters: true, virtuals: false },
        // versionKey: '__v'
    };

    /*
     Allowed values:
     type   : Array, Boolean, Buffer, Date, Mixed, Number, ObjectId, String
     getter : I need to create a list of functions that extend the schema
     setter : Same as getter

     TODO:
     Setup an empty schema for each type as the schema pattern will vary by
     data type.

     Special date issues: http://mongoosejs.com/docs/schematypes.html
     Built-in Date methods are not hooked into the mongoose change tracking logic
     */

    /**
     * An array containing each database field.
     * @type {Array}
     */
    mdf.module.schema.fields = [
        {
            /**
             * The database field label.
             * @type {String}
             */
            key: 'name',
            /**
             * Default value for the field. The value may be a string or a
             * function that returns a string. If a function is passed, then it
             * must have '()' appended, such as 'callFunction()'.
             *
             * @type {String|Function}
             */
            // default: 'callFunction()',
            /**
             * The HTML field label when the field is used in a form, or an HTML
             * column heading when the field is used in a grid.
             * @type {String}
             */
            label: 'Company',
            /**
             * Placeholder text displayed in the HTML control for this field.
             * @type {String}
             */
            placeholder: 'Company name',
            /**
             * The field's data type, which must be one of:
             * <ul>
             *     <li>String</li>
             *     <li>Number</li>
             *     <li>Boolean</li>
             *     <li>Date</li>
             *     <li>Array</li>
             * </ul>
             * @type {String}
             */
            type: 'String',
            /**
             * The HTML control type to use when this field is displayed in a
             * form. Control must be one of:
             * <ul>
             *     <li>text</li>
             *     <li>textarea</li>
             *     <li>dropdown</li>
             *     <li>checkbox</li>
             *     <li>radio</li>
             * </ul>
             * @type {String}
             */
            control: 'text',
            /**
             * [Optional] Create an index based on this field.
             * @type {Boolean}
             */
            index: true,
            /**
             * [Optional] Create a MongoDB sparse index based on this field.
             * @type {Boolean}
             */
            // sparse: true,
            /**
             * [Optional] Create a MongoDB unique index based on this field.
             * @type {Boolean}
             */
            unique: true,
            /**
             * Allowed values may be either a string that specifies a function
             * that returns an array of valid values, or may itself be an array
             * with a list of valid values. allowedValues matches with
             * Mongoose's enum. If a function is passed, then it must have '()'
             * appended, such as 'callFunction()'.
             *
             * @type {String|Function}
             */
            //allowedValues: ['CA', 'AZ', 'NY'],
            //allowedValues: 'usaStates()',
            // getter: 'abc', // '' === disabled [Optional]
            // setter: '', // '' === disabled [Optional]
            // trim: true,
            // lowercase: true,
            // uppercase: true,
            /**
             * [Optional] If true, always include this field in the select
             * result, unless overridden in the query.
             * @type {Boolean}
             */
            // select: true, // [Optional] If true, always include in select queries, if false never include
            validate: true,
            validation: {
                /*
                 * Must the user enter a value, or is this optional? If
                 * answered, then we can validate if validate === true.
                 * @type {Boolean}
                 */
                isRequired: true,
                /*
                 *
                 * @type {Boolean}
                 */
                allowNull: false,
                /*
                 *
                 * @type {Boolean}
                 */
                validateLen: true,
                /**
                 * [min | min, max] ex. '3' for min only, or '2, 256' to check
                 * min and max
                 * @type {String}
                 */
                len: '1, 1024',
                /*
                 * If true, only letters are allowed. Mutually exclusive with
                 * isAlphanumeric.
                 * @type {Boolean}
                 */
                isAlpha: false,
                /*
                 * If true, only letters and numbers are allowed. Mutually
                 * exclusive with isAlpha.
                 * @type {Boolean}
                 */
                isAlphanumeric: false,
                /*
                 * If true, only lowercase is allowed. Mutually exclusive with
                 * isUppercase. isLowercase and isUppercase can both be false.
                 * @type {Boolean}
                 */
                isLowercase: false,
                /*
                 * If true, only UPPERCASE is allowed. Mutually exclusive with
                 * isLowercase.
                 * @type {Boolean}
                 */
                isUppercase: false,
                /*
                 * If true, prevents the user from entering only whitespace into
                 * a textbox.
                 * @type {Boolean}
                 */
                notEmpty: false,
                /*
                 *
                 * @type {Boolean}
                 */
                validateEquals: false,
                /**
                 * Pass a string that the user entered value should be compared
                 * against.
                 */
                equals: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateContains: false,
                /**
                 * Pass a string that must be a substring of the user entered
                 * value.
                 * @type {String}
                 */
                contains: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateNotContains: false,
                /**
                 * Pass a string that must **not** be a substring of the user
                 * entered value.
                 * @type {String}
                 */
                notContains: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateIsIn: false,
                /**
                 * Pass a string where the user entered value must be a
                 * substring of string.
                 * @type {String}
                 */
                isIn: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateNotIn: false,
                /**
                 * Pass a string where the user entered value must be **not** be
                 * a substring of string.
                 * @type {String}
                 */
                notIn: ''
            },
            crud: {
                create: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readAll: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: '',
                    linkToReadOne: true
                },
                readOne: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                update: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                remove: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                }
            }
        },
        {
            key: 'state',
            // default: 'CA',
            label: 'State',
            placeholder: 'State',
            type: 'String',
            control: 'text',
            /**
             * Allowed values may be either a string that specifies a function
             * that returns an array of valid value, or may itself be an array
             * with a list of valid values. allowedValues matches with
             * Mongoose's enum.
             */
            // allowedValues: ['CA', 'AZ', 'NY'],
            /**
             * [Optional] If true, then the string is ltrim and rtrim before
             * saving the value to the DB.
             */
            // setTrim: true,
            /**
             * Optional. If true, calls the built-in lowercase setter which
             * makes the string all lowercase before saving it to the DB.
             */
            // setLowercase: false,
            // setUppercase: false,
            // getter: '', // '' === disabled
            // setter: '', // '' === disabled
            // select: true, // [Optional]
            validate: true,
            validation: {
                isRequired: false,
                allowNull: false,
                validateLen: true, // same as above in terms of deleting this option
                len: '1, 128',
                isAlpha: false,
                isAlphanumeric: false,
                isLowercase: false,
                isUppercase: false,
                notEmpty: false,
                validateEquals: false, // Can I delete this and just use if (equals !== '') as the equivalent of validateEquals === true
                equals: '',
                validateContains: false, // same as above in terms of deleting this option
                contains: '',
                validateNotContains: false, // same as above in terms of deleting this option
                notContains: '',
                validateIsIn: false, // same as above in terms of deleting this option
                isIn: '',
                validateNotIn: false, // same as above in terms of deleting this option
                notIn: ''
            },
            crud: {
                create: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readAll: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readOne: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                update: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                remove: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                }
            }
        },
        {
            key: 'country',
            // default: '',
            label: 'Country',
            placeholder: 'Country',
            type: 'String',
            control: 'text',
            // getter: '', // '' === disabled
            // setter: '', // '' === disabled
            // select: '', // set to true/false to use, or set '' to disable
            validate: true,
            validation: {
                isRequired: false,
                allowNull: false,
                len: '',
                isAlpha: false,
                isAlphanumeric: false,
                isLowercase: false,
                isUppercase: false,
                notEmpty: false,
                equals: '',
                contains: '',
                notContains: '',
                isIn: '',
                notIn: ''
            },
            crud: {
                create: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readAll: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readOne: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                update: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                remove: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                }
            }
        },
        {
            key: 'revenue',
            /**
             * Default value for the field. A simple number may be entered as a
             * number or as a string. If a number is entered as a string, then
             * Exponential will correctly convert it to a number in the
             * generated code. Also, a function that returns a number may be
             * specified by entering the function name as a string with '()'
             * appended, such as 'callFunction()'.
             *
             * @type {Number|String}
             */
            // default: 'callFunction()',
            label: 'Revenue',
            placeholder: 'Annual revenue',
            /**
             * Data type for this field.
             * @type {String}
             */
            type: 'Number',
            /**
             * HTML control type.
             * @type {String}
             */
            control: 'number',
            /**
             * [Optional] Create an index based on this field.
             * @type {Boolean}
             */
            // index: true,
            /**
             * [Optional] Create a MongoDB sparse index based on this field.
             * @type {Boolean}
             */
            // sparse: true,
            /**
             * [Optional] Create a MongoDB unique index based on this field.
             * @type {Boolean}
             */
            // unique: true,
            /**
             * [Optional] Limit the allowed values.
             * @type {Array,|String}
             */
            // TODO: DOES THIS WORK WITH NUMBER
            //allowedValues: [1, 5, 7, 10],
            // allowedValues: 'someFunction()',
            /**
             * [Optional] A function to call as a getter. The getter must have '()'
             * appended.
             * @type {String}
             */
            // getter: 'abc()', // '' === disabled
            /**
             * [Optional] A function to call as a setter. The getter must have '()'
             * appended.
             * @type {String}
             */
            // setter: 'xyz()', // '' === disabled
            /**
             * [Optional] If true, always include this field in the select
             * result, unless overridden in the query.
             * @type {Boolean}
             */
            // select: true,
            validate: true,
            validation: {
                isRequired: false,
                allowNull: false,
                validateIsNumeric: false,
                validateIsInt: false,
                validateIsDecimal: false,
                validateIsFloat: false,
                validateMin: false,
                min: 0,
                validateMax: false,
                max: 0,
                sanitizeToFloat: false,
                sanitizeToInt: false
            },
            crud: {
                create: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readAll: {
                    use: true,
                    visible: false,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readOne: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                update: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                remove: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                }
            }
        },
        {
            key: 'active',
            /**
             * Default value for the field. A simple number may be entered as a
             * number or as a string. If a number is entered as a string, then
             * Exponential will correctly convert it to a number in the
             * generated code. Also, a function that returns a number may be
             * specified by entering the function name as a string with '()'
             * appended, such as 'callFunction()'.
             *
             * @type {Boolean|String}
             */
            default: true,
            label: 'Active',
            placeholder: 'Is account active?',
            /**
             * Data type for this field.
             * @type {String}
             */
            type: 'Boolean',
            /**
             * HTML control type.
             * @type {String}
             */
            control: 'checkbox',
            /**
             * [Optional] Create an index based on this field.
             * @type {Boolean}
             */
            // index: true,
            /**
             * [Optional] Create a MongoDB sparse index based on this field.
             * @type {Boolean}
             */
            // sparse: true,
            /**
             * [Optional] Create a MongoDB unique index based on this field.
             * @type {Boolean}
             */
            // unique: true,
            /**
             * [Optional] A function to call as a getter. The getter must have '()'
             * appended.
             * @type {String}
             */
            // getter: 'abc()',
            /**
             * [Optional] A function to call as a setter. The getter must have '()'
             * appended.
             * @type {String}
             */
            // setter: 'xyz()',
            /**
             * [Optional] If true, always include this field in the select
             * result, unless overridden in the query.
             * @type {Boolean}
             */
            // select: true,
            validate: true,
            validation: {
                isRequired: false,
                allowNull: false
            },
            crud: {
                create: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readAll: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readOne: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                update: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                remove: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                }
            }
        },
        {
            key: 'sales',
            // ###################### Not default with an array. default is []
            // ###################### default: 'callFunction()',
            label: 'Sales',
            placeholder: 'Sales history',
            type: 'Array',
            /**
             * Defines the array structure. Can be anyone of:
             * []
             * [String]
             * [Number]
             * [Date]
             * [Buffer]
             * [Boolean]
             * [Schema.Types.Mixed]
             * [Schema.Types.ObjectId]
             * [{createdById: ObjectId, createdOn: Date}]
             * @type {Array}
             */
            structure: '[String]',
            control: 'multi-select',
            index: true,  // [Optional]
            sparse: true, // [Optional]
            unique: true, // [Optional]
            // allowedValues does not exist for an array
            //allowedValues: ['CA', 'AZ', 'NY'],
            //allowedValues: 'states', // Passing a function name does not work currently.
            // ###################### getter: 'abc', // '' === disabled [Optional]
            // ###################### setter: '', // '' === disabled [Optional]
            // ###################### trim: true,
            // ###################### lowercase: true,
            // ###################### uppercase: true,
            /**
             * [Optional] If true, always include this field in the select
             * result, unless overridden in the query.
             * @type {Boolean}
             */
            select: true, // [Optional] If true, always include in select queries, if false never include
            validate: true,
            validation: {
                /*
                 * Must the user enter a value, or is this optional? If
                 * answered, then we can validate if validate === true.
                 * @type {Boolean}
                 */
                isRequired: true,
                /*
                 *
                 * @type {Boolean}
                 */
                allowNull: false,
                /*
                 *
                 * @type {Boolean}
                 */
                validateLen: true,
                /**
                 * [min | min, max] ex. '3' for min only, or '2, 256' to check
                 * min and max
                 * @type {String}
                 */
                len: '1, 1024',
                /*
                 * If true, only letters are allowed. Mutually exclusive with
                 * isAlphanumeric.
                 * @type {Boolean}
                 */
                isAlpha: false,
                /*
                 * If true, only letters and numbers are allowed. Mutually
                 * exclusive with isAlpha.
                 * @type {Boolean}
                 */
                isAlphanumeric: false,
                /*
                 * If true, only lowercase is allowed. Mutually exclusive with
                 * isUppercase. isLowercase and isUppercase can both be false.
                 * @type {Boolean}
                 */
                isLowercase: false,
                /*
                 * If true, only UPPERCASE is allowed. Mutually exclusive with
                 * isLowercase.
                 * @type {Boolean}
                 */
                isUppercase: false,
                /*
                 * If true, prevents the user from entering only whitespace into
                 * a textbox.
                 * @type {Boolean}
                 */
                notEmpty: false,
                /*
                 *
                 * @type {Boolean}
                 */
                validateEquals: false,
                /**
                 * Pass a string that the user entered value should be compared
                 * against.
                 */
                equals: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateContains: false,
                /**
                 * Pass a string that must be a substring of the user entered
                 * value.
                 * @type {String}
                 */
                contains: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateNotContains: false,
                /**
                 * Pass a string that must **not** be a substring of the user
                 * entered value.
                 * @type {String}
                 */
                notContains: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateIsIn: false,
                /**
                 * Pass a string where the user entered value must be a
                 * substring of string.
                 * @type {String}
                 */
                isIn: '',
                /*
                 *
                 * @type {Boolean}
                 */
                validateNotIn: false,
                /**
                 * Pass a string where the user entered value must be **not** be
                 * a substring of string.
                 * @type {String}
                 */
                notIn: ''
            },
            crud: {
                create: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readAll: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readOne: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                update: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                remove: {
                    use: true,
                    visible: true,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                }
            }
        }
    ];

    /**
     * An array of indexes to create on the schema's collection.
     * @type {Array}
     */
    mdf.module.schema.indexes = [
        {
            name: 1
        },
        {
            state: 1,
            country: 1
        }
    ];

    // Model name examples
    //
    // Variable                            : Example
    // ------------------------------------:-----------
    // mdf.module.model.name.upperPlural   : Customers
    // mdf.module.model.name.lowerPlural   : customers
    // mdf.module.model.name.lowerSingular : customer
    // mdf.module.model.id                 : customerId

    /**
     *
     * @type {string}
     */
    mdf.module.model.name.upperPlural = mdf.module.name.upperPlural;

    /**
     * Model name lower plural is in a comment string in the Express controller
     * and in Express controller's readAll() method.
     * @type {string}
     */
    mdf.module.model.name.lowerPlural = mdf.module.name.lowerPlural;

    /**
     * Model name upper singular is used as the model name and as the variable
     * name of the model constructor in the Express controller.
     * @type {string}
     */
    mdf.module.model.name.upperSingular = mdf.module.name.upperSingular;

    /**
     * Model name lower singular is used as the model file name and as the
     * variable name of the model instance in the Express controller.
     * @type {string}
     */
    mdf.module.model.name.lowerSingular = mdf.module.name.lowerSingular;

    /**
     * Model id is used to track a model's primary key.
     * @type {string}
     */
    mdf.module.model.id = mdf.module.model.name.lowerSingular + 'Id';

    // In process workaround for schema type == String with an enum that calls
    // a function
    //
    // var valueLists = {};
    // valueLists.states = function () {
    //     console.log('x was called');
    // }
    // valueLists['states']();

    return mdf;
};
