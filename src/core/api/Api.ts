import { Entorno } from "../../../Entorno";

export class Api{
    private header: any;
    constructor(){
        this.initHeaders();
    }

    private initHeaders (){
        if (!Entorno.Token && Entorno.Token === '') {
            this.header = {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3.star+json' // Encabezado para obtener `starred_at`
            }
        }
        else {
            this.header = {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3.star+json', 
                'Authorization': `token ${Entorno.Token}`
            }
        }
    }

    public async fetchStars(user: string, repo: string, path: string,  mode: string, per_page: number, page: number): Promise<any> {
        const url = new URL(`${Entorno.Api}/${path}/${user}/${repo}/${mode}`);
        url.searchParams.append('per_page', per_page.toString());
        url.searchParams.append('page', page.toString());

        return fetch(url.toString(), {
            method: 'GET',
            headers: this.header
        }).then(response => {
            if (!response.ok){
                throw new Error(response.statusText);
            }
            return response.json();
        })
            
    }






}