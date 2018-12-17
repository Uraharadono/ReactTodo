import { uniqueId, isString, isArray } from 'lodash';

const defaultMessage =
    'An unknown error occured. Please try again later or contact support.';

export default class ErrorModel {
    constructor(data) {
        const title = isString(data) ? data : data.title;
        const messages = !isString(data)
            ? data.messages.map((m) => ({ id: uniqueId('error-message-'), text: m }))
            : [];

        this.title = title || null;
        this.messages = messages || [];
    }

    static fromValidation(messages) {
        if (!isArray(messages) || messages.length === 0 || messages.some((m) => !isString(m)))
            throw new Error('Method only accepts string arrays');

        const title = 'Following validation errors occured:';
        return new ErrorModel({ title, messages });
    }

    static fromException(exception) {
        const title = exception.publicMessage
            ? exception.publicMessage
            : defaultMessage;
        const messages = exception.publicErrors
            ? exception.publicErrors
            : [];
        return new ErrorModel({ title, messages });
    }
}
