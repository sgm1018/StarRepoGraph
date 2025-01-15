import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [graphBlob, setGraphBlob] = useState<Blob | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
  };

  const handleButtonClick = async () => {
    console.log(repoUrl);

    if (!repoUrl.trim()) {
      alert("Please enter a valid repository URL");
      return;
    }
    const urlParts = repoUrl.split("/");
    const username = urlParts[urlParts.length - 2];
    const repository = urlParts[urlParts.length - 1];

    try {
      const response = await fetch(`http://localhost:4321/repo/${username}/${repository}`);
      if (response.ok) {
        const blob = await response.blob();
        setGraphBlob(blob);
      }
    } catch (error) {

    }

    // Lógica para manejar el botón
  };

  return (
    <div className="flex flex-col gap-4 pt-10">
      <div className="flex flex-row gap-4">
      <div className="relative flex-1 group">
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
      <div className="flex group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
        <button
        id="generate-btn"
        className="relative group"
        onClick={handleButtonClick}
        >
        <span className="relative block px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition duration-200">
          Generate
        </span>
        </button>
      </div>
      </div>

      {graphBlob && (
        <img src={URL.createObjectURL(graphBlob)} alt="Graph" />
      )}
    </div>
  );
};

export default SearchBar;
