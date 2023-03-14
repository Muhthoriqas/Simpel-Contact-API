const Hapi = require("@hapi/hapi");
const contacts = require("./contacts");

const runServerHapi = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route([
    {
      method: "POST",
      path: "/contacts",
      handler: (request, h) => {
        const { name, email, phone } = request.payload;
        const id = contacts[contacts.length - 1].id + 1;

        const newContact = {
          id,
          name,
          email,
          phone,
        };

        contacts.push(newContact);

        return h.response({ message: "Contact added successfully" }).code(201);
      },
    },
    {
      method: "GET",
      path: "/contacts",
      handler: () => contacts,
    },
    {
      method: "DELETE",
      path: "/contacts/{id}",
      handler: (request, h) => {
        const { id } = request.params;
        const index = contacts.findIndex(
          (contact) => contact.id === Number(id)
        );

        if (index === -1) {
          return h.response({ message: "Contact not found" }).code(404);
        }

        contacts.splice(index, 1);

        return { message: "Contact deleted successfully" };
      },
    },
  ]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

runServerHapi();
