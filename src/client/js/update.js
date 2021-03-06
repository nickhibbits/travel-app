// Update UI for weather forecast, depending on results from dateCompare
const update = async (isCurrent) => {
    const request = await fetch("http://localhost:8000/updatePage");
    let departDate = new Date(document.getElementById("depart").value);
    let returnDate = new Date(document.getElementById("return").value);
    if (isCurrent) {
        try {
            const allData = await request.json();
            let image = document.getElementById("image");
            if (`${allData.pixbay.picture}` === "No picture available") {
              document.getElementById("message").innerHTML = "No picture available"
            }
            else {
              image.setAttribute("src", `${allData.pixbay.picture}`);
              image.setAttribute("height", "300");
              image.setAttribute("width", "375");
            }
            document.getElementById("tripDisplay").innerHTML = `Your trip from ${departDate.getMonth() + 1}/${departDate.getDate() + 1} to ${returnDate.getMonth() + 1}/${returnDate.getDate() + 1} is set!`;
            document.getElementById("weatherInput").innerHTML = `The current weather for your destination is ${allData.currentWeather.temp}°F with ${allData.currentWeather.description.toLowerCase()}`;
        } catch (error) {
            console.log("error", error);
        }
    } else {
        try {
            const allData = await request.json();
            let image = document.getElementById("image");
            if (`${allData.pixbay.picture}` === "No picture available") {
              document.getElementById("message").innerHTML = "No picture available"
            }
            else {
              image.setAttribute("src", `${allData.pixbay.picture}`);
              image.setAttribute("height", "300");
              image.setAttribute("width", "375");
            }
            document.getElementById("tripDisplay").innerHTML = `Your trip from ${departDate.getMonth() + 1}/${departDate.getDate() + 1} to ${returnDate.getMonth() + 1}/${returnDate.getDate() + 1} is set!`;
            document.getElementById("weatherInput").innerHTML = `The weather for your destination is typically between ${allData.futureWeather.HiTemp}°F and ${allData.futureWeather.LowTemp}°F`;
        } catch (error) {
            console.log("error", error);
        }
    }
};

export { update };
