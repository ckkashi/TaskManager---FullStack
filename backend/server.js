import "dotenv/config";
import db from "./src/configs/db.js";
import app from "./src/app.js";

const port = process.env.PORT || 5001;

async function runServer(){
    try {
        await db.$connect();
        console.log('Connected to db successfully');

        app.on("error", () => {
            console.log("Something went wrong");
        });

        app.listen(port, () => {
            console.log(`Server running on host: http://localhost:${port}`);
        });

    } catch (error) {
        console.log('Failed to connec with db', error);
        process.exit(1);
    }
}

runServer();