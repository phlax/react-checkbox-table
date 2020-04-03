
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Table} from "./table";
import Checkbox from "./checkbox";


export default class CheckboxTable extends React.Component {
    static propTypes = exact({
        columns: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        defaultPageSize: PropTypes.number,
        submitMessage: PropTypes.string,
        submitClass: PropTypes.string,
        onChange: PropTypes.func,
        fetch: PropTypes.func,
        handleSubmit: PropTypes.func,
    });

    getColumnHeaderProps = () => {
        return {style: {background: "red", width: "22px"}};
    };

    constructor (props) {
        super(props);
        this.visible = [];
        this.state = {checked: new Set()};
    }

    get columns () {
        return [this.columnSelect].concat(this.props.columns || []);
    }

    get columnSelect () {
        return {
            Header: this.renderSelectAllCheckbox,
            Cell: this.renderCheckbox,
            getColumnHeaderProps: this.getColumnHeaderProps,
            id: "code",
            canResize: false,
            maxWidth: 45,
            width: 45};
    }

    get defaultPageSize () {
        return this.props.defaultPageSize || 10;
    }

    get selected () {
        // get the pruned list of selected resources, returns all=true/false
        // if all visible resources are selected
        // some rows can be empty strings if there are more visible rows than
        // resources
        const checked = this.prune(this.state);
        const all = (
            checked.size > 0
                && checked.size === this.visible.filter(v => v !== "").length);
        return {all, checked};
    }

    clearTable () {
        this.visible.length = 0;
        this.setState({checked: new Set()});
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.data !== this.props.data) {
            this.clearTable();
        }
    }

    handleCheckboxClick = (evt) => {
        evt.stopPropagation();
        // adds/removes paths for submission
        const {onChange} = this.props;
        const {name, checked: targetChecked} = evt.target;
        this.setState((prevState) => {
            let {checked} = prevState;
            checked = new Set(checked);
            targetChecked ? checked.add(name) : checked.delete(name);
            if (onChange) {
                onChange(checked);
            }
            return {checked};
        });
    };

    handleSelectAll = (e) => {
        const {onChange} = this.props;
        e.stopPropagation();
        // user clicked the select all checkbox...
        // if there are some resources checked already, all are removed
        // otherwise all visible are checked.
        this.setState((prevState) => {
            let {checked} = prevState;
            checked = checked.size > 0 ? new Set() : new Set([...this.visible.filter(x => x)]);
            if (onChange) {
                onChange(checked);
            }
            return {checked};
        });
    };

    handleSubmit = async (evt) => {
        // after emitting handleSubmit to parent with list of currently
        // checked, clears the checkboxes
        evt.preventDefault();
        const {checked} = this.state;
        await this.props.handleSubmit({data: [...checked]});
        this.setState({checked: new Set()});
    };

    handleTableChange = () => {
        this.clearTable();
    };

    handleTableResize = (pageSize) => {
        this.visible.length = pageSize;
        this.setState((prevState) => ({checked: this.prune(prevState)}));
    };

    handleTableSortChange = () => {
        this.setState((prevState) => ({checked: this.prune(prevState)}));
    };

    prune (state) {
        // Returns a copy of the checked set with any resource paths that are
        // not in `this.visible` removed
        let {checked} = state;
        return new Set([...checked].filter(v => (this.visible.indexOf(v) !== -1)));
    }

    render () {
        return (
            <div>
              {this.renderTable()}
              {this.renderSubmit()}
            </div>);
    }

    renderCheckbox = (item) => {
        const {checked} = this.state;
        this.visible.length = item.state.pageSize;
        this.visible[item.row.index] = item.row.original.code;
        return (
            <Checkbox
              checked={checked.has(item.row.original.code)}
               name={item.row.original.code}
               onChange={this.handleCheckboxClick} />);
    };

    renderSelectAllCheckbox = () => {
        // renders a select all checkbox, sets the check to
        // indeterminate if only some of the visible resources
        // are checked
        let {all, checked} = this.selected;
        return (
            <Checkbox
               checked={all}
               indeterminate={!all && checked.size > 0}
               onChange={this.handleSelectAll} />);
    };

    renderSubmit () {
        if (!this.props.submitMessage) {
            return "";
        }
        return (
            <button
               className={this.props.submitClass}
               onClick={this.handleSubmit}>
              {this.props.submitMessage}
            </button>);
    }

    renderTable () {
        return (
            <Table
              defaultPageSize={this.defaultPageSize}
              data={this.props.data}
              onPageChange={this.handleTableChange}
              onPageSizeChange={this.handleTableResize}
              onSortedChange={this.handleTableSortChange}
              pages={100}
              fetch={this.props.fetch}
              columns={this.columns} />);
    }
}
