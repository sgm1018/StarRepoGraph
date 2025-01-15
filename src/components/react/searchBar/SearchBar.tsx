import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
  };

  const handleButtonClick = async () => {
    console.log(repoUrl);
    
    if (!repoUrl.trim()) {
      alert('Please enter a valid repository URL');
      return;
    }
      const urlParts = repoUrl.split('/');
      const username = urlParts[urlParts.length - 2];
      const repository = urlParts[urlParts.length - 1];

      const img =fetch(`http://localhost:4321/repo/${username}/${repository}`)
      console.log(img);
      
    // Lógica para manejar el botón
  };

  return (
    <div className="relative flex flex-col sm:flex-row gap-4 pt-10">
      <div className="flex-1 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
        <input
          id="input-field"
          type="text"
          value={repoUrl}
          onChange={handleInputChange}
          placeholder="https://github.com/username/repository"
          className="relative w-full px-6 py-4 bg-background border border-border rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200"
        />
      </div>
      <button
        id="generate-btn"
        className="relative group"
        onClick={handleButtonClick}
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