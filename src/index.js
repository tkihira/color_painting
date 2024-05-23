let recaptchaResult = null;

const generate = async (text) => {
    document.getElementById("container").style.display = "none";
    document.getElementById("loading-indicator").style.display = "flex";

    const response = await fetch('./api/generate', {
        method: "POST",
        body: JSON.stringify({ text, recaptchaResult })
    });
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

const onSubmit = (e) => {
    e.preventDefault();
    const text = document.getElementById("text").value.trim();
    if (!text) {
        document.getElementById("error").textContent = "入力が空です";
        return;
    }
    if (!/^[!-~\s]+$/.test(text)) {
        document.getElementById("error").textContent = "英語のみ入力してください";
        return;
    }
    if (!recaptchaResult) {
        document.getElementById("error").textContent = "reCAPTCHA が完了していません";
        return;
    }
    document.getElementById("error").textContent = "";

    generate(text);
};

onload = async () => {
    document.getElementById("form").onsubmit = onSubmit;
};
onloadCallback = () => {
    grecaptcha.render('recaptcha-container', {
        'sitekey': "6LfyDeYpAAAAANt5sUHrJx_D6kAX4JVsY_QKt-Iu",
        'callback': (result) => {recaptchaResult = result}
    });
};
