
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {usePagination, useSortBy, useTable} from "react-table";

import {Pagination} from "../pagination";
import {TableHead} from "./head";
import {TableBody} from "./body";


export class BaseTable extends React.PureComponent {
    static propTypes = exact({
        table: PropTypes.object.isRequired,
        defaultPageSize: PropTypes.number,
        className: PropTypes.string,
        onPageChange: PropTypes.func,
        onPageSizeChange: PropTypes.func,
        onSortedChange: PropTypes.func,
	fetch: PropTypes.func,
	pages: PropTypes.number,
	pageIndex: PropTypes.number,
	pageSize: PropTypes.number,
    });

    get icons () {
        return {
            ascDesc: <i className="icon icon-ascdesc" />,
            asc: <i className="icon icon-asc" />,
            desc: <i className="icon icon-desc" />};
    }

    render () {
        const {table} = this.props;
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow} = table;
        return (
            <>
              <table
                {...getTableProps()}
                className="table table-striped table-sm table-responsive-sm small">
                <TableHead
                  icons={this.icons}
                  headerGroups={headerGroups} />
                <TableBody
                  getTableBodyProps={getTableBodyProps}
                  prepareRow={prepareRow}
                  rows={page}
                />
              </table>
              <Pagination {...this.props} />
            </>);
    }
}


const Table = ({columns, data, pages, defaultPageSize, ...props}) => {
    const defaultColumn = React.useMemo(
        () => ({
            // getColumnHeaderProps: () => {},
            getDefaultHeaderProps: () => {
                return {className: "p-1 border-0"};
            },
        }),
        []
    );
    const table = useTable(
        {columns,
         data,
         defaultColumn,
         manualPagination: true,
         initialState: {pageIndex: 0, pageSize: defaultPageSize},
         pageCount: pages},
        useSortBy,
        usePagination);
    return (
        <BaseTable
          {...props}
          pageIndex={table.state.pageIndex}
          pageSize={table.state.pageSize}
          table={table} />);
};

Table.propTypes = exact({
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    defaultPageSize: PropTypes.number,
    className: PropTypes.string,
    onPageChange: PropTypes.func,
    onPageSizeChange: PropTypes.func,
    onSortedChange: PropTypes.func,
    fetch: PropTypes.func,
    pages: PropTypes.number,
});

export {Table};
