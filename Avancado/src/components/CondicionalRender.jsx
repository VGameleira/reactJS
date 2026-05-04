// Importando useState hook
import { useState } from 'react';

// Componente funcional CondicionalRender
const CondicionalRender = () => {
  // Estado para login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para tipo de usuário
  const [userType, setUserType] = useState('Visitante');

  return (
    <div>
      <div className="component-card">
        {/* Badge para o exercício */}
        <span className="exercise-badge">Renderização Condicional</span>

        <h3>Exercício de CondicionalRender</h3>

        {/* Condicional simples usando && (short-circuit) */}
        <h3>Status de login:</h3>
        {isLoggedIn && <p>Bem-vindo de volta! Você está logado.</p>}
        {!isLoggedIn && <p>Você não está logado. Por favor, faça login.</p>}

        {/* Operador ternário para renderização condicional */}
        <h3>Tipo de usuário:</h3>
        {userType === 'Administrador'
          ? <p>Olá, administrador! Você tem acesso total.</p>
          : <p>Olá, {userType}! Você tem acesso limitado.</p>
        }

        {/* Botão para alternar login */}
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? 'Deslogar' : 'Logar'}
        </button>
        {/* Botão para alternar tipo de usuário */}
        <button onClick={() => setUserType(prev => prev === 'Visitante' ? 'Administrador' : 'Visitante')}>
          Alternar tipo de usuário
        </button>
      </div>
    </div>
  );
};

// Export default
export default CondicionalRender;