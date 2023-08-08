import {createStore} from 'redux';
import reducer from './youtube/reducer';

const myStore = createStore(reducer);

export default myStore;
