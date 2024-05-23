const generate = async (text) => {
    // TODO: change view

    console.log('fetch start with: ' + text)
    const response = await fetch('./api/generate', {
        method: "POST",
        body: JSON.stringify({ text })
    });
    console.log('fetch finished')
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
}

const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: support captcha
    const text = document.getElementById("text").value.trim();
    if (!text) {
        document.getElementById("error").textContent = "入力が空です";
        return;
    }
    if (!/^[!-~\s]+$/.test(text)) {
        document.getElementById("error").textContent = "英語のみ入力してください";
        return;
    }
    document.getElementById("error").textContent = "";

    await generate(text);
};

onload = async () => {
    document.getElementById("form").onsubmit = onSubmit;
};