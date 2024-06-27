const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const GITHUB_TOKEN = "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";

app.get('/repositories/:owner/:repository/commit/:commitSHA', async (req, res) => {
    const { owner, repository, commitSHA } = req.params;
    try {
        const commitRes = await axios.get(`https://api.github.com/repos/${owner}/${repository}/commits/${commitSHA}`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        });
        const commitData = commitRes.data;

        const diff = commitData.files.map(file => ({
            filename: file.filename,
            oldContent: file.patch ? file.patch.split('\n').filter(line => line.startsWith('-')).join('\n') : '',
            newContent: file.patch ? file.patch.split('\n').filter(line => line.startsWith('+')).join('\n') : '',
        }));

        res.json({ commit: commitData, diff:  diff });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
