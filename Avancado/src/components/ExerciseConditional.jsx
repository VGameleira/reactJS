import { useState } from 'react';

const ExerciseConditional = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="component-card">
      <span className="exercise-badge">Exercício Condicional</span>
      <h2>Login Simples</h2>
      {loggedIn ? (
        <>
          <p>Você está conectado como <strong>Aluno</strong>.</p>
          <p>Agora você pode acessar o conteúdo especial.</p>
        </>
      ) : (
        <>
          <p>Faça login para liberar a área de exercícios.</p>
        </>
      )}

      <button
        className="component-btn"
        onClick={() => setLoggedIn(prev => !prev)}
      >
        {loggedIn ? 'Sair' : 'Entrar'}
      </button>
    </div>
  );
};

export default ExerciseConditional;
