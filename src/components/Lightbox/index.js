import React from 'react';
import LightboxPlugin from 'react-images';
import PropTypes from 'prop-types';

const Lightbox = ({ images, isOpen, currentImage, close, gotoNext, gotoPrevious }) => (
    <LightboxPlugin
        images={images.map((x) => ({ src: x }))}
        isOpen={isOpen}
        onClose={close}
        currentImage={currentImage}
        onClickNext={gotoNext}
        onClickPrev={gotoPrevious}
    />
);

Lightbox.propTypes = {
    images: PropTypes.array.isRequired,
    isOpen: PropTypes.bool.isRequired,
    currentImage: PropTypes.number.isRequired,
    close: PropTypes.func.isRequired,
    gotoNext: PropTypes.func.isRequired,
    gotoPrevious: PropTypes.func.isRequired
};

export default Lightbox;
