# Plano de Mapeamento e Otimização de Vendas (User Journey Map)

Este documento detalha a estratégia para mapear o comportamento do usuário na página de vendas (WeddingFin) e otimizar a conversão.

## 1. O Funil de Vendas (User Steps)
Para otimizar, primeiro precisamos entender o caminho ideal que queremos que o usuário percorra.

### Etapas do Usuário (The Path):
1.  **Atracão (Landing)**: O usuário chega e vê a "Hero Section" (Título + Vídeo/Imagem).
    *   *Métrica de Sucesso*: Tempo de permanência > 5s (não rejeição).
2.  **Engajamento (Interest)**: O usuário rola para ver "Dores", "Funcionalidades" e "Sobre".
    *   *Métrica de Sucesso*: Scroll Depth (50% da página).
3.  **Consideração (Pricing)**: O usuário para na seção de Preço/Bônus.
    *   *Métrica de Sucesso*: Visualização da seção `#pricing`.
4.  **Intenção (Action)**: O usuário clica no botão de compra ("GARANTIR ACESSO").
    *   *Métrica de Sucesso*: CTA Click Rate (CTR).
5.  **Conversão (Purchase)**: O usuário finaliza a compra no Checkout (Externo).
    *   *Obs*: Como o checkout é externo, dependemos de "utm tracking" ou integração server-side para ter certeza da venda, mas o *clique* é o nosso evento principal aqui.

---

## 2. Ferramentas Recomendadas (Brainstorm)
Para conectar a página a "outras aplicações" de monitoramento, recomendo o seguinte stack:

### A. Microsoft Clarity (Visual & Comportamental) - *Recomendado*
*   **O que faz**: Grava a tela do usuário (anonimamente), gera Mapas de Calor (onde clicam, até onde rolam).
*   **Por que**: É a melhor forma de "ver os passos do usuário" visualmente.
*   **Custo**: Gratuito.

### B. Google Analytics 4 (Dados Quantitativos)
*   **O que faz**: Mede sessões, origens de tráfego (Instagram, Google Ads), conversões.
*   **Por que**: Padrão da indústria para saber *de onde* vêm as vendas.

### C. PostHog (Avançado)
*   **O que faz**: Funis detalhados, "Path Analysis" (caminhos que o usuário tomou).
*   **Por que**: Se você quiser algo mais robusto para "Product Analytics".

---

## 3. Onde Ver os Dados (Dashboard)
Os dados não ficam no código, eles ficam nos painéis online dessas ferramentas:

### Onde verificar:
1.  **Microsoft Clarity**: Você acessa `clarity.microsoft.com` e faz login. Lá você verá:
    *   Vídeos das sessões dos usuários.
    *   Mapas de calor (Heatmaps) da página.
2.  **Google Analytics**: Você acessa `analytics.google.com`. Lá você verá:
    *   Gráficos de acessos diários.
    *   Quantas pessoas clicaram em "Comprar".

---

## 4. Mapa de Ação (Plano de Implementação)

### Passo 1: Instalação dos Rastreadores
Inserir os scripts no `index.html` ou via Google Tag Manager.
- [ ] Instalar Microsoft Clarity.
- [ ] Instalar Google Analytics 4.

### Passo 2: Instrumentação de Eventos (Código)
Precisamos modificar o `App.tsx` para avisar as ferramentas quando coisas importantes acontecem.

#### Eventos Chave:
| Evento | Gatilho | O que nos diz? |
| :--- | :--- | :--- |
| `view_pricing` | Quando o usuário rola até a seção de Preços. | O usuário teve interesse real? |
| `click_checkout` | Clique em "SIM! QUERO ECONOMIZAR" ou "GARANTIR ACESSO". | Intenção clara de compra. |
| `contact_whatsapp` | Clique no botão do WhatsApp. | Usuário teve dúvidas (fricção). |
| `copy_coupon` | Se o usuário copiar o cupom do Popup. | O incentivo funcionou? |
| `open_discount_popup` | Quando o popup abre. | Taxa de exibição vs. uso.

### Passo 3: Análise e Otimização
Após coletar dados por ~1 semana ou 100 visitas:
1.  **Ver Mapas de Calor**: Os usuários estão clicando em algo que não é clicável? Estão ignorando as "Dores"?
2.  **Ver Gravações**: Onde eles desistem? No preço? Nos depoimentos?
3.  **Otimizar**:
    *   *Se desistem no topo*: Melhorar a Promessa (Headline).
    *   *Se desistem no preço*: Melhorar a Oferta ou adicionar mais confiança (Garantia visual).
    *   *Se clicam mas não compram*: O problema pode ser no checkout ou no preço final.
