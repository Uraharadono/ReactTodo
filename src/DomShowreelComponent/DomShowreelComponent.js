import React, { Fragment } from 'react';
import Alert from '../components/Alert';
import ButtonIcon from '../components/ButtonIcon';
import ButtonToggle from '../components/ButtonToggle';
import TimeRangePicker from '../components/TimeRangePicker';
import ConfirmDialog from '../components/ConfirmDialog';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Roles from '../enums/example-enum-roles';
import DynamicTabs from '../components/DynamicTabs';
import TabContent from './TabContent';
import Lightbox from '../components/Lightbox';
import Pagination from '../components/Pagination';
import SelectList from '../components/SelectList';
import TextArea from '../components/TextArea';
import TextAreaDisplay from '../components/TextAreaDisplay';
import TextInputDisplay from '../components/TextInputDisplay';

class DomShowreelComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        name: '',
        isActive: true,
        isSubmitAttempted: false,
        date: '',
        isValidationVisible: false,
        isConfirmDialogOpen: false,
        isLoading: false,
        role: -1,
        tabs: [],
        tabItems: [],
        currentImage: 0,
        isLightboxOpen: false,
        pages: 100,
        page: 1,
        take: 7,
        colors: ["red", "green", "blue"],
        description: "",
        someTextInput: "I am awesome"
    }

    UNSAFE_componentWillMount() {
        let tabs = [];
        let tabItems = [];
        for (let i = 0; i < 5; i++) {
            tabItems.push("Item " + i);
            tabs.push({
                id: i,
                name: "Tab " + i,
                description: "Desription of tab number " + i,
                descriptionExcerpt: "Description stuff",
                handleDescriptionChange: (item) => console.log(item),
                handleDescriptionExcerptChange: (item) => console.log(item),
                isSubmitAttempted: false,
                TabComponent: TabContent
            });
        }
        this.setState({
            tabs: tabs,
            tabItems: tabItems
        });
    }

    onActivate = () => this.setState({ isActive: true })
    onDeactivate = () => this.setState({ isActive: false })

    onTimeChange = () => this.setState({ date: false })

    openDeleteConfirmDialog = () => this.setState({ isConfirmDialogOpen: true });
    closeDeleteConfirmDialog = () => this.setState({ isConfirmDialogOpen: false });
    deleteThingy = () => this.setState({ isConfirmDialogOpen: false });

    onRoleSelect = (role) => {
        // if (role === Roles.Clerk)
        // fetch stuff 
        // ..etc

        this.setState({ role, id: null });
    }

    openLightbox = () => {
        this.setState({
            isLightboxOpen: true
        });
    }
    onClickPrev = () => {
        this.setState((state) => ({
            currentImage: state.currentImage - 1
        }));
    }
    onClickNext = () => {
        this.setState((state) => ({
            currentImage: state.currentImage + 1
        }));
    }
    closeLightbox = () => {
        this.setState({
            currentImage: 0,
            isLightboxOpen: false
        });
    }

    onPageChange = (page) => {
        this.setState({ page },
            // () => this.props.fetchArticles({ page, take: this.state.take })
        );
    }

    
    handleColorChange = (key) => {
        const colors = this.state.colors;
        // if (colors.includes(key)) {
        //     this.setState({ colors: colors.filter((c) => c !== key) });
        // } else {
        //     this.setState({ colors: [...colors, key] });
        // }
    }

    handleDescriptionChange = (event) => this.setState({ description: event.target.value });

    render() {
        // const imageUrls = keys
        // .map((key) => images[key].url)
        // .filter((url) => !isNullOrWs(url));

        const imageUrls = [];
        const colors = [];
        for (let i = 1; i < 10; i++) {
            imageUrls.push("https://via.placeholder.com/" + i * 100);
            colors.push({
                name: "Color " + i,
                id: i
            });
        }
        return (
            <Fragment>
                <Alert type="info" noMarginBottom>
                    You can use Alerts like this.
                </Alert>

                <div className="card-header-controls">
                    <ButtonIcon
                        icon="plus"
                        type="primary"
                        onClick={null}
                        isDisabled={null}
                    />
                </div>

                <ButtonToggle
                    label="Is this awesome?"
                    isActive={this.state.isActive}
                    onActivate={this.onActivate}
                    onDeactivate={this.onDeactivate}
                />

                {/* Could not be bothered to make this work atm
                
                import PropTypes from 'prop-types';
                import CardError from '../components/CardError';
                import ErrorModel from '../models/error-model';

                static propTypes = {
                    hideDialogError: PropTypes.func.isRequired,
                    error: PropTypes.instanceOf(ErrorModel)
                }

                <CardError
                    error={this.props.error}
                    close={this.props.hideDialogError}
                /> */}


                {/* Doesn't work since Card error is not working
                import CardPlaceholder from '../components/CardPlaceholder';
                <CardPlaceholder title="Title of card" error={} /> 
                */}

                <TimeRangePicker
                    from={this.state.date}
                    until={this.state.date}
                    // ruleSetFactory={ruleSetFactory}
                    onChange={this.onTimeChange}
                    isValidationVisible={this.state.isValidationVisible}
                />
                <br></br>
                <Button
                    value="Open modal"
                    icon="check"
                    type="outline-primary"
                    onClick={this.openDeleteConfirmDialog}
                    isLoading={this.state.isLoading}
                />
                <ConfirmDialog
                    isOpen={this.state.isConfirmDialogOpen}
                    close={this.closeDeleteConfirmDialog}
                    title="Confirmation"
                    text="Are you sure you want to delete the selected thingy?"
                    buttonType="danger"
                    buttonIcon="trash"
                    buttonText="Delete"
                    onConfirm={this.deleteThingy}
                />

                <Dropdown
                    label="Select something"
                    value={this.state.role}
                    // rules={rules.role}
                    isValidationVisible={this.state.isSubmitAttempted}
                    placeholder="Select a role"
                    items={Roles.enumerate()}
                    onChange={this.onRoleSelect}
                />


                {/* <DynamicTabs
                    tabs={this.state.tabs}
                    items={this.state.tabItems}
                    insertTab={(item) => console.log(item)}
                    removeTab={(item) => console.log(item)}
                /> */}

                <Button
                    value="Open lightbox"
                    icon="check"
                    type="outline-primary"
                    onClick={this.openLightbox}
                    isLoading={this.state.isLoading}
                />
                {imageUrls.length > 0 &&
                    <Lightbox
                        images={imageUrls}
                        isOpen={this.state.isLightboxOpen}
                        currentImage={this.state.currentImage}
                        close={this.closeLightbox}
                        gotoNext={this.onClickNext}
                        gotoPrevious={this.onClickPrev}
                    />}

                <div className="media-pagination">
                    <Pagination
                        pageSize={this.state.take}
                        itemCount={this.state.pages}
                        currentPage={this.state.page}
                        onPageChange={this.onPageChange}
                        isDisabled={false}
                    />
                </div>

                <SelectList
                    id="colors"
                    label="Colors"
                    items={colors}
                    selectedItems={this.state.colors}
                    onChange={this.handleColorChange}
                    // rules={ruleSet.colors}
                    isValidationVisible={this.state.isSubmitAttempted}
                    isFilterInputVisible
                />
                <br/>
                <TextArea
                    label="Description"
                    id="some-description"
                    value={this.state.description}
                    // rules={ruleSet.description}
                    onChange={this.handleDescriptionChange}
                    isValidationVisible={this.state.isSubmitAttempted}
                />
                <br/>
                <TextAreaDisplay label="Your description " value={this.state.description} />

                <br/>
                <TextInputDisplay label="Email address" value={this.state.someTextInput} />

            </Fragment>
        )
    }
}

export default DomShowreelComponent;