function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid fade-up" style={{ '--delay': '0.12s' }}>
        <div>
          <p className="footer-title">Lumen Studio</p>
          <p>Uma agência criativa focada em experiências digitais que conectam histórias, produtos e pessoas.</p>
        </div>
        <div>
          <p className="footer-title">Contato</p>
          <p>contato@lumenstudio.com</p>
          <p>+55 11 5555-1234</p>
        </div>
        <div>
          <p className="footer-title">Redes</p>
          <div className="social-links">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Behance</a>
          </div>
        </div>
      </div>
      <p className="footer-note">© 2026 Lumen Studio. Design escalável e interfaces memoráveis.</p>
    </footer>
  )
}

export default Footer
