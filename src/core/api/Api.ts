import { Entorno } from "../../../Entorno";
import { PoolTokens } from "./PoolTokens";

export class Api {
  private starsHeader: any;
  private normalHeader: any;
  private poolTokens: PoolTokens;

  // Constructor privado para obligar al uso de `Api.create()`.
  private constructor(poolTokens: PoolTokens) {
    this.poolTokens = poolTokens;
    this.initHeaders();
  }

  // Método estático para inicializar la instancia
  public static async create(): Promise<Api> {
    const poolTokens = await PoolTokens.create(); // Inicializamos PoolTokens
    return new Api(poolTokens); // Creamos la instancia de Api
  }

  private initHeaders() {
    const token = this.poolTokens.getNextToken();
    if (!token || token === "") {
      this.starsHeader = {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3.star+json",
      };
      this.normalHeader = {
        "Content-Type": "application/json",
      };
    } else {
      this.starsHeader = {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3.star+json",
        Authorization: `token ${token}`,
      };
      this.normalHeader = {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      };
    }
  }

  public async fetchUSer(user: string, contRecursivo = 1): Promise<any> {
    const url = new URL(`${Entorno.Api}/users/${user}`);

    return fetch(url.toString(), {
      method: "GET",
      headers: this.normalHeader,
    }).then((response) => {
      if (!response.ok) {
        if (response.status == 403) {
          if (contRecursivo > 5) throw new Error(response.statusText);
          this.initHeaders(); // Cambiamos el token
          return this.fetchUSer(user, contRecursivo + 1); // Intentamos de nuevo
        }
      }
      return response.json();
    });
  }

  public async fetchStars(
    user: string,
    repo: string,
    path: string,
    mode: string,
    per_page: number,
    page: number
  ): Promise<any> {
    const url = new URL(`${Entorno.Api}/${path}/${user}/${repo}/${mode}`);
    url.searchParams.append("per_page", per_page.toString());
    url.searchParams.append("page", page.toString());

    return fetch(url.toString(), {
      method: "GET",
      headers: this.starsHeader,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}
