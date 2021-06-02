const app = require("./app");
// Setup Server

const port = 8000;
const server = app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`);
});
