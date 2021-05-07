// Import statements for relevant js
import { performAction } from './js/app'

// Import statements for styles
import './styles/style.scss'
import './styles/breakpoints.scss'

// Export statements for js
export { performAction }

// get reference to the button elemet
const button = document.getElementById("search");
// Add submit event listener on this form
button.addEventListener("click", performAction);
