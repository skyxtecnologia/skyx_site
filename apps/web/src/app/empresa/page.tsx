'use client';

import { SiteFooter, SiteHeader } from '@/components/layout';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const translations = {
  PT: {
    heroTitle: 'Engenharia, Imersão e Inteligência que',
    heroTitleHighlight: 'Moldam o Futuro',
    heroDesc:
      'A SkyX Tecnologia nasceu com o propósito de unir engenharia de software de ponta, realidade virtual 360º, robótica e inteligência de dados para resolver desafios reais na educação, nas empresas e na sociedade.',
    navPills: [
      { label: 'Nossa História', href: '#historia' },
      { label: 'Liderança & CEO', href: '#lideranca' },
      { label: 'Missão & Valores', href: '#missao' },
      { label: 'Metas & Impacto Social', href: '#metas' },
    ],
    historyTitle: 'Nossa História & Trajetória',
    historyIntro:
      'Desde sua fundação, a SkyX evolui continuamente, expandindo fronteiras tecnológicas e consolidando parcerias estratégicas em setores de alto impacto.',
    timeline: [
      {
        phase: 'Fundação & Propósito',
        period: 'Gênese SkyX',
        title: 'O nascimento de uma visão tecnológica',
        desc: 'Idealizada para preencher a lacuna entre a inovação acadêmica/experimental e a aplicação prática no mercado brasileiro, unindo desenvolvimento de software sob medida e experiências imersivas.',
      },
      {
        phase: 'Imersão & Hardware',
        period: 'Consolidação VR',
        title: 'A criação da Cápsula Imersiva e integração robótica',
        desc: 'Desenvolvimento da Cápsula Imersiva SkyX, alcançando a marca de +65 Mil Pessoas Imersas em nossa tecnologia em treinamentos, simulações educacionais e ativações memoráveis.',
      },
      {
        phase: 'Soluções Críticas & Escala',
        period: 'Expansão Multi-Setorial',
        title: 'Engenharia de software, perícia 3D e inteligência',
        desc: 'Ampliação do portfólio para soluções de segurança pública, modelagem tridimensional forense, sistemas corporativos de alta disponibilidade e automação inteligente.',
      },
    ],
    ceoTitle: 'Visão Executiva & Liderança',
    ceoRole: 'Fundação, Estratégia & Inovação Tecnológica',
    ceoName: 'Diretoria Executiva SkyX',
    ceoQuote:
      '“Não construímos tecnologia apenas para acompanhar tendências. Criamos ferramentas e ambientes imersivos capazes de expandir o potencial humano, proteger vidas e acelerar a evolução de instituições.”',
    ceoBio1:
      'A liderança da SkyX Tecnologia atua na convergência entre engenharia de software de missão crítica, modelagem e simulação 3D e imersão em realidade virtual, transformando demandas complexas em sistemas de alta confiabilidade.',
    ceoBio2:
      'Guiada pelo compromisso com resultados reais para empresas, instituições de ensino e órgãos de segurança pública, nossa direção técnica conduz cada projeto com rigor arquitetural, ética e foco no impacto humano.',
    ceoHighlights: [
      'Engenharia de Missão Crítica',
      'Simulação 3D & Realidade Virtual',
      'Educação, Empresas & Segurança Pública',
    ],
    mvvTitle: 'Missão, Visão e Valores',
    missionLabel: 'Nossa Missão',
    missionText:
      'Desenvolver soluções tecnológicas, sistemas inteligentes e experiências imersivas sob medida com excelência técnica, potencializando o aprendizado, a eficiência operacional e a segurança da sociedade.',
    visionLabel: 'Nossa Visão',
    visionText:
      'Consolidar-se como referência nacional e latino-americana em inovação aplicada, realidade imersiva e engenharia de software de alto impacto.',
    valuesTitle: 'Pilares e Valores Inegociáveis',
    values: [
      {
        title: 'Inovação',
        desc: 'Buscamos constantemente novas ideias, arquiteturas e tecnologias para criar soluções que vão além do convencional.',
      },
      {
        title: 'Parceria',
        desc: 'Trabalhamos lado a lado com nossos clientes, compreendendo cada detalhe da operação para entregar soluções sob medida.',
      },
      {
        title: 'Eficiência',
        desc: 'Desenvolvemos projetos inteligentes com foco em alta performance, estabilidade técnica e retorno real.',
      },
      {
        title: 'Versatilidade',
        desc: 'Atuamos de forma multidisciplinar — do software web à simulação 3D e robótica — adaptando soluções a qualquer desafio.',
      },
      {
        title: 'Transparência',
        desc: 'Relações pautadas na ética, clareza de processos, segurança da informação e compromisso com entregas sólidas.',
      },
    ],
    goalsTitle: 'Nossas Metas & Impacto Social',
    goalsSubtitle:
      'Acreditamos que o verdadeiro valor da tecnologia está em como ela melhora a vida das pessoas, democratiza o conhecimento e constrói cidades mais seguras e inteligentes.',
    goals: [
      {
        category: 'EDUCAÇÃO & ACESSIBILIDADE',
        title: 'Democratizar o Aprendizado Imersivo',
        desc: 'Expandir o acesso de escolas, universidades e centros técnicos a laboratórios virtuais e robótica educacional, preparando a próxima geração de talentos.',
      },
      {
        category: 'SEGURANÇA & CIDADANIA',
        title: 'Tecnologia a Favor da Vida e da Justiça',
        desc: 'Aprimorar ferramentas de investigação, perícia 3D e simulação tática para apoiar forças de segurança e órgãos públicos com precisão científica.',
      },
      {
        category: 'ECOSSISTEMA PRODUTIVO',
        title: 'Transformação Digital Sustentável',
        desc: 'Impulsionar empresas brasileiras com engenharia de software escalável, automação e gêmeos digitais que reduzem desperdícios e elevam a competitividade.',
      },
    ],
    ctaBoxTitle: 'Construa o Próximo Capítulo Conosco',
    ctaBoxDesc:
      'Quer estabelecer uma parceria institucional, conhecer nossos projetos de perto ou desenvolver uma solução exclusiva com a SkyX?',
    ctaButton: 'Falar com a Equipe SkyX',
    ctaCases: 'Conhecer Nossos Cases',
  },
  EN: {
    heroTitle: 'Engineering, Immersion and Intelligence that',
    heroTitleHighlight: 'Shape the Future',
    heroDesc:
      'SkyX Technology was born with the purpose of uniting cutting-edge software engineering, 360º virtual reality, robotics, and data intelligence to solve real-world challenges in education, business, and society.',
    navPills: [
      { label: 'Our History', href: '#historia' },
      { label: 'Leadership & CEO', href: '#lideranca' },
      { label: 'Mission & Values', href: '#missao' },
      { label: 'Goals & Social Impact', href: '#metas' },
    ],
    historyTitle: 'Our History & Trajectory',
    historyIntro:
      'Since its foundation, SkyX has continuously evolved, expanding technological boundaries and consolidating strategic partnerships across high-impact sectors.',
    timeline: [
      {
        phase: 'Foundation & Purpose',
        period: 'SkyX Genesis',
        title: 'The birth of a technological vision',
        desc: 'Conceived to bridge the gap between experimental innovation and practical market execution, uniting custom software engineering with immersive experiences.',
      },
      {
        phase: 'Immersion & Hardware',
        period: 'VR Consolidation',
        title: 'Creation of the Immersive Capsule and robotic integration',
        desc: 'Development of the SkyX Immersive Capsule, reaching +65,000 People Immersed in our technology across hyper-realistic training, educational simulations, and memorable brand activations.',
      },
      {
        phase: 'Critical Solutions & Scale',
        period: 'Multi-Sector Expansion',
        title: 'Software engineering, 3D forensics, and intelligence',
        desc: 'Portfolio expansion into public security solutions, forensic 3D modeling, high-availability enterprise systems, and intelligent automation.',
      },
    ],
    ceoTitle: 'Executive Vision & Leadership',
    ceoRole: 'Foundation, Strategy & Technological Innovation',
    ceoName: 'SkyX Executive Board',
    ceoQuote:
      '“We do not build technology merely to follow trends. We create tools and immersive environments capable of expanding human potential, protecting lives, and accelerating institutional evolution.”',
    ceoBio1:
      'SkyX Technology’s leadership operates at the convergence of mission-critical software engineering, 3D modeling and simulation, and virtual reality immersion, turning complex demands into high-reliability systems.',
    ceoBio2:
      'Guided by a commitment to tangible results for enterprises, educational institutions, and public security agencies, our executive direction leads every project with architectural rigor, ethics, and human impact.',
    ceoHighlights: [
      'Mission-Critical Engineering',
      '3D Simulation & Virtual Reality',
      'Education, Enterprise & Public Security',
    ],
    mvvTitle: 'Mission, Vision & Values',
    missionLabel: 'Our Mission',
    missionText:
      'To develop custom technological solutions, intelligent systems, and immersive experiences with technical excellence, empowering learning, operational efficiency, and societal safety.',
    visionLabel: 'Our Vision',
    visionText:
      'To consolidate ourselves as a national and Latin American benchmark in applied innovation, immersive reality, and high-impact software engineering.',
    valuesTitle: 'Core Pillars & Non-Negotiable Values',
    values: [
      {
        title: 'Innovation',
        desc: 'We constantly seek new ideas, architectures, and technologies to create solutions that go beyond the conventional.',
      },
      {
        title: 'Partnership',
        desc: 'We work side by side with our clients, understanding every operational detail to deliver tailor-made solutions.',
      },
      {
        title: 'Efficiency',
        desc: 'We develop smart projects focused on high performance, technical stability, and real ROI.',
      },
      {
        title: 'Versatility',
        desc: 'We operate multidisciplinarily — from web software to 3D simulation and robotics — adapting solutions to any challenge.',
      },
      {
        title: 'Transparency',
        desc: 'Relationships built on ethics, process clarity, information security, and commitment to solid deliveries.',
      },
    ],
    goalsTitle: 'Our Goals & Social Impact',
    goalsSubtitle:
      'We believe the true value of technology lies in how it improves human lives, democratizes knowledge, and builds safer, smarter cities.',
    goals: [
      {
        category: 'EDUCATION & ACCESSIBILITY',
        title: 'Democratizing Immersive Learning',
        desc: 'Expanding access for schools, universities, and technical centers to virtual labs and educational robotics, preparing the next generation of talent.',
      },
      {
        category: 'SECURITY & CITIZENSHIP',
        title: 'Technology for Life and Justice',
        desc: 'Enhancing investigation tools, 3D forensics, and tactical simulation to support security forces and public agencies with scientific precision.',
      },
      {
        category: 'PRODUCTIVE ECOSYSTEM',
        title: 'Sustainable Digital Transformation',
        desc: 'Empowering businesses with scalable software engineering, automation, and digital twins that reduce waste and boost competitiveness.',
      },
    ],
    ctaBoxTitle: 'Build the Next Chapter With Us',
    ctaBoxDesc:
      'Want to establish an institutional partnership, explore our projects up close, or develop an exclusive solution with SkyX?',
    ctaButton: 'Talk to the SkyX Team',
    ctaCases: 'Explore Our Cases',
  },
  ES: {
    heroTitle: 'Ingeniería, Inmersión e Inteligencia que',
    heroTitleHighlight: 'Moldean el Futuro',
    heroDesc:
      'SkyX Tecnología nació con el propósito de unir ingeniería de software de vanguardia, realidad virtual 360º, robótica e inteligencia de datos para resolver desafíos reales en la educación, las empresas y la sociedad.',
    navPills: [
      { label: 'Nuestra Historia', href: '#historia' },
      { label: 'Liderazgo y CEO', href: '#lideranca' },
      { label: 'Misión y Valores', href: '#missao' },
      { label: 'Metas e Impacto Social', href: '#metas' },
    ],
    historyTitle: 'Nuestra Historia y Evolución',
    historyIntro:
      'Desde su fundación, SkyX evoluciona continuamente, expandiendo fronteras tecnológicas y consolidando alianzas estratégicas en sectores de alto impacto.',
    timeline: [
      {
        phase: 'Fundación y Propósito',
        period: 'Génesis SkyX',
        title: 'El nacimiento de una visión tecnológica',
        desc: 'Ideada para cerrar la brecha entre la innovación experimental y la aplicación práctica en el mercado, uniendo desarrollo de software a medida y experiencias inmersivas.',
      },
      {
        phase: 'Inmersión y Hardware',
        period: 'Consolidación VR',
        title: 'La creación de la Cápsula Inmersiva e integración robótica',
        desc: 'Desarrollo de la Cápsula Inmersiva SkyX, alcanzando +65 Mil Personas Inmersas en nuestra tecnología en entrenamientos, simulaciones educativas y activaciones memorables.',
      },
      {
        phase: 'Soluciones Críticas y Escala',
        period: 'Expansión Multisectorial',
        title: 'Ingeniería de software, peritaje 3D e inteligencia',
        desc: 'Ampliación del portafolio hacia soluciones de seguridad pública, modelado tridimensional forense, sistemas corporativos de alta disponibilidad y automatización inteligente.',
      },
    ],
    ceoTitle: 'Visión Ejecutiva y Liderazgo',
    ceoRole: 'Fundación, Estrategia e Innovación Tecnológica',
    ceoName: 'Dirección Ejecutiva SkyX',
    ceoQuote:
      '“No construimos tecnología solo para seguir tendencias. Creamos herramientas y entornos inmersivos capaces de expandir el potencial humano, proteger vidas y acelerar la evolución de las instituciones.”',
    ceoBio1:
      'El liderazgo de SkyX Tecnología actúa en la convergencia entre la ingeniería de software de misión crítica, el modelado y simulación 3D y la inmersión en realidad virtual, transformando demandas complejas en sistemas de alta confiabilidad.',
    ceoBio2:
      'Guiada por el compromiso con resultados reales para empresas, instituciones educativas y organismos de seguridad pública, nuestra dirección técnica conduce cada proyecto con rigor arquitectónico, ética y enfoque humano.',
    ceoHighlights: [
      'Ingeniería de Misión Crítica',
      'Simulación 3D y Realidad Virtual',
      'Educación, Empresas y Seguridad Pública',
    ],
    mvvTitle: 'Misión, Visión y Valores',
    missionLabel: 'Nuestra Misión',
    missionText:
      'Desarrollar soluciones tecnológicas, sistemas inteligentes y experiencias inmersivas a medida con excelencia técnica, potenciando el aprendizaje, la eficiencia operativa y la seguridad de la sociedad.',
    visionLabel: 'Nuestra Visión',
    visionText:
      'Consolidarnos como referente nacional y latinoamericano en innovación aplicada, realidad inmersiva e ingeniería de software de alto impacto.',
    valuesTitle: 'Pilares y Valores Innegociables',
    values: [
      {
        title: 'Innovación',
        desc: 'Buscamos constantemente nuevas ideas, arquitecturas y tecnologías para crear soluciones que van más allá de lo convencional.',
      },
      {
        title: 'Asociación',
        desc: 'Trabajamos codo a codo con nuestros clientes, comprendiendo cada detalle operativo para entregar soluciones a medida.',
      },
      {
        title: 'Eficiencia',
        desc: 'Desarrollamos proyectos inteligentes con enfoque en alto rendimiento, estabilidad técnica y retorno real.',
      },
      {
        title: 'Versatilidad',
        desc: 'Actuamos de forma multidisciplinaria — desde software web hasta simulación 3D y robótica — adaptando soluciones a cualquier desafío.',
      },
      {
        title: 'Transparencia',
        desc: 'Relaciones basadas en la ética, claridad de procesos, seguridad de la información y compromiso con entregas sólidas.',
      },
    ],
    goalsTitle: 'Nuestras Metas e Impacto Social',
    goalsSubtitle:
      'Creemos que el verdadero valor de la tecnología radica en cómo mejora la vida de las personas, democratiza el conocimiento y construye ciudades más seguras e inteligentes.',
    goals: [
      {
        category: 'EDUCACIÓN Y ACCESIBILIDAD',
        title: 'Democratizar el Aprendizaje Inmersivo',
        desc: 'Expandir el acceso de escuelas, universidades y centros técnicos a laboratorios virtuales y robótica educativa, preparando a la próxima generación de talentos.',
      },
      {
        category: 'SEGURIDAD Y CIUDADANÍA',
        title: 'Tecnología a Favor de la Vida y la Justicia',
        desc: 'Perfeccionar herramientas de investigación, peritaje 3D y simulación táctica para apoyar a las fuerzas de seguridad y organismos públicos con precisión científica.',
      },
      {
        category: 'ECOSISTEMA PRODUCTIVO',
        title: 'Transformación Digital Sostenible',
        desc: 'Impulsar empresas con ingeniería de software escalable, automatización y gemelos digitales que reducen desperdicios y elevan la competitividad.',
      },
    ],
    ctaBoxTitle: 'Construye el Próximo Capítulo con Nosotros',
    ctaBoxDesc:
      '¿Quieres establecer una alianza institucional, conocer nuestros proyectos de cerca o desarrollar una solución exclusiva con SkyX?',
    ctaButton: 'Hablar con el Equipo SkyX',
    ctaCases: 'Conocer Nuestros Casos',
  },
} as const;

