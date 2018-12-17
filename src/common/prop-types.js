import { joinWithAnd } from '../common/util';

// ======================================================================================
// Util
// ======================================================================================

function chainablePropType(predicate) {
    const propType = (props, propName, componentName) => {
        // don't do any validation if empty
        if (props[propName] == null)
            return;
        return predicate(props, propName, componentName);
    };

    propType.isRequired = (props, propName, componentName) => {
        // warn if empty
        if (props[propName] == null)
            return new Error(`Required prop \`${propName}\` was not specified in \`${componentName}\`.`);
        return predicate(props, propName, componentName);
    };

    return propType;
}

function allowedValuesPropType(allowed) {
    return (props, propName, componentName) => {
        const value = props[propName];

        if (allowed.includes(value))
            return;

        const message =
            `Invalid prop ${propName} supplied to ${componentName}.
            Allowed values are ${joinWithAnd(allowed)}, but you provided: '${value}'`;
        return new Error(message);
    };
}


// ======================================================================================
// Prop types
// ======================================================================================

export const buttonIconType = chainablePropType(
    allowedValuesPropType(['primary', 'danger'])
);

export const uploadPlaceholderType = chainablePropType(
    allowedValuesPropType(['image', 'video'])
);
