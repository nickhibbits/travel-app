// Update UI for current weather forecast
const updateCurrent = async () => {
    const request = await fetch("http://localhost:8000/updatePage");
    let departDate = new Date(document.getElementById("depart").value);
    let returnDate = new Date(document.getElementById("return").value);
    console.log(departDate);
    console.log(returnDate);
    try {
        const allData = await request.json();
        let image = document.getElementById("image");
        image.setAttribute('src', `${allData.pixbay.picture}`);
        image.setAttribute('height', `${allData.pixbay.height}`);
        image.setAttribute('width', `${allData.pixbay.width}`);
        document.getElementById("tripDisplay").innerHTML = `Your trip from ${departDate.getMonth()+1}/${departDate.getDate()+1} to ${returnDate.getMonth()+1}/${returnDate.getDate()+1} is set!`;
        document.getElementById("weatherInput").innerHTML = `The current weather for your destination is ${allData.currentWeather.temp}°F with ${allData.currentWeather.description.toLowerCase()}`;
    } catch (error) {
        console.log("error", error);
    }
};

// Update UI for future weather forecast
const updateFuture = async () => {
    const request = await fetch("http://localhost:8000/updatePage");
    let departDate = new Date(document.getElementById("depart").value);
    let returnDate = new Date(document.getElementById("return").value);
    try {
        const allData = await request.json();
        let image = document.getElementById("image");
        image.setAttribute('src', `${allData.pixbay.picture}`);
        image.setAttribute('height', `${allData.pixbay.height}`);
        image.setAttribute('width', `${allData.pixbay.width}`);
        document.getElementById("tripDisplay").innerHTML = `Your trip from ${departDate.getMonth()+1}/${departDate.getDate()+1} to ${returnDate.getMonth()+1}/${returnDate.getDate()+1} is set!`;
        document.getElementById("weatherInput").innerHTML = `The weather for your destination is typically between ${allData.futureWeather.HiTemp}°F and ${allData.futureWeather.LowTemp}°F`;
    } catch (error) {
        console.log("error", error);
    }
};

export {updateCurrent}
export {updateFuture}
