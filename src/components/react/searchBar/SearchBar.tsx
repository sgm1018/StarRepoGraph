import React, { useState } from 'react';
import { Api } from '../../../core/api/Api';
import { Scrapper } from '../../../core/scrapper/Scrapper';
import { Graph } from '../../../core/graph/Graph';

const SearchBar = () => {
  // Estado para guardar el valor del input
  const [repoUrl, setRepoUrl] = useState('');

  const generateGraph = async (repoUrl: string) => {
    const [user, repoName] = repoUrl.split('/');
    const api = new Api();
    const scrapper = new Scrapper();
    const userData = await scrapper.getSortedStars(user, repoName, 100);
    const starsTimeline = scrapper.generateStarsTimeline(userData);
    const svg = Graph.generateLineChart(userData, starsTimeline);
    const blob = new Blob([svg], { type: 'image/svg+xml' });

    console.log('Graph generated:', blob);
  };

  const handleButtonClick = async () => {
    try {
      if (!repoUrl.trim()) {
        alert('Please enter a valid repository URL');
        return;
      }
      await generateGraph(repoUrl);
    } catch (error) {
      console.error('Error generating the graph:', error);
    }
  };

  const pr = () =>{
    console.log('prueba');
  }
  

  return (
    <div className="relative flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
        <input
          id="input-field"
          type="text"
          value={repoUrl} // Vinculamos el valor del input al estado
          onChange={(e) => setRepoUrl(e.target.value)} // Actualizamos el estado en cada cambio
          placeholder="https://github.com/username/repository"
          className="relative w-full px-6 py-4 bg-background border border-border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200"
        />
      </div>
      <button
        id="generate-btn"
        className="relative group"
        onClick={pr } // Usamos un manejador de clic sincrónico
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
        <span className="relative block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition duration-200">
          Generate
        </span>
      </button>
    </div>
  );
};

export default SearchBar;
