import React from 'react';
import EventNotification from '../../common/EventNotification';


class EventList extends React.Component {


    configureCalendar (obj) {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let friendlyDay = "";
        let days = [];
        for (let hour in obj) {
            let date = new Date(hour);
            let thisFriendlyDay = monthNames[date.getMonth()] + " " + date.getDate()+ " "+ date.getFullYear();
            if(friendlyDay !== thisFriendlyDay){
                friendlyDay = thisFriendlyDay;
                days[friendlyDay]=[];
            }
            if(typeof days[thisFriendlyDay] !== 'undefined') {
                days[thisFriendlyDay][this.convertHourFormat (date.getHours())]=obj[hour];
            }
        }
        return days;
    }

    convertHourFormat (hr) {
        let amPM = "";
        let newHr = 0;
        if ( hr > 11) {
            newHr = hr - 12;
            if (newHr === 0) newHr = 12;
            amPM = "PM";
        } else if (hr === 0) {
            newHr = 12;
            amPM = "AM";
        } else {
            newHr = hr;
            amPM = "AM";
        }
        return newHr+amPM;
    }

    render() {


        let calendar = this.props.calendar;


        let fixedCalendar = this.configureCalendar(calendar);
        console.dir(fixedCalendar);

        let type = "regular";

        let currentDate = new Date();
        let currentHour = this.convertHourFormat (currentDate.getHours());

        return (
            <div className="event-list">
                <div className="event-list__container">
                    <div className="event-list__items">
                        <ul>
                            {Object.keys(fixedCalendar).map(function (day, idxd) {
                                return (
                                <li key={idxd} className="day">
                                    {day}
                                    <ul>
                                    {Object.keys(fixedCalendar[day]).map(function (hour, idxh) {
                                        return(
                                            <li key={idxh} className={currentHour==hour?"hour currentRed":"hour"}>
                                                <span>{hour}</span>
                                                    {fixedCalendar[day][hour].length>0?
                                                        <ul>
                                                        {fixedCalendar[day][hour].map(
                                                                function (task, idxt) {
                                                                    return(
                                                                        <li key={idxt} className="event">
                                                                            {task[0]} " : {task[1]}
                                                                            </li>
                                                                    )
                                                                }

                                                         )}
                                                        </ul>
                                                     :null
                                                    }
                                            </li>
                                        );
                                    })}
                                    </ul>
                                </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
                <EventNotification calendar={calendar} />
            </div>
        );
    }
}

/**
 * Exports
 */
export default EventList;

