const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/print-order', async (req, res) => {
  try {
    console.log('RAW:', JSON.stringify(req.body));

    // SEND VIDERE TIL DIN PHP
    await fetch("http://93.93.205.145:8080/order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Fejl:', err.message);
    res.status(500).json({ success: false });
  }
});

app.listen(3000);
