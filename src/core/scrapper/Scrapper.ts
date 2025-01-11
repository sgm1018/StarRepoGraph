import { Api } from "../api/api";

export class Scrapper {
    private api: Api;

    constructor(){
        this.api = new Api();

    }


    public async getSortedStars(user: string, repo: string, per_page = 30): Promise<any[]> {
        let page = 1;
        let hasMore = true;
        const allStars: any[] = [];
      
        while (hasMore) {
          const stars = await this.api.fetchStars(user, repo, 'stargazers', per_page, page);
          allStars.push(...stars);
    
          hasMore = stars.length === per_page;
          page++;
        }
      
        allStars.sort((a, b) => new Date(a.starred_at).getTime() - new Date(b.starred_at).getTime());
        return allStars;
      }
      
}