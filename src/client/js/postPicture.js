// POST request to display picture returned from Pixbay
const postPicture = async (url = "", newInfo = {} ) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(newInfo),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
        // console.log(newData);
    } catch (error) {
        console.log("error", error);
    }
};

export {postPicture};
