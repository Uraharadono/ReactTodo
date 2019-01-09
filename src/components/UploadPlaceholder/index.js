import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { isNullOrWs } from '../../common/util';
import UploadIcon from '../../components/Icons/upload';
import { uploadPlaceholderType } from '../../common/prop-types';
import ThumbBuilder from '../../common/thumb-builder';
import FileConverter from '../../common/file-converter';
import mimeTypes from '../../models/mime-types';
import ErrorModel from '../../models/error-model';
import classNames from 'classnames';
import FileModel from '../../models/file';

class Placeholder extends Component {
    static propTypes = {
        id: PropTypes.number,
        url: PropTypes.string,
        text: PropTypes.string,
        isEditable: PropTypes.bool,
        isLoading: PropTypes.bool,
        onDelete: PropTypes.func,
        onUpload: PropTypes.func,
        onBeforeUpload: PropTypes.func,
        onUploadError: PropTypes.func,
        onImageClick: PropTypes.func,
        extendImage: PropTypes.bool,
        controlsBackdrop: PropTypes.string,
        alwaysHasBorder: PropTypes.bool,
        type: uploadPlaceholderType.isRequired,
        identifier: PropTypes.number
    }

    static defaultProps = {
        id: null,
        url: null,
        isLoading: false,
        isEditable: false,
        extendImage: true,
        onDelete: null,
        onUpload: null,
        alwaysHasBorder: false,
        onBeforeUpload: null,
        onUploadError: null,
        controlsBackdrop: 'light',
        text: `Click on icon to browse,
            or drop the file on the highlighted area to start the upload`,
        onImageClick: null,
        identifier: null
    }

    state = {
        isDragOver: false
    }

    get hasImage() {
        return !isNullOrWs(this.props.url);
    }

    get allowedMimeTypes() {
        if (this.props.type === 'image')
            return mimeTypes.image;
        if (this.props.type === 'video')
            return mimeTypes.video;
        return [];
    }

    setInputReference = (input) => {
        this.fileInput = input;
    }

    readUploadedDocument = (file) => {
        const converter = new FileConverter();
        const thumbBuilder = new ThumbBuilder();

        const fileName = file.name;
        const fileType = file.type;

        if (!this.allowedMimeTypes.includes(fileType)) {
            const error = new ErrorModel('File type you selected is currently not supported.');
            this.props.onUploadError(error, this.props.id);
            return;
        }

        if (isFunction(this.props.onBeforeUpload))
            this.props.onBeforeUpload(this.props.id);

        converter.convertToDataUrl(file).then((response) => {
            const document = new FileModel({
                dataUrl: response,
                name: fileName,
                type: fileType
            });

            if (this.props.type === 'video') {
                thumbBuilder.buildAsync(file).then((thumb) => {
                    document.thumb = thumb;
                    this.props.onUpload(document, this.props.id);
                });
            } else {
                this.props.onUpload(document, this.props.id);
            }
        });
    }

    handleDragOver = (event) => {
        event.preventDefault();
        if (!this.state.isDragOver)
            this.setState({ isDragOver: true });
    }

    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState({ isDragOver: false });
    }

    handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;

        this.setState({ isDragOver: false });
        this.readUploadedDocument(files[0]);
    }

    handlePlaceholderClick = () => {
        if (this.props.isLoading)
            return;
        this.fileInput.value = null;
        this.fileInput.click();
    }

    handleImageClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onImageClick(this.props.identifier);
    }

    handleFileInputChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        this.readUploadedDocument(file);
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id);
    }

    renderControls() {
        const isLight = this.props.controlsBackdrop !== 'dark';
        const classes = classNames('upload-placeholder-controls', {
            'upload-placeholder-controls-light': isLight,
            'upload-placeholder-controls-dark': !isLight
        });
        return (
            <div className={classes}>
                <button
                    type="button"
                    className="btn-icon btn-icon-danger"
                    onClick={this.handleDelete}
                >
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        );
    }

    renderImage() {
        const { isEditable, onDelete, extendImage } = this.props;
        const classes = classNames('upload-placeholder-image', {
            'it-is-extended': extendImage
        });
        return (
            <Fragment>
                <div className={classes}>
                    <img src={this.props.url} alt="product" />
                </div>
                {isEditable && isFunction(onDelete) && this.renderControls()}
            </Fragment>
        );
    }

    renderContent() {
        let display = null;
        const { text, isEditable, isLoading } = this.props;

        if (isLoading)
            display = <span>Loading <i className="fa fa-fw fa-refresh fa-spin"></i></span>;
        else if (text)
            display = <span>{text}</span>;

        return (
            <Fragment>
                <div className="upload-placeholder-content">
                    <UploadIcon />
                    {display}
                </div>
                {isEditable &&
                    <input
                        type="file"
                        className="hidden"
                        ref={this.setInputReference}
                        onChange={this.handleFileInputChange}
                    />}
            </Fragment>
        );
    }

    renderPlaceholder() {
        const hasImage = this.hasImage;
        const isEditable = this.props.isEditable;
        const classes = classNames('upload-placeholder', {
            'it-has-image': this.hasImage,
            'it-is-empty': !this.hasImage,
            'it-is-editable': isEditable,
            'it-is-loading': this.props.isLoading,
            'it-is-drag-over': this.state.isDragOver,
            'it-has-border': this.props.alwaysHasBorder,
            'it-is-clickable': !isEditable && hasImage && isFunction(this.props.onImageClick)
        });

        if (isEditable && !hasImage) {
            return (
                <div
                    className={classes}
                    onClick={this.handlePlaceholderClick}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                    role="button"
                    tabIndex={-1}
                >
                    {hasImage ? this.renderImage() : this.renderContent()}
                </div>
            );
        }

        if (isEditable && hasImage) {
            return (
                <a className={classes}>
                    {this.renderImage()}
                </a>
            );
        }

        if (!isEditable && hasImage) {
            return (
                <a
                    className={classes}
                    onClick={this.handleImageClick}
                    role="button"
                    tabIndex={-1}
                >
                    {this.renderImage()}
                </a>
            );
        }

        return (
            <div className={classes}>
                {this.renderContent()}
            </div>
        );
    }

    render() {
        return (
            <div className="upload-placeholder-wrap">
                {this.renderPlaceholder()}
            </div>
        );
    }
}

export default Placeholder;
