import { Entorno } from "../../../Entorno";

export class Api{
    private header: any;
    constructor(){
        this.initHeaders();
    }

    private initHeaders (){
        if (!Entorno.token && Entorno.token === '') {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3.star+json' // Encabezado para obtener `starred_at`
            }
        }
        else {
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3.star+json', 
                'Authorization': `token ${Entorno.token}`
            }
        }
    }

    public async fetchStars(user: string, repo: string, mode: string, per_page: number, page: number): Promise<any> {
        const url = new URL(`${Entorno.api}/${user}/${repo}/${mode}`);
        url.searchParams.append('per_page', per_page.toString());
        url.searchParams.append('page', page.toString());

        return fetch(url.toString(), {
            method: 'GET',
            headers: this.header
        }).then(response => {
            if (!response.ok){
                throw new Error(response.statusText);
            }
            response.json();
        })
            
    }






}