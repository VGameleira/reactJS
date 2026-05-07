// ============================================================
// ServiceCard.jsx - Card de serviço
// ============================================================
// Um componente (dumb component): só exibe dados,
// não tem estado nem lógica. Recebe tudo via props.
// ============================================================

function ServiceCard({ icon, title, description }) {
  return (
    // <article> é semântico: representa um conteúdo independente e reutilizável.
    // fade-up + --delay criam a animação de entrada definida no CSS.
    <article className="service-card fade-up" style={{ '--delay': '0.08s' }}>

      {/* aria-hidden="true" esconde o emoji dos leitores de tela
          (emojis lidos em voz alta ficam estranhos) */}
      <span className="service-icon" aria-hidden="true">{icon}</span>

      <div className="service-body">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

    </article>
  )
}

export default ServiceCard
