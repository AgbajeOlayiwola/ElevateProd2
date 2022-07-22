import Axios from 'axios';

const initState = {
    countries: [
        { id: '1', names: 'nig' },
        { id: '2', names: 'Cotonou' },
        { id: '3', names: 'ghana' }
    ]
};

const CountryReducer = (state = initState, action) => {
    return state;
};

export default CountryReducer;
