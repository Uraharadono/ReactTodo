import { convertToByteArray } from '../common/util';

export default class FileConverter {
    convertToDataUrl(file) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = () => {
                reject();
            };

            reader.readAsDataURL(file);
        });
    }

    convertToByteArray(file) {
        return new Promise((resolve, reject) => {
            this.convertToDataUrl(file)
                .then((response) => resolve(convertToByteArray(response)))
                .catch(reject);
        });
    }
}
