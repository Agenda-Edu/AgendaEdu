import 'dotenv/config'; 
import 'reflect-metadata'; 
import express from "express";
import ConnectDB from './databse/ConnectDb';
import app from './routes';

async function main() {
    const server = express();
    const PORT = process.env.PORT;

    server.use(express.json());
    server.use(app);
    //server.use(express.urlencoded({ extended: true }));

    const db = new ConnectDB();    

    server.listen(PORT, async () => {
        console.log(`🚀 Aplicação iniciada na rota: http://127.0.0.1:${PORT}`);
        await db.connection();
    })
}

main().catch((error) => {
    console.error("🥵 Errro!");
    console.log(error);
})