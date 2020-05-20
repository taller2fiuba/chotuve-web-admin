import axios from 'axios';

class Requester {
    getPing(url, callback){
        axios.get(`${url}/ping`)
            .then(response => 
                callback({ping: response.status})
            )
            .catch(error => {
                console.log(error);
                callback({ping:error.status});
            })
    }
}

export default new Requester();
