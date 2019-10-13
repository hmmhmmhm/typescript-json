export interface ITypeGeneral {
    /**
     * Called immediately when value is
     * set and before any typecast is done.
     * 
     * @example
     * name: {type: String, transform: (value) => {
     *   // Modify the value here...
     *   return value
     * }}
     */
    transform?: (value: any) => any

    /**
     * Provide default value. You may pass value
     * directly or pass a function which will be
     * executed when the object is initialized.
     * The function is executed in the context
     * of the object and can use "this"
     * to access other properties.
     * 
     * @example
     * country: {type: String, default: 'USA'}
     */
    default?: any

    /**
     * Provide function to
     * transform value when retrieved.
     * Executed in the context of
     * the object and can use "this"
     * to access properties.
     * 
     * @example
     * string: {type: String, getter: (value) => { return value.toUpperCase() }}
     */
    getter?: (value) => any

    /**
     * @description
     * If true, a value must be provided.
     * If a value is not provided, an
     * error will be generated silently.
     * If used in conjunction with default,
     * this check will always pass.
     * 
     * @example
     * fullName: {type: String, required: true}
     * 
     * @description
     * Required can also be a function,
     * you can use 'this' to reference
     * the current object instance.
     * Required will be based on what
     * boolean value the function returns.
     * 
     * @example 
     * age: {
     *   type: Number,
     *   required: true
     * },
     * employer: {
     *   type: String,
     *   required: function() {
     *     return this.age > 18
     *   }
     * }
     * 
     * @description 
     * You can also override the default
     * error message for required fields
     * by using an array and providing
     * a string for the second value.
     * 
     * @example
     * age: {
     *   type: Number,
     *   required: [
     *       true,
     *       'You must provide the age of this user'
     *   ]
     * },
     *   employer: {
     *   type: String,
     *   required: [
     *       () => {
     *         return this.age > 18
     *       },
     *       'An employer is required for all users over the age of 18'
     *   ]
     * }
     */
    required?: boolean

    /**
     * If true, the value can be read
     * but cannot be written to.
     * This can be useful for creating
     * fields that reflect other values.
     * 
     * @example
     * fullName: {type: String, readOnly: true, default: (value) => {
     *   return (this.firstName + ' ' + this.lastName).trim()
     * }}
     */
    readOnly?: boolean

    /**
     * If true, the value can be written to but isn't
     * outputted as an index when toObject() is called.
     * This can be useful for creating aliases that
     * redirect to other indexes but aren't
     * actually present on the object.
     * 
     * @example
     * zip: String,
     * postalCode: {type: 'alias', invisible: true, index: 'zip'}
     * // this.postalCode = 12345 -> this.toObject() -> {zip: '12345'}
     */
    invisible?: boolean
}

export const TypeGeneral = <ReturnType>(
    type: any,
    opt: ITypeGeneral = {},
    combine?: any
)
// @ts-ignore
: ReturnType => {
    //@ts-ignore
    return {
        type,
        default: opt.default,
        ...combine
    }
}


export interface ITypeString extends ITypeGeneral {
    /**
     * Called after value is typecast to string
     * if value was successfully typecast
     * but called before all validation.
     * 
     * @example
     * postalCode: {type: String, stringTransform: (string) => {
     *   // Type will ALWAYS be String, so using string prototype is OK.
     *   return string.toUpperCase()
     * }}
     */
    stringTransform? : (value: string) => string

    /**
     * Validates string against Regular Expression.
     * If string doesn't match, it's rejected.
     * 
     * @example
     * memberCode: {type: String, regex: new RegExp('^([0-9A-Z]{4})$')}
     */
    regex?: RegExp

    /**
     * Validates string against array
     * of strings. If not present, it's rejected.
     * 
     * @example
     * gender: {type: String, enum: ['m', 'f']}
     */
    enum?: string[]

    /**
     * Enforces minimum string length.
     * 
     * @example
     * notEmpty: {type: String, minLength: 1}
     */
    minLength?: number

    /**
     * Enforces maximum string length.
     * 
     * @example
     * stateAbbrev: {type: String, maxLength: 2}
     */
    maxLength?: number

    /**
     * If true, clips string to maximum
     * string length instead of rejecting string.
     * 
     * @example
     * bio: {type: String, maxLength: 255, clip: true}
     */
    clip?: boolean

    /**
     * Provide default value. You may pass value
     * directly or pass a function which will be
     * executed when the object is initialized.
     * The function is executed in the context
     * of the object and can use "this"
     * to access other properties.
     * 
     * @example
     * country: {type: String, default: 'USA'}
     */
    default?: string
}

export const TypeString = (opt: ITypeString = {})
: String => {

    return <String>TypeGeneral(String, opt, {
        default: opt.default,
        minLength: opt.minLength,
        maxLength: opt.maxLength,
        regex: opt.regex,
        clip: opt.clip,
        enum: opt.enum,
        stringTransform: opt.stringTransform
    })
}



export interface ITypeNumber extends ITypeGeneral {
    /**
     * Number must be > min attribute or it's rejected.
     * @example
     * positive: {type: Number, min: 0}
     */
    min?: number

    /**
     * Number must be < max attribute or it's rejected.
     * @example
     * negative: {type: Number, max: 0}
     */
    max?: number
}

export const TypeNumber = (opt: ITypeNumber = {})
: Number => {

    return <Number>TypeGeneral(Number, opt, {
        default: opt.default,
        min: opt.min,
        max: opt.max,
    })
}


export interface ITypeArray<T> extends ITypeGeneral {
    /**
     * Elements within the array will
     * be typed to the attributes defined.
     * @example
     * aliases: {type: Array, arrayType: {type: String, minLength: 1}}
     */
    arrayType?: ITypeArrayActualOption<T>

    /**
     * Ensures duplicate-free array,
     * using === to test object equality.
     * @example
     * emails: {type: Array, unique: true, arrayType: String}
     */
    unique?: boolean

    /**
     * Reject any values where filter
     * callback does not return truthy.
     * @example
     * emails: {type: Array, arrayType: Person, filter: (person) => person.gender !== 'f'}
     */
    filter?: (value: any) => boolean
}

export interface ITypeArrayActualOption<T> extends ITypeGeneral {
    type: T
}

export const TypeArray = <T>(
    opt: ITypeArray<T> = {}
)
: Array<T> => {

    return <Array<T>>TypeGeneral(Array, opt, {
        default: opt.default,
        arrayType: opt.arrayType,
        unique: opt.unique,
    })
}


import SchemaObject from 'schema-object'

export const TypescriptJSON = <schema>(
    schema,
    input?
): schema => {
    let SchemaInstance = new SchemaObject<typeof schema>(schema)
    return new SchemaInstance(input)
}