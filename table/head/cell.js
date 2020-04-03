
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";


export class THeadCell extends React.PureComponent {
    static propTypes = exact({
	column: PropTypes.object.isRequired,
	icons: PropTypes.object.isRequired
    });

    render () {
        const {column, icons} = this.props;
        return (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}
                {...column.getDefaultHeaderProps()}
                {...(column.getColumnHeaderProps ? column.getColumnHeaderProps() : {})}>
              {column.render("Header")}
              {column.canSort &&
               <span>
                 {column.isSorted
                  ? (column.isSortedDesc
                     ? icons.desc
                     : icons.asc)
                  : icons.ascDesc}
               </span>
              }
            </th>
        );
    }
}
