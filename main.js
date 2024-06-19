const readline = require("readline");
const { registerUser } = require("./Components/Functions/register");
const { loginUser } = require("./Components/Functions/login");
const { initializeDB } = require("./Components/Utils/db_init")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    rl.question("Choose an option:\n[1] Register a new user\n[2] Login\n[3] Exit\n", (choice) => {
        handleChoice(choice);
    })
}

function handleChoice(choice) {
    switch (choice) {
        case "1":
            rl.question("Enter username: ", (username) => {
                rl.question("Enter password: ", async (password) => {
                    await registerUser(username, password);
                    showMenu();
                });
            });
            break;
        case "2":
            rl.question("Enter username: ", (username) => {
                rl.question("Enter password: ", async (password) => {
                    await loginUser(username, password);
                    showMenu();
                });
            });
            break;
        case "3":
            rl.close();
            break;
        default:
            console.log("Invalid choice. Please try again.");
            main();
    };
}

async function main() {
    const dbInitialized = await initializeDB();
    if(!dbInitialized) {
        console.log("Database initialization failed. Exiting...");
        process.exit(1);
    }

    showMenu();
}


main();