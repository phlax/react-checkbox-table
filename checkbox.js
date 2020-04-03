
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";


export default class Checkbox extends React.Component {
    static propTypes = exact({
        indeterminate: PropTypes.bool,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
	name: PropTypes.string
    });

    /* A checkbox which you can set `indeterminate` on
     *
     */

    constructor (props) {
        super(props);
        this.el = {};
    }

    get indeterminate () {
        return this.props.indeterminate ? true : false;
    }

    componentDidMount() {
        this.el.indeterminate = this.indeterminate;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            this.el.indeterminate = this.indeterminate;
        }
    }

    render() {
        const {indeterminate, ...props} = this.props;
        return (
            <input {...props} type="checkbox" ref={el => this.el = el} />
        );
    }
}
