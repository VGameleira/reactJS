# Projeto Didático de CSS em React

Este projeto é um exemplo educacional para aprender conceitos de CSS em aplicações React. Ele demonstra diferentes maneiras de aplicar estilos, desde globais até módulos, com interatividade dinâmica.

## Conceitos Demonstrados

### 1. **CSS Global**
- Definido em `src/index.css`
- Aplica-se a toda a aplicação
- Exemplo: Cor vermelha para todos os `<h1>`

### 2. **CSS Local**
- Definido em `src/App.css`
- Sobrescreve estilos globais devido à especificidade
- Exemplo: Cor azul para `<h1>`

### 3. **CSS de Componente**
- Importado diretamente em componentes (ex: `Exemplo.css`)
- Pode vazar para outros componentes se não cuidado
- Exemplo: Cor verde para `<h1>` em componentes específicos

### 4. **CSS Modules**
- Usado em `Exemplo.module.css`
- Gera classes únicas, evitando vazamentos
- Exemplo: Cor rosa com interatividade

### 5. **CSS Inline**
- Aplicado diretamente no atributo `style`
- Alta especificidade, mas difícil de manter

### 6. **CSS Dinâmico**
- Mudanças baseadas em estado do React
- Permite interatividade e responsividade

### 7. **Animações CSS**
- Demonstra keyframes e transições
- Exemplo: Bola saltitante

### 8. **Flexbox Avançado**
- Layout responsivo com Flexbox
- Mudança dinâmica de direção

## Como Usar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`
4. Abra `http://localhost:5173` no navegador
5. Interaja com os botões para ver mudanças dinâmicas

## Interatividade

- **Botão "Mostrar/Ocultar Explicações"**: Revela explicações detalhadas sobre CSS
- **Botão "Alternar Autor"**: Muda estilos dinamicamente baseados em estado
- **Botão no Componente Exemplo**: Ativa/desativa estilos extras
- **Botão no Flexbox**: Alterna entre layout em linha e coluna

Este projeto ajuda a entender como combinar React com CSS de forma eficiente e escalável.
