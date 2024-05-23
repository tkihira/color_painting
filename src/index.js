onload = async () => {
    const response = await fetch('./api/generate', {
        method: "POST",
        body: JSON.stringify({ text: "buildings in a city" })
    });
    if (!response.ok) {
        console.log({ status: response.status, message: await response.text() });
        // TODO: error check
    } else {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Fetched PNG Image';
        document.body.appendChild(img);
    }

    // const response = await fetch('./api/image');
    // const blob = await response.blob();
    // const url = URL.createObjectURL(blob);
    // const img = document.createElement('img');
    // img.src = url;
    // img.alt = 'Fetched PNG Image';
    // document.body.appendChild(img);
    // console.log(response);
};