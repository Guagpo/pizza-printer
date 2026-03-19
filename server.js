const express = require('express');
const app = express();
app.use(express.json());

app.post('/print-order', async (req, res) => {
  try {
    console.log('RAW DATA FRA RETELL:');
    console.log(JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Fejl:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server kører på http://localhost:3000'));