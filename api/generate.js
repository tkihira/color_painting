const engineId = 'stable-diffusion-v1-6';
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
const apiKey = process.env.STABILITY_API_KEY;

const generate = async (text) => {
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
                        text: text + ', white and black, coloring book for kids, simple, adult coloring book, no detail, outline no color, fill frame, edge to edge, clipart white background',
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
        const json = await response.json();
        throw `${json.name}: ${json.message}`;
    }

    const responseJSON = await response.json();

    const image = responseJSON.artifacts[0];
    return Buffer.from(image.base64, 'base64');
};

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const text = JSON.parse(req.body).text?.trim();
            if (text) {
                try {
                    const buffer = await generate(text);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'image/png');
                    res.end(buffer);
                } catch (e) {
                    if (typeof e === "string") {
                        res.status(403).json({ error: e });
                    } else {
                        console.error(e);
                        res.status(500).json({ error: 'Internal Error' });
                    }
                }
                // res.status(200).json({ echoedText: text });
            }
        } catch (e) {
            console.error(e);
            res.status(400).json({ error: 'Invalid format' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};