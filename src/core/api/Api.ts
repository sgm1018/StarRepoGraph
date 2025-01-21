import { Entorno } from "../../../Entorno";
import { PoolTokens } from "./PoolTokens";

export class Api{
    private starsHeader: any;
    private normalHeader: any;
    private poolTokens : PoolTokens;
    constructor(){
        this.poolTokens = new PoolTokens();
        this.initHeaders();
    }

    private initHeaders (){
        const token = this.poolTokens.getNextToken();
        if (!Entorno.Token && Entorno.Token === '') {
            this.starsHeader = {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3.star+json' // Encabezado para obtener `starred_at`
            }

            this.normalHeader = {
                'Content-Type': 'application/json',
            }
        }
        else {
            this.starsHeader = {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3.star+json', 
                'Authorization': `token ${token}`
            }
            this.normalHeader = {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            }
        }
    }

    public async fetchUSer(user: string): Promise<any> {
        const url = new URL(`${Entorno.Api}/users/${user}`);

        return fetch(url.toString(), {
            method: 'GET',
            headers: this.normalHeader
        }).then(response => {
            if (!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
            
    }   

    public async fetchStars(user: string, repo: string, path: string,  mode: string, per_page: number, page: number): Promise<any> {
        const url = new URL(`${Entorno.Api}/${path}/${user}/${repo}/${mode}`);
        url.searchParams.append('per_page', per_page.toString());
        url.searchParams.append('page', page.toString());

        return fetch(url.toString(), {
            method: 'GET',
            headers: this.starsHeader
        }).then(response => {
            if (!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
            
    }



}