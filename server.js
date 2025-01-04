const express = require('express');
const { exec } = require('child_process');  // To run Python script
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Route to trigger scraping
app.post('/scrape', (req, res) => {
    // Extract URL from the request body
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Run Python script to scrape data
    exec(`python3 scrape.py "${url}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Error during scraping' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error during scraping' });
        }

        // Send the scraped data back to the client
        try {
            const data = JSON.parse(stdout);  // Parse the Python output (JSON format)
            return res.json(data);  // Send back the scraped data
        } catch (parseError) {
            return res.status(500).json({ error: 'Error parsing the scraped data' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
