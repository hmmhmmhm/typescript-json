# Typescript JSON

> 📦 Initialize JSON data according to type schema



Have you ever had trouble resetting the values you received to the desired form of value when you received any data from the web or server?

The <u>**Typescript JSON**</u> module helps initialize the JSON data to the desired Schema. It also supports Intellisense and Automatic Completion based on Typescript. (This module is a module that binds [scotthovestadt/schema-object]( https://github.com/scotthovestadt/schema-object) to a Typescript.)



## Install

```bash
npm install typescript-json
```



## Usage

```typescript
import {
    TypescriptJSON,
    Types
} from 'typescript-json'

// Defines the data schema.
let schema = {

    // If non-compliant data is entered,
    // the value will be replaced with undefined
    id: Types.String({
        default: 'accountId',
        minLength: 6
    }),

    // Or just can simply specify a format.
    pw: Types.String({})
}

// Contains the data to be entered.
let input: any = {}

// Input value of modified
// to schema specification
let data = TypescriptJSON
    <typeof schema>
    (schema, input)

console.log(data.id) // 'accountId'
console.log(data.pw) // undefined


// The value does not change because the
// minimum length specification does not comply.
data.id = 'wrong' // need to be more than 6 length.
console.log(data.id) // still 'accountId'
```



## Example

![](https://i.imgur.com/IJ2TaSd.png)

It can define the default value of the id value, define the maximum length, and so on.



![](https://i.imgur.com/OsdRJ6E.png)

 Once the data has been initialized, all components of the data can be accessed accurately through Intelligence and Auto Completion. 



## License

MIT Licensed.