export declare const Types: {
    String: (opt?: import("./util").ITypeString) => String;
    Number: (opt?: import("./util").ITypeNumber) => Number;
    Array: <T>(opt?: import("./util").ITypeArray<T>) => T[];
    General: <ReturnType_1>(type: any, opt?: import("./util").ITypeGeneral, combine?: any) => ReturnType_1;
};
