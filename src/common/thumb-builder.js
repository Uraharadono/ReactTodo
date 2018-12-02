export default class ThumbBuilder {
    buildAsync(file) {
        const seconds = 0;
        const video = document.createElement('video');

        return new Promise((resolve, reject) => {
            video.onloadedmetadata = () => {
                const duration = video.duration;
                video.currentTime = Math.min(Math.max(0, (seconds < 0 ? duration : 0) + seconds), duration);
            };

            video.onseeked = () => {
                const canvas = document.createElement('canvas');

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                resolve(canvas.toDataURL());
            };

            video.onerror = () => {
                reject('Error occured while reading the video');
            };

            video.src = URL.createObjectURL(file);
        });
    }
}
