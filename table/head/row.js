
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {THeadCell} from "./cell";


export class THeadRow extends React.PureComponent {
    static propTypes = exact({
	headerGroup: PropTypes.object.isRequired,
	icons: PropTypes.object.isRequired,
    });

    render () {
        const {headerGroup, icons} = this.props;
        return (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                  <THeadCell
                    column={column}
                    icons={icons}
                    key={index} />
              ))}
            </tr>);
    }
}
