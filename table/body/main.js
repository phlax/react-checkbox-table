
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {TableRow} from "./row";


export class TableBody extends React.PureComponent {
    static propTypes = exact({
	rows: PropTypes.array.isRequired,
	getTableBodyProps: PropTypes.func.isRequired,
	prepareRow: PropTypes.func.isRequired,
    });

    render () {
        const {rows, getTableBodyProps, prepareRow} = this.props;
        return (
            <tbody {...getTableBodyProps()}>
              {rows.map((row, key) => {
                  prepareRow(row);
                  return (
                      <TableRow
                        key={key}
                        row={row} />
                  );
              })}
            </tbody>
        );
    }
}
