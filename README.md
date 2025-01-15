
# StarRepoGraph

StarRepoGraph is an application designed to provide detailed statistics and historical data for GitHub repositories. It features a modern user interface that allows users to visualize a repository's **Stars** growth over time. Additionally, it offers an embeddable API to integrate these statistics directly into a `README.md` file.

## 🚀 Features

- Fetches historical data and statistics using the GitHub API.
- Displays a repository's **Stars** evolution over time with a sleek and modern UI.
- Provides an API endpoint for embedding the star history directly into other `README.md` files.

## 🛠️ Technologies

StarRepoGraph is built using the following technologies:

- **Frontend and Backend**: [Astro](https://astro.build/)
  - While not commonly used as an API, Astro's SSR (Server-Side Rendering) capabilities make it suitable for both frontend and backend tasks.
- **Database**: [Redis](https://redis.io/) is used for caching results and improving performance.

## 📦 Installation



## 🌐 Usage
``` 
npm install or npm i
```
1. Access the app in your browser.
2. Search for a GitHub repository by its owner and name.
3. View the star growth history and access the embeddable API.

### Embeddable API

Use the following endpoint to fetch star history data for a repository and embed it in your README.md:

```bash
GET /api/repo/:owner/:repo
```

Example:

```bash
GET /api/repo/sgm1018/StarRepoGraph
```

The response will contain a BLOB data with historical star statistics.

## 🤝 Contributing

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy using **StarRepoGraph**!
