
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";


export class TData extends React.PureComponent {
    static propTypes = exact({
        cell: PropTypes.object.isRequired,
        cellProps: PropTypes.object.isRequired,
    });

    render () {
        const {cell, cellProps} = this.props;
        return (
            <td {...cellProps}
                className="border-0 p-1 align-middle">
              {cell}
            </td>);
    }
}


export class TableData extends React.PureComponent {
    static propTypes = exact({
        cell: PropTypes.object.isRequired,
        cellProps: PropTypes.object.isRequired,
    });

    render () {
        const {cell, ...props} = this.props;
        return (
            <TData
              {...props}
              cell={cell.render("Cell")} />);
    }
}
