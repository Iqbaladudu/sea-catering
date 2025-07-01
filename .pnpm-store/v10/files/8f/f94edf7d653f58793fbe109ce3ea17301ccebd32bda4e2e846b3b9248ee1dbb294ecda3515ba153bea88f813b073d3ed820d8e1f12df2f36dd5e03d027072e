const RawConstraintSymbol = Symbol('RawConstraint');
/**
 * You can use this to inject a raw query to where
 */ export const rawConstraint = (value)=>({
        type: RawConstraintSymbol,
        value
    });
export const isRawConstraint = (value)=>{
    return value && typeof value === 'object' && 'type' in value && value.type === RawConstraintSymbol;
};

//# sourceMappingURL=rawConstraint.js.map