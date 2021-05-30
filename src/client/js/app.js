import {getLocation} from './getLocation'
import {dateCompare} from './dateCompare'
import {updateCurrent} from './update'
import {updateFuture} from './update'

/* Global Variables */
var moment = require('moment');
let baseURL = "http://api.geonames.org/searchJSON?username=nickhibbits&maxRows=10&q=";

//GET coordinates of destination, compare deprture date with current date, and POST date-dependent weather with picture
function performAction(e) {
  e.preventDefault();
    let dest = document.getElementById("dest").value;
    getLocation(baseURL, dest)
    .then(function(data) {
      dateCompare(data);
      const flag = dateCompare(data);
      if (flag) {
        updateCurrent()
      }
      else {
        updateFuture()
      }
    });
};

// set minimum date for current day
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
}
if(mm<10){
  mm='0'+mm
}
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("depart").setAttribute("min", today);
document.getElementById("return").setAttribute("min", today);


// Export performAction function for webpack entry
export { performAction }
