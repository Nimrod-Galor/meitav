import axios from 'axios';

const ApiUrl = 'https://localhost:44352/api/persons/';

class ApiServices{
    getPersons = () => {
        return axios.get(ApiUrl);
    }

    createPerson = (person) => {
        return axios.post(ApiUrl, person);
    }
}

export default new ApiServices();