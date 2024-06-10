
import { prisma } from './db';
class ConnectDB {

    async connection() {

        try {
            await prisma.$connect();
            console.log("😄 Conectado ao banco de dados");
        } catch (error) {
            console.log(error);
            console.log("😕 Erro ao conectar ao banco de dados");
        }
    }
}
export default ConnectDB