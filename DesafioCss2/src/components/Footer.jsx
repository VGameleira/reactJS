// ============================================================
// Footer.jsx - Rodapé do site
// ============================================================
// Componente estático (sem props, sem estado).
// Mostra informações de contato e links de redes sociais.
// ============================================================

function Footer() {
  return (
    // <footer> é semântico: indica o rodapé da página
    <footer className="site-footer">

      <div className="footer-grid fade-up" style={{ '--delay': '0.12s' }}>

        {/* Coluna 1: Sobre */}
        <div>
          <p className="footer-title">Lumen Studio</p>
          <p>Agência criativa focada em experiências digitais que conectam histórias, produtos e pessoas.</p>
        </div>

        {/* Coluna 2: Contato */}
        <div>
          <p className="footer-title">Contato</p>
          {/* mailto: abre o aplicativo de e-mail ao clicar */}
          <p><a href="mailto:contato@lumenstudio.com">contato@lumenstudio.com</a></p>
          <p>+55 11 5555-1234</p>
        </div>

        {/* Coluna 3: Redes sociais */}
        <div>
          <p className="footer-title">Redes</p>
          <div className="social-links">
            {/* # é um link placeholder - substitua pela URL real */}
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Behance</a>
          </div>
        </div>

      </div>

      {/* Linha de copyright */}
      <p className="footer-note">
        © {new Date().getFullYear()} Lumen Studio. Design escalável e interfaces memoráveis.
        {/* new Date().getFullYear() pega o ano atual automaticamente */}
      </p>

    </footer>
  )
}

export default Footer