// src/lib/redis/RedisClient.ts
import { createClient, type RedisClientType } from 'redis';
import { Entorno } from '../../Entorno';

export class RedisClientSingleton {
    private static instance: RedisClientSingleton;
    private client: RedisClientType<any, any>;
    
    // constructor private para usar el patrón `create o getInstance del singleton`.
    private constructor() {
        // Creamos el cliente
        this.client = createClient({
            url: Entorno.RedisUrl
        });

        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    // Método estático para obtener la instancia del singleton usar este en lugar de el constructor.
    public static async getInstance(): Promise<RedisClientSingleton> {
        if (!RedisClientSingleton.instance) {
            const redisClientSingleton = new RedisClientSingleton();
            try {
                await redisClientSingleton.connect();

            } catch (error) {
                console.error('Error connecting to Redis:', error);
            }
            RedisClientSingleton.instance = redisClientSingleton;
        }
        return RedisClientSingleton.instance;
    }

    private async connect(): Promise<void> {
        if (!this.client.isReady) {
            await this.client.connect();
            console.log('Redis conectado correctamente');
        }
    }

    // Almacena un par clave-valor simple en Redis.
    public async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value);
    }
    // Recuperar información simple almacenada como cadena, como configuraciones o tokens.
    public async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }
    // Obtener elementos de una lista, como una cola de mensajes o una lista de eventos, en un rango específico.
    public async lrange(key: string, start: number, end: number): Promise<string[]> {
        return await this.client.lRange(key, start, end);
    }
    // Insertar datos en una lista, por ejemplo, agregar un mensaje o evento a una cola.
    public async lpush(key: string, value: string): Promise<void> {
        await this.client.lPush(key, value);
    }

    // Guardar un objeto con varios atributos (por ejemplo, un perfil de usuario con nombre, apellido y edad)
    public async hSet(hashKey: string, data: Record<string, any>): Promise<void> {
        await this.client.hSet(hashKey, data);
    }

    // Recuperar un objeto con varios atributos (por ejemplo, un perfil de usuario con nombre, apellido y edad)
    public async hGetAll(hashKey: string): Promise<Record<string, string>> {
        return await this.client.hGetAll(hashKey);
    }
    // Eliminar una clave de Redis.
    public async remove(key: string): Promise<void> {
        await this.client.del(key);
    }
}
