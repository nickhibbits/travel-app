import {postWeather} from './postWeather'
import {postPicture} from './postPicture'

// Compare dates to get either current or future weather from Weatherbit
const dateCompare = function(data) {
    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + parseInt(days));
      return this;
    };

    let userDate = new Date(document.getElementById("depart").value);
    // console.log(userDate);
    // console.log(new Date())
    let cutoffDate = new Date().addDays(7);
    let difference = userDate.getTime() - cutoffDate.getTime();
    let differenceByDay = difference / (1000 * 3600 * 24);
    if (differenceByDay <= 0) {
      console.log('input date is within 7 days of current date');
      // console.log(userDate);
      postWeather("http://localhost:8000/current", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
      postPicture("http://localhost:8000/picture", {city:data.geonames[0].name});
      return 1;
    }
    else if (differenceByDay > 0) {
      console.log('input date is more than 7 days away from current date');
      postWeather("http://localhost:8000/future", {country:data.geonames[0], latitude:data.geonames[0].lat, longitude:data.geonames[0].lng});
      postPicture("http://localhost:8000/picture", {city:data.geonames[0].name});
      return 0;
    }
}

export {dateCompare}
