import { Api } from "../api/Api";

export class Scrapper {
    private api: Api;

    constructor(){
        this.api = new Api();

    }


    public async getSortedStars(user: string, repo: string, per_page = 100): Promise<any[]> {
        let page = 1;
        let hasMore = true;
        const allStars: any[] = [];
      
        while (hasMore) {
          const stars = await this.api.fetchStars(user, repo, 'repos', 'stargazers', per_page, page);
          allStars.push(...stars);
    
          hasMore = stars.length === per_page;
          page++;
        }
      
        allStars.sort((a, b) => new Date(a.starred_at).getTime() - new Date(b.starred_at).getTime());
        return allStars;
      }

      public groupByDate(stars: any[]): any {
        return stars.reduce((acc, star) => {
          const date = new Date(star.starred_at).toISOString().split('T')[0];
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date]++;
          return acc;
        }, {});
      }
      
}