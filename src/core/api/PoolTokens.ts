import { RedisSingleton } from "../redisConfig";

export class PoolTokens {
    private tokens: string[] = [];
    private currentIndex: number = 0;
    private redisClient;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        const redisInstance = RedisSingleton.getInstance();
        await redisInstance.connect();
        this.redisClient = redisInstance.getClient();
        await this.getTokens();
    }

    //TODO: Obtener los tokens de redis.
    async getTokens() {
        try {
            const tokens = await this.redisClient.lRange('tokens', 0, -1);
            this.tokens = tokens;
        } catch (error) {
            console.error('Error loading tokens from Redis:', error);
            this.tokens = [];
        }
    }

    async addToken(token: string) {
        await this.redisClient.rPush('tokens', token);
    }

    async removeToken(token: string) {
        await this.redisClient.lRem('tokens', 0, token);
    }

    getNextToken(): string | null {
        if (this.tokens.length === 0) {
            return null;
        }
        const token = this.tokens[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.tokens.length; // En caso de que sea mayor al tamaño del array, se reinicia a 0.
        return token;
    }
}