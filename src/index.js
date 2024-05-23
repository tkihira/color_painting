const generate = async (text) => {
    document.getElementById("container").style.display = "none";
    document.getElementById("loading-indicator").style.display = "flex";

    console.log('fetch start with: ' + text)
    const response = await fetch('./api/generate', {
        method: "POST",
        body: JSON.stringify({ text })
    });
    console.log('fetch finished')
    if (!response.ok) {
        const errorMessage = (await response.json()).error;
        console.log({ status: response.status, message: errorMessage });
        document.getElementsByClassName("spinner")[0].style.display = "none";
        document.getElementById("loading-indicator").getElementsByTagName("p")[0].textContent = errorMessage;
        return;
    } else {
        document.getElementById("loading-indicator").style.display = "none";

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        show(url);

    }
};

const show = (url) => {
    document.getElementById("result").style.display = "block";

    const img = document.createElement('img');
    img.src = url;
    img.width = 700;
    img.height = 700;
    document.getElementById("image-container").appendChild(img);

    document.getElementById("reload").onclick = () => {
        location.reload();
    };
    document.getElementById("print").onclick = () => {
        window.print();
    };
};

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