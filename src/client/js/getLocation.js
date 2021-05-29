// Access the Geonames API to get coordinates of destination
const getLocation = async (baseURL, loc) => {
    const res = await fetch(baseURL + loc);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

export {getLocation}
