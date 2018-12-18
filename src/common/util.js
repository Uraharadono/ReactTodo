import qs from 'qs';
import format from 'date-fns/format';
import { isString } from 'lodash';
import moment from 'moment';

export function tryParseJson(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}

export function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}

export function isNullOrWs(value) {
    return value == null || (isString(value) && value.trim().length === 0);
}

export function removeWhiteSpace(value) {
    return value.replace(/\s/g, '');
}

export function tryParseInt(str) {
    const response = isNumeric(str)
        ? parseInt(str, 10)
        : null;
    return response || null;
}

export function getYear(value) {
    return moment(value, moment.ISO_8601).year();
}

export function formatDate(value, formatStr = 'DD-MM-YYYY') {
    return format(value, formatStr);
}

export function isGreaterThanDate(now, end) {
    if (now == null && (end != null || end !== 'invalid'))
        return true;
    if (now === 'invalid' || end === 'invalid')
        return false;
    if (now == null && end == null)
        return true;
    if (!isDateFuture(now) || !isDateFuture(end))
        return false;
    return moment(now).isAfter(end);
}

export function momentDate(date) {
    const d = formatDateMoment(date);
    return date == null ? null : moment(d, 'DD-MM-YYYY');
}

export function isDateFuture(now) {
    if (now === 'Invalid date')
        return false;
    if (now == null)
        return true;
    return moment(now).isAfter();
}

export function formatDateMoment(date) {
    return moment(date).format('DD-MM-YYYY');
}

export function formatDateMomentISO(date) {
    return date == null
        ? null
        : moment(date).format(moment.ISO_8601);
}

export function formatDateTime(value) {
    return format(value, 'DD-MM-YYYY HH:mm');
}

export function formatNullableDate(value) {
    return !isNullOrWs(value) ? formatDate(value) : '-';
}

export function shorten(str, maxLen, separator = ' ', suffix = '...') {
    if (isNullOrWs(str) || str.length <= maxLen)
        return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + suffix;
}

export function displayNullable(value) {
    return !isNullOrWs(value) ? value : '-';
}

export function shortenNullable(value, maxLen = 150) {
    return !isNullOrWs(value) ? shorten(value, maxLen) : '-';
}

export function joinWithAnd(array) {
    if (array.length === 1)
        return array[0];

    const first = array.slice(0, -1);
    const last = array[array.length - 1];

    return `${first.join(', ')} and ${last}`;
}

export function convertToByteArray(dataUrl) {
    return dataUrl.split(',').pop();
}

export function stringify(object) {
    return qs.stringify(object, { allowDots: true, skipNulls: true });
}

export function convertIdsToNames(ids, lookup) {
    return ids.map((id) => {
        const item = lookup.find((l) => l.id === id);
        return item ? item.name : '-';
    });
}

export function base64UrlToBase64(b64u) {
    return b64u.replace(/-/g, '+').replace(/_/g, '/');
}

export function base64UrlToString(b64u) {
    let b64 = base64UrlToBase64(b64u);

    switch (b64.length % 4) {
        case 0:
            break;
        case 2:
            b64 += '==';
            break;
        case 3:
            b64 += '=';
            break;
        default:
            throw new Error('Not a valid Base64Url');
    }

    const utf8 = atob(b64);

    try {
        return decodeURIComponent(escape(utf8));
    } catch (e) {
        return utf8;
    }
}

export function generateRandomString(length) {
    let random = '';
    const charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let c = 0, cl = charset.length; c < length; ++c) { // eslint-disable-line no-plusplus
        random += charset[Math.floor(Math.random() * cl)];
    }

    return random;
}

export function removeTrailingSlash(path) {
    if (!path) return null;

    if (path.slice(-1) === '/') {
        return path.slice(0, -1);
    }

    return path;
}
