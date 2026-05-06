function ServiceCard({ icon, title, description }) {
  return (
    <article className="service-card fade-up" style={{ '--delay': '0.08s' }}>
      <span className="service-icon" aria-hidden="true">{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}

export default ServiceCard
