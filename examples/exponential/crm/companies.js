'use strict';

module.exports = function(_) {
//    var mdf = {
//        project: require('../project')(),
//        app: require('./app')(),
//        /**
//         * MDF module definition
//         * @namespace
//         * @memberof mdf
//         */
//        module: {
//            urlBase: '',
//            /**
//             * @namespace
//             * @memberof mdf.module
//             */
//            navbar: {},
//            /** @namespace */
//            angular: {
//                use: true,
//                template: 'crud-forms',
//                /** @namespace */
//                controllers: {
//                    create: '',
//                    readAll: '',
//                    readOne: '',
//                    update: ''
//                },
//                module: '',
//                service: ''
//            },
//            api: {
//                use: true,
//                template: 'crud-forms'
//            },
//            express: {
//                use: false
//            },
//            website: {
//                use: false
//            },
//            /** @namespace */
//            name: {
//                upperPlural: '',
//                lowerPlural: '',
//                upperSingular: '',
//                lowerSingular: ''
//            },
//            schema: {
//                name: '',
//                collectMetrics: true,
//                options: {},
//                fields: [],
//                indexes: []
//            },
//            model: {
//                name: {
//                    upperPlural: '',
//                    lowerPlural: '',
//                    upperSingular: '',
//                    lowerSingular: ''
//                },
//                id: ''
//            }
//        }
//    };

    var mdf = {
        project: require('../project')(),
        app: require('./app')(),
        module: {
            name: {},
            navbar: {},
            angular: {
                controllers: {}
            },
            api: {},
            express: {},
            schema: {},
            model: {
                name: {}
            }
        }
    };

    // -------------------------------------------------------------------------
    // Module (5 settings)
    // -------------------------------------------------------------------------

    // 1.
    mdf.module.name.upperPlural   = 'Companies';
    // 2.
    mdf.module.name.upperSingular = 'Company';

    // 3. Set the path to the module's files (server/controllers/, server/views/,
    //    or client/{{angularDirectory}}/js/controllers/ is prepended)
    mdf.module.path = 'companies';

    // 4. Set the base URL
    // Relative URL is used by Angular modules where each URL is a relative path.
    mdf.module.relativeUrl = 'companies';
    mdf.module.url = '/' + mdf.module.relativeUrl;          // Calculated Member
    mdf.module.apiUrl = '/api/v1/' + mdf.module.relativeUrl;// Calculated Member

    // 5.
    mdf.module.navbar.display = true;


    // The remaining module settings are auto-generated values. Do NOT edit
    // unless you require detailed customization and know how these settings
    // affect your code.
    mdf.module.name.lowerPlural   = mdf.module.name.upperPlural.toLowerCase();
    mdf.module.name.lowerSingular = mdf.module.name.upperSingular.toLowerCase();

    // TODO: module level urlBase should be removed
    mdf.module.urlBase = mdf.module.path; // TODO: Replace urlBase with baseHref
//    mdf.module.baseHref = mdf.module.path;

    mdf.module.navbar.label = mdf.module.name.upperPlural;


    // -------------------------------------------------------------------------
    // Model (0 settings)
    // -------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------
    // Angular
    // -------------------------------------------------------------------------

    // 1. Pick a template
    mdf.module.angular.template = 'crud-forms';

    // 2. Enable and configure the create action
    mdf.module.angular.create = {
        use: true,
        url: mdf.module.relativeUrl + '/add',    // Calculated member
        route: mdf.module.url + '/add',  // Calculated member
        title: 'Add Company'             // Default to CM
    };

    // 3. Enable and configure the read-all action
    mdf.module.angular.readAll = {
        use: true,
        url: mdf.module.relativeUrl,            // Calculated member
        route: mdf.module.url,          // Calculated member
        title: 'Companies'              // Default to CM
    };

    // 4. Enable and configure the read-one action
    mdf.module.angular.readOne = {
        use: true,
        url: mdf.module.relativeUrl + '/{{' + mdf.module.model.name.lowerSingular + '._id}}',   // Calculated member
        route: mdf.module.url + '/:' + mdf.module.model.id, // Calculated member
        title: 'Company Details'                            // Default to CM
    };

    // 5. Enable and configure the update action
    mdf.module.angular.update = {
        use: true,
        url: mdf.module.relativeUrl + '/edit/{{' + mdf.module.model.name.lowerSingular + '._id}}',   // Calculated member
        route: mdf.module.url + '/edit/:' + mdf.module.model.id, // Calculated member
        title: 'Update Company'                                  // Default to CM
    };

    // 6. Enable and configure the delete action

    // TODO: Rename to remove
    // TODO: Rename to remove
    // TODO: Rename to remove
    // TODO: Rename to remove

    mdf.module.angular.delete = {
        use: true,
        // Delete URL makes no sense as there is only a Remove URL that sends
        // the delete request to the server
//        url: mdf.module.url + '/delete/{{id}}',                    // Calculated member
        route: mdf.module.url + '/delete/:' + mdf.module.model.id, // Calculated member
        title: 'Delete Company'                                    // Default to CM
    };

    // Everything below here defaults to a calculated member. There is no reason
    // to modify the values below unless you are creating a custom naming
    // convention for Angular code.

    /**
     * Name of the Angular Create controller.
     * @type {string}
     * @memberof mdf.module.angular.controllers
     */
//    mdf.module.angular.controllers.create = mdf.module.name.upperPlural + 'CreateCtrl';
    mdf.module.angular.controllers.create = mdf.module.name.upperPlural +
        mdf.project.angular.controllers.postfix.create;

    /**
     * Name of the Angular Read All controller.
     * @type {string}
     * @memberof mdf.module.angular.controllers
     */
//    mdf.module.angular.controllers.readAll = mdf.module.name.upperPlural + 'ReadAllCtrl';
    mdf.module.angular.controllers.readAll = mdf.module.name.upperPlural +
        mdf.project.angular.controllers.postfix.readAll;

    /**
     * Name of the Angular Read One controller.
     * @type {string}
     * @memberof mdf.module.angular.controllers
     */
//    mdf.module.angular.controllers.readOne = mdf.module.name.upperPlural + 'ReadOneCtrl';
    mdf.module.angular.controllers.readOne = mdf.module.name.upperPlural +
        mdf.project.angular.controllers.postfix.readOne;

    /**
     * Name of the Angular Update controller.
     * @type {string}
     * @memberof mdf.module.angular.controllers
     */
//    mdf.module.angular.controllers.update = mdf.module.name.upperPlural + 'Update';
    mdf.module.angular.controllers.update = mdf.module.name.upperPlural +
        mdf.project.angular.controllers.postfix.update;

    // Angular Remove (Delete) controller
    mdf.module.angular.controllers.remove = mdf.module.name.upperPlural +
        mdf.project.angular.controllers.postfix.remove;

    /**
     * The Angular module name is used to create a namespace for this module.
     * @type {string}
     */
//    mdf.module.angular.module = mdf.module.name.lowerPlural + 'Mod';   // Calculated Member
    mdf.module.angular.module = mdf.module.name.lowerPlural +
        mdf.project.angular.module.postfix;   // Calculated Member

    /**
     * The Angular service name is used to name the services provided by this
     * module.
     * @type {string}
     */
//    mdf.module.angular.service = mdf.module.name.lowerPlural + 'Srv';
    mdf.module.angular.service = mdf.module.name.lowerPlural +
        mdf.project.angular.service.postfix;


    // -------------------------------------------------------------------------
    // API (6 settings)
    // -------------------------------------------------------------------------

    // 1. Pick a template
    mdf.module.api.template = 'crud-forms';

    // 2. Enable and configure the create action
    mdf.module.api.create = {
        use: true,
        route: mdf.module.apiUrl  // Calculated member
    };

    // 3. Enable and configure the read-all action
    mdf.module.api.readAll = {
        use: true,
        route: mdf.module.apiUrl          // Calculated member
    };

    // 4. Enable and configure the read-one action
    mdf.module.api.readOne = {
        use: true,
        route: mdf.module.apiUrl + '/:' + mdf.module.model.id // Calculated member
    };

    // 5. Enable and configure the update action
    mdf.module.api.update = {
        use: true,
        route: mdf.module.apiUrl + '/:' + mdf.module.model.id // Calculated member
    };

    // 6. Enable and configure the delete action

    // Angular already uses the new remove configuration
    mdf.module.api.remove = {
        use: true,
        route: mdf.module.apiUrl + '/:' + mdf.module.model.id // Calculated member
    };

    // TODO: CHANGE delete to remove in the API generator
    mdf.module.api.delete = {
        use: true,
        route: mdf.module.apiUrl + '/:' + mdf.module.model.id // Calculated member
    };

    // -------------------------------------------------------------------------
    // Express (6 settings)
    // -------------------------------------------------------------------------

    // 1. Pick a template
    mdf.module.express.template = 'crud-forms';

    // 2. Enable and configure the create action
    mdf.module.express.create = {
        use: true,
        url: mdf.module.url + '/add',    // Calculated member
        route: mdf.module.url + '/add',  // Calculated member
        title: 'Add Company'             // Default to CM
    };

    // 3. Enable and configure the read-all action
    mdf.module.express.readAll = {
        use: true,
        url: mdf.module.url,            // Calculated member
        route: mdf.module.url,          // Calculated member
        title: 'Companies'              // Default to CM
    };

    // 4. Enable and configure the read-one action
    mdf.module.express.readOne = {
        use: true,
        url: mdf.module.url + '/{{id}}',                    // Calculated member
        route: mdf.module.url + '/:' + mdf.module.model.id, // Calculated member
        title: 'Company Details'                            // Default to CM
    };

    // 5. Enable and configure the update action
    mdf.module.express.update = {
        use: true,
        url: mdf.module.url + '/edit/{{id}}',                    // Calculated member
        route: mdf.module.url + '/edit/:' + mdf.module.model.id, // Calculated member
        title: 'Update Company'                                  // Default to CM
    };

    // 6. Enable and configure the delete action
    mdf.module.express.delete = {
        use: true,
        url: mdf.module.url + '/delete/{{id}}',                    // Calculated member
        route: mdf.module.url + '/delete/:' + mdf.module.model.id, // Calculated member
        title: 'Delete Company'                                    // Default to CM
    };


    // -------------------------------------------------------------------------
    // Schema
    // -------------------------------------------------------------------------

    // Schema sets the name of the schema object used in the module's model and
    // contains an array of keys.

    // TODO: SCHEMA
    // TODO: SCHEMA
    // TODO: SCHEMA

    /**
     * Name of the schema object used in the module's model.
     * @type {string}
     */
    mdf.module.schema.name = mdf.module.name.lowerSingular + 'Schema';

    /**
     * Configure schema options.
     * @type {Object}
     * @namespace mdf.module.schema.options
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
     * @namespace mdf.module.schema.fields
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
             * @type {String}
             * @type {Function}
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
             * @type {Array|String}
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
             * @type {string}
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
                    use: false,
                    visible: false,
                    useDefaultValue: false,
                    defaultValue: '',
                    useCalculatedMember: false,
                    calculatedMember: '',
                    calculateOn: ''
                },
                readAll: {
                    use: false,
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
