const axios = require('axios');

app.post('/print-order', async (req, res) => {
  try {
    console.log('RAW:', JSON.stringify(req.body));

    await axios.post('http://93.93.205.145:8080/order.php', req.body);

    res.json({ success: true });
  } catch (err) {
    console.error('Fejl:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
