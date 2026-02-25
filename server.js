const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
 
// ↓ SKIFT DISSE TO LINJER UD ↓
const PRINTNODE_API_KEY = process.env.PRINTNODE_API_KEY;
const PRINTER_ID = parseInt(process.env.PRINTER_ID);
 
function formatOrder(order) {
  const tid = new Date().toLocaleString('da-DK');
  return [
    '================================',
    '       NY TELEFONORDRE          ',
    '================================',
    `Tidspunkt : ${tid}`,
    `Navn      : ${order.navn}`,
    `Telefon   : ${order.telefon}`,
    '--------------------------------',
    'ORDRE:',
    `${order.ordre}`,
    '--------------------------------',
    `Type      : ${order.type}`,
    `Adresse   : ${order.adresse || 'Afhentning'}`,
    '================================',
  ].join('\n');
}
 
app.post('/print-order', async (req, res) => {
  try {
    const order = req.body;
    console.log('Modtog ordre:', order);
    const orderText = formatOrder(order);
    const base64 = Buffer.from(orderText).toString('base64');
 
    await axios.post('https://api.printnode.com/printjobs', {
      printer: PRINTER_ID,
      title: 'Pizzaordre',
      contentType: 'raw_base64',
      content: base64,
      source: 'AI Receptionist'
    }, { auth: { username: PRINTNODE_API_KEY, password: '' } });
 
    console.log('Print sendt!');
    res.json({ success: true });
  } catch (err) {
    console.error('Fejl:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
 
app.listen(3000, () => console.log('Server kører på http://localhost:3000'));
