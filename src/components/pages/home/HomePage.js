import React from 'react';
import '../../../styles/HomePage.css';


class HomePage extends React.Component {

    handleSubmit = () => {
        this.props.history.push(`/schedule/`);
    }
    
    render() {
        return (
            <div>
                <div className="home-page__blurb">
                    <p>Welcome to the Grove Scheduler Code Challenge. To view the events in your calendar please hit the button below.</p>
                    <button onClick={this.handleSubmit} className="home-page__button">View Schedule</button>
                </div>
            </div>
        );
    }
};

export default HomePage;

