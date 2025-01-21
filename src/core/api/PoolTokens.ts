const redisClient = require('./redisConfig');

export class PoolTokens{
    private tokens: string[];
    private currentIndex: number = 0;

    constructor(){
        this.getTokens();
    }

    //TODO: Obtener los tokens de redis.
    async getTokens() {
        try {
            const tokens = await redisClient.lrange('tokens', 0, -1);
            this.tokens = tokens;
        } catch (error) {
            console.error('Error loading tokens from Redis:', error);
            this.tokens = [];
        }
    }

    addToken(token: string) {
        redisClient.rpush('tokens', token);
    }

    removeToken(token: string) {
        redisClient.lrem('tokens', 0, token);
    }

    getNextToken(): string | null {
        if (this.tokens.length === 0) {
            return null;
        }
        const token = this.tokens[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.tokens.length; // En caso de que sea mayor al tamaño del array, se reinicia a 0.
        return this.tokens[this.currentIndex];
    }


}