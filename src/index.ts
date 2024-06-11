import 'dotenv/config'; 
import express from "express";
import router from './routes';
import ConnectDB from './databse/connectDb';

async function main() {
    const app = express();
    const port = 3030;


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const db = new ConnectDB();    

    app.use(router);
    app.listen(port, async () => {
        console.log(`🚀 Aplicação iniciada na rota: http://127.0.0.1:${port}`);
        await db.connection();
    })
}

main().catch((error) => {
    console.error("🥵 Errro!");
    console.log(error);
})