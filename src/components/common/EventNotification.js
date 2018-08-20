import React from 'react';

class EventNotification  extends React.Component {

    constructor(props) {
        super(props); 
    }
    
    componentDidMount(){
        this.requestPermission();
    }
    
    componentWillReceiveProps() {
        let self = this;
        this.setClientData().then(
            function(db) {
                setInterval(
                  () => self.checkDeadlines(db),
                  5000
                );
            }
        );
    }
    
    setClientData() {
        
        let self = this;
        
        return new Promise(function(resolve, reject) {
        
            let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            // Open (or create) the database
            var open  = window.indexedDB.open("GCalendar", 4);
            // Create the schema
            open.onupgradeneeded = function(event) {
                let db = event.target.result;
                db.onerror = function(event) {
                  reject('Error loading database');
                };
                let objectStore = db.createObjectStore("EventList", { keyPath: "id", autoIncrement:true });
                objectStore.createIndex("hours", "hours", { unique: false });
                objectStore.createIndex("minutes", "minutes", { unique: true });
                objectStore.createIndex("day", "day", { unique: false });
                objectStore.createIndex("month", "month", { unique: false });
                objectStore.createIndex("year", "year", { unique: false });
                objectStore.createIndex("notified", "notified", { unique: false });
            };
            open.onerror = function(event) {
                reject('Error loading database');
            };
            open.onsuccess = () => {
                let db = open.result;
                self.addEvents(db);
                resolve(db);
            };
           
        });
    }
    
     
    addEvents(db) {

        // open a read/write db transaction, ready for adding the data
        let transaction = db.transaction(["EventList"], "readwrite");
        
        // report on the success of opening the transaction
        transaction.oncomplete = function(e) {
            console.log('Transaction completed: database modification finished.',e);
        };

        transaction.onerror = function(e) {
            console.log('Transaction not opened due to error',e.target.error);
        };
        
        let objectStore = transaction.objectStore("EventList");
        let objectStoreRequest = objectStore.clear();

        let calendar = this.props.calendar;
        
        for (let hour in calendar) {
            let date = new Date(hour);
            let mi = date.getMinutes();
            let h = date.getHours();
            let d = date.getDate();
            let mo = date.getMonth()+1;
            let y = date.getFullYear(); 
            
            calendar[hour].forEach( function(evt) {
               let event =  Object.assign({name: evt[1], hours: h, minutes: evt[0]+29, day: d, month: mo, year: y, notified: "no" });
               objectStore.put(event);
            })
        }    
                
    }
    
    
    checkDeadlines(db) {
       
        let now = new Date();

        let minuteCheck = now.getMinutes();
        let hourCheck = now.getHours();
        let dayCheck = now.getDate();
        let monthCheck = now.getMonth()+1;
        let yearCheck = now.getFullYear();
        
        let transaction = db.transaction(["EventList"], "readwrite");
        let objectStore = transaction.objectStore("EventList");
        
        console.dir(objectStore.getAll());
        let self = this;
        
        objectStore.openCursor().onsuccess = function(e) {
          var cursor = e.target.result; 
            if(cursor) {

              if(+(cursor.value.hours) === hourCheck &&
                 +(cursor.value.minutes) === minuteCheck && 
                 +(cursor.value.day) === dayCheck && 
                 cursor.value.month === monthCheck && 
                 cursor.value.year === yearCheck && 
                 cursor.value.notified == "no") {
                 self.createNotification(cursor,db);
              }

                cursor.continue();
            }

        }
    }
    
    requestPermission() { 
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        }
        else if (Notification.permission !== 'denied') {
           Notification.requestPermission();
        }
    } 
    
    
    createNotification(cursor,db) { 
        if (!("Notification" in window)) {
            alert("This browser does not support system notifications");
        }
        else if (Notification.permission === "granted") {
            let txt = cursor.value.name + ": " + cursor.value.year + "-" + cursor.value.month + "-" + (+(cursor.value.day)) + " " + (+(cursor.value.hours))+":"+ (+(cursor.value.minutes));
            let notification = new Notification('Grove Calendar', { body: txt});
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    let notification = new Notification('Grove Calendar', { body: cursor.value.name});
                }
            });
        }
        
        let objectStore = db.transaction(['EventList'], "readwrite").objectStore('EventList');
        
        // Update notified
        var objectByKey = objectStore.get(cursor.key);
        objectByKey.onsuccess = function() {
          var data = objectByKey.result;
          data.notified = "yes";
          var update = objectStore.put(data);
        }
    }  
    
   
    render() {
        return (
            <div />
        );
    }
}

export default EventNotification;