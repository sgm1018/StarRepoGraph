import { createClient } from 'redis';

export class RedisSingleton {
    private static instance: RedisSingleton;
    private client;

    private constructor() {
        this.client = createClient({
            url: 'redis://localhost:6379',
        });
        this.client.on('connect', () => console.log('Redis Client Connected'));

        this.client.on('error', (err) => console.error('Redis Client Error', err));
    }

    public static getInstance(): RedisSingleton {
        if (!RedisSingleton.instance) {
            RedisSingleton.instance = new RedisSingleton();
        }
        return RedisSingleton.instance;
    }

    public async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    public getClient() {
        return this.client;
    }
}