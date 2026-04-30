const ExerciseProps = ({ title, author }) => {
  return (
    <div className="component-card">
      <span className="exercise-badge">Exercício Props</span>
      <h2>{title}</h2>
      <p>Autor: <strong>{author}</strong></p>
      <p>Esta component recebe informações pelo props e exibe um texto personalizado.</p>
      
    </div>
  );
};

export default ExerciseProps;
