import React from 'react';
import Breakpoint from './Breakpoint';


class Footer extends React.Component {

    render() {
        return (
            <footer className="main-footer">
                <Breakpoint point="handhelds">
                    <div className="mobile-footer footer">Code Test created by Andres Botero</div>
                </Breakpoint>
                <Breakpoint point="wide-screens">
                    <div className="desktop-footer footer">Code Test created by Andres Botero</div>
                </Breakpoint>
            </footer>
        );
    }
}

export default Footer;