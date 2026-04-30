import { useState } from 'react';

const CondicionalRender = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('Visitante');

  return (
    <div>
      <div className="component-card">
        <span className="exercise-badge">Renderização Condicional</span>

        <h3>Exercício de CondicionalRender</h3>

        {/* Condicional simples */}
        <h3>Status de login:</h3>
        {isLoggedIn && <p>Bem-vindo de volta! Você está logado.</p>}
        {!isLoggedIn && <p>Você não está logado. Por favor, faça login.</p>}

        {/* Operador ternário */}
        <h3>Tipo de usuário:</h3>
        {userType === 'Administrador'
          ? <p>Olá, administrador! Você tem acesso total.</p>
          : <p>Olá, {userType}! Você tem acesso limitado.</p>
        }

        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? 'Deslogar' : 'Logar'}
        </button>
        <button onClick={() => setUserType(prev => prev === 'Visitante' ? 'Administrador' : 'Visitante')}>
          Alternar tipo de usuário
        </button>
      </div>
    </div>
  );
};

export default CondicionalRender;