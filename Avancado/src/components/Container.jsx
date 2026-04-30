const Container = ({ children }) => {
  return (
    <div>
      <div className="component-card">
        <span className="exercise-badge">Exercício Children</span>
        <h2>Componente Container</h2>
        <p>Este componente utiliza a prop children para renderizar o conteúdo passado entre as tags do componente.</p>
        <hr />
        <h2>Utilizando Children: Container.jsx</h2>
        {children}
      </div>
    </div>
  )
}

export default Container