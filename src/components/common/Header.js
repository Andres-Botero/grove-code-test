import React from 'react';
import Breakpoint from './Breakpoint';


class Header extends React.Component {

    render() {
        return (
            <header className="main-header">
                <Breakpoint point="handhelds">
                    <div className="mobile-header header"><p><a href="/">Grove Scheduler Challenge</a></p></div>
                </Breakpoint>
                <Breakpoint point="wide-screens">
                    <div className="desktop-header header"><p><a href="/">Grove Scheduler Challenge</a></p></div>
                </Breakpoint>
            </header>
        );
    }
}

export default Header;