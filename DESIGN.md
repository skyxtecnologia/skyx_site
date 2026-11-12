# Design System & UX Architecture: SkyX Tecnologia
**Versão:** 2.0 (Evolução `motion.dev` + `21st.dev` + Proporção Áurea $\phi = 1.618$)

---

## 1. Filosofia Visual & Atmosfera ("A Essência SkyX")

A identidade visual da **SkyX Tecnologia** nasce do encontro entre a **amplitude atmosférica do céu** (clareza, visão de futuro, horizonte luminoso) e a **profundidade tecnológica do espaço digital** (imersão VR 360º, engenharia de software, perícia 3D e inteligência de dados).

* **Regra de Ouro:** Aprimorar a sofisticação, a fluidez e a interatividade **sem jamais descaracterizar a marca**. Mantemos o DNA azul-petróleo/cerúleo profundo, o ciano luminoso, a tipografia display `Zen Dots` e o ritmo de alternância entre seções **Light Editorial (Alabaster/White)** e **Dark Immersive (Abyssal Obsidian)**.
* **Referências de Engenharia de Interface:**
  1. **Hobbes (Ref 1):** Transição contínua do horizonte para o dark mode, *Scroll-Driven Text Reveal* (manifesto que acende durante o scroll) e *Interactive Feature Tabs* com barra de progresso e vitrine glassmórfica.
  2. **Mindly (Ref 2):** Composição limpa de Hero sobre céu em movimento, *Floating Glass Spotlight Card*, botões duplos em pílula e barra inferior de navegação rápida com indicador numérico (`01 ─── 04`).
  3. **Cloud Golf (Ref 3):** Atmosfera azul-profundo volumétrica, *Vertical Section Indicator Pill* na lateral direita (`01`, `02`, `03`...) e *Unified Glassmorphic Stats Dock* para métricas de impacto.
  4. **The Green Power (Ref 4):** Nas seções claras (`Sobre` e `Soluções`), composição assimétrica com *Floating Overlapping Metric Cards* sobre imagem emoldurada e *Notched Media Cards* (cards com recorte curvo no canto inferior direito abrigando um botão circular `↗`).

---

## 2. Paleta Semântica de Cores & Papéis Funcionais

| Nome Descritivo | Token / Hex | Papel Funcional no Sistema |
| :--- | :--- | :--- |
| **Abyssal Tech Dark** | `#010D13` / `#050505` | Fundo principal das seções imersivas (`Capsule`, `Cases`, `Footer`) e superfície base de cards escuros. |
| **Deep Cerulean Navy** | `#013149` / `#014263` | Cor institucional primária da SkyX. Usada em títulos sobre fundo claro, gradientes de botões e bordas estruturais. |
| **Luminous Sky Cyan** | `#67A7D5` / `#00D9FF` | Acento interativo, indicadores ativos, brilho radial (*spotlight*), badges técnicas e destaques tipográficos. |
| **Cloud Alabaster** | `#FFFFFF` / `#F8FAFC` | Fundo das seções editoriais claras (`Sobre`, `Parceiros`, `Soluções`, `Notícias`), garantindo respiro visual e alto contraste. |
| **Soft Ice Tint** | `#F0F6FF` / `#E0F2FE` | Superfície de badges, cards flutuantes claros e estados de hover sutis em seções claras. |
| **Slate Editorial** | `#334155` / `#64748B` | Texto corrido e subtítulos sobre fundo claro (contraste WCAG AA/AAA). |
| **Mist Silver** | `#CBD5E1` / `#94A3B8` | Texto corrido e descrições secundárias sobre fundo escuro. |

---

## 3. Sistema Tipográfico em Proporção Áurea ($\phi = 1.618$)

* **Display & Títulos de Seção (`--font-zen-dots`):**
  * Preserva a assinatura futurista da SkyX.
  * **Restrição técnica:** Peso fixo `400` (nunca aplicar `font-bold` para evitar *faux-bold* deformado) e nunca usar em parágrafos ou títulos longos de cards de notícia.
* **Interface, Subtítulos e Títulos de Cards (`--font-poppins` & `--font-roboto`):**
  * Alta legibilidade em múltiplas linhas, pesos `300` (Light), `400` (Regular), `500` (Medium) e `600` (SemiBold).

