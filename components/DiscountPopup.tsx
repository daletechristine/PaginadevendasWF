
import React, { useState, useEffect, useRef } from 'react';
import { X, Timer, Tag, Sparkles } from 'lucide-react';
import { CHECKOUT_URL } from '../constants';

export const DiscountPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const hasTriggered = useRef(false);

    useEffect(() => {
        // Smart Trigger: Only start the timer when the user sees the PRICING section
        const pricingSection = document.getElementById('pricing');

        if (!pricingSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasTriggered.current) {
                    hasTriggered.current = true; // Mark as triggered so we don't restart logic
                    console.log("Usuário visualizou o preço. Iniciando contagem de hesitação...");

                    // Wait 4 seconds after seeing price to show popup (Simulating hesitation)
                    setTimeout(() => {
                        setIsOpen(true);
                    }, 4000);
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of pricing is visible

        observer.observe(pricingSection);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isOpen && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isOpen, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleClaim = () => {
        const separator = CHECKOUT_URL.includes('?') ? '&' : '?';
        const couponUrl = `${CHECKOUT_URL}${separator}coupon=agoravai`;
        window.open(couponUrl, '_blank');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
                onClick={() => setIsOpen(false)}
            ></div>

            <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up md:scale-110 ring-1 ring-white/20">

                {/* Header Visual - Mais limpo e elegante */}
                <div className="bg-[#1a1a1a] p-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles size={100} className="text-white" />
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-20"
                    >
                        <X size={24} />
                    </button>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-yellow-400/20">
                            <Sparkles size={12} /> Oportunidade Única
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                            Não deixe seu sonho para depois.
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
                            Sabemos que cada centavo conta no casamento. Que tal um incentivo final?
                        </p>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="p-8 bg-white relative">

                    <div
                        className="flex items-center gap-4 bg-purple-50 border border-purple-100 rounded-2xl p-4 mb-6 cursor-pointer hover:bg-purple-100 transition-colors group"
                        onClick={handleClaim}
                    >
                        <div className="bg-purple-600 text-white p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Tag size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-purple-800 font-bold text-lg leading-none">CUPOM: AGORAVAI</p>
                            <p className="text-purple-600/80 text-xs mt-1">5% de desconto aplicado automaticamente</p>
                        </div>
                        <div className="text-2xl font-black text-purple-600">5% OFF</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 text-red-500 font-medium text-sm mb-2">
                            <Timer size={16} />
                            <span>Oferta expira em: </span>
                            <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                        </div>

                        <button
                            onClick={handleClaim}
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 rounded-xl shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            QUERO MEU DESCONTO AGORA
                        </button>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full text-center text-gray-300 text-xs hover:text-gray-500 transition-colors mt-2"
                        >
                            Prefiro pagar o preço total sem desconto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
