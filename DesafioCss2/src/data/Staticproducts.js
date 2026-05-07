// ============================================================
// PRODUTOS ESTÁTICOS - versão sem API
// ============================================================
// Use este arquivo quando não quiser depender da internet.
// Para adicionar sua imagem, coloque o arquivo em src/assets/
// e importe aqui em cima, por exemplo:
//   import minhaImagem from '../assets/produto1.jpg'
// Depois substitua o campo `image` abaixo.
// ============================================================

// Imagem de placeholder: um retângulo cinza com o nome do produto
// (gerado via URL do serviço picsum.photos - só precisa de internet pra carregar a imagem)
// Se quiser imagem local: image: minhaImagem
const staticProducts = [
  {
    id: 1,
    title: 'Kit Identidade Visual',
    category: 'Branding',
    description:
      'Tudo que sua marca precisa para estrear com força: logo, paleta de cores, tipografia e guia de uso.',
    price: 490.0,
    // Troque por: image: minhaImagem  (depois de importar o arquivo)
    image: 'https://picsum.photos/seed/brand/400/300',
  },
  {
    id: 2,
    title: 'Template de Landing Page',
    category: 'Web Design',
    description:
      'Estrutura profissional de página de vendas, com seções hero, benefícios, depoimentos e CTA.',
    price: 199.0,
    image: 'https://picsum.photos/seed/web/400/300',
  },
  {
    id: 3,
    title: 'Pack de Ícones UI',
    category: 'Assets',
    description:
      'Mais de 300 ícones vetoriais consistentes, prontos para Figma, SVG e React.',
    price: 89.0,
    image: 'https://picsum.photos/seed/icons/400/300',
  },
  {
    id: 4,
    title: 'Design System Starter',
    category: 'Produto Digital',
    description:
      'Componentes base organizados em Figma + código React: botões, inputs, cards e navegação.',
    price: 350.0,
    image: 'https://picsum.photos/seed/design/400/300',
  },
  {
    id: 5,
    title: 'Consultoria UX - 1h',
    category: 'Serviço',
    description:
      'Sessão individual de análise do seu produto com feedback de experiência do usuário e prioridades de melhoria.',
    price: 280.0,
    image: 'https://picsum.photos/seed/ux/400/300',
  },
  {
    id: 6,
    title: 'Motion Pack - Micro-interações',
    category: 'Motion',
    description:
      'Biblioteca de animações CSS e Framer Motion prontas para usar: hover, scroll e transições de página.',
    price: 150.0,
    image: 'https://picsum.photos/seed/motion/400/300',
  },
]

export default staticProducts