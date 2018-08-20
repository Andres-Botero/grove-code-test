import config from '../config';


class EventsAPI {

    get() {
        return new Promise((resolve, reject) => {
            fetch(`${config.api.scheduler.baseUrl}schedule`)
                .then(response => { return response.json()})
                .then(function(data) {
                    resolve(data);
                });
        });
    }
}

/**
 * Exports
 */
export default EventsAPI;
