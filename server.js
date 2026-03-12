const express = require('express');
const app = express();
app.use(express.json());

app.post('/print-order', async (req, res) => {
  try {
    const order = req.body;
    
    console.log('================================');
    console.log('       NY TELEFONORDRE          ');
    console.log('================================');
    console.log(`Tidspunkt : ${new Date().toLocaleString('da-DK')}`);
    console.log(`Navn      : ${order.navn}`);
    console.log(`Telefon   : ${order.telefon}`);
    console.log('--------------------------------');
    console.log('ORDRE:');
    console.log(`${order.ordre}`);
    console.log('--------------------------------');
    console.log(`Type      : ${order.type}`);
    console.log(`Adresse   : ${order.adresse || 'Afhentning'}`);
    console.log('================================');

    res.json({ success: true });
  } catch (err) {
    console.error('Fejl:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server kører på http://localhost:3000'));