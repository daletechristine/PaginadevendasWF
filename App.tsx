
import React, { useState, useEffect, useRef } from 'react';
import { trackEvent } from './utils/analytics';
import {
  CheckCircle,
  Star,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Mail,
  X,
  ChevronRight,
  Send,
  Play,
  Gift,
  Timer,
  BadgeCheck
} from 'lucide-react';
import { Button, FeatureCard, AccordionItem } from './components/ui_elements';
import { ScrollReveal } from './components/ScrollReveal';
import { DiscountPopup } from './components/DiscountPopup';
import {
  PAIN_POINTS,
  FEATURES,
  FAQS,
  CHECKOUT_URL,
  CREATORS_IMAGE_URL,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  PRIVACY_POLICY_TEXT,
  TERMS_OF_USE_TEXT,
  TESTIMONIALS,

  BONUSES,
  VSL_THUMBNAIL_URL,
  LOGO_URL
} from './constants';

// Componente de Logo - Ajustado com padding superior reforçado para evitar cortes na aliança
const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center pt-6 pb-2 md:pt-7 md:pb-3 ${className}`}>
    <div className="flex items-center font-sans tracking-[-0.03em] leading-none uppercase select-none">
      {/* Parte "WEDD" - Azul Marinho */}
      <span className="text-[#1a2b4e] text-lg md:text-xl font-black">WEDD</span>

      {/* Letra "I" com Aliança Centralizada */}
      <div className="relative inline-flex flex-col items-center mx-[1px]">
        <div className="absolute -top-[14px] md:-top-[16px] left-1/2 -translate-x-1/2 text-[#c2a7e2]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]">
            {/* Círculo da Aliança */}
            <circle cx="12" cy="15" r="6" stroke="currentColor" strokeWidth="2.5" />
            {/* Detalhe Superior (Diamante/Topo) */}
            <path d="M10 7L12 4L14 7H10Z" fill="currentColor" />
          </svg>
        </div>
        <span className="text-[#1a2b4e] text-lg md:text-xl font-black">I</span>
      </div>

      {/* Parte "NG" - Azul Marinho */}
      <span className="text-[#1a2b4e] text-lg md:text-xl font-black">NG</span>

      {/* Parte "FIN" - Lavender */}
      <span className="text-[#c2a7e2] text-lg md:text-xl font-black ml-[1px]">FIN</span>
    </div>
  </div>
);

// Ícone do WhatsApp Customizado
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

type AppView = 'home' | 'terms' | 'privacy';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('page_view', { page_title: view });
  }, [view]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPulse(true);
      setIsChatOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => chatInputRef.current?.focus(), 400);
    }
  }, [isChatOpen]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToCheckout = () => {
    trackEvent('click_cta', { event_category: 'navigation', event_label: 'scroll_to_checkout' });
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.getElementById('pricing');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          trackEvent('view_pricing', { event_category: 'engagement', event_label: 'scroll' });
        }
      }, 100);
    } else {
      const element = document.getElementById('pricing');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        trackEvent('view_pricing', { event_category: 'engagement', event_label: 'scroll' });
      }
    }
  };

  const handleCheckout = () => {
    trackEvent('begin_checkout', { event_category: 'ecommerce', event_label: 'main_checkout_button' });
    if (CHECKOUT_URL) {
      window.open(CHECKOUT_URL, '_blank');
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userQuestion.trim()) return;

    const encodedText = encodeURIComponent(userQuestion);
    const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodedText}`;
    trackEvent('contact_whatsapp', { event_category: 'contact', event_label: 'chat_widget' });
    window.open(whatsappUrl, '_blank');
    setIsChatOpen(false);
    setUserQuestion('');
  };

  const renderHome = () => (
    <>
      <header className="relative pt-24 pb-16 md:pt-48 md:pb-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900 via-purple-950 to-black text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 md:w-96 md:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 md:opacity-50 animate-blob"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 md:w-96 md:h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 md:opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 md:mb-8 animate-fade-in-up">
            <Star className="text-yellow-400 fill-yellow-400" size={14} />
            <span className="text-xs md:text-sm font-medium text-purple-100">O nº 1 em Organização de Casamentos</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 md:mb-6 leading-tight max-w-6xl mx-auto animate-fade-in-up">
            Você aproveita a jornada até o altar. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200">
              O WeddingFin cuida do seu bolso.
            </span>
          </h1>

          <p className="text-base md:text-xl text-purple-200 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Tenha controle total em um painel visual e automático. Saiba para onde vai cada centavo e acompanhe seus gastos em tempo real, sem planilhas complexas.
          </p>

          {/* <div className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20 mb-10 group cursor-pointer animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg text-purple-600">
                  <Play size={32} className="fill-current" />
                </div>
              </div>
            </div>
            <img src={VSL_THUMBNAIL_URL} alt="Vídeo de Apresentação" className="w-full aspect-video object-cover" />
            <div className="absolute bottom-4 left-0 right-0 text-center z-20">
              <span className="inline-block px-4 py-1 bg-black/60 backdrop-blur text-white text-sm font-medium rounded-full">Assistir à Apresentação</span>
            </div>
          </div> */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button onClick={scrollToCheckout} pulsing className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5">
              SIM! QUERO ECONOMIZAR NO MEU CASAMENTO
              <ArrowRight size={20} className="hidden sm:block" />
            </Button>
          </div>
        </div>
      </header>

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              Quem disse que planejar precisa ser um pesadelo?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Você deveria estar provando doces ou escolhendo músicas, mas está perdido em <strong className="text-purple-900">planilhas que não batem</strong> e com medo de estourar o orçamento.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            <div className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 flex items-start gap-3 text-left w-full shadow-sm">
              <div className="bg-red-100 p-1.5 rounded-full text-red-600 flex-shrink-0 mt-0.5">
                <ShieldCheck size={18} />
              </div>
              <p className="text-gray-800 text-sm md:text-base leading-tight">
                <strong>A culpa não é de vocês.</strong> O problema são ferramentas antigas e manuais que geram insegurança.
              </p>
            </div>

            {PAIN_POINTS.map((pain, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 flex items-start gap-3 text-left shadow-sm hover:shadow-md transition-all duration-300 w-full">
                  <div className="bg-red-100 p-1.5 rounded-full text-red-600 flex-shrink-0 mt-0.5">
                    <pain.icon size={18} />
                  </div>
                  <p className="text-gray-800 text-sm md:text-base leading-tight">
                    <strong>{pain.title}</strong> {pain.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="flex justify-center order-first lg:order-none relative">
            <div className="relative group w-full max-w-[320px] md:max-w-[380px]">
              {/* Moldura mais comportada - sem blur exagerado */}
              <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-sm transition-colors duration-500"></div>
              {/* Card Reto e Elegante */}
              <div className="relative bg-white p-2 md:p-3 rounded-2xl shadow-2xl transition-transform duration-500 ease-out">
                <img src={CREATORS_IMAGE_URL} alt="Leandro e Dálete" loading="lazy" className="w-full rounded-xl object-cover aspect-[3/4] filter grayscale-[0.1] group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute bottom-4 left-4 right-4 p-3 md:p-4 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                  <p className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-white/90">Os Fundadores</p>
                  <p className="text-base md:text-xl font-bold text-white">Leandro & Dálete</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-[2.5rem] font-bold mb-4 md:mb-6 text-white drop-shadow-md">Conheça os Criadores</h2>
            <div className="space-y-4 text-white/95 text-sm md:text-lg leading-relaxed md:leading-[1.8]">
              <p className="mb-4">
                Olá! Somos <strong>Leandro e Dálete</strong>. Sabemos que por trás de cada "Sim" existem centenas de decisões financeiras importantes. O WeddingFin nasceu da nossa vontade de ter controle total sobre cada centavo investido no nosso sonho.
              </p>
              <p className="mb-4">
                Criamos este aplicativo para substituir o estresse das planilhas manuais por gráficos inteligentes. Aqui, ajudamos você a organizar cada fornecedor e a visualizar o fluxo das parcelas mês a mês.
              </p>
              <p className="mt-8 italic text-xl md:text-2xl text-white/90 font-serif border-l-4 border-white/30 pl-4">
                Sejam bem-vindos ao WeddingFin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-24 bg-slate-50 relative overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-3 md:mb-6">
              <CheckCircle size={14} /> A SOLUÇÃO DEFINITIVA
            </div>
            <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-6">
              Seu Assessor Financeiro Digital
            </h2>
            <p className="text-sm md:text-xl text-gray-600 leading-relaxed">
              O WeddingFin não é apenas uma plataforma visual bonita. É um sistema inteligente que entende como casamentos funcionam, trazendo paz de espírito para os noivos.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-8 md:mb-20 animate-fade-in-up relative px-0 md:px-0">
            {/* Cinema Glow Effect */}
            <div className="absolute -inset-4 bg-purple-600/30 blur-3xl rounded-full opacity-75 md:opacity-50 pointer-events-none"></div>

            {/* Moldura Decorativa */}
            <div className="relative rounded-2xl md:rounded-[32px] shadow-2xl">

              {/* Logo WF no canto superior esquerdo */}
              <div className="absolute -top-3 -left-2 md:-top-5 md:-left-6 z-20">
                <div className="w-12 h-12 md:w-20 md:h-20 bg-white rounded-full shadow-lg flex items-center justify-center p-2 transform -rotate-12 border border-purple-50">
                  <span className="font-serif font-bold text-xl md:text-3xl text-purple-900">WF</span>
                </div>
              </div>


              <div className="relative rounded-2xl md:rounded-[32px] overflow-hidden shadow-inner ring-1 ring-gray-200 bg-gray-900 aspect-video">
                <iframe
                  className="w-full h-full object-cover"
                  src="https://www.youtube.com/embed/tGLgEoExygc?rel=0"
                  title="WeddingFin: Demonstração Completa - Organize as Finanças do Seu Casamento Sem Estresse"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:justify-center gap-6 md:gap-8">
            {FEATURES.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 150} className="sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]">
                <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-secondary/5 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Por dentro do WeddingFin
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              A única plataforma que une beleza e inteligência financeira.
            </p>
          </div>

          <div className="space-y-12 md:space-y-24">
            {/* Feature 1: Dashboard (Image Right) */}
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              <div className="lg:w-1/2 w-full order-1 lg:order-2 px-4 sm:px-0">
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-4 bg-purple-200 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  {/* Navegador Frame */}
                  <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-transform duration-700 hover:rotate-y-2 hover:scale-[1.02]">
                    <div className="h-6 md:h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img
                      src="/assets/3.jpg"
                      alt="Dashboard do WeddingFin"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 text-left order-2 lg:order-1 relative z-10 -mt-3 lg:mt-0 px-4">
                <div className="bg-white/90 backdrop-blur-sm lg:bg-transparent p-6 rounded-2xl shadow-xl lg:shadow-none border border-gray-100 lg:border-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-4">
                    <Star size={14} /> VISÃO GERAL
                  </div>
                  <h3 className="text-lg md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 md:mb-6">
                    Controle Absoluto do seu Orçamento
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Saiba exatamente quanto já pagou, quanto falta e se está dentro da meta.
                    Nosso dashboard inteligente atualiza tudo em tempo real, eliminando planilhas confusas.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <CheckCircle size={18} className="text-green-500" /> Total Pago vs Pendente
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <CheckCircle size={18} className="text-green-500" /> Gráficos Visuais
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Schedule (Image Left) */}
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              <div className="lg:w-1/2 w-full order-1 px-4 sm:px-0">
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-4 bg-pink-200 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  {/* Navegador Frame */}
                  <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-transform duration-700 hover:-rotate-y-2 hover:scale-[1.02]">
                    <div className="h-6 md:h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img
                      src="/assets/6.jpg"
                      alt="Cronograma de Pagamentos"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 text-left order-2 relative z-10 -mt-3 lg:mt-0 px-4">
                <div className="bg-white/90 backdrop-blur-sm lg:bg-transparent p-6 rounded-2xl shadow-xl lg:shadow-none border border-gray-100 lg:border-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold mb-4">
                    <ShieldCheck size={14} /> TRANQUILIDADE
                  </div>
                  <h3 className="text-lg md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4 md:mb-6">
                    Nunca Mais Atrase um Boleto
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Visualize todas as suas parcelas mês a mês. O sistema organiza seus pagamentos
                    em uma linha do tempo clara, para que vocês possam se planejar sem sustos.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <CheckCircle size={18} className="text-green-500" /> Linha do Tempo Visual
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      <CheckCircle size={18} className="text-green-500" /> Alertas de Vencimento
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Economy (Image Right) */}
            <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
              <div className="lg:w-1/2 w-full order-1 lg:order-2 px-4 sm:px-0">
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-4 bg-green-200 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  {/* Navegador Frame */}
                  <div className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-transform duration-700 hover:rotate-y-2 hover:scale-[1.02]">
                    <div className="h-6 md:h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-400"></div>
                    </div>
                    <img
                      src="/assets/5.jpg"
                      alt="Planejamento de Economia"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 text-left order-2 lg:order-1 relative z-10 -mt-3 lg:mt-0 px-4">
                <div className="bg-white/90 backdrop-blur-sm lg:bg-transparent p-6 rounded-2xl shadow-xl lg:shadow-none border border-gray-100 lg:border-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-4">
                    <Star size={14} /> METAS REAIS
                  </div>
                  <h3 className="text-lg md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-4 md:mb-6">
                    Planejamento que Cabe no Bolso
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Defina metas de economia mensais e acompanhe seu progresso. O sistema ajuda
                    a guardar o dinheiro necessário para realizar seu sonho sem dívidas.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-start lg:justify-start">
                    <Button onClick={scrollToCheckout} pulsing className="px-8 py-3">
                      QUERO MEU ACESSO AGORA
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>



      <section id="pricing" className="py-16 md:py-24 bg-purple-900 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)] overflow-hidden flex flex-col md:flex-row border border-purple-200 ring-4 ring-purple-500/20">
            <div className="p-6 md:p-12 md:w-3/5 flex flex-col justify-center bg-white relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 text-center md:text-left">O Método WeddingFin</h3>
              <p className="text-gray-500 mb-6 text-center md:text-left">Tudo o que você precisa para assumir o controle.</p>

              <div className="mb-6 md:mb-8 mx-auto md:mx-0">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-50 p-1.5 rounded-full"><Star size={16} className="text-purple-600" /></div>
                    <span className="font-bold text-gray-800 text-sm md:text-base">Acesso Vitalício ao Sistema</span>
                  </div>
                  <span className="text-gray-400 line-through text-xs md:text-sm">R$ 197,00</span>
                </div>

                {BONUSES.map((bonus, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <Gift size={16} className="text-green-500 flex-shrink-0" />
                      <div>
                        <p className="text-gray-600 text-sm">{bonus.title}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-gray-300 line-through text-xs hidden sm:inline">{bonus.originalPrice}</span>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wide">Grátis</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] md:text-sm text-gray-500 mt-auto pt-6 border-t border-gray-100">
                <ShieldCheck size={16} className="text-purple-600" />
                <span>Compra 100% Segura • Garantia de 7 dias</span>
              </div>
            </div>
            <div className="bg-gray-50 p-8 md:p-12 md:w-2/5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-gray-100 relative">
              <div className="text-center mb-8 mt-2 w-full">
                <div className="inline-flex items-center gap-1.5 text-red-500 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4">
                  <Timer size={14} />
                  <span>Oferta por tempo limitado</span>
                </div>

                <p className="text-red-400 text-sm md:text-lg font-bold line-through mb-1 opacity-80">De R$ 197,00</p>
                <p className="text-purple-600 font-bold mb-1 uppercase tracking-wide text-[10px] md:text-xs">EM ATÉ 12X DE</p>

                <div className="flex items-start justify-center text-purple-900 leading-none mb-2">
                  <span className="text-lg md:text-2xl font-bold mt-1 md:mt-4">R$</span>
                  <span className="text-6xl md:text-8xl font-extrabold tracking-tighter">5,81</span>
                </div>

                <p className="text-gray-800 font-bold mt-2 text-sm md:text-base">
                  ou R$ 49,90 à vista
                </p>
              </div>
              <Button fullWidth pulsing onClick={handleCheckout} className="shadow-xl py-4 md:py-6 text-base md:text-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 hover:from-pink-500 hover:via-purple-500 hover:to-pink-500 border-none ring-2 ring-purple-400/50">GARANTIR ACESSO AGORA</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-t border-gray-100">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              O que os noivos estão dizendo?
            </h2>
            <p className="text-base md:text-xl text-gray-600 leading-relaxed">
              Junte-se a centenas de casais que já organizaram o casamento dos sonhos sem estresse financeiro.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 px-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 scrollbar-hide -mx-4 md:mx-0">
            {TESTIMONIALS.map((testimonial, index) => (
              <ScrollReveal key={index} delay={index * 150} className="min-w-[85%] md:min-w-0 snap-center">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-12px_rgba(124,58,237,0.3)] border border-purple-50/50 flex flex-col hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group h-full">
                  {/* Aspas Decorativas */}
                  <div className="absolute top-4 right-6 text-purple-50 group-hover:text-purple-100 transition-colors transform group-hover:scale-110 duration-500">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex gap-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 italic mb-8 leading-relaxed flex-grow relative z-10 text-base">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4 mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-white ring-2 ring-purple-50 flex items-center justify-center text-purple-700 font-bold shadow-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Dúvidas Frequentes</h2>
          </div>
          <div className="space-y-3 md:space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <AccordionItem question={faq.question} answer={faq.answer} isOpen={openFaqIndex === index} onClick={() => toggleFaq(index)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderLegal = (data: { title: string, date: string, content: string }) => (
    <div className="bg-gray-100 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16">
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-2 text-purple-600 font-bold mb-8 hover:text-purple-800 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para o Início
          </button>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2 leading-tight">{data.title}</h1>
          <p className="text-gray-400 font-medium mb-10 pb-10 border-b border-gray-100">{data.date}</p>

          <div
            className="prose prose-purple max-w-none text-gray-800 leading-[1.8] text-base md:text-lg
            [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-950 [&>h3]:mt-12 [&>h3]:mb-6 [&>h3]:tracking-tight
            [&>h4]:text-xl [&>h4]:font-bold [&>h4]:text-gray-900 [&>h4]:mt-8 [&>h4]:mb-4
            [&>p]:mb-6
            [&>ul]:list-none [&>ul]:p-0 [&>ul]:mb-8
            [&>ul>li]:relative [&>ul>li]:pl-8 [&>ul>li]:mb-4 
            [&>ul>li]:before:content-[''] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[0.6em] [&>ul>li]:before:w-2 [&>ul>li]:before:h-2 [&>ul>li]:before:bg-purple-500 [&>ul>li]:before:rounded-full
            [&>strong]:text-gray-900 [&>strong]:font-bold"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden selection:bg-pink-200 selection:text-pink-900 bg-white">
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <Logo className="hover:opacity-80 transition-opacity" />
          </div>
          <div className="flex items-center gap-3">
            {view !== 'home' && (
              <button onClick={() => setView('home')} className="hidden md:flex items-center gap-1 text-gray-600 hover:text-purple-600 font-medium px-4 py-2 rounded-lg text-sm transition-colors">
                Início
              </button>
            )}
            <button
              onClick={scrollToCheckout}
              className="bg-purple-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold hover:bg-purple-700 transition-all shadow-md hover:shadow-lg text-xs md:text-sm active:scale-95 whitespace-nowrap"
            >
              Começar Agora
            </button>
          </div>
        </div>
      </nav>

      <main>
        {view === 'home' && renderHome()}
        {view === 'privacy' && renderLegal(PRIVACY_POLICY_TEXT)}
        {view === 'terms' && renderLegal(TERMS_OF_USE_TEXT)}
      </main>

      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="bg-white w-[280px] md:w-[320px] rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden animate-fade-in-up">
            <div className="bg-[#25D366] px-5 py-3.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4" />
                <p className="font-extrabold text-[12px] uppercase tracking-wider">Suporte Direto</p>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={16} strokeWidth={3} />
              </button>
            </div>

            <div className="p-4 bg-white">
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <p className="text-[12px] font-semibold text-gray-600 leading-snug">
                  Olá! Como posso te ajudar com seu casamento hoje? 😊
                </p>
              </div>

              <form onSubmit={handleSendMessage} className="relative">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Sua dúvida..."
                  className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-3 text-[13px] font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#25D366] transition-all"
                />
                <button
                  type="submit"
                  disabled={!userQuestion.trim()}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#25D366] p-2 disabled:opacity-0 transition-all hover:scale-110"
                >
                  <Send size={18} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`
            w-14 h-14 md:w-16 md:h-16 flex items-center justify-center
            bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] 
            hover:scale-105 transition-all duration-300 active:scale-90 relative
            ${shouldPulse && !isChatOpen ? 'animate-pulse-slow' : ''}
            ${isChatOpen ? 'rotate-90 !bg-white !text-[#25D366] border border-gray-100 shadow-none' : ''}
          `}
          aria-label="Falar com suporte"
        >
          {isChatOpen ? (
            <X size={24} strokeWidth={3} />
          ) : (
            <WhatsAppIcon className="w-8 h-8" />
          )}

          {shouldPulse && !isChatOpen && (
            <div className="absolute right-full mr-3 bg-white text-gray-900 px-3 py-1.5 rounded-lg shadow-lg border border-gray-50 text-[11px] font-black uppercase tracking-widest whitespace-nowrap animate-fade-in-up flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse"></span>
              Alguma dúvida?
            </div>
          )}
        </button>
      </div>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsContactModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up border border-purple-50">
            <div className="bg-purple-600 p-8 text-white text-center">
              <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                <MessageCircle size={32} />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">Como podemos ajudar?</h2>
              <p className="text-purple-100 mt-2 font-medium">Escolha seu canal de preferência:</p>
            </div>
            <div className="p-6 space-y-4">
              <button
                onClick={() => {
                  setIsContactModalOpen(false);
                  setIsChatOpen(true);
                  trackEvent('click_whatsapp', { event_category: 'contact', event_label: 'modal_button' });
                }}
                className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#25D366] text-white p-3 rounded-xl"><WhatsAppIcon className="w-6 h-6" /></div>
                  <div>
                    <p className="font-bold text-gray-900">WhatsApp Oficial</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[#25D366] group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-700 text-white p-3 rounded-xl"><Mail size={24} /></div>
                  <div>
                    <p className="font-bold text-gray-900">E-mail</p>
                    <p className="text-xs text-gray-500">{CONTACT_EMAIL}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <p className="text-center pb-6 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Atendimento Seg-Sex, 8h às 18h</p>
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-gray-200 py-16 md:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
            <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
              <Logo />
            </div>
            <p className="text-gray-500 text-[10px] md:text-sm text-center">
              &copy; {new Date().getFullYear()} WeddingFin. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] md:text-sm text-gray-600 font-medium">
              <button onClick={() => setView('terms')} className="hover:text-purple-600 transition-colors">Termos de Uso</button>
              <button onClick={() => setView('privacy')} className="hover:text-purple-600 transition-colors">Privacidade</button>
              <button onClick={() => setIsContactModalOpen(true)} className="hover:text-purple-600 transition-colors">Contato</button>
            </div>
          </div>
        </div>
      </footer>

      <DiscountPopup />
    </div>
  );
};

export default App;
