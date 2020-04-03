
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";


export class Pagination extends React.PureComponent {
    static propTypes = exact({
        table: PropTypes.object.isRequired,
        defaultPageSize: PropTypes.number,
        className: PropTypes.string,
        onPageChange: PropTypes.func,
        onPageSizeChange: PropTypes.func,
        onSortedChange: PropTypes.func,
        onChange: PropTypes.func,
	fetch: PropTypes.func,
	pages: PropTypes.number,
	pageIndex: PropTypes.number,
	pageSize: PropTypes.number,
    });

    gotoPage = async (n) => {
        const {fetch, table: {gotoPage, state: {pageSize}}} = this.props;
        await fetch(n, pageSize);
        gotoPage(n);
    };

    previousPage = async () => {
        const {fetch, table: {previousPage, state: {pageSize, pageIndex}}} = this.props;
        await fetch(pageIndex - 1, pageSize);
        previousPage();
    };

    nextPage = async () => {
        const {fetch, table: {nextPage, state: {pageSize, pageIndex}}} = this.props;
        await fetch(pageIndex + 1, pageSize);
        nextPage();
    };

    render () {
        const {table} = this.props;
        const {
            pageCount,
            canPreviousPage,
            canNextPage,
            pageOptions,
            setPageSize,
            state: {pageIndex, pageSize}} = table;
        return (
            <div className="pagination">
              <button onClick={() => this.gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button onClick={() => this.previousPage()} disabled={!canPreviousPage}>
                {"<"}
              </button>{" "}
              <button onClick={() => this.nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button onClick={() => this.gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={e => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      this.gotoPage(page);
                  }}
                  style={{width: "100px"}}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value));
                }} >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                ))}
              </select>
            </div>);
    }
}
