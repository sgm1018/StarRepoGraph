import { Api } from "../api/Api";
import type { UserData } from "../interfaces/UserData";

export class Scrapper {
    private api: Api;

    constructor(){
        this.api = new Api();

    }


    public async getSortedStars(user: string, repo: string, per_page = 100): Promise<UserData> {
        let page = 1;
        let hasMore = true;
        const userData: UserData ={
            User: [],
            RepoStars: []
        }
        userData.User = await this.api.fetchUSer(user);
        
      
        while (hasMore) {
          const stars = await this.api.fetchStars(user, repo, 'repos', 'stargazers', per_page, page);
          userData.RepoStars.push(...stars);
    
          hasMore = stars.length === per_page;
          page++;
        }
      
        userData.RepoStars.sort((a, b) => new Date(a.starred_at).getTime() - new Date(b.starred_at).getTime());
        return userData;
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


      public generateStarsTimeline(userData: UserData): { [key: string]: number } {
          const groupedByDate = this.groupByDate(userData.RepoStars);
          const timeline: { [key: string]: number } = {};
          let cumulativeStars = 0;

          Object.keys(groupedByDate).sort().forEach(date => {
              cumulativeStars += groupedByDate[date];
              timeline[date] = cumulativeStars;
          });

          return timeline;
      }

}