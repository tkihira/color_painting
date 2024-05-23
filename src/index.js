onload = async () => {
    // const response = await (await fetch('./api/generate', {
    //     method: "POST",
    //     body: JSON.stringify({text: "This is test."})
    // })).text();
    const response = await fetch('./api/image');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Fetched PNG Image';
    document.body.appendChild(img);
    console.log(response);
};