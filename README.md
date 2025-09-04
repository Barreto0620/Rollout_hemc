# 🌅 Rollout HEMC

Um dashboard interativo moderno construído com Next.js para visualização de relatórios analíticos do Power BI, apresentando sistema de temas dinâmicos e efeitos visuais envolventes.

## 🎯 Visão Geral

O Rollout HEMC é uma aplicação web dashboard que serve como centro de controle para visualização de dados empresariais. O projeto oferece uma experiência de usuário única com alternância entre modo diurno e noturno, complete com efeitos visuais dinâmicos como partículas animadas, elementos celestiais (sol/lua), nuvens flutuantes e ondas animadas.

### ✨ Principais Características

- 🌓 **Sistema de Temas Dinâmicos**: Alternância suave entre modo dia/noite com transições de 1 segundo
- 📊 **Integração Power BI**: Incorporação seamless de relatórios analíticos externos
- 🎨 **Efeitos Visuais Interativos**: Partículas animadas, elementos celestiais e ambientações temáticas
- 📱 **Design Responsivo**: Adaptação automática para diferentes tamanhos de tela
- ⚡ **Performance Otimizada**: Construído com Next.js App Router para carregamento rápido
- 🎭 **Componentes Reutilizáveis**: Arquitetura baseada em componentes para manutenibilidade

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 14+ (App Router)
- **Runtime**: React 18+
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Build Tool**: Vite/Webpack (Next.js)

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18.0 ou superior
- npm, yarn ou pnpm

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/rollout-hemc.git
   cd rollout-hemc
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute em modo de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz da aplicação
│   ├── page.tsx           # Dashboard principal
│   └── globals.css        # Estilos globais e Tailwind
├── components/            # Componentes reutilizáveis (se aplicável)
└── types/                # Definições de tipos TypeScript
```

## 🎨 Funcionalidades Detalhadas

### Sistema de Temas

O dashboard apresenta dois modos visuais distintos:

**🌅 Modo Diurno**
- Gradiente de céu claro (sky-200 → sky-100 → blue-50)
- Sol animado com efeito pulsante
- Nuvens flutuantes
- Partículas brancas com animação bounce
- Interface com tons alaranjados

**🌙 Modo Noturno**
- Gradiente noturno (slate-900 → slate-800 → blue-900)
- Lua detalhada com crateras
- Animação de ondas na base
- Partículas azuis com efeito pulse
- Interface com tons de ardósia

### Integração com Power BI

O dashboard incorpora relatórios do Power BI através de iframe responsivo:

- Carregamento seamless de relatórios externos
- Adaptação automática ao tema ativo
- Suporte a tela cheia
- Otimização para diferentes resoluções

### Efeitos Visuais

- **Partículas Animadas**: Sistema gerador de partículas com posicionamento, tamanho e animações aleatórias
- **Transições Suaves**: Todas as mudanças de tema utilizam transições CSS de 1 segundo
- **Elementos Interativos**: Botão toggle com efeitos hover e active
- **Responsividade**: Adaptação de elementos visuais para mobile e desktop

## 🎯 Uso

### Alternância de Tema

Clique no botão circular no canto superior direito para alternar entre os modos:
- **Modo Noturno**: Ícone de sol (clique para ativar modo diurno)
- **Modo Diurno**: Ícone de lua (clique para ativar modo noturno)

### Visualização de Relatórios

O relatório Power BI é carregado automaticamente na área central do dashboard, permitindo:
- Interação completa com gráficos e filtros
- Navegação dentro do relatório
- Exportação de dados (conforme permissões do Power BI)

## 🔧 Personalização

### Configuração do Relatório Power BI

Para alterar o relatório exibido, modifique a URL no componente `iframe` em `src/app/page.tsx`:

```tsx
<iframe
  title="Seu Relatório"
  src="SUA_URL_DO_POWER_BI_AQUI"
  className="relative z-10 w-full h-full border-none"
  frameBorder="0"
  allowFullScreen
/>
```

### Customização de Cores

As cores dos temas podem ser ajustadas nas classes Tailwind em `src/app/page.tsx`:

```tsx
// Cores do modo diurno
'bg-gradient-to-br from-sky-200 via-sky-100 to-blue-50'

// Cores do modo noturno  
'bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900'
```

### Ajuste de Partículas

Modifique a quantidade e comportamento das partículas no `useEffect`:

```tsx
const particleCount = window.innerWidth < 768 ? 20 : 40; // Ajuste aqui
```

## 📈 Performance

- **Otimização Tailwind**: CSS gerado contém apenas classes utilizadas
- **Lazy Loading**: Componentes carregados sob demanda
- **Caching**: Next.js App Router com caching automático
- **Responsive Images**: Elementos SVG otimizados para diferentes resoluções

## 🧪 Testes

```bash
# Executar testes (quando implementados)
npm run test

# Build de produção
npm run build

# Preview do build
npm run start
```

## 📝 Scripts Disponíveis

```json
{
  "dev": "next dev",
  "build": "next build", 
  "start": "next start",
  "lint": "next lint"
}
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📋 Roadmap

- [ ] Implementação de testes automatizados
- [ ] Adição de mais temas visuais
- [ ] Sistema de configuração de usuário
- [ ] Integração com múltiplas fontes de dados
- [ ] PWA (Progressive Web App) support
- [ ] Dashboard de administração

## 🐛 Issues Conhecidas

- Partículas podem impactar performance em dispositivos mais antigos
- Iframe do Power BI pode apresentar delay inicial de carregamento
- Transições CSS podem não funcionar em browsers muito antigos

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/Barreto0620/Rollout_hemc?tab=MIT-1-ov-file) para mais detalhes.

## 👥 Autores

- **Gabriel Barreto** - *Desenvolvedor* - [@seu-usuario](https://github.com/Barreto0620)
- **Nicolas Cruz** - *Desenvolvedor* - [@seu-usuario](https://github.com/Nicodcruz)

## 🙏 Agradecimentos

- Equipe Next.js pelo framework excepcional
- Tailwind CSS pela experiência de desenvolvimento
- Lucide React pelos ícones elegantes
- Microsoft Power BI pela plataforma de analytics
  
