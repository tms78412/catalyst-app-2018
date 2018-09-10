//Dependencies
import { createBrowserHistory } from 'history';

//Instantiated
/**
 * This file simply uses the createBrowserHistory method exported from the history npm package to create and
 * export a variable that can be used across our app
 * 
 * Documentation and reference information for the history package can be found here:
 * https://github.com/ReactTraining/history#readme
 * 
 * This file allows us to reference the same history object throughout the project by including this file whenever history is needed
 * 
 * History is mounted to the Router object in index.js and keeps track of user navigation throughout the app
 */
const History = createBrowserHistory();

export { History };
export default History;
