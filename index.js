const contacts = require("./contacts")



console.log("let`s do a test")


const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const list = await contacts.listContacts();
        console.table(list);
      break;

    case "get":
        const contact = await contacts.getContactById(id);
        console.log(contact);
      break;

     case "add":
        const newContact = await contacts.addContact({ name, email, phone });
        const newList = await contacts.listContacts();
        console.log(newContact);
        console.table(newContact);
        console.table(newList);
       
    break;

    case "remove":
        const removedContact = await contacts.removeContact(id);
        console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);