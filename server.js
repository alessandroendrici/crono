
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Inizializza il database se non esiste
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

// Rotta per ottenere tutti i log
app.get('/api/logs', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Errore durante la lettura del database' });
  }
});

// Rotta per salvare un nuovo log
app.post('/api/logs', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    const logs = JSON.parse(data);
    const newLog = req.body;
    logs.push(newLog);
    fs.writeFileSync(DB_FILE, JSON.stringify(logs, null, 2));
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: 'Errore durante il salvataggio' });
  }
});

// Rotta per aggiornare un log
app.put('/api/logs/:id', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    let logs = JSON.parse(data);
    const { id } = req.params;
    logs = logs.map(l => l.id === id ? { ...l, ...req.body } : l);
    fs.writeFileSync(DB_FILE, JSON.stringify(logs, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento' });
  }
});

// Rotta per eliminare un log
app.delete('/api/logs/:id', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    let logs = JSON.parse(data);
    const { id } = req.params;
    logs = logs.filter(l => l.id !== id);
    fs.writeFileSync(DB_FILE, JSON.stringify(logs, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Errore durante l\'eliminazione' });
  }
});

app.listen(PORT, () => {
  console.log(`Server Chronos avviato su http://localhost:${PORT}`);
});