export default function EmpresaPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-roboto selection:bg-[#67a7d5] selection:text-[#010D13]">
      <SiteHeader />
      <ScrollToTopButton />

      <main className="overflow-hidden">
        {/* HERO INSTITUCIONAL */}
        <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-70"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(1, 66, 99, 0.45) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-0 right-10 w-[350px] h-[350px] opacity-50"
              style={{
                background: 'radial-gradient(circle, rgba(103, 167, 213, 0.3) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-zen-dots text-3xl sm:text-5xl lg:text-6xl leading-[1.18] mb-8"
            >
              {t.heroTitle}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#67a7d5] via-[#00d9ff] to-[#014263]">
                {t.heroTitleHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-12"
            >
              {t.heroDesc}
            </motion.p>

            {/* Navegação interna rápida */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {t.navPills.map((pill) => (
                <a
                  key={pill.href}
                  href={pill.href}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-[#014263]/60 border border-white/15 hover:border-[#67a7d5]/50 text-xs sm:text-sm text-gray-200 hover:text-white transition-all whitespace-nowrap"
                >
                  {pill.label}
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* NOSSA HISTÓRIA & TRAJETÓRIA (#historia) */}
        <section id="historia" className="relative py-24 md:py-32 px-6 bg-[#070b0f]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-16"
            >
              <h2 className="font-zen-dots text-3xl md:text-4xl text-white mb-5">
                {t.historyTitle}
              </h2>
              <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed">
                {t.historyIntro}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {t.timeline.map((item, idx) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative bg-[#010D13] border border-[#013149] hover:border-[#67a7d5]/60 rounded-3xl p-8 flex flex-col justify-between shadow-xl group transition-all"
                >
                  <div>
                    <div className="mb-4">
                      <span className="text-[#67a7d5] text-xs font-roboto font-medium uppercase tracking-widest">
                        {item.period} • {item.phase}
                      </span>
                    </div>
                    <h3 className="font-zen-dots text-xl text-white mb-4 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LIDERANÇA & VISÃO DO CEO (#lideranca) — Proporção Áurea */}
        <section
          id="lideranca"
          className="relative py-24 md:py-32 px-6 bg-[#050505] border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-zen-dots text-3xl md:text-4xl text-white">{t.ceoTitle}</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-[#010D13] via-[#061824] to-[#050505] border border-[#013149] rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_25px_70px_rgba(1,66,99,0.25)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Coluna Foto Executiva (5 cols ~ 38.2%) */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-[#67a7d5]/30 bg-[#02121c] shadow-2xl group">
                  <Image
                    src="/img/logo_footer.png"
                    alt={t.ceoName}
                    fill
                    className="object-contain p-12 opacity-90 group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010D13] via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#010D13]/90 backdrop-blur-md border border-white/10">
                    <p className="font-zen-dots text-base text-white">{t.ceoName}</p>
                    <p className="text-xs text-[#67a7d5] uppercase tracking-wider mt-1">
                      {t.ceoRole}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coluna Visão & Bio Executiva (7 cols ~ 61.8%) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <blockquote className="font-zen-dots text-lg sm:text-xl md:text-2xl text-white leading-relaxed mb-8 border-l-4 border-[#00d9ff] pl-6">
                  {t.ceoQuote}
                </blockquote>

                <div className="space-y-4 text-gray-300 font-light text-base md:text-lg leading-relaxed mb-8">
                  <p>{t.ceoBio1}</p>
                  <p>{t.ceoBio2}</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  {t.ceoHighlights.map((badge) => (
                    <span
                      key={badge}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-[#67a7d5]/30 text-xs font-bold uppercase tracking-wider text-[#67a7d5]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MISSÃO, VISÃO E VALORES (#missao) */}
        <section
          id="missao"
          className="relative py-24 md:py-32 px-6 bg-[#070b0f] border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-zen-dots text-3xl md:text-4xl text-white">{t.mvvTitle}</h2>
            </motion.div>

            {/* Missão & Visão (2 Cards em Destaque) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#012233] to-[#010D13] border border-[#67a7d5]/30 rounded-3xl p-8 md:p-10 shadow-xl"
              >
                <h3 className="font-zen-dots text-2xl text-white mb-4">{t.missionLabel}</h3>
                <p className="text-gray-200 font-light text-base md:text-lg leading-relaxed">
                  {t.missionText}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#011824] to-[#010D13] border border-white/15 rounded-3xl p-8 md:p-10 shadow-xl"
              >
                <h3 className="font-zen-dots text-2xl text-white mb-4">{t.visionLabel}</h3>
                <p className="text-gray-200 font-light text-base md:text-lg leading-relaxed">
                  {t.visionText}
                </p>
              </motion.div>
            </div>

            {/* 5 Valores */}
            <h3 className="font-zen-dots text-xl md:text-2xl text-center text-white mb-10">
              {t.valuesTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {t.values.map((val, idx) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-[#010D13] border border-[#013149] hover:border-[#67a7d5]/60 rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
                >
                  <div>
                    <h4 className="font-zen-dots text-lg text-white mb-3">{val.title}</h4>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* NOSSAS METAS & IMPACTO SOCIAL (#metas) */}
        <section
          id="metas"
          className="relative py-24 md:py-32 px-6 bg-[#050505] border-t border-white/10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="font-zen-dots text-3xl md:text-4xl text-white mb-5">{t.goalsTitle}</h2>
              <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed">
                {t.goalsSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {t.goals.map((goal, idx) => (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="bg-gradient-to-b from-[#011824] to-[#010D13] border border-white/10 hover:border-[#67a7d5]/50 rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-all"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#00d9ff] block mb-3">
                      {goal.category}
                    </span>
                    <h3 className="font-zen-dots text-xl text-white mb-4 leading-snug">
                      {goal.title}
                    </h3>
                    <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed">
                      {goal.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Institucional Final */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#01283d] via-[#011622] to-[#010D13] border border-[#67a7d5]/40 rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_60px_rgba(1,66,99,0.3)]"
            >
              <div className="max-w-2xl text-center lg:text-left">
                <h3 className="font-zen-dots text-2xl md:text-3xl text-white mb-3">
                  {t.ctaBoxTitle}
                </h3>
                <p className="text-gray-300 font-light text-base md:text-lg">{t.ctaBoxDesc}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
                <Link
                  href="/#contato"
                  className="px-8 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white font-medium rounded-xl border border-white/10 hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all text-center whitespace-nowrap"
                >
                  {t.ctaButton}
                </Link>
                <Link
                  href="/cases"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/15 transition-all text-center whitespace-nowrap"
                >
                  {t.ctaCases}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
