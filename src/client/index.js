// Import statements for relevant js
import { performAction } from "./js/performAction";
import { getLocation } from "./js/getLocation";
import { dateCompare } from "./js/dateCompare";
import { updateCurrent } from "./js/update";
import { updateFuture } from "./js/update";

// Import statements for styles
import "./styles/style.scss";
import "./styles/breakpoints.scss";

// Export statements for js
export { performAction };

// set minimum date for current day
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
    dd = "0" + dd;
}
if (mm < 10) {
    mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;
document.getElementById("depart").setAttribute("min", today);
document.getElementById("return").setAttribute("min", today);

window.addEventListener("DOMContentLoaded", (e) => {
    // get reference to the button elemet
    const button = document.getElementById("search");
    // Add submit event listener on this form
    button.addEventListener("click", performAction);
});
