export default (req, res) => {
    if (req.method === 'POST') {
        try {
            const text = JSON.parse(req.body).text?.trim();
            if (text) {
                res.status(200).json({ echoedText: text });
            }
        } catch (e) {
            console.log(req.body);
            res.status(400).json({ error: 'Invalid format' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};