'use client';

import { SiteFooter, SiteHeader } from '@/components/layout';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { api } from '@/lib/api';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';

const translations = {
  PT: {
    heroTitle: 'Cápsula',
    heroTitleHighlight: 'Imersiva SkyX',
    heroSubtitle:
      'Isolamento sensorial completo, visão 360º em altíssima definição, áudio espacial e integração com robótica interativa. Uma estrutura projetada para transportar seu público para dentro da sua marca, treinamento ou operação crítica.',
    ctaHero: 'Solicitar Orçamento para Evento/Empresa',
    ctaSpecs: 'Conhecer Especificações',
    stats: [
      { value: '+65 mil', label: 'Pessoas Imersas em nossa tecnologia' },
      { value: '360º', label: 'Visão e Áudio Espacial' },
      { value: '100%', label: 'Personalizável' },
    ],
    specsTitle: 'Como Funciona & Especificações Técnicas',
    specsSubtitle:
      'Cada detalhe da Cápsula Imersiva foi projetado segundo a Proporção Áurea para oferecer conforto ergonômico, impacto visual futurista e performance computacional de ponta.',
    specs: [
      {
        title: 'Isolamento Acústico & Ergonomia',
        desc: 'Design capsular futurista com tratamento acústico e iluminação LED sincronizada que bloqueia distrações externas e prepara o usuário para a imersão total.',
      },
      {
        title: 'Óculos VR de Última Geração',
        desc: 'Headsets de altíssima resolução (4K+ por olho), rastreamento ocular e de mãos (hand-tracking) com baixa latência para zero desconforto visual.',
      },
      {
        title: 'Sensores & Telemetria em Tempo Real',
        desc: 'Mapeamento espacial 6DoF (Seis Graus de Liberdade) e sensores integrados que respondem aos movimentos do usuário com precisão milimétrica.',
      },
      {
        title: 'Robótica Interativa & Sincronização',
        desc: 'Integração nativa com módulos robóticos e controle centralizado multi-usuário para conduzir sessões guiadas em feiras, salas de aula ou centros de comando.',
      },
    ],
    appsTitle: 'Aplicações Detalhadas da Cápsula',
    appsSubtitle:
      'Da formação técnica de alto risco às maiores feiras de negócios do país, adaptamos o software e a experiência 3D exatamente para o seu objetivo.',
    apps: [
      {
        title: 'Educação & Treinamentos Técnicos',
        desc: 'Simulações de procedimentos de risco (NR-10, NR-35, operação de máquinas pesadas), laboratórios virtuais de ciências e vivências históricas que multiplicam a retenção de aprendizado em até 4x.',
        bullets: [
          'Laboratórios virtuais sem risco físico ou custo de insumos',
          'Métricas de desempenho e atenção por aluno/colaborador',
          'Conteúdo alinhado ao currículo escolar, universitário ou industrial',
        ],
      },
      {
        title: 'Imersão Corporativa & B2B',
        desc: 'Apresente plantas industriais inteiras, empreendimentos imobiliários ou protótipos complexos de engenharia dentro do escritório do seu cliente ou em reuniões executivas.',
        bullets: [
          'Showroom virtual 3D em escala 1:1 de fábricas e produtos',
          'Gêmeos digitais (Digital Twins) interativos para tomada de decisão',
          'Redução drástica de custos logísticos com transporte de maquinário',
        ],
      },
      {
        title: 'Eventos, Feiras & Ativações de Marca',
        desc: 'Transforme seu estande na maior atração do evento. A estética sci-fi da Cápsula atrai filas orgânicas enquanto a experiência gamificada grava sua marca na memória do público.',
        bullets: [
          'Personalização visual externa (envelopamento e LEDs nas cores da marca)',
          'Experiências gamificadas com ranking e captação automática de leads',
          'Equipe técnica SkyX dedicada durante todo o evento',
        ],
      },
      {
        title: 'Segurança Pública & Perícia',
        desc: 'Reconstrução tridimensional fiel de cenas de crime, acidentes e operações táticas para treinamento de agentes, análise forense e apresentação de provas técnicas.',
        bullets: [
          'Inspeção espacial em 360º de cenários reconstituídos por fotogrametria/laser',
          'Simulação tática de tomada de decisão sob pressão',
          'Fidelidade métrica e visual para suporte pericial e jurídico',
        ],
      },
    ],
    formTitle: 'Leve a Cápsula Imersiva para sua Instituição',
    formDesc:
      'Preencha os dados abaixo com o perfil do seu evento, escola ou empresa. Nossa equipe de especialistas retornará com uma proposta técnica e comercial personalizada.',
    nameLabel: 'Nome / Empresa',
    namePlaceholder: 'Ex: João Silva — TechCorp Brasil',
    emailLabel: 'E-mail Corporativo',
    emailPlaceholder: 'seuemail@empresa.com.br',
    typeLabel: 'Finalidade de Uso',
    types: [
      { value: 'Evento / Feira / Ativação', label: 'Evento / Feira / Ativação de Marca' },
      { value: 'Educação / Treinamento', label: 'Educação & Treinamento Técnico' },
      { value: 'Corporativo / Showroom B2B', label: 'Imersão Corporativa / Showroom B2B' },
      { value: 'Segurança Pública / Perícia', label: 'Segurança Pública & Simulação Tática' },
      { value: 'Outro Projeto Customizado', label: 'Outro Projeto Customizado' },
    ],
    detailsLabel: 'Detalhes da Necessidade (Data, Local, Público Estimado ou Ideia)',
    detailsPlaceholder:
      'Conte-nos se você busca locação para evento, desenvolvimento de cenário 3D exclusivo ou implantação permanente...',
    submitBtn: 'Enviar Solicitação de Orçamento',
    sendingBtn: 'Enviando solicitação...',
    successMsg:
      'Solicitação enviada com sucesso! Nossa equipe comercial e técnica entrará em contato em breve.',
    errorMsg: 'Não foi possível enviar no momento. Verifique os dados e tente novamente.',
  },
  EN: {
    heroTitle: 'Immersive',
    heroTitleHighlight: 'SkyX Capsule',
    heroSubtitle:
      'Complete sensory isolation, ultra-high-definition 360º vision, spatial audio, and interactive robotics integration. A structure engineered to transport your audience right inside your brand, training, or critical operation.',
    ctaHero: 'Request a Quote for Event/Company',
    ctaSpecs: 'Explore Specifications',
    stats: [
      { value: '+65,000', label: 'People Immersed in our technology' },
      { value: '360º', label: 'Vision & Spatial Audio' },
      { value: '100%', label: 'Customizable' },
    ],
    specsTitle: 'How It Works & Technical Specs',
    specsSubtitle:
      'Every detail of the Immersive Capsule was designed following the Golden Ratio to deliver ergonomic comfort, futuristic visual impact, and cutting-edge computing performance.',
    specs: [
      {
        title: 'Acoustic Isolation & Ergonomics',
        desc: 'Futuristic pod architecture with acoustic treatment and synchronized LED lighting that blocks external distractions and prepares the user for total immersion.',
      },
      {
        title: 'Next-Gen VR Headsets',
        desc: 'Ultra-high resolution headsets (4K+ per eye), eye and hand tracking with ultra-low latency for zero motion sickness.',
      },
      {
        title: 'Sensors & Real-Time Telemetry',
        desc: '6DoF (Six Degrees of Freedom) spatial mapping and integrated sensors that respond to user movements with millimeter precision.',
      },
      {
        title: 'Interactive Robotics & Sync',
        desc: 'Native integration with robotic modules and centralized multi-user control to conduct guided sessions at trade shows, classrooms, or command centers.',
      },
    ],
    appsTitle: 'Detailed Capsule Applications',
    appsSubtitle:
      'From high-risk technical training to major business expos, we tailor both hardware branding and 3D software directly to your goal.',
    apps: [
      {
        title: 'Education & Technical Training',
        desc: 'High-risk procedure simulations, virtual science labs, and historical experiences that multiply learning retention by up to 4x.',
        bullets: [
          'Virtual laboratories with zero physical risk or consumable costs',
          'Performance and attention analytics per student/employee',
          'Content aligned with school, university, or industrial curricula',
        ],
      },
      {
        title: 'Corporate Immersion & B2B',
        desc: 'Showcase entire industrial plants, real estate developments, or complex engineering prototypes right inside your client’s office or executive meetings.',
        bullets: [
          '1:1 scale 3D virtual showroom of factories and products',
          'Interactive Digital Twins for executive decision-making',
          'Drastic reduction in logistics costs for heavy machinery transport',
        ],
      },
      {
        title: 'Events, Trade Shows & Brand Activations',
        desc: 'Turn your booth into the main attraction of the event. The sci-fi aesthetic draws organic crowds while gamified VR etches your brand into memory.',
        bullets: [
          'External visual customization (wrapping and brand-colored LEDs)',
          'Gamified experiences with leaderboards and automatic lead capture',
          'Dedicated SkyX technical crew throughout the entire event',
        ],
      },
      {
        title: 'Public Security & Forensics',
        desc: 'Faithful 3D reconstruction of crime scenes, accidents, and tactical operations for agent training, forensic analysis, and technical evidence presentation.',
        bullets: [
          '360º spatial inspection of photogrammetry/laser-reconstructed scenes',
          'Tactical decision-making simulation under pressure',
          'Metric and visual fidelity for forensic and legal support',
        ],
      },
    ],
    formTitle: 'Bring the Immersive Capsule to Your Organization',
    formDesc:
      'Fill in the details below about your event, school, or company. Our team of specialists will get back to you with a custom technical and commercial proposal.',
    nameLabel: 'Name / Company',
    namePlaceholder: 'Ex: John Doe — TechCorp Inc.',
    emailLabel: 'Corporate Email',
    emailPlaceholder: 'youremail@company.com',
    typeLabel: 'Intended Use',
    types: [
      { value: 'Event / Trade Show / Brand Activation', label: 'Event / Trade Show / Activation' },
      { value: 'Education / Technical Training', label: 'Education & Technical Training' },
      { value: 'Corporate / B2B Showroom', label: 'Corporate Immersion / B2B Showroom' },
      { value: 'Public Security / Forensics', label: 'Public Security & Tactical Simulation' },
      { value: 'Other Custom Project', label: 'Other Custom Project' },
    ],
    detailsLabel: 'Project Details (Date, Location, Estimated Audience or Idea)',
    detailsPlaceholder:
      'Tell us if you are looking for event rental, custom 3D scenario development, or permanent installation...',
    submitBtn: 'Send Quote Request',
    sendingBtn: 'Sending request...',
    successMsg:
      'Request sent successfully! Our commercial and technical team will contact you shortly.',
    errorMsg: 'Could not send right now. Please check your information and try again.',
  },
  ES: {
    heroTitle: 'Cápsula',
    heroTitleHighlight: 'Inmersiva SkyX',
    heroSubtitle:
      'Aislamiento sensorial completo, visión 360º en ultra alta definición, audio espacial e integración con robótica interactiva. Una estructura diseñada para transportar a tu público dentro de tu marca, entrenamiento u operación crítica.',
    ctaHero: 'Solicitar Presupuesto para Evento/Empresa',
    ctaSpecs: 'Conocer Especificaciones',
    stats: [
      { value: '+65 mil', label: 'Personas Inmersas en nuestra tecnología' },
      { value: '360º', label: 'Visión y Audio Espacial' },
      { value: '100%', label: 'Personalizable' },
    ],
    specsTitle: 'Cómo Funciona y Especificaciones Técnicas',
    specsSubtitle:
      'Cada detalle de la Cápsula Inmersiva fue proyectado siguiendo la Proporción Áurea para ofrecer confort ergonómico, impacto visual futurista y rendimiento computacional de vanguardia.',
    specs: [
      {
        title: 'Aislamiento Acústico y Ergonomía',
        desc: 'Diseño capsular futurista con tratamiento acústico e iluminación LED sincronizada que bloquea distracciones externas y prepara al usuario para la inmersión total.',
      },
      {
        title: 'Gafas VR de Última Generación',
        desc: 'Visores de altísima resolución (4K+ por ojo), seguimiento ocular y de manos (hand-tracking) con baja latencia para cero incomodidad visual.',
      },
      {
        title: 'Sensores y Telemetría en Tiempo Real',
        desc: 'Mapeo espacial 6DoF (Seis Grados de Libertad) y sensores integrados que responden a los movimientos del usuario con precisión milimétrica.',
      },
      {
        title: 'Robótica Interactiva y Sincronización',
        desc: 'Integración nativa con módulos robóticos y control centralizado multiusuario para dirigir sesiones guiadas en ferias, aulas o centros de mando.',
      },
    ],
    appsTitle: 'Aplicaciones Detalladas de la Cápsula',
    appsSubtitle:
      'Desde la formación técnica de alto riesgo hasta las mayores ferias de negocios, adaptamos el software y la experiencia 3D exactamente a tu objetivo.',
    apps: [
      {
        title: 'Educación y Entrenamientos Técnicos',
        desc: 'Simulaciones de procedimientos de riesgo, laboratorios virtuales de ciencias y vivencias históricas que multiplican la retención del aprendizaje hasta por 4x.',
        bullets: [
          'Laboratorios virtuales sin riesgo físico ni costo de insumos',
          'Métricas de desempeño y atención por alumno/colaborador',
          'Contenido alineado al currículo escolar, universitario o industrial',
        ],
      },
      {
        title: 'Inmersión Corporativa y B2B',
        desc: 'Presenta plantas industriales completas, desarrollos inmobiliarios o prototipos complejos de ingeniería dentro de la oficina de tu cliente o en reuniones ejecutivas.',
        bullets: [
          'Showroom virtual 3D a escala 1:1 de fábricas y productos',
          'Gemelos digitales (Digital Twins) interactivos para toma de decisiones',
          'Reducción drástica de costos logísticos de transporte de maquinaria',
        ],
      },
      {
        title: 'Eventos, Ferias y Activaciones de Marca',
        desc: 'Convierte tu stand en la mayor atracción del evento. La estética sci-fi de la Cápsula atrae filas orgánicas mientras la experiencia gamificada graba tu marca en la memoria.',
        bullets: [
          'Personalización visual externa (vinilado y LEDs con los colores de tu marca)',
          'Experiencias gamificadas con ranking y captación automática de leads',
          'Equipo técnico SkyX dedicado durante todo el evento',
        ],
      },
      {
        title: 'Seguridad Pública y Peritaje',
        desc: 'Reconstrucción tridimensional fiel de escenas del crimen, accidentes y operaciones tácticas para entrenamiento de agentes, análisis forense y presentación de pruebas.',
        bullets: [
          'Inspección espacial en 360º de escenarios reconstruidos por fotogrametría/láser',
          'Simulación táctica de toma de decisiones bajo presión',
          'Fidelidad métrica y visual para soporte pericial y jurídico',
        ],
      },
    ],
    formTitle: 'Lleva la Cápsula Inmersiva a tu Institución',
    formDesc:
      'Completa los datos a continuación con el perfil de tu evento, institución educativa o empresa. Nuestro equipo de especialistas responderá con una propuesta técnica y comercial personalizada.',
    nameLabel: 'Nombre / Empresa',
    namePlaceholder: 'Ej: Juan Pérez — TechCorp',
    emailLabel: 'Correo Corporativo',
    emailPlaceholder: 'tucorreo@empresa.com',
    typeLabel: 'Finalidad de Uso',
    types: [
      { value: 'Evento / Feria / Activación', label: 'Evento / Feria / Activación de Marca' },
      { value: 'Educación / Entrenamiento', label: 'Educación y Entrenamiento Técnico' },
      { value: 'Corporativo / Showroom B2B', label: 'Inmersión Corporativa / Showroom B2B' },
      { value: 'Seguridad Pública / Peritaje', label: 'Seguridad Pública y Simulación Táctica' },
      { value: 'Otro Proyecto Personalizado', label: 'Otro Proyecto Personalizado' },
    ],
    detailsLabel: 'Detalles de la Necesidad (Fecha, Lugar, Público Estimado o Idea)',
    detailsPlaceholder:
      'Cuéntanos si buscas alquiler para eventos, desarrollo de escenario 3D exclusivo o instalación permanente...',
    submitBtn: 'Enviar Solicitud de Presupuesto',
    sendingBtn: 'Enviando solicitud...',
    successMsg:
      '¡Solicitud enviada con éxito! Nuestro equipo comercial y técnico se pondrá en contacto pronto.',
    errorMsg: 'No fue posible enviar en este momento. Verifica los datos e inténtalo de nuevo.',
  },
} as const;

export default function CapsulaPage() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [nameCompany, setNameCompany] = useState('');
  const [email, setEmail] = useState('');
  const [usageType, setUsageType] = useState<string>(t.types[0].value);
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !nameCompany || !details) return;

    setStatus('loading');
    try {
      const consolidatedMessage = `[Orçamento Cápsula Imersiva]\nNome/Empresa: ${nameCompany}\nTipo de Uso: ${usageType}\nDetalhes: ${details}`;
      await api.post('/api/contact', {
        email,
        message: consolidatedMessage,
      });
      setStatus('success');
      setNameCompany('');
      setEmail('');
      setDetails('');
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error('Erro ao enviar solicitação da cápsula:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-roboto selection:bg-[#67a7d5] selection:text-[#010D13]">
      <SiteHeader />
      <ScrollToTopButton />

      <main className="overflow-hidden">
        {/* HERO DA CÁPSULA (#sobre) — Proporção Áurea 61.8% / 38.2% */}
        <section
          id="sobre"
          className="relative min-h-screen pt-36 pb-24 px-6 flex items-center overflow-hidden"
        >
          {/* Glows de fundo (Smooth GPU-composited radial gradients) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute top-1/4 left-0 w-[550px] h-[550px] opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(1, 66, 99, 0.4) 0%, transparent 70%)',
              }}
            />
            <div
              className="absolute bottom-10 right-0 w-[420px] h-[420px] opacity-40"
              style={{
                background: 'radial-gradient(circle, rgba(103, 167, 213, 0.3) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Coluna Áurea Principal (7 cols ~ 58-62%) */}
            <motion.div
              className="lg:col-span-7 flex flex-col items-start text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-zen-dots text-4xl sm:text-5xl lg:text-6xl leading-[1.15] mb-6">
                {t.heroTitle}{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#67a7d5] via-[#00d9ff] to-[#014263]">
                  {t.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-2xl">
                {t.heroSubtitle}
              </p>

              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-10">
                {t.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:border-[#67a7d5]/40 transition-colors"
                  >
                    <div className="font-zen-dots text-2xl md:text-3xl text-[#67a7d5] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botões de Âncora */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="#orcamento"
                  className="px-8 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white font-medium rounded-xl border border-white/10 hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all text-center whitespace-nowrap"
                >
                  {t.ctaHero}
                </a>
                <a
                  href="#especificacoes"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-gray-200 font-medium rounded-xl border border-white/15 transition-all text-center whitespace-nowrap"
                >
                  {t.ctaSpecs}
                </a>
              </div>
            </motion.div>

            {/* Coluna Áurea Secundária (5 cols ~ 38-42%) — Imagem de Destaque */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-[#67a7d5]/30 shadow-[0_0_60px_rgba(1,66,99,0.4)] group">
                <Image
                  src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=1200"
                  alt="Cápsula Imersiva SkyX VR"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* COMO FUNCIONA & ESPECIFICAÇÕES TÉCNICAS (#especificacoes) */}
        <section
          id="especificacoes"
          className="relative py-24 md:py-32 px-6 bg-[#080d11] border-y border-white/10"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-zen-dots text-3xl md:text-4xl text-white mb-5">{t.specsTitle}</h2>
              <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed">
                {t.specsSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.specs.map((spec, idx) => (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#050505]/90 border border-[#013149] hover:border-[#67a7d5]/60 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-xl"
                >
                  <div>
                    <h3 className="font-zen-dots text-lg text-white mb-3 leading-snug">
                      {spec.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">{spec.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* APLICAÇÕES DETALHADAS (#aplicacoes) */}
        <section id="aplicacoes" className="relative py-24 md:py-32 px-6 bg-[#050505]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-zen-dots text-3xl md:text-4xl text-white mb-5">{t.appsTitle}</h2>
              <p className="text-gray-400 font-light text-base md:text-lg leading-relaxed">
                {t.appsSubtitle}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.apps.map((appItem, idx) => (
                <motion.div
                  key={appItem.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="bg-gradient-to-br from-[#010D13] via-[#071520] to-[#050505] border border-white/10 hover:border-[#67a7d5]/50 rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-all"
                >
                  <div>
                    <h3 className="font-zen-dots text-2xl text-white mb-4 leading-snug">
                      {appItem.title}
                    </h3>
                    <p className="text-gray-300 font-light text-base leading-relaxed mb-6">
                      {appItem.desc}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-6 border-t border-white/10">
                    {appItem.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-sm text-gray-300 font-light"
                      >
                        <span className="text-[#00d9ff] mt-0.5 font-bold">●</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULÁRIO INTEGRADO DE ORÇAMENTO (#orcamento) */}
        <section
          id="orcamento"
          className="relative py-24 md:py-32 px-6 border-t border-white/10"
          style={{
            background: 'linear-gradient(180deg, #050505 0%, #011824 50%, #000D13 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#010D13]/90 backdrop-blur-xl border border-[#013149] rounded-[2rem] p-8 md:p-12 shadow-[0_25px_70px_rgba(1,66,99,0.3)]"
            >
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="font-zen-dots text-2xl sm:text-3xl md:text-4xl text-white mb-4">
                  {t.formTitle}
                </h2>
                <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed">
                  {t.formDesc}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="capsula-name"
                      className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                    >
                      {t.nameLabel}
                    </label>
                    <input
                      id="capsula-name"
                      type="text"
                      required
                      value={nameCompany}
                      onChange={(e) => setNameCompany(e.target.value)}
                      placeholder={t.namePlaceholder}
                      className="w-full h-12 px-4 rounded-xl bg-[#050e14] border border-[#032D41] focus:border-[#67a7d5] text-white placeholder-white/40 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="capsula-email"
                      className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                    >
                      {t.emailLabel}
                    </label>
                    <input
                      id="capsula-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full h-12 px-4 rounded-xl bg-[#050e14] border border-[#032D41] focus:border-[#67a7d5] text-white placeholder-white/40 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="capsula-type"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                  >
                    {t.typeLabel}
                  </label>
                  <select
                    id="capsula-type"
                    value={usageType}
                    onChange={(e) => setUsageType(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[#050e14] border border-[#032D41] focus:border-[#67a7d5] text-white text-sm focus:outline-none transition-colors"
                  >
                    {t.types.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#010D13] text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="capsula-details"
                    className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                  >
                    {t.detailsLabel}
                  </label>
                  <textarea
                    id="capsula-details"
                    required
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={t.detailsPlaceholder}
                    className="w-full p-4 rounded-xl bg-[#050e14] border border-[#032D41] focus:border-[#67a7d5] text-white placeholder-white/40 text-sm focus:outline-none resize-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto min-w-[280px] px-10 py-4 bg-gradient-to-r from-[#013149] to-[#000d13] text-white font-medium rounded-xl border border-white/10 hover:shadow-[inset_0_0_20px_rgba(103,167,213,0.5)] hover:border-[#67a7d5]/60 hover:brightness-110 transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap"
                  >
                    {status === 'loading' ? t.sendingBtn : t.submitBtn}
                  </button>

                  {status === 'success' && (
                    <p className="text-emerald-400 text-sm mt-4 text-center font-medium">
                      {t.successMsg}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-red-400 text-sm mt-4 text-center font-medium">
                      {t.errorMsg}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
