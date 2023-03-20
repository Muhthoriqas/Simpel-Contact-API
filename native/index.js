const http = require('http');
const { resourceUsage } = require('process');
const contacts = require('./contacts');

const runServerNative = async () => {
  const server = http.createServer(async (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    const { method, url } = request;

    if (url === '/contacts') {
      if (method === 'POST') {
        let body = '';

        request.on('data', (chunk) => {
          body += chunk.toString();
        });

        await new Promise((resolve) => request.on('end', resolve));
        const { name, email, phone } = JSON.parse(body);
        const id = contacts.length + 1;
        contacts.push({ id, name, email, phone });
        response.statusCode = 201;
        return response.end(
          JSON.stringify({ message: 'Contact added successfully' })
        );
      } else if (method === 'GET') {
        return response.end(JSON.stringify(contacts));
      } else {
        response.statusCode = 403;
        return response.end(JSON.stringify({ message: 'Forbidden' }));
      }
    }

    if (url.startsWith('/contacts/')) {
      const id = parseInt(url.split('/')[2]); // 1
      const contactIndex = contacts.findIndex((contact) => contact.id === id);
      if (method === 'DELETE' && contactIndex > -1) {
        contacts.splice(contactIndex, 1);
        response.statusCode = 200;
        return response.end(
          JSON.stringify({ message: 'Contact deleted successfully' })
        );
      } else if (method === 'PUT' && contactIndex > -1) {
        const id = parseInt(request.url.split('/')[2]);
        const contactIndex = contacts.findIndex((contact) => contact.id === id);

        let body = '';
        request.on('data', (chunk) => {
          body += chunk.toString();
        });
        await new Promise((resolve) => request.on('end', resolve));
        const { name, email, phone } = JSON.parse(body);

        contacts[contactIndex] = { id, name, email, phone };
        response.statusCode = 200;
        return response.end(
          JSON.stringify({ message: 'Contact updated successfully' })
        );
      } else {
        response.statusCode = 403;
        return response.end(JSON.stringify({ message: 'Forbidden' }));
      }
    }

    response.statusCode = 404;
    return response.end(JSON.stringify({ message: 'Endpoint not found' }));
  });

  server.listen(3000, 'localhost', () => {
    console.log('Server running on http://localhost:3000/contacts');
  });
};

runServerNative();
