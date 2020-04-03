
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {THeadRow} from "./row";


export class TableHead extends React.PureComponent {
    static propTypes = exact({
        headerGroups: PropTypes.array.isRequired,
        icons: PropTypes.object.isRequired,
    });

    render () {
        const {headerGroups, icons} = this.props;
        return (
          <thead
            className="text-black-50">
            {headerGroups.map((headerGroup, index) => (
                <THeadRow
                  key={index}
                  icons={icons}
                  headerGroup={headerGroup} />
            ))}
          </thead>);
    }
}
