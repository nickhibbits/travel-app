// Import statements for relevant js
import { performAction } from './js/app'
import {getLocation} from './js/getLocation'
import {dateCompare} from './js/dateCompare'
import {updateCurrent} from './js/update'
import {updateFuture} from './js/update'

// Import statements for styles
import './styles/style.scss'
import './styles/breakpoints.scss'

// Export statements for js
export { performAction }

window.addEventListener("DOMContentLoaded", (e) => {
// get reference to the button elemet
const button = document.getElementById("search");
// Add submit event listener on this form
button.addEventListener("click", performAction);
});
