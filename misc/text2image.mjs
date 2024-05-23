import fs from 'node:fs';

const engineId = 'stable-diffusion-v1-6';
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
const apiKey = process.env.STABILITY_API_KEY;

if (!apiKey) {
    throw new Error('Missing Stability API key.');
}

const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            text_prompts: [
                {
                    text: 'some buildings in a city from sky, white and black, coloring book for kids, simple, adult coloring book, no detail, outline no color, fill frame, edge to edge, clipart white background',
                },
            ],
            cfg_scale: 7,
            height: 1024,
            width: 1024,
            steps: 30,
            samples: 1,
        }),
    }
);

if (!response.ok) {
    throw new Error(`${response.status} response: ${await response.text()}`);
}

const responseJSON = await response.json();

if (!fs.existsSync('./out')) {
    fs.mkdirSync('./out');
}

responseJSON.artifacts.forEach((image, index) => {
    fs.writeFileSync(
        `./out/v1_txt2img_${index}.png`,
        Buffer.from(image.base64, 'base64')
    );
});
