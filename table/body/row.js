
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {TableData} from "./cell";


export class TableRow extends React.PureComponent {
    static propTypes = exact({
	row: PropTypes.object.isRequired,
    });

    render () {
        const {row} = this.props;
        return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, key) => {
                  return (
                      <TableData
                        cellProps={cell.getCellProps()}
                        cell={cell}
                        key={key} />);
              })}
            </tr>);
    }
}
