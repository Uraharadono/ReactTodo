import { must } from '../../validation/rule-builder';
import { beNotEmpty, beExactlyLong, beLessThan } from '../../validation/predicates';

export const ruleSet = {
    name: must(beNotEmpty)
        .withMessage('Name code is required')
        .and(beLessThan(17))
        .withMessage('Input must be less than 17 characters')
    // city: must(beNotEmpty).withMessage('City is required')
    //     .and(beLessThan(65))
    //     .withMessage('Input must be less than 65 characters'),
    // street: must(beNotEmpty).withMessage('Street is required')
    //     .and(beLessThan(65))
    //     .withMessage('Input must be less than 65 characters'),
    // state: must(beNotEmpty).withMessage('State is required')
    //     .and(beLessThan(33))
    //     .withMessage('Input must be less than 33 characters'),

    // countryCode: must(beNotEmpty)
    //     .withMessage('Country code is required')
    //     .and(beExactlyLong(2))
    //     .withMessage('Input must be 2 characters long')
};
