import { RedisClientSingleton } from "../redisConfig";

export class PoolTokens {
  private tokens: string[] = [];
  private currentIndex: number = 0;
  private redis!: RedisClientSingleton;

  // Constructor privado para usar el patrón `create()`.
  private constructor() {}

  // Método estático para crear una instancia inicializada
  public static async create(): Promise<PoolTokens> {
    const poolTokens = new PoolTokens();
    poolTokens.redis = await RedisClientSingleton.getInstance();
    await poolTokens.getTokens(); // Cargar tokens desde Redis
    return poolTokens;
  }

  // Cargar los tokens desde Redis
  private async getTokens() {
    try {
      this.tokens = await this.redis.lrange("tokens", 0, -1);
    } catch (error) {
      console.error("Error loading tokens from Redis:", error);
      this.tokens = [];
    }
  }

  // Obtener el siguiente token del pool
  public getNextToken(): string | null {
    if (this.tokens.length === 0) {
      return null;
    }
    const token = this.tokens[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.tokens.length;
    return token;
  }

  // Agregar un token al pool
  public async addToken(token: string) {
    this.tokens.push(token);
    await this.redis.lpush("tokens", token);
  }

  // Eliminar un token del pool
  public async removeToken(token: string) {
    this.tokens = this.tokens.filter((t) => t !== token);
    await this.redis.set("tokens", this.tokens.join(","));
  }
}