| Nível | Escala Áurea | Valor CSS (`clamp`) | Aplicação |
| :--- | :--- | :--- | :--- |
| **Display Hero (`H1`)** | $\phi^2 \times 1.272$ | `clamp(2rem, 4.5vw, 3.5rem)` (`32px–56px`) | Headline principal do Hero (`line-height: 1.15`). |
| **Section Title (`H2`)** | $\phi^2$ | `clamp(1.618rem, 3.5vw, 2.618rem)` (`26px–42px`) | Títulos principais de todas as seções (`line-height: 1.2`). |
| **Card / Feature Title (`H3`)** | $\phi$ | `clamp(1.125rem, 2vw, 1.5rem)` (`18px–24px`) | Títulos de cards de soluções, notícias e cases (`Poppins`/`Roboto` `600`). |
| **Lead / Subtitle** | $\sqrt{\phi}$ | `clamp(1rem, 1.6vw, 1.25rem)` (`16px–20px`) | Subtítulos de seções e chamadas introdutórias (`line-height: 1.618`). |
| **Body Copy** | $1.0$ | `1rem` (`16px`) | Parágrafos padrão (`line-height: 1.618`). |
| **Eyebrow Pill Badge** | $1 / \phi$ | `0.75rem` (`12px`) | Pílulas de categoria acima dos títulos (`tracking-[0.18em] uppercase`). |

---

## 4. Biblioteca de Componentes & Primitivos (`21st.dev` + `motion.dev`)

### 4.1. `EyebrowBadge` (Padrão todas as 4 referências)
* Formato pílula (`rounded-full px-4 py-1.5`), acompanhado de um ponto luminoso pulsante (`w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse`).
* Versão Dark: `bg-white/5 border border-white/15 text-[#67a7d5] backdrop-blur-md`.
* Versão Light: `bg-[#014263]/5 border border-[#014263]/15 text-[#014263]`.

### 4.2. `SpotlightCard` (Padrão `21st.dev`)
* Container com `rounded-3xl` que rastreia o cursor via `useMotionValue` e projeta um brilho radial suave (`radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(103,167,213,0.18), transparent 40%)`) na borda e no fundo.

### 4.3. `NotchedSolutionCard` (Padrão Ref 4 — *The Green Power*)
* Card de solução/case com imagem imersiva, overlay em gradiente escuro-cerúleo na base e **recorte curvo no canto inferior direito** (*inverted border-radius notch*) abrigando um botão circular de ação (`w-12 h-12 rounded-full`) com seta `↗` que rotaciona `45deg` no hover.

### 4.4. `InteractiveFeatureTabs` (Padrão Ref 1 — *Hobbes*)
* Layout dividido para a **Cápsula Imersiva**:
  * Coluna de controle: Lista de aplicações (`Educação`, `Imersão Empresarial`, `Eventos & Feiras`, `Segurança & Perícia`) onde o item ativo expande sua descrição e exibe uma barra de progresso contínua (`motion.div`).
  * Coluna de vitrine: Painel glassmórfico com cantoneiras HUD que transiciona suavemente (`AnimatePresence`) a visualização/especificação correspondente à aba ativa.

### 4.5. `GlassStatsDock` (Padrão Ref 3 — *Cloud Golf*)
* Barra unificada flutuante (`rounded-3xl backdrop-blur-xl bg-gradient-to-r from-[#010D13]/95 via-[#012538]/95 to-[#010D13]/95 border border-[#67a7d5]/25`) exibindo os indicadores de impacto lado a lado com ícones circulares iluminados e divisores verticais sutis (`divide-y md:divide-y-0 md:divide-x divide-white/10`).

### 4.6. `SectionIndicatorNav` (Padrão Ref 3 — *Cloud Golf*)
* Navegador lateral fixo à direita (`hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40`), em formato de pílula vertical glassmórfica (`rounded-full py-3 px-2 bg-[#010D13]/60 backdrop-blur-xl border border-white/15`), indicando a seção ativa (`01` a `07`) com tooltip no hover e clique para rolagem suave.

---

## 5. Diretrizes de Motion & Coreografia (`motion.dev`)

1. **Curva de Easing Padrão:** `cubic-bezier(0.22, 1, 0.36, 1)` (entrada rápida e desaceleração sedosa).
2. **Estabilidade de Viewport:** Sempre `viewport={{ once: true, amount: 0.2 }}` para entradas de bloco (nenhum elemento deve piscar ou sumir ao rolar de volta).
3. **Scroll-Linked Animations (`useScroll` + `useTransform`):**
   * *Hero Parallax:* Deslocamento suave do texto e opacidade progressiva até `550px`.
   * *Scroll Text Reveal:* No manifesto da seção `Sobre`, opacidade progressiva por frase conforme o scroll avança.
4. **Micro-interações de Botões:** Botões principais em pílula/rounded-xl incluem um círculo interno para a seta `→` que desliza `translate-x-1` no hover.

