import type { SiteContent } from "@/types/content";
import { localizedPath, type RouteKey } from "@/i18n/routes";
import { business, fullAddress } from "./business";
import { dishImages as img } from "./dish-images";

/**
 * All Portuguese (pt-PT) copy. Same shape as `es.ts` — when you change a text
 * here, change it there too. Testimonials, prices and legal identifiers are
 * DEMO DATA for the template: replace them with the restaurant's real ones.
 */

const p = (key: RouteKey, hash?: string) => localizedPath("pt", key, hash);
const { name, email, phone, legalName, nif } = business;

export const pt: SiteContent = {
  /* ── Shared ─────────────────────────────────────────────────────────── */
  common: {
    meta: {
      title: `${name} — Restaurante latino em ${business.address.city}`,
      titleTemplate: `%s — ${name}`,
      description: `Cozinha latina autêntica em ${business.address.city}: arepas, cachapas, empanadas e tequeños feitos na hora. Para comer cá, para levar ou ao domicílio.`,
    },
    tagline: "Restaurante latino",
    pages: {
      home: "Início",
      menu: "Menu",
      about: "Sobre nós",
      contact: "Contactos",
      privacy: "Privacidade",
      terms: "Termos",
    },
    nav: ["home", "menu", "about", "contact"],
    mainNav: "Navegação principal",
    skipToContent: "Saltar para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    changeLanguage: "Mudar idioma",
    headerCta: "WhatsApp",
    days: {
      mon: "Segunda",
      tue: "Terça",
      wed: "Quarta",
      thu: "Quinta",
      fri: "Sexta",
      sat: "Sábado",
      sun: "Domingo",
    },
    closed: "Fechado",
    footer: {
      blurb: `Cozinha latina feita na hora em ${business.address.city}. Da nossa cozinha para a sua mesa ou para a sua porta.`,
      whatsapp: "Fale connosco por WhatsApp",
      navHeading: "Navegar",
      contactHeading: "Contactos",
      followHeading: "Siga-nos",
      rights: "Todos os direitos reservados.",
      developedBy: "Desenvolvido por",
      complaintsBook: "Livro de Reclamações",
      backToTop: "Voltar ao topo",
    },
    notFound: {
      eyebrow: "Erro 404",
      title: "Esta página queimou-se.",
      body: "Não encontrámos o que procura. Talvez a ligação tenha mudado ou a página já não exista.",
      cta: { label: "Voltar ao início", href: p("home") },
    },
  },

  /* ── Home ───────────────────────────────────────────────────────────── */
  home: {
    meta: {
      title: `${name} — Restaurante latino em ${business.address.city}`,
      description: `Cozinha latina autêntica em ${business.address.city}. Arepas, cachapas, empanadas e tequeños feitos na hora: no restaurante, para levar ou ao domicílio.`,
    },
    hero: {
      headline: ["O sabor", "de casa."],
      description:
        "Cozinha latina autêntica, feita na hora com ingredientes de qualidade. Na nossa mesa ou em sua casa.",
      primaryCta: { label: "Ver o menu", href: p("menu") },
      secondaryCta: { label: "Encomendar por WhatsApp", href: business.whatsapp.href },
      slides: [
        { lg: "/images/hero-lg-1.webp", sm: "/images/hero-sm-1.webp", alt: "Arepa de carne desfiada com queijo" },
        { lg: "/images/hero-lg-2.webp", sm: "/images/hero-sm-2.webp", alt: "Arepas variadas: reina pepiada, catira e dominó" },
        { lg: "/images/hero-lg-3.webp", sm: "/images/hero-sm-3.webp", alt: "Arepa de pabellón com empanadas" },
      ],
      features: [
        { line1: "Feito", line2: "na hora" },
        { line1: "Ingredientes", line2: "de qualidade" },
        { line1: "Um sabor que o", line2: "faz sentir em casa" },
      ],
    },
    offerings: {
      intro: {
        eyebrow: "O que fazemos",
        title: "Sabor latino, de três maneiras.",
        intro:
          "Sente-se à nossa mesa, venha levantar a sua encomenda ou peça a partir de casa. A mesma cozinha, feita na hora.",
      },
      items: [
        {
          icon: "dine-in",
          title: "No restaurante",
          tags: ["Almoço", "Jantar", "Reservas"],
          description:
            "Venha comer como em casa: arepas, cachapas e pratos crioulos acabados de fazer, num ambiente familiar e com boa música.",
          link: { label: "Ver o menu", href: p("menu") },
        },
        {
          icon: "takeaway",
          title: "Take-away",
          tags: ["Sem esperas", "Levantamento no local"],
          description:
            "Encomende por WhatsApp ou por telefone, dizemos-lhe a que horas fica pronto e passa cá para levantar acabado de fazer.",
          link: { label: "Encomendar por WhatsApp", href: business.whatsapp.href },
        },
        {
          icon: "delivery",
          title: "Ao domicílio",
          tags: ["Encomenda online", "À sua porta"],
          description:
            "A nossa cozinha em sua casa. Faça a sua encomenda por WhatsApp e levamo-la quentinha até à sua porta.",
          link: { label: "Encomendar agora", href: business.orderUrl },
        },
      ],
    },
    dishes: {
      intro: {
        eyebrow: "O nosso menu",
        title: "A nossa especialidade",
        intro:
          "O melhor da cozinha latina, feito na hora. Estaladiço por fora, derretido por dentro.",
      },
      items: [
        { title: "Empanadas", category: "Carne desfiada, frango ou queijo", image: img.empanadas },
        { title: "Arepas", category: "Reina pepiada, pabellón ou dominó", image: img.catira },
        { title: "Cachapas", category: "Milho tenro · queijo de mão", image: img.cachapaCompleta },
        { title: "Tequeños", category: "Queijo envolto em massa dourada", image: img.tequenos },
      ],
      cta: { label: "Ver o menu completo", href: p("menu") },
    },
    showcase: {
      imageMobile: "/images/showcase-sm.jpg",
      imageDesktop: "/images/showcase-lg.jpg",
      alt: `Interior do restaurante ${name}`,
      eyebrow: "O espaço",
      caption: "A sua mesa, a sua família.",
    },
    story: {
      intro: {
        eyebrow: "A nossa história",
        title: "As pessoas por trás do sabor.",
      },
      paragraphs: [
        `Somos uma família latina em ${business.address.city} com uma ideia simples: cozinhar como se cozinha em casa. Cada prato é feito por nós, da massa ao último detalhe.`,
        `O ${name} nasceu daqueles domingos em família em que alguém pergunta: e se fizermos umas arepas?`,
      ],
      link: { label: "Conheça a nossa história", href: p("about") },
      image: { src: "/images/hero-lg-2.webp", alt: "Arepas acabadas de fazer na nossa cozinha" },
      caption: "Feito à mão, todos os dias",
    },
    testimonials: {
      intro: {
        eyebrow: "O que dizem",
        title: "Dos nossos clientes",
      },
      items: [
        {
          quote:
            "As melhores arepas que já comi fora de casa. A reina pepiada sabe igualzinha à da minha avó, e somos tratados como família.",
          author: "María G.",
          source: "Avaliação no Google",
        },
        {
          quote:
            "Celebrámos aqui o aniversário da minha mãe, éramos quinze. Prepararam-nos a mesa, os tequeños desapareceram e a equipa foi impecável.",
          author: "Andrés P.",
          source: "Celebração no restaurante",
        },
        {
          quote:
            "Descobrimos a cachapa por acaso e agora vimos todas as semanas. Ambiente familiar, doses generosas e preços justos.",
          author: "João e Rita",
          source: "Avaliação no Google",
        },
      ],
    },
    faq: {
      intro: {
        eyebrow: "Perguntas",
        title: "Bom saber",
        intro: "Reservas, encomendas, horários e alergias, em poucas palavras.",
      },
      cta: { label: "Pergunte-nos o que quiser", href: p("contact") },
      items: [
        {
          question: "Fazem entregas ao domicílio?",
          answer: `Sim. Faça a sua encomenda por WhatsApp dentro do nosso horário e levamo-la a sua casa. Entregamos em ${business.address.city} e arredores; ao encomendar confirmamos se chegamos à sua zona.`,
        },
        {
          question: "Posso encomendar para levar?",
          answer:
            "Claro. Ligue-nos ou escreva-nos por WhatsApp, dizemos-lhe a que horas fica pronto e levanta no restaurante.",
        },
        {
          question: "Quando estão abertos?",
          answer:
            "De terça a quinta das 12:00 às 23:00, sexta e sábado das 12:00 às 00:00 e domingo das 12:00 às 17:00. À segunda-feira estamos fechados.",
        },
        {
          question: "É preciso reservar?",
          answer:
            "Não é obrigatório, mas recomendamos ao fim de semana. Para grupos de mais de 8 pessoas, reserve com antecedência por WhatsApp ou na página de contactos.",
        },
        {
          question: "Têm opções sem glúten ou vegetarianas?",
          answer:
            "Sim. As arepas, cachapas e empanadas são feitas com farinha de milho, sem glúten, e no menu assinalamos os pratos vegetarianos e veganos. Se tiver alguma alergia, avise-nos: dizemos-lhe que alergénios tem cada prato.",
        },
        {
          question: "Que formas de pagamento aceitam?",
          answer:
            "Numerário, cartão e MB Way, tanto no restaurante como nas encomendas para levar e ao domicílio.",
        },
      ],
    },
    location: {
      eyebrow: "Onde estamos",
      heading: `Venha provar em ${business.address.city}.`,
      body: "Esperamos por si com uma arepa acabada de fazer. Escreva-nos por WhatsApp ou passe por cá.",
      directions: "Como chegar",
      whatsapp: "WhatsApp",
      mapTitle: `Mapa — ${name}, ${business.address.city}`,
    },
  },

  /* ── Menu ───────────────────────────────────────────────────────────── */
  menu: {
    meta: {
      title: "Menu: arepas, cachapas, empanadas e pratos crioulos",
      description: `O nosso menu: arepas, cachapas, empanadas, tequeños, pabellón criollo, sobremesas e bebidas latinas. Cozinha feita na hora em ${business.address.city}.`,
    },
    hero: {
      eyebrow: "O nosso menu",
      title: ["O que", "cozinhamos."],
      intro:
        "Pratos simples que se tornam extraordinários com bons ingredientes e massa feita à mão. Escolha, partilhe e repita.",
      primaryCta: { label: "Encomendar por WhatsApp", href: business.orderUrl },
      secondaryCta: { label: "Reservar mesa", href: p("contact") },
    },
    categoriesLabel: "Categorias do menu",
    categories: [
      {
        id: "entradas",
        title: "Para petiscar",
        description: "Para abrir a mesa e partilhar.",
        items: [
          { name: "Tequeños (6 un.)", description: "Palitos de queijo branco envoltos em massa estaladiça, com molho da casa.", image: img.tequenos, price: "6,50 €", tags: ["veg"] },
          { name: "Empanadas (2 un.)", description: "Massa de milho frita, recheada com carne desfiada, frango ou queijo.", image: img.empanadas, price: "5,50 €", tags: ["gf"] },
          { name: "Patacones", description: "Banana-pão verde frita e espalmada, com guacamole e queijo ralado.", image: img.patacones, price: "6,00 €", tags: ["veg", "gf"] },
          { name: "Mandioca frita", description: "Palitos de mandioca estaladiços com guasacaca.", image: img.yuca, price: "4,50 €", tags: ["vegan", "gf"] },
          { name: "Ceviche", description: "Peixe branco marinado em lima, malagueta e coentros, com batata-doce e milho.", image: img.ceviche, price: "11,50 €", tags: ["gf", "spicy"] },
        ],
      },
      {
        id: "arepas",
        title: "Arepas",
        description: "Massa de milho feita todas as manhãs, na chapa. Sem glúten.",
        items: [
          { name: "Reina pepiada", description: "Frango, abacate e maionese: a clássica de Caracas.", image: img.reinaPepiada, price: "8,50 €", tags: ["gf"] },
          { name: "Pabellón", description: "Carne desfiada, feijão preto, banana-pão madura e queijo branco.", image: img.pabellonArepa, price: "9,50 €", tags: ["gf"] },
          { name: "Dominó", description: "Feijão preto e queijo branco ralado.", image: img.domino, price: "7,00 €", tags: ["veg", "gf"] },
          { name: "Pelúa", description: "Carne desfiada com queijo amarelo ralado.", image: img.pelua, price: "9,00 €", tags: ["gf"] },
          { name: "Catira", description: "Frango desfiado com queijo amarelo.", image: img.catira, price: "8,50 €", tags: ["gf"] },
        ],
      },
      {
        id: "cachapas",
        title: "Cachapas",
        description: "Panqueca de milho tenro, doce e salgada ao mesmo tempo.",
        items: [
          { name: "Cachapa com queijo de mão", description: "Milho tenro com queijo de mão derretido e manteiga.", image: img.cachapaQueso, price: "9,00 €", tags: ["veg", "gf"] },
          { name: "Cachapa completa", description: "Com queijo de mão e porco frito ou carne desfiada.", image: img.cachapaCompleta, price: "12,50 €", tags: ["gf"] },
        ],
      },
      {
        id: "pratos",
        title: "Pratos crioulos",
        description: "Os pratos de sempre, para comer com calma.",
        items: [
          { name: "Pabellón criollo", description: "Carne desfiada, arroz branco, feijão preto e banana-pão madura frita.", image: img.pabellonCriollo, price: "14,50 €", tags: ["gf"] },
          { name: "Bandeja paisa", description: "Feijão, arroz, carne picada, torresmo, chouriço, ovo estrelado, arepa e abacate.", image: img.bandejaPaisa, price: "16,50 €" },
          { name: "Lomo saltado", description: "Lombo salteado com cebola, tomate e malagueta amarela, com batata frita e arroz.", image: img.lomoSaltado, price: "15,50 €", tags: ["spicy"] },
          { name: "Asado negro", description: "Carne estufada lentamente em rapadura, com arroz branco e banana-pão madura.", image: img.asadoNegro, price: "15,00 €" },
        ],
      },
      {
        id: "sobremesas",
        title: "Sobremesas",
        description: "Para terminar com algo doce.",
        items: [
          { name: "Quesillo", description: "O pudim latino, com caramelo da casa.", image: img.quesillo, price: "4,50 €", tags: ["veg", "gf"] },
          { name: "Tres leches", description: "Bolo embebido em três leites com merengue.", image: img.tresLeches, price: "5,00 €", tags: ["veg"] },
          { name: "Churros com doce de leite", description: "Acabados de fritar, com açúcar e canela.", image: img.churros, price: "4,50 €", tags: ["veg"] },
        ],
      },
      {
        id: "bebidas",
        title: "Bebidas",
        description: "Frescas, caseiras e com sabor a casa.",
        items: [
          { name: "Papelón con limón", description: "Rapadura e limão, bem fresco.", image: img.papelon, price: "3,50 €", tags: ["vegan"] },
          { name: "Sumos naturais", description: "Maracujá, graviola, amora ou manga.", image: img.jugos, price: "4,00 €", tags: ["vegan"] },
          { name: "Chicha", description: "Bebida cremosa de arroz com leite e canela.", image: img.chicha, price: "4,00 €", tags: ["veg"] },
          { name: "Malta", description: "A clássica, bem fresca.", image: img.malta, price: "2,50 €" },
        ],
      },
    ],
    tags: {
      veg: "Vegetariano",
      vegan: "Vegano",
      gf: "Sem glúten",
      spicy: "Picante",
    },
    note:
      "O menu pode variar consoante a época. Se tiver alguma alergia ou intolerância, avise-nos: indicamos que alergénios de declaração obrigatória tem cada prato. Preços com IVA incluído.",
    cta: {
      eyebrow: "Ao domicílio",
      title: "A nossa cozinha, à sua porta.",
      body: "Faça a sua encomenda por WhatsApp e levamo-la acabada de fazer. Prefere vir cá? Reserve a sua mesa.",
      primary: { label: "Encomendar agora", href: business.orderUrl },
      secondary: { label: "Reservar mesa", href: p("contact") },
    },
  },

  /* ── About ──────────────────────────────────────────────────────────── */
  about: {
    meta: {
      title: "Sobre nós: porquê cozinha latina?",
      description: `Uma família latina em ${business.address.city} que cozinha como em casa. Como nasceu o ${name} e o que queremos ser para si.`,
    },
    hero: {
      eyebrow: "Sobre nós",
      title: ["Porquê", "cozinha latina?"],
      intro:
        "Para nós, a comida latina são os domingos em família, a arepa do pequeno-almoço e a música de fundo enquanto alguém cozinha. É tradição, mas sobretudo é encontro.",
      primaryCta: { label: "Ver o menu", href: p("menu") },
      secondaryCta: { label: "Contactos", href: p("contact") },
      image: { src: "/images/hero-lg-3.webp", alt: "Arepa de pabellón com empanadas" },
    },
    story: [
      {
        eyebrow: "Como começou",
        title: "Um pedaço de casa.",
        paragraphs: [
          "Quando se vive longe, procura-se sempre um sabor que nos leve de volta a casa. E para um latino, mais cedo ou mais tarde chega aquele momento: e se fizermos umas arepas?",
          `Foi assim que nasceu o ${name}: desses momentos simples e partilhados que queríamos recriar e partilhar com os outros. E sim, também para levar um pedaço de casa a todos os latinos de ${business.address.city}.`,
        ],
      },
      {
        eyebrow: "O que queremos ser para si",
        title: "Um lugar onde se sentir em casa.",
        paragraphs: [
          "Um momento de conforto, esteja onde estiver. Levamos a nossa cozinha, e tudo o que a rodeia, à sua mesa ou a sua casa. Comida simples e honesta, feita para partilhar.",
          "Cada prato é feito por nós, da massa ao prato, com as nossas receitas, os nossos hábitos e a nossa forma de entender a cozinha latina.",
        ],
      },
    ],
    values: {
      intro: {
        eyebrow: "O que nos define",
        title: "A alma latina em cada dentada.",
        intro:
          "Há três coisas que não negociamos: a receita, o ingrediente e as pessoas que se sentam à mesa.",
      },
      items: [
        { title: "Tradição", description: "Cada prato, uma história. Receitas passadas de geração em geração, feitas como em casa." },
        { title: "Ingredientes", description: "Frescos. Locais. Nossos. Escolhemos o melhor para que cada arepa, cachapa e empanada seja perfeita." },
        { title: "Comunidade", description: "A sua mesa, a sua família. Onde os latinos se encontram e os portugueses descobrem o seu novo sabor favorito." },
      ],
    },
    cta: {
      eyebrow: "Venha conhecer-nos",
      title: "A sua mesa espera por si.",
      body: `Restaurante, take-away e entregas ao domicílio em ${business.address.city} e arredores.`,
      primary: { label: "Reservar mesa", href: p("contact") },
      secondary: { label: "Ver o menu", href: p("menu") },
    },
  },

  /* ── Contact ────────────────────────────────────────────────────────── */
  contact: {
    meta: {
      title: "Contactos e reservas",
      description: `Reserve uma mesa, faça a sua encomenda ou escreva-nos. ${name}, restaurante latino em ${business.address.city}. Respondemos em 24 horas.`,
    },
    hero: {
      eyebrow: "Contactos",
      title: ["Vamos falar."],
      intro:
        "Reserve uma mesa, faça a sua encomenda ou pergunte-nos o que quiser. Respondemos em menos de 24 horas.",
    },
    form: {
      name: "Nome",
      phone: "Telefone",
      email: "Email",
      reason: "Motivo",
      reasons: [
        "Reservar mesa",
        "Encomenda para levar",
        "Entrega ao domicílio",
        "Grupo ou celebração",
        "Outra questão",
      ],
      date: "Data",
      guests: "Pessoas",
      message: "Mensagem",
      messagePlaceholder: "Conte-nos o que tem em mente…",
      optional: "opcional",
      sendWhatsapp: "Enviar por WhatsApp",
      sendEmail: "Enviar por email",
      privacyNote: "Usamos os seus dados apenas para lhe responder.",
      privacyLink: "Política de privacidade",
      sent: {
        title: "Está quase!",
        body: "Abrimos a sua mensagem no WhatsApp ou na sua aplicação de email. Só falta enviá-la a partir daí; respondemos em menos de 24 horas.",
        again: "Escrever outra mensagem",
      },
      messageIntro: "Olá, escrevo-vos a partir do site.",
      emailSubject: `Pedido a partir do site — ${name}`,
    },
    channels: {
      title: "Outras formas de nos contactar",
      phone: "Telefone",
      whatsapp: "WhatsApp",
      email: "Email",
      address: "Morada",
      directions: "Como chegar",
      hours: "Horário",
    },
  },

  /* ── Legal ──────────────────────────────────────────────────────────── */
  privacy: {
    meta: {
      title: "Política de privacidade",
      description: `Como o ${name} trata os dados pessoais que nos dá ao reservar, fazer uma encomenda ou escrever-nos: o que guardamos, porquê, durante quanto tempo e os seus direitos.`,
    },
    eyebrow: "Privacidade",
    title: "Política de privacidade",
    updated: "Última atualização: 2 de outubro de 2026",
    intro:
      "Esta política explica como tratamos os seus dados pessoais quando usa este site, faz uma reserva ou uma encomenda, ou nos escreve. Mantemos tudo simples: recolhemos apenas o que precisamos para lhe responder e cozinhar para si, e nunca vendemos os seus dados.",
    sections: [
      {
        heading: "Quem somos",
        paragraphs: [
          `${legalName}, ${fullAddress}, ${business.address.country}. NIF ${nif}. Telefone ${phone.display}. Para qualquer questão sobre os seus dados, escreva-nos para ${email}. Somos os responsáveis pelo tratamento dos dados aqui descritos.`,
        ],
      },
      {
        heading: "Que dados recolhemos e para quê",
        paragraphs: [
          "Formulário de contacto: o formulário não guarda nada neste site. Prepara uma mensagem com o seu nome, telefone ou email, o motivo, a data, o número de pessoas e a sua mensagem, e é você quem a envia por WhatsApp ou por email. Usamos esses dados para lhe responder e tratar do que nos pedir. A base legal é a execução de diligências pré-contratuais a seu pedido.",
          "Reservas e encomendas: os dados necessários para as gerir, como os seus contactos, a morada de entrega e o que encomenda. A base legal é o contrato que celebramos consigo.",
          "Se nos indicar alergias ou necessidades alimentares, usamo-las apenas para preparar a sua comida em segurança. Não usamos os seus dados para fins publicitários.",
        ],
      },
      {
        heading: "Durante quanto tempo os guardamos",
        paragraphs: [
          "Pedidos e reservas: até um ano, para podermos dar seguimento ao que nos pediu.",
          "Faturas: o tempo exigido pela legislação fiscal portuguesa para a conservação dos registos contabilísticos (atualmente, dez anos).",
        ],
      },
      {
        heading: "Quem mais os vê",
        paragraphs: [
          "Apenas a nossa equipa e os serviços que usamos para trabalhar: o WhatsApp (Meta) ou o seu fornecedor de email quando nos escreve, e o fornecedor de alojamento deste site (Vercel). Alguns destes serviços estão fora do Espaço Económico Europeu; nesse caso, a transferência está coberta pelas garantias exigidas pelo RGPD, como o Quadro de Privacidade de Dados UE-EUA ou as cláusulas contratuais-tipo.",
          "Só partilhamos dados com terceiros quando a lei a isso nos obriga.",
        ],
      },
      {
        heading: "Cookies",
        paragraphs: [
          "Este site não usa cookies de publicidade nem de rastreamento. Guarda apenas um cookie técnico com o idioma que escolher, para lhe mostrar o site nesse idioma da próxima vez.",
          "O mapa da página inicial é carregado a partir do OpenStreetMap, que recebe o seu endereço IP para o mostrar.",
        ],
      },
      {
        heading: "Os seus direitos",
        paragraphs: [
          `Pode pedir-nos acesso aos seus dados, a sua retificação ou apagamento, limitar ou opor-se ao seu tratamento, ou recebê-los num formato que possa levar para outro lado. Escreva-nos para ${email} e respondemos no prazo máximo de um mês.`,
          "Se não estiver satisfeito com a forma como tratamos os seus dados, pode apresentar uma reclamação à Comissão Nacional de Proteção de Dados (CNPD), www.cnpd.pt.",
        ],
      },
      {
        heading: "Segurança e alterações",
        paragraphs: [
          "O site usa uma ligação cifrada e não guardamos os seus dados por mais tempo do que o indicado. Se alterarmos a forma como os tratamos, atualizaremos esta página e a data acima.",
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "Termos e condições",
      description: `Condições do ${name} para reservas e encomendas: preços, pagamentos, alergias e reclamações.`,
    },
    eyebrow: "Termos",
    title: "Termos e condições",
    updated: "Última atualização: 2 de outubro de 2026",
    intro:
      "Estas condições aplicam-se às reservas e encomendas que faça connosco através deste site, por WhatsApp, por email ou por telefone.",
    sections: [
      {
        heading: "1. Quem somos",
        paragraphs: [
          `${legalName}, ${fullAddress}, ${business.address.country}. NIF ${nif}. Telefone ${phone.display}. Email ${email}.`,
        ],
      },
      {
        heading: "2. Reservas de mesa",
        paragraphs: [
          "As reservas são confirmadas por WhatsApp, email ou telefone. Guardamos a mesa durante 15 minutos após a hora reservada. Para grupos grandes podemos pedir-lhe que confirme a reserva com antecedência ou que escolha um menu fechado. Se não puder vir, avise-nos o mais cedo possível para libertarmos a mesa.",
        ],
      },
      {
        heading: "3. Take-away e entregas ao domicílio",
        paragraphs: [
          "Ao fazer a sua encomenda confirmamos o preço total, a zona de entrega e a hora aproximada. As encomendas são preparadas dentro do nosso horário de funcionamento. Tratando-se de comida preparada na hora, não se aplica o direito de livre resolução dos contratos à distância (Decreto-Lei n.º 24/2014).",
        ],
      },
      {
        heading: "4. Preços e pagamento",
        paragraphs: [
          "Os preços do menu são em euros e incluem IVA. Aceitamos numerário, cartão e MB Way.",
        ],
      },
      {
        heading: "5. Alergias",
        paragraphs: [
          "Na nossa cozinha trabalha-se com glúten, ovo, leite, frutos de casca rija e outros alergénios, pelo que não podemos excluir vestígios em nenhum prato. Informe-nos de qualquer alergia ou necessidade alimentar: indicamos quais dos 14 alergénios de declaração obrigatória tem cada prato.",
        ],
      },
      {
        heading: "6. Reclamações",
        paragraphs: [
          "Alguma coisa correu mal? Avise-nos no próprio dia por email ou telefone, se possível com uma fotografia, e procuraremos uma solução justa, como substituir o prato ou devolver a parte que não esteve bem.",
          "Tem também à sua disposição o Livro de Reclamações, no restaurante e em formato eletrónico em www.livroreclamacoes.pt. Em caso de litígio de consumo pode recorrer a uma entidade de resolução alternativa de litígios, como o Centro de Arbitragem de Conflitos de Consumo de Lisboa; mais informações em www.consumidor.gov.pt.",
        ],
      },
      {
        heading: "7. Responsabilidade",
        paragraphs: [
          "Somos responsáveis por preparar e servir a sua comida com cuidado. A nossa responsabilidade limita-se ao valor da encomenda ou consumo em causa, exceto nos casos em que a lei não permite essa limitação, como o dolo ou a negligência grave.",
        ],
      },
      {
        heading: "8. Lei aplicável",
        paragraphs: [
          "Aplica-se a lei portuguesa. Qualquer litígio será submetido aos tribunais portugueses competentes, salvo se a lei lhe der o direito de escolher outro tribunal. O tratamento dos seus dados está descrito na nossa política de privacidade.",
        ],
      },
    ],
  },
};
