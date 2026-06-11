'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { authClient } from '../../lib/auth-client';

// Tipagem para os dados que virão da API
interface Metric {
  id: number;
  title: string;
  value: string;
}

interface DashboardData {
  welcomeMessage: string;
  metrics: Metric[];
}

type Tab = 'inicio' | 'noticias' | 'cases' | 'parceiros' | 'mensagens';

interface Case {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  isFeatured: boolean;
  createdAt: string;
}

interface News {
  id: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  isFeatured: boolean;
  createdAt: string;
}

interface Partner {
  id: string;
  name: string;
  image: string;
  isFeatured: boolean;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('inicio');

  // Hook do Better Auth para pegar os dados do usuário em tempo real
  const { data: session, isPending } = authClient.useSession();

  // Estados para o módulo de Cases
  const [cases, setCases] = useState<Case[]>([]);
  const [loadingCases, setLoadingCases] = useState(false);
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [caseForm, setCaseForm] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    isFeatured: false,
  });
  const [submittingCase, setSubmittingCase] = useState(false);
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);

  // Estados para o módulo de Notícias
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    isFeatured: false,
  });
  const [submittingNews, setSubmittingNews] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  // Estados para o módulo de Parceiros
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    image: '',
    isFeatured: false,
  });
  const [submittingPartner, setSubmittingPartner] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);

  // Estados para o módulo de Mensagens
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    // Se terminou de checar no Render e não encontrou usuário, expulsa pro login
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!session) return; // Só busca métricas se tiver logado
      try {
        const response = await api.get<DashboardData>('/api/dashboard/metrics');
        setData(response.data);
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
        setError('Não foi possível carregar os dados. Sessão expirada ou inválida.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [session]);

  // Carrega a lista de Cases quando a aba é acessada
  useEffect(() => {
    if (activeTab === 'cases' && session) {
      fetchCases();
    }
    if (activeTab === 'noticias' && session) {
      fetchNews();
    }
    if (activeTab === 'parceiros' && session) {
      fetchPartners();
    }
    if (activeTab === 'mensagens' && session) {
      fetchMessages();
    }
  }, [activeTab, session]);

  const fetchCases = async () => {
    setLoadingCases(true);
    try {
      const response = await api.get<Case[]>('/api/cases');
      setCases(response.data);
    } catch (err) {
      console.error('Erro ao buscar cases', err);
    } finally {
      setLoadingCases(false);
    }
  };

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const response = await api.get<News[]>('/api/news');
      setNewsList(response.data);
    } catch (err) {
      console.error('Erro ao buscar notícias', err);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchPartners = async () => {
    setLoadingPartners(true);
    try {
      const response = await api.get<Partner[]>('/api/partners');
      setPartners(response.data);
    } catch (err) {
      console.error('Erro ao buscar parceiros', err);
    } finally {
      setLoadingPartners(false);
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const response = await api.get<ContactMessage[]>('/api/contact');
      setMessages(response.data);
    } catch (err) {
      console.error('Erro ao buscar mensagens', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingCase(true);
    try {
      if (editingCaseId) {
        await api.put(`/api/cases/${editingCaseId}`, caseForm);
      } else {
        await api.post('/api/cases', caseForm);
      }
      setShowCaseForm(false);
      setEditingCaseId(null);
      setCaseForm({ title: '', description: '', image: '', link: '', isFeatured: false });
      fetchCases();
    } catch (err) {
      console.error('Erro ao salvar case', err);
    } finally {
      setSubmittingCase(false);
    }
  };

  const handleEditClick = (c: Case) => {
    setEditingCaseId(c.id);
    setCaseForm({
      title: c.title,
      description: c.description,
      image: c.image || '',
      link: c.link || '',
      isFeatured: c.isFeatured,
    });
    setShowCaseForm(true);
  };

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingNews(true);
    try {
      if (editingNewsId) {
        await api.put(`/api/news/${editingNewsId}`, newsForm);
      } else {
        await api.post('/api/news', newsForm);
      }
      setShowNewsForm(false);
      setEditingNewsId(null);
      setNewsForm({ title: '', description: '', image: '', link: '', isFeatured: false });
      fetchNews();
    } catch (err) {
      console.error('Erro ao salvar notícia', err);
    } finally {
      setSubmittingNews(false);
    }
  };

  const handleEditNewsClick = (n: News) => {
    setEditingNewsId(n.id);
    setNewsForm({
      title: n.title,
      description: n.description,
      image: n.image || '',
      link: n.link || '',
      isFeatured: n.isFeatured,
    });
    setShowNewsForm(true);
  };

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingPartner(true);
    try {
      if (editingPartnerId) {
        await api.put(`/api/partners/${editingPartnerId}`, partnerForm);
      } else {
        await api.post('/api/partners', partnerForm);
      }
      setShowPartnerForm(false);
      setEditingPartnerId(null);
      setPartnerForm({ name: '', image: '', isFeatured: false });
      fetchPartners();
    } catch (err) {
      console.error('Erro ao salvar parceiro', err);
    } finally {
      setSubmittingPartner(false);
    }
  };

  const handleEditPartnerClick = (p: Partner) => {
    setEditingPartnerId(p.id);
    setPartnerForm({ name: p.name, image: p.image, isFeatured: p.isFeatured });
    setShowPartnerForm(true);
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este case?')) return;
    await api.delete(`/api/cases/${id}`);
    fetchCases();
  };

  const handleToggleFeatured = async (c: Case) => {
    await api.put(`/api/cases/${c.id}`, { ...c, isFeatured: !c.isFeatured });
    fetchCases();
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;
    await api.delete(`/api/news/${id}`);
    fetchNews();
  };

  const handleToggleFeaturedNews = async (n: News) => {
    await api.put(`/api/news/${n.id}`, { ...n, isFeatured: !n.isFeatured });
    fetchNews();
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este parceiro?')) return;
    await api.delete(`/api/partners/${id}`);
    fetchPartners();
  };

  const handleToggleFeaturedPartner = async (p: Partner) => {
    await api.put(`/api/partners/${p.id}`, { ...p, isFeatured: !p.isFeatured });
    fetchPartners();
  };

  const handleToggleMessageRead = async (m: ContactMessage) => {
    await api.put(`/api/contact/${m.id}`, { isRead: !m.isRead });
    fetchMessages();
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta mensagem?')) return;
    await api.delete(`/api/contact/${id}`);
    fetchMessages();
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  // Função auxiliar para os itens do menu
  const NavItem = ({ tab, label, icon }: { tab: Tab; label: string; icon: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
        activeTab === tab
          ? 'bg-[#67A7D5]/20 text-[#67A7D5] border border-[#67A7D5]/30'
          : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-dark font-roboto overflow-hidden relative">
      {/* Elementos decorativos de fundo (Glow Orbs) */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#014263] opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#67A7D5] opacity-10 rounded-full blur-[120px] pointer-events-none" />

      {/* Menu Lateral (Sidebar) */}
      <aside className="w-72 bg-[#010D13]/90 backdrop-blur-md border-r border-[#014263]/30 flex flex-col relative z-20 shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
        <div className="h-20 border-b border-[#014263]/30 flex items-center justify-center px-6">
          <Image
            src="/img/logo_footer.png"
            alt="SkyX Logo"
            width={130}
            height={40}
            className="object-contain"
            priority
          />
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 mt-2 px-2">
            Menu Principal
          </p>

          <NavItem
            tab="inicio"
            label="Visão Geral"
            icon={
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            }
          />

          <NavItem
            tab="noticias"
            label="Notícias do Site"
            icon={
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                />
              </svg>
            }
          />

          <NavItem
            tab="cases"
            label="Cases de Sucesso"
            icon={
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />

          <NavItem
            tab="parceiros"
            label="Parceiros & Destaques"
            icon={
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
          />

          <NavItem
            tab="mensagens"
            label="Caixa de Entrada"
            icon={
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />
        </nav>

        <div className="p-4 border-t border-[#014263]/30">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
              {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{session?.user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all text-sm font-medium"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 flex flex-col relative z-10 h-screen overflow-y-auto">
        {/* Top Header Mobile/Desktop Info */}
        <header className="h-20 bg-dark/50 backdrop-blur-sm border-b border-[#014263]/10 px-8 flex items-center justify-between sticky top-0 z-30">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {activeTab === 'inicio' && 'Visão Geral'}
            {activeTab === 'noticias' && 'Gerenciamento de Notícias'}
            {activeTab === 'cases' && 'Cases de Sucesso'}
            {activeTab === 'parceiros' && 'Parceiros e Destaques'}
            {activeTab === 'mensagens' && 'Mensagens Recebidas'}
          </h2>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {(isPending || loading) && activeTab === 'inicio' && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}

          {error && activeTab === 'inicio' && (
            <p className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </p>
          )}

          {/* TAB: INÍCIO */}
          {activeTab === 'inicio' && data && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-[#010D13]/60 backdrop-blur-sm p-8 rounded-2xl border border-[#014263]/30 shadow-lg mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#67A7D5] opacity-5 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-2xl font-bold mb-2 text-white relative z-10">
                  {data.welcomeMessage}
                </h3>
                <p className="text-gray-400 relative z-10">
                  Aqui você gerencia todo o conteúdo dinâmico que aparece no site da SkyX.
                </p>
              </div>

              <motion.div className="grid md:grid-cols-3 gap-6">
                {data.metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="bg-[#010D13]/60 backdrop-blur-sm p-6 rounded-2xl border border-[#014263]/30 shadow-[0_8px_30px_rgba(1,66,99,0.1)] hover:border-[#67A7D5]/50 hover:shadow-[0_8px_30px_rgba(103,167,213,0.15)] transition-all"
                  >
                    <h3 className="text-sm md:text-base font-medium mb-3 text-gray-400 font-roboto tracking-wide uppercase">
                      {metric.title}
                    </h3>
                    <p className="text-4xl font-bold text-[#67A7D5]">{metric.value}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* TAB: NOTÍCIAS (MOCKUP) */}
          {activeTab === 'noticias' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center bg-[#010D13]/60 backdrop-blur-sm p-6 rounded-2xl border border-[#014263]/30">
                <p className="text-gray-300">
                  Crie, edite, exclua e <strong className="text-white">destaque</strong> notícias
                  para a página inicial.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEditingNewsId(null);
                    setNewsForm({ title: '', description: '', image: '', link: '', isFeatured: false });
                    setShowNewsForm(!showNewsForm);
                  }}
                  className="bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {showNewsForm ? 'Cancelar' : 'Nova Notícia'}
                </button>
              </div>

              {/* Formulário de Criação */}
              {showNewsForm && (
                <form
                  onSubmit={handleCreateNews}
                  className="bg-[#010D13]/80 p-6 rounded-2xl border border-[#014263]/30 shadow-lg space-y-4"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{editingNewsId ? 'Editar Notícia' : 'Nova Notícia'}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="newsTitle" className="block text-sm text-gray-400 mb-1">
                        Título da Notícia
                      </label>
                      <input
                        id="newsTitle"
                        required
                        type="text"
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none"
                        placeholder="Ex: Novo lançamento da SkyX..."
                      />
                    </div>
                    <div>
                      <label htmlFor="newsImage" className="block text-sm text-gray-400 mb-1">
                        URL ou Upload de Imagem
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="newsImage"
                          type="text"
                          value={newsForm.image}
                          onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                          className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none"
                          placeholder="https://..."
                        />
                        <label className="bg-[#67A7D5]/20 text-[#67A7D5] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#67A7D5]/30 transition-colors whitespace-nowrap text-sm font-bold">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 2 * 1024 * 1024) return alert('Máximo de 2MB!');
                                const reader = new FileReader();
                                reader.onloadend = () => setNewsForm({ ...newsForm, image: reader.result as string });
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="newsLink" className="block text-sm text-gray-400 mb-1">
                        Link de Redirecionamento (Opcional)
                      </label>
                      <input
                        id="newsLink"
                        type="text"
                        value={newsForm.link}
                        onChange={(e) => setNewsForm({ ...newsForm, link: e.target.value })}
                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="newsDescription" className="block text-sm text-gray-400 mb-1">
                        Resumo da Notícia
                      </label>
                      <textarea
                        id="newsDescription"
                        required
                        value={newsForm.description}
                        onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none h-24"
                        placeholder="Breve resumo..."
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isFeaturedNews"
                        checked={newsForm.isFeatured}
                        onChange={(e) => setNewsForm({ ...newsForm, isFeatured: e.target.checked })}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="isFeaturedNews" className="text-sm text-gray-300 cursor-pointer">
                        Destacar esta notícia na página inicial
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewsForm(false);
                        setEditingNewsId(null);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submittingNews}
                      className="px-6 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                    >
                      {submittingNews ? 'Salvando...' : editingNewsId ? 'Salvar Alterações' : 'Criar Notícia'}
                    </button>
                  </div>
                </form>
              )}

              {/* Tabela de Notícias */}
              <div className="bg-[#010D13]/80 rounded-2xl border border-[#014263]/30 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#014263]/30 bg-white/5 text-sm uppercase tracking-wide text-gray-400">
                      <th className="p-4 font-medium">Informações da Notícia</th>
                      <th className="p-4 font-medium">Destaque na Home</th>
                      <th className="p-4 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingNews ? (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-500">Carregando notícias...</td>
                      </tr>
                    ) : newsList.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-500">Nenhuma notícia cadastrada.</td>
                      </tr>
                    ) : (
                      newsList.map((n) => (
                        <tr key={n.id} className="border-b border-[#014263]/10 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <p className="font-semibold text-white text-lg">{n.title}</p>
                            <p className="text-sm text-gray-400 truncate max-w-md">{n.description}</p>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleFeaturedNews(n)}
                              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${n.isFeatured ? 'bg-primary/20 text-primary border-primary/50' : 'bg-gray-800 text-gray-400 border-gray-600'}`}
                            >
                              {n.isFeatured ? '★ Destacado' : 'Sem Destaque'}
                            </button>
                          </td>
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleEditNewsClick(n)}
                              className="text-[#67A7D5] hover:text-white px-3 py-1 bg-[#67A7D5]/10 rounded-lg transition-colors text-sm"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteNews(n.id)}
                              className="text-red-400 hover:text-red-300 px-3 py-1 bg-red-400/10 rounded-lg transition-colors text-sm"
                            >
                              Arquivar / Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB: CASES (MOCKUP) */}
          {activeTab === 'cases' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center bg-[#010D13]/60 backdrop-blur-sm p-6 rounded-2xl border border-[#014263]/30">
                <p className="text-gray-300">
                  Gerencie o portfólio. Adicione fotos, descrições e links dos cases.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEditingCaseId(null);
                    setCaseForm({ title: '', description: '', image: '', link: '', isFeatured: false });
                    setShowCaseForm(!showCaseForm);
                  }}
                  className="bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {showCaseForm ? 'Cancelar' : 'Novo Case'}
                </button>
              </div>

              {/* Formulário de Criação (Condicional) */}
              {showCaseForm && (
                <form
                  onSubmit={handleCreateCase}
                  className="bg-[#010D13]/80 p-6 rounded-2xl border border-[#014263]/30 shadow-lg space-y-4"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{editingCaseId ? 'Editar Case' : 'Novo Case de Sucesso'}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="title" className="block text-sm text-gray-400 mb-1">
                        Título do Projeto
                      </label>
                      <input
                        id="title"
                        required
                        type="text"
                        value={caseForm.title}
                        onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none"
                        placeholder="Ex: CORTEXVR"
                      />
                    </div>
                    <div>
                      <label htmlFor="image" className="block text-sm text-gray-400 mb-1">
                        URL ou Upload de Imagem
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="image"
                          type="text"
                          value={caseForm.image}
                          onChange={(e) => setCaseForm({ ...caseForm, image: e.target.value })}
                          className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none"
                          placeholder="https://..."
                        />
                        <label className="bg-[#67A7D5]/20 text-[#67A7D5] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#67A7D5]/30 transition-colors whitespace-nowrap text-sm font-bold">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 2 * 1024 * 1024) return alert('Máximo de 2MB!');
                                const reader = new FileReader();
                                reader.onloadend = () => setCaseForm({ ...caseForm, image: reader.result as string });
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="link" className="block text-sm text-gray-400 mb-1">
                        Link do Projeto (Opcional)
                      </label>
                      <input
                        id="link"
                        type="text"
                        value={caseForm.link}
                        onChange={(e) => setCaseForm({ ...caseForm, link: e.target.value })}
                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="description" className="block text-sm text-gray-400 mb-1">
                        Descrição
                      </label>
                      <textarea
                        id="description"
                        required
                        value={caseForm.description}
                        onChange={(e) => setCaseForm({ ...caseForm, description: e.target.value })}
                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none h-24"
                        placeholder="Breve descrição do case..."
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isFeatured"
                        checked={caseForm.isFeatured}
                        onChange={(e) => setCaseForm({ ...caseForm, isFeatured: e.target.checked })}
                        className="w-4 h-4 accent-primary"
                      />
                      <label htmlFor="isFeatured" className="text-sm text-gray-300 cursor-pointer">
                        Destacar este case na página inicial
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCaseForm(false);
                        setEditingCaseId(null);
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submittingCase}
                      className="px-6 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors"
                    >
                      {submittingCase ? 'Salvando...' : editingCaseId ? 'Salvar Alterações' : 'Criar Case'}
                    </button>
                  </div>
                </form>
              )}

              {/* Tabela de Cases */}
              <div className="bg-[#010D13]/80 rounded-2xl border border-[#014263]/30 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#014263]/30 bg-white/5 text-sm uppercase tracking-wide text-gray-400">
                      <th className="p-4 font-medium">Informações do Case</th>
                      <th className="p-4 font-medium text-center">Destaque na Home</th>
                      <th className="p-4 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingCases ? (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-500">
                          Carregando cases...
                        </td>
                      </tr>
                    ) : cases.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-500">
                          Nenhum case cadastrado.
                        </td>
                      </tr>
                    ) : (
                      cases.map((c) => (
                        <tr
                          key={c.id}
                          className="border-b border-[#014263]/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <p className="font-semibold text-white text-lg">{c.title}</p>
                            <p className="text-sm text-gray-400 truncate max-w-md">
                              {c.description}
                            </p>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleFeatured(c)}
                              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${c.isFeatured ? 'bg-primary/20 text-primary border-primary/50' : 'bg-gray-800 text-gray-400 border-gray-600'}`}
                            >
                              {c.isFeatured ? '★ Destacado' : 'Sem Destaque'}
                            </button>
                          </td>
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleEditClick(c)}
                              className="text-[#67A7D5] hover:text-white px-3 py-1 bg-[#67A7D5]/10 rounded-lg transition-colors text-sm"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCase(c.id)}
                              className="text-red-400 hover:text-red-300 px-3 py-1 bg-red-400/10 rounded-lg transition-colors text-sm"
                            >
                              Arquivar / Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB: PARCEIROS (MOCKUP) */}
          {activeTab === 'parceiros' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center bg-[#010D13]/60 backdrop-blur-sm p-6 rounded-2xl border border-[#014263]/30">
                <p className="text-gray-300">
                  Adicione e <strong className="text-white">destaque</strong> logos de parceiros e
                  clientes no site.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEditingPartnerId(null);
                    setPartnerForm({ name: '', image: '', isFeatured: false });
                    setShowPartnerForm(!showPartnerForm);
                  }}
                  className="bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {showPartnerForm ? 'Cancelar' : 'Adicionar Parceiro'}
                </button>
              </div>

              {/* Formulário de Criação */}
              {showPartnerForm && (
                <form onSubmit={handleCreatePartner} className="bg-[#010D13]/80 p-6 rounded-2xl border border-[#014263]/30 shadow-lg space-y-4">
                  <h3 className="text-lg font-bold text-white mb-2">{editingPartnerId ? 'Editar Parceiro' : 'Novo Parceiro'}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="partnerName" className="block text-sm text-gray-400 mb-1">Nome do Parceiro</label>
                      <input id="partnerName" required type="text" value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none" placeholder="Ex: Microsoft" />
                    </div>
                    <div>
                      <label htmlFor="partnerImage" className="block text-sm text-gray-400 mb-1">URL ou Upload (Logo sem fundo)</label>
                      <div className="flex gap-2 items-center">
                        <input id="partnerImage" required type="text" value={partnerForm.image} onChange={(e) => setPartnerForm({ ...partnerForm, image: e.target.value })} className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#67A7D5] outline-none" placeholder="https://..." />
                        <label className="bg-[#67A7D5]/20 text-[#67A7D5] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#67A7D5]/30 transition-colors whitespace-nowrap text-sm font-bold">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 2 * 1024 * 1024) return alert('Máximo de 2MB!');
                                const reader = new FileReader();
                                reader.onloadend = () => setPartnerForm({ ...partnerForm, image: reader.result as string });
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-2 mt-2">
                      <input type="checkbox" id="isFeaturedPartner" checked={partnerForm.isFeatured} onChange={(e) => setPartnerForm({ ...partnerForm, isFeatured: e.target.checked })} className="w-4 h-4 accent-primary" />
                      <label htmlFor="isFeaturedPartner" className="text-sm text-gray-300 cursor-pointer">Destacar este parceiro na página inicial</label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => { setShowPartnerForm(false); setEditingPartnerId(null); }} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancelar</button>
                    <button type="submit" disabled={submittingPartner} className="px-6 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors">
                      {submittingPartner ? 'Salvando...' : editingPartnerId ? 'Salvar Alterações' : 'Criar Parceiro'}
                    </button>
                  </div>
                </form>
              )}

              {/* Tabela de Parceiros */}
              <div className="bg-[#010D13]/80 rounded-2xl border border-[#014263]/30 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#014263]/30 bg-white/5 text-sm uppercase tracking-wide text-gray-400">
                      <th className="p-4 font-medium">Parceiro</th>
                      <th className="p-4 font-medium text-center">Destaque na Home</th>
                      <th className="p-4 font-medium text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingPartners ? (
                      <tr><td colSpan={3} className="p-8 text-center text-gray-500">Carregando parceiros...</td></tr>
                    ) : partners.length === 0 ? (
                      <tr><td colSpan={3} className="p-8 text-center text-gray-500">Nenhum parceiro cadastrado.</td></tr>
                    ) : (
                      partners.map((p) => (
                        <tr key={p.id} className="border-b border-[#014263]/10 hover:bg-white/5 transition-colors">
                          <td className="p-4 flex items-center gap-4">
                            <div className="w-16 h-10 bg-white/10 rounded flex items-center justify-center overflow-hidden">
                              <Image src={p.image} alt={p.name} width={64} height={40} className="object-contain" unoptimized />
                            </div>
                            <p className="font-semibold text-white text-lg">{p.name}</p>
                          </td>
                          <td className="p-4 text-center">
                            <button type="button" onClick={() => handleToggleFeaturedPartner(p)} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${p.isFeatured ? 'bg-primary/20 text-primary border-primary/50' : 'bg-gray-800 text-gray-400 border-gray-600'}`}>
                              {p.isFeatured ? '★ Destacado' : 'Sem Destaque'}
                            </button>
                          </td>
                          <td className="p-4 text-right space-x-2 whitespace-nowrap">
                            <button type="button" onClick={() => handleEditPartnerClick(p)} className="text-[#67A7D5] hover:text-white px-3 py-1 bg-[#67A7D5]/10 rounded-lg transition-colors text-sm">
                              Editar
                            </button>
                            <button type="button" onClick={() => handleDeletePartner(p.id)} className="text-red-400 hover:text-red-300 px-3 py-1 bg-red-400/10 rounded-lg transition-colors text-sm">
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* TAB: MENSAGENS (CONTATO) */}
          {activeTab === 'mensagens' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex justify-between items-center bg-[#010D13]/60 backdrop-blur-sm p-6 rounded-2xl border border-[#014263]/30">
                <p className="text-gray-300">
                  Caixa de entrada com as mensagens enviadas pelos visitantes na seção de Contato.
                </p>
              </div>

              {/* Tabela de Mensagens */}
              <div className="bg-[#010D13]/80 rounded-2xl border border-[#014263]/30 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#014263]/30 bg-white/5 text-sm uppercase tracking-wide text-gray-400">
                      <th className="p-4 font-medium w-1/4">Contato (Data)</th>
                      <th className="p-4 font-medium w-1/2">Mensagem</th>
                      <th className="p-4 font-medium text-center w-24">Status</th>
                      <th className="p-4 font-medium text-right w-24">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingMessages ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-500">Carregando mensagens...</td></tr>
                    ) : messages.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-500">Nenhuma mensagem recebida ainda.</td></tr>
                    ) : (
                      messages.map((m) => (
                        <tr key={m.id} className={`border-b border-[#014263]/10 transition-colors ${m.isRead ? 'bg-transparent' : 'bg-[#67A7D5]/5'}`}>
                          <td className="p-4 align-top">
                            <p className="font-semibold text-white truncate max-w-[200px] xl:max-w-xs">{m.email}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(m.createdAt).toLocaleDateString('pt-BR')} às {new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </td>
                          <td className="p-4 align-top">
                            <p className="text-sm text-gray-300 whitespace-pre-wrap">{m.message}</p>
                          </td>
                          <td className="p-4 align-top text-center">
                            {m.isRead ? (
                              <span className="text-xs font-bold text-gray-500 border border-gray-700 px-2 py-1 rounded-full">Lida</span>
                            ) : (
                              <span className="text-xs font-bold text-[#67A7D5] border border-[#67A7D5]/50 bg-[#67A7D5]/10 px-2 py-1 rounded-full">Nova</span>
                            )}
                          </td>
                          <td className="p-4 align-top text-right space-y-2">
                            <button
                              type="button"
                              onClick={() => handleToggleMessageRead(m)}
                              className="text-[#67A7D5] hover:text-white px-3 py-1.5 bg-[#67A7D5]/10 rounded-lg transition-colors text-xs w-full text-center block mb-2"
                            >
                              {m.isRead ? 'Marcar como Nova' : 'Marcar como Lida'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(m.id)}
                              className="text-red-400 hover:text-red-300 px-3 py-1.5 bg-red-400/10 rounded-lg transition-colors text-xs w-full text-center block"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
