import React from 'react';
import config from '../../config';

class Breakpoint extends React.Component {

    state = {
        breakpoint: 'handhelds', // Default is "mobile-first"
        width:window.innerWidth
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleWidthChange, false);
        this.getCurrentBreakpoint();
    }
    
    getCurrentBreakpoint = () => {
        if (this.state.width <= config.layout.break_small) {
            this.setState({breakpoint:'handhelds'});
        } else {
            this.setState({breakpoint:'wide-screens'});
        }
    }
    
    handleWidthChange = () => {  
        this.setState({width:window.innerWidth}); 
        this.getCurrentBreakpoint();
    }

    render() {
        if (this.state.breakpoint === this.props.point) {
            return <div>{this.props.children}</div>;
        } else {
            return null;
        }
    }
}

export default Breakpoint;
