import 'dotenv/config'; 
import express from "express";
import ConnectDB from './databse/connectDb';
import router from './routes';

async function main() {
    const app = express();
    const PORT = process.env.PORT;


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const db = new ConnectDB();    


    app.use(router);
    app.listen(PORT, async () => {
        console.log(`🚀 Aplicação iniciada na rota: http://127.0.0.1:${PORT}`);
        await db.connection();
    })
}

main().catch((error) => {
    console.error("🥵 Errro!");
    console.log(error);
})