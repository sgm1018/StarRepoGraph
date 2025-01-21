

export class PoolTokens{
    private tokens: string[];
    private currentIndex: number = 0;

    constructor(){
        this.tokens = [""];
    }

    //TODO: Obtener los tokens de redis.
    getTokens(){
        return this.tokens;
    }

    addToken(token: string) {
        this.tokens.push(token);
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