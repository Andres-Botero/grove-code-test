import React from 'react';
import EventsAPI from '../../../api/events';
import EventList from '../event/EventList';
import CronParser from 'cron-parser';
import '../../../styles/SchedulePage.css';


class SchedulePage extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            now: new Date().toLocaleString(),
            calendar: []
        };
        this.eventsAPI = new EventsAPI();
    }

    componentDidMount() {
        this.getAll(); //gets events from grove api

    }

    createIntervalSet() { // creates empty calendar interval hash set from date()-3hr to date()+24hr
        let calendar = [];

        let d = new Date();
        d.setMinutes(0);
        d.setSeconds(0);
        d.setHours(d.getHours() - 3); // first hour of interval
        calendar[d] = [];

        for(let i=1; i <= 28; i++) { // this for feeds the interval with the next hours until date()+24hr
            d.setHours(d.getHours() + 1);
            calendar[d] = [];
        }

        return calendar;
    }
    
    getAll() {
        let self = this;
        this.eventsAPI.get().then(function successFn(result) {
            if(result.data) {
                let mapEvents = self.mapEvents(result.data);
                self.setState({calendar: mapEvents});
            }
        });
    }

    mapEvents(list){

        let calendar = this.createIntervalSet();

        list.map(function (event) {

            let nowDate = new Date();
            nowDate.setMinutes(0);
            nowDate.setSeconds(0);
            nowDate.setHours(nowDate.getHours() - 4); // first hour of interval

            var options = {
                currentDate: nowDate
            };

            let i = CronParser.parseExpression(event.attributes.cron, options); //uses cronParser library
            let dateString = i.next().toString();

            let date = new Date(dateString); //next date for cron
            let minute = date.getMinutes();
            date.setMinutes(0);
            date.setSeconds(0);

            while (typeof calendar[date] !== 'undefined'){ //finds date key in hash set
                calendar[date].unshift([minute,event.attributes.name]);
                dateString = i.next().toString();
                date = new Date(dateString); //next date for cron
                minute = date.getMinutes();
                date.setMinutes(0);
                date.setSeconds(0);
            }

        });

        //console.log(calendar);

        return calendar;
    }

    render() {
        
        return (
            <div className="schedule_container">

                <h2 className="sch_h2">Schedule</h2>
             
                <EventList calendar={this.state.calendar} />
                
            </div>
        );
    }

};

export default SchedulePage;

