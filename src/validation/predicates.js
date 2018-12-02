import isURL from 'validator/lib/isURL';
import isEmail from 'validator/lib/isEmail';
import { isNullOrWs } from '../common/util';
import { isArray, isEmpty } from 'lodash';
import moment from 'moment';

export function beNotEmpty(value) {
    return isArray(value) ? !isEmpty(value) : !isNullOrWs(value);
}

export function beLongerThan(param) {
    return (value) => value != null && value.length > param;
}

export function beLessThan(param) {
    return (value) => value != null && value.length < param;
}

export function bePositiveNumber(value) {
    return value > 0;
}

export function containsDigit(value) {
    const testReg = /\d/;
    return testReg.test(value);
}

export function beExactlyLong(param) {
    return (value) => value != null && value.length === param;
}

export function beValidEmail(email) {
    return !isNullOrWs(email) ? isEmail(email) : true;
}

export function beEqualTo(param) {
    return (value) => value === param;
}

export function beValidDate(date) {
    if (date === 'invalid')
        return false;
    return date == null
        ? true
        : moment(date, moment.ISO_8601, true)
            .isValid();
}

export function beDateFuture(date) {
    if (date == null)
        return true;
    return moment(date).isAfter();
}

export function beValidUrl(url) {
    return !isNullOrWs(url)
        ? isURL(url, { protocols: ['http', 'https'] })
        : true;
}

export function beValidTime(time) {
    if (time === 'invalid')
        return false;
    return time == null
        ? true
        : moment(time, ['HHmm', 'HH:mm', 'HH-mm'], true).isValid();
}

export function beEarlierThan(param) {
    const formattedParam = moment(param, 'HH:mm');
    return (value) => moment(value, 'HH:mm').isBefore(formattedParam);
}
