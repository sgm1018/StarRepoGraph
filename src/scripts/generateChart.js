// scripts/generateChart.js
document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.getElementById('input-field');
  const generateButton = document.getElementById('generate-btn');

  const executeScript = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const inputValue = inputField.value.trim();
    if (!inputValue) {
      alert('Please enter a valid GitHub repository URL.');
      return;
    }
    console.log(`Generating chart for: ${inputValue}`);
    alert(`Generating chart for: ${inputValue}`);
    // Aquí puedes añadir la lógica para generar el gráfico
  };

  // Ejecutar al hacer clic en el botón
  generateButton.addEventListener('click', executeScript);

  // Ejecutar al presionar Enter en el campo de texto
  inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      executeScript(event);
    }
  });
});
