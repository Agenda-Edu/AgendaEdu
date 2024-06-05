import express from "express";
import cors from "cors"
import router from './routes';
import ConnectDB from './databse/connectDb';


async function main() {
    const app = express();
    const port = 3030;

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const db = new ConnectDB();    

    app.use(router);
    app.listen(port, async () => {
        console.log(`🚀 Aplicação iniciada na porta: http://127.0.0.1:${port}`);
        await db.connection();
    })
}

main().catch((error) => {
    console.error("🥵 Errro!");
    console.log(error);
})