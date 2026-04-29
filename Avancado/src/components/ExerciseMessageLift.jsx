import { useState } from 'react';

const MessageButtons = ({ messages, onSelect }) => {
  return (
    <div className="button-group">
      {messages.map((item, index) => (
        <button
          key={index}
          className="component-btn secondary"
          onClick={() => onSelect(item)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

const ExerciseMessageLift = () => {
  const [selected, setSelected] = useState('Nenhuma mensagem selecionada.');
  const messages = [
    'Bom dia! Hoje vamos criar componentes.',
    'Aprenda props, state e renderização condicional.',
    'Pratique reutilizando componentes e funções.',
  ];

  return (
    <div className="component-card">
      <span className="exercise-badge">Exercício State Lift</span>
      <h2>Selecionar Mensagem</h2>
      <p>{selected}</p>
      <MessageButtons messages={messages} onSelect={setSelected} />
    </div>
  );
};

export default ExerciseMessageLift;
