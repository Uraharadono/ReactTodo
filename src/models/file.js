import { convertToByteArray } from '../common/util';

export default class FileModel {
    constructor(data) {
        this.name = data.name;
        this.type = data.type;
        this.dataUrl = data.dataUrl;
        this.thumb = data.thumb || null;
    }

    get fileBytes() {
        return convertToByteArray(this.dataUrl);
    }

    get thumbBytes() {
        return this.thumb != null ? convertToByteArray(this.thumb) : null;
    }
}
