const express = require('express');
const app = express();
const contacts = require('./contacts');

app.use(express.json());

app.post('/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  const id = contacts.length + 1;
  contacts.push({ id, name, email, phone });
  res.status(201).json({ message: 'Contact added successfully' });
});

app.get('/contacts', (req, res) => {
  res.json(contacts);
});

app.delete('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex > -1) {
    contacts.splice(contactIndex, 1);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

app.put('/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex > -1) {
    const { name, email, phone } = req.body;

    contacts[contactIndex] = {
      id: id,
      name,
      email,
      phone,
    };
    res.status(200).json({ message: 'Contact edit successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/contacts');
});
