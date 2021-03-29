// Import statements for relevant js
import { performAction } from './js/app'

// Import statements for styles
import './styles/style.scss'

// Export statements for js
export {}

// Event listener
window.addEventListener("DOMContentLoaded", (e) => {
	// get reference to the form elemet
	const form = document.getElementById("form");
	// Add submit event listener on this form
	form.addEventListener("submit", handleSubmit);
});
