
const faker = require('faker')



faker.locale = 'pt_BR';
    const clients = []

for (let index = 0; index < 10; index++) {

    const randomName = faker.name.findName();   // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz


    client = {
        randomName,
        randomEmail,

    }

    clients.push(client);
}

console.log(clients)