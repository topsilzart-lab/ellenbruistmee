// ==========================================
// CENTRALIZED WEBSITE DATA CONFIGURATION
// ==========================================
// Edit this file to easily update texts, add projects, or change website configurations
// without having to touch the React codebase.

export const HERO_QUOTES = [
  { 
    text: "De grootste fout die je kunt maken is om er geen te maken.", 
    style: "font-serif italic font-semibold" 
  },
  { 
    text: "Mislukken, zoveel leuker dan nooit proberen.", 
    style: "font-display font-black tracking-tight uppercase" 
  },
  { 
    text: "Spring altijd in het diepe. Het ondiepe doet namelijk zeer.", 
    style: "font-serif italic font-bold" 
  },
  { 
    text: "Als je wil dat je kind omhoog klimt, moet je er vooral niet bovenop gaan zitten.", 
    style: "font-sans tracking-wide font-extrabold uppercase" 
  },
  { 
    text: "Van proberen kun je leren.", 
    style: "font-serif italic font-black text-2xl sm:text-3xl md:text-5xl" 
  },
  { 
    text: "Terwijl we onze kinderen alles over het leven leren, leren onze kinderen ons waar het in het leven om draait.", 
    style: "font-sans italic font-normal" 
  },
  { 
    text: "Als iets niet lukt\nheb je niet gefaald\nmaar geleerd!", 
    style: "font-serif italic font-black text-2xl sm:text-3xl md:text-4xl" 
  }
];

export const TARGET_GROUPS = [
  { 
    title: 'Kinderen die meer aankunnen', 
    desc: 'Meer- en hoogbegaafd, hoog gevoelig, snel verveeld, vol vragen. Kinderen die uitdaging nodig hebben om in beweging te blijven.' 
  },
  { 
    title: 'Kinderen die thuis zijn komen te zitten', 
    desc: 'Of dreigen vast te lopen in het reguliere onderwijs. Samen zoeken we wat wél kan.' 
  },
  { 
    title: 'Scholen, leerkrachten en ouders', 
    desc: 'Die willen meekijken, meedoen en meegroeien. Want het kind staat niet alleen.' 
  }
];

export const MY_APPROACH = [
  {
    title: 'Kijken wat WEL kan',
    desc: '- ik kijk graag naar wat iemand uniek maakt en hoe dat talent kan groeien (=de intrinsieke motivatie). Eigenaarschap stimuleren.\n\nKinderen mogen voelen: "He, dit is van mij. Ik kan dit. Ik mag hierin groeien."',
    bg: 'bg-brand-cream text-brand-aubergine border-brand-cream/10',
    iconBg: 'bg-brand-red text-brand-cream',
    pBg: 'bg-brand-red/10 text-brand-red'
  },
  {
    title: 'Ouder­betrokkenheid stimuleren',
    desc: '- écht leren meekijken waar hun kind mee te maken krijgt. Daardoor ontstaat er meer begrip voor hun kind.\n\nEn soms ook nieuwe inzichten over zichzelf.',
    bg: 'bg-brand-yellow text-brand-aubergine border-brand-yellow/10',
    iconBg: 'bg-brand-aubergine text-brand-yellow',
    pBg: 'bg-brand-yellowDark/10 text-brand-yellowDark'
  },
  {
    title: 'Out of the box DOEN',
    desc: '• Op een zo breed mogelijk vlak\n• Op alle mogelijke creatieve manieren BRUISEN\n\n- bezig zijn met zich uiten. Met het ervaren vanuit hun eigen gevoel (ontdekken, proberen, voelen, creëren én groeien)\n- dit in combinatie met het ontwikkelen van skills die hun eigenheid zoveel mogelijk laat bloeien',
    bg: 'bg-brand-green text-brand-aubergine border-brand-green/10',
    iconBg: 'bg-brand-cream text-brand-green',
    pBg: 'bg-brand-green/10 text-brand-green'
  }
];

export const HOW_WE_WORK = [
  { 
    n: '01', 
    title: 'Kennismaken', 
    desc: 'We zoeken samen uit waar het om gaat. Wat speelt er bij dit kind, deze klas, deze school, dit gezin? Wat heeft iemand nodig om wél in beweging te komen?' 
  },
  { 
    n: '02', 
    title: 'Plan op maat', 
    desc: 'Ik bedenk een creatief plan dat past - niet wat standaard is, maar wat werkt. Met de kinderen aan zet, en de mensen eromheen erbij betrokken.' 
  },
  { 
    n: '03', 
    title: 'Samen DOEN', 
    desc: 'Sparren, uitvoeren, bijsturen, ontdekken, vieren en BRUISEN.' 
  }
];

export const CONTACT_INFO = {
  email: 'info@ellenbruistmee.nl',
  phone: '+31 6 36321010',
  workArea: 'Noord-, en Midden Limburg'
};

// ==========================================
// ALL PROJECTS DATABASE
// ==========================================
export const ALL_PROJECTS = [
  // --- BUITENSCHOOLS ---
  {
    title: 'Buitenschoolse activiteiten Blerick',
    category: 'Buitenschools',
    desc: 'Mede opzetten en uitvoeren van tweewekelijkse structurele buitenschoolse activiteiten in een achterstandswijk met veel verschillende nationaliteiten. In samenwerking met en door de wijkbewoners; soort voorloper padXpress (BS De Regenboog Blerick t/m 2000).',
    color: 'border-brand-orange/20 hover:border-brand-orange text-brand-aubergine',
    badgeBg: 'bg-brand-orange/10 text-brand-orange'
  },
  {
    title: 'Deelnemer Rijke Schooldag',
    category: 'Buitenschools',
    desc: 'Als Nederlandse vriendin van het Afrikaanse meisje Ashia (Stichting Aisha & friends). Ondersteunen workshops. Stimuleren online uitwisselingen tussen scholen. Doel: Kinderen hier en in Afrika helpen groeien met life skills. Zodat hun sociale vaardigheden en zelfvertrouwen groeien. (Talenten Campus Venlo juni ’26).',
    color: 'border-brand-orange/20 hover:border-brand-orange text-brand-aubergine',
    badgeBg: 'bg-brand-orange/10 text-brand-orange'
  },

  // --- THUISZITTERS ---
  {
    title: 'Ervaringsdeskundige (Meer- & Hoogbegaafd)',
    category: 'Thuiszitters',
    desc: 'Ervaringsdeskundige als ouder en als leerkracht van meer-, en hoogbegaafde en/of hoog gevoelige kinderen. EN voor leerlingen die buiten het huidige onderwijssysteem beter gedijen (Altijd al).',
    color: 'border-brand-yellow/20 hover:border-brand-yellow text-brand-aubergine',
    badgeBg: 'bg-brand-yellowDark/10 text-brand-yellowDark'
  },
  {
    title: 'Ervaringsdeskundige Thuiszitters',
    category: 'Thuiszitters',
    desc: 'Ervaringsdeskundige als ouder en als leerkracht van thuiszitters (Altijd al).',
    color: 'border-brand-yellow/20 hover:border-brand-yellow text-brand-aubergine',
    badgeBg: 'bg-brand-yellowDark/10 text-brand-yellowDark'
  },
  {
    title: 'Peergroepen Meer- & Hoogbegaafd',
    category: 'Thuiszitters',
    desc: 'Mede opzetten en draaien van peergroupen voor de Meer en Hoog Begaafde kinderen in de midden-, en bovenbouw. Doel: Uitdaging voor de peers + een meerwaarde voor de stamgroep. Zodat de peerkids hun eindresultaat kunnen presenteren in hun stamgroep (de peerouders zijn altijd van de partij). Thema’s waar ik mee gewerkt heb: Het heelal/natuurkundige verschijnselen (proefjes met door henzelf gemaakt instructieblad), duurzaamheid /milieu (bedenk, ontwerp, beschrijf, teken en voer uit met kosteloze materialen), planten/geschiedenis (een reis door de tijd; samen een boek maken voor iedere stamgroep), democratie/regering (voorstel indienen bij leerlingenraad en onderbouwen), vroeger & nu/religies (lapbook maken), vrijheid (interview maken, uitvoeren en uitwerken + collega: “Wat is vrijheid voor jou?”) (OJBS De Omnibus Baarlo ’23-‘25).',
    color: 'border-brand-yellow/20 hover:border-brand-yellow text-brand-aubergine',
    badgeBg: 'bg-brand-yellowDark/10 text-brand-yellowDark'
  },

  // --- CULTUUR ---
  {
    title: 'Presenteren Onderwijsdag & Cabaret',
    category: 'Cultuur',
    desc: 'Presenteren Onderwijsdag in de Maaspoort (2x) + cabarettour pabo (’90-’91).',
    color: 'border-brand-purple/20 hover:border-brand-purple text-brand-aubergine',
    badgeBg: 'bg-brand-purple/10 text-brand-purple'
  },
  {
    title: 'Projectleiderschap Wereldpaviljoen',
    category: 'Cultuur',
    desc: `Projectleiderschap Wereldpaviljoen tijdens de Floriade 2012
-aansturen vrijwilligers plus studenten van Fontys Hogeschool
-uitvoeren workshops ( groep 4 t/m VO tweetalig vwo)
-delegaties ontvangen en rondleidingen geven
-de slotavond voor de vrijwilligers mede organiseren en presenteren. Een plek voor en met wereldburgers.`,
    color: 'border-brand-purple/20 hover:border-brand-purple text-brand-aubergine',
    badgeBg: 'bg-brand-purple/10 text-brand-purple'
  },
  {
    title: 'Werkgroep Kunstsymposium 2024',
    category: 'Cultuur',
    desc: 'Werkgroep Kunstsymposium 2024. De opening uitgewerkt samen met een collega en gepresenteerd. Dit i.s.m. de dochter en kleindochter van Tajiri. Samen met “Baarlo Leeft” o.a. gekozen voor een trash-art versie van de torens van Tajiri (OJBS De Omnibus Baarlo ‘24).',
    color: 'border-brand-purple/20 hover:border-brand-purple text-brand-aubergine',
    badgeBg: 'bg-brand-purple/10 text-brand-purple'
  },
  {
    title: 'Deelnemer Werkgroepen',
    category: 'Cultuur',
    desc: 'Van oudsher deelnemer werkgroepen wereldoriëntatie, cultuur, burgerschap.',
    color: 'border-brand-purple/20 hover:border-brand-purple text-brand-aubergine',
    badgeBg: 'bg-brand-purple/10 text-brand-purple'
  },

  // --- ONDERWIJS ---
  {
    title: 'Natuuronderwijs Zelfontdekkend Leren',
    category: 'Onderwijs',
    desc: `Natuuronderwijs maar dan anders! Zelfontdekkend leren (opzet en uitvoer)
-OB kabouterpad met doe-opdrachten, MB ontdekhoeken + leskist natuurkunde, BB veldwerk + leskist. Deelnemer opendorp dag met de kids in actie (BS Aen den Mortel Meijel ’90-’91).`,
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Project Eerste Opvang Allochtone Kinderen',
    category: 'Onderwijs',
    desc: 'Mede opzet en uitvoering Project “ Eerste opvang allochtone kinderen” i.s.m. BCO (onderwijsbegeleidingsdienst). Dit resulteerde in regionale centrale opvanggroepen inclusief zij-instromers. Met daarbij een aansturingsfunctie naar 13 toeleveringsscholen (BS De Regenboog Blerick).',
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Vaste Inloopmomenten voor Ouders',
    category: 'Onderwijs',
    desc: 'Mede organiseren van “vaste inloopmomenten” voor ouders. Win-winsituatie door die drempel te verlagen in samenwerking met de leerkrachten Turks en Marokkaans. (BS De Regenboog Blerick).',
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Leerlingenraad & Schoolkrant',
    category: 'Onderwijs',
    desc: 'Invoering leerlingenraad en schoolkrant (BS De Regenboog Blerick).',
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Ontwikkelings- & Ervaringsgericht Werken',
    category: 'Onderwijs',
    desc: 'Mede opzet Project: “Omwenteling naar Ontwikkelings- en ervaringsgericht werken / zelfstandig werken”. Deze gaat uit van het beleven en het ontdekken door het kind zelf. Dan kan het groeien binnen z’n mogelijkheden. Dit vraagt een andere manier van benaderen en aanpakken van “leerstof”. Namelijk gedifferentieerd mogen werken (BS De Regenboog Blerick).',
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Transitie naar Werkhoeken',
    category: 'Onderwijs',
    desc: 'Transitie uitdragen van groepslokalen naar zelfstandige werkhoeken + effectieve werkplekken buiten het lokaal (BS De Regenboog Blerick).',
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Schoolaankleding & Crealessen',
    category: 'Onderwijs',
    desc: `Organisatie aankleding schoolhallen zowel de basis als structureel per thema (BS De Regenboog Blerick).
- opzet, uitvoering en/of aansturing crealessen bedacht bij de thema’s in de bouwen (BS De Regenboog Blerick/Zoveel mogelijk altijd overal).`,
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Openings- & Sluitingsacts',
    category: 'Onderwijs',
    desc: 'Openings-, en sluitingsacts van thema’s bedenken, opzetten, aansturen, presenteren (Altijd overal).',
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Remedial Teaching',
    category: 'Onderwijs',
    desc: 'Remedial teaching: degenen die meer nodig hebben omdat ze uitvallen signaleren en bijspijkeren. Plus degenen die uitgedaagd moeten worden signaleren en prikkelend voeden (BS De Regenboog Blerick/ BS De Zuidstroom Venlo/Zoveel mogelijk altijd overal).',
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Opzet Bevorderen Automatiseren',
    category: 'Onderwijs',
    desc: `Opzet bevorderen automatiseren vanaf groep 4 t/m 8. Middels inzet van dagelijkse structurele korte trainingsmomentjes. Klassikaal/in groepjes, zelfstandig werkmaterialen maken, verzamelen en inzetten. Spellencircuit inzetten. Bewegend leren ingevoerd.

Persoonlijke tafeltjeskaart en centrale tafeltjes groeiwand aangebracht bij zowel de MB als bij de BB (BS De Zuidstroom Venlo ’16-’17/Zoveel mogelijk altijd overal).`,
    color: 'border-brand-green/20 hover:border-brand-green text-brand-aubergine',
    badgeBg: 'bg-brand-green/10 text-brand-green'
  },

  // --- DIVERSE CULTUUR-EDUCATIE PROJECTEN ---
  {
    title: 'Kunstbeschouwingslessen & Actualiteit',
    category: 'Diverse cultuur-educatie projecten',
    desc: 'Kunstbeschouwingslessen vertalen naar lopende thema’s en de actualiteit ( Altijd overal).',
    color: 'border-brand-turquoise/20 hover:border-brand-turquoise text-brand-aubergine',
    badgeBg: 'bg-brand-turquoise/10 text-brand-turquoise'
  },
  {
    title: 'Project Plastic Fantastic',
    category: 'Diverse cultuur-educatie projecten',
    desc: 'Project Plastic Fantastic. Duurzaamheidsthema. Dieren maken van plastic verpakkingsmaterialen (BS De Meulebeek Oostrum ’21-’22)',
    color: 'border-brand-turquoise/20 hover:border-brand-turquoise text-brand-aubergine',
    badgeBg: 'bg-brand-turquoise/10 text-brand-turquoise'
  },
  {
    title: 'Project Steentijd',
    category: 'Diverse cultuur-educatie projecten',
    desc: 'Project Steentijd. o.a. Zelf gebruiksvoorwerpen maken, rotstekeningen maken van gevonden materialen uit de natuur, weefwerk van riet maken, kleding maken (BS St. Martinus Venlo ’22-’23).',
    color: 'border-brand-turquoise/20 hover:border-brand-turquoise text-brand-aubergine',
    badgeBg: 'bg-brand-turquoise/10 text-brand-turquoise'
  },
  {
    title: 'Project Paddenstoelen',
    category: 'Diverse cultuur-educatie projecten',
    desc: 'Project paddenstoelen. o.a. Zoeken, determineren, natekenen, sporen eruit filteren, schimmels en functie, champignons kweken in de klas en braden (BS Aen den Mortel Meijel ’91/BS St. Martinus Venlo ’22-’23).',
    color: 'border-brand-turquoise/20 hover:border-brand-turquoise text-brand-aubergine',
    badgeBg: 'bg-brand-turquoise/10 text-brand-turquoise'
  },
  {
    title: 'Project Middeleeuwen',
    category: 'Diverse cultuur-educatie projecten',
    desc: 'Project Middeleeuwen. o.a. Kalligraferen, pen maken en ermee werken, initiaal creëren, Bordspel Limburgs Museum + bezoeken, spreekbeurt eraan koppelen (BS St. Martinus Venlo ’22-’23).',
    color: 'border-brand-turquoise/20 hover:border-brand-turquoise text-brand-aubergine',
    badgeBg: 'bg-brand-turquoise/10 text-brand-turquoise'
  },
  {
    title: 'Kerst voor iedereen / Kerst in de toekomst',
    category: 'Diverse cultuur-educatie projecten',
    desc: `Kerst voor iedereen/Kerst in de toekomst; mondiaal bewustzijn voeden. Spelvorm met diverse nationaliteiten in verschillende cultuurdisciplines.
Dit m.b.v. een reuzenpoppenkast en een xxl schimmenspelkast binnen 1 aula. Het zittende publiek draait mee. Werkgroepen waren de verhalenschrijver (binnen thema’s), decorbouwers, pamfletontwerpers, poppenmakers, schimmenmakers, presentatoren, vertellers, de technici, de digitale-groep, de muzikanten. Kids van alle nationaliteiten komen in spelvorm met hun gemaakte landsvlag aan het woord om over hun gebruiken tijdens “Kerst of Nieuwjaarsbeleving” te vertellen (BS St. Martinus Venlo ’22-’23).`,
    color: 'border-brand-turquoise/20 hover:border-brand-turquoise text-brand-aubergine',
    badgeBg: 'bg-brand-turquoise/10 text-brand-turquoise'
  }
];

export const TESTIMONIALS = [
  {
    quote: `Betreffende: Ellen Peeters

Gedurende de bovenvermelde periode heeft Ellen Peeters zich op onze school zich gepresenteerd als een zéér gedreven en vakbekwame professional.

Karakteristiek voor haar is, dat zij zich enorm in wil zetten voor “nieuwe” ontwikkelingen op schoolniveau.

-Zij heeft groepsverantwoordelijkheid gedragen voor leerjaargroepen, maar ook voor combinatiegroepen.

-Zij heeft de organisatie van “zij-instromers” verder uitgewerkt, i.s.m. het BCO en in overleg met de toeleveringsscholen.

-Haar hart ligt zeker ook bij de leerling die wat extra’s nodig heeft. Ellen pakte de RT-ondersteuning met ziel en zaligheid op.

-Ellen was een méér dan dragende kracht bij de ontwikkeling van OGO en Thematisch Onderwijs op de Regenboog.`,
    author: "Peter Janssen",
    role: "Adjunct-directeur van bs. De Regenboog te Venlo-Blerick (periode 1991-2000) | Blerick, mei 2015"
  },
  {
    quote: `Ellen, een energieke enthousiaste en vooral creatieve dame die graag voor de troepen uitloopt met haar originaliteit.

Wel daarbij zo realistisch is dat ze graag "teruggeroepen" wordt.

Haar niet aflatende energie zorgt dan weer voor het zoeken naar nieuwe uitdagingen.

Zij levert bouwstenen voor projecten die gericht zijn op het verbeteren van het welzijn van de mens.

En zich daarbij vooral inzet om eenieder zelf hun talenten te laten ontdekken.`,
    author: "Ton Dols",
    role: "Directeur van bs. de Regenboog te Venlo-Blerick (periode 1991-2000) & Bestuurslid Wereldpaviljoen Floriade 2012 | Maasbree, juni 2026"
  },
  {
    quote: `De Stichting Wereldpaviljoen besloot om tijdens de Wereldtuinbouwtentoonstelling Floriade (2012) in Venlo een educatieve inzending te maken met als doel bezoekers (kinderen en volwassenen) kennis te laten maken met andere culturen.

We kozen om het Midden-Amerikaanse land Nicaragua centraal te stellen.

Met o.a. een leslokaal, Wereldbol, marktkramen met Tv-schermen en enkele belevingsactiviteiten.

De Floriade duurde 180 dagen en voor al die dagen moesten er deskundige vakmensen in de stand staan om schoolklassen en individuele bezoekers (jongeren en ouderen) ter hand te nemen en te informeren.

Ellen Peeters solliciteerde en werd meteen aangenomen: spontaan, inzicht, positief ingesteld, enthousiast en zeer gemotiveerd. En dat maakte ze allemaal waar.

Ze was in staat om groepen te verbinden en om mensen die voorbijkomen te enthousiasmeren om nader kennis te maken met het Wereldpaviljoen.

En met succes.

Ik kijk met erg veel plezier en voldoening terug aan de periode dat Ellen Peeters bij ons en met ons heeft samengewerkt.`,
    author: "René Poels",
    role: "Oprichter en erevoorzitter van Stichting Wereldpaviljoen (kloosterdorp Steyl) | Meerlo, 10 juni 2026"
  },
  {
    quote: `Hierbij wil ik mijn waardering uitspreken voor de inspirerende en veelzijdige activiteiten die Ellen heeft ontwikkeld en uitgevoerd binnen de verschillende projecten.

De activiteiten kenmerken zich door een sterke combinatie van creativiteit, onderzoekend leren en samenwerking.

Met haar projecten kregen kinderen de kans om kennis niet alleen op te doen, maar vooral ook zelf te ervaren en te ontdekken.

Door praktische opdrachten, creatieve verwerking en samenwerking werden nieuwsgierigheid, eigenaarschap en talentontwikkeling zichtbaar gestimuleerd.

Daarnaast verdient het project “Kerst voor iedereen/Kerst in de toekomst” bijzondere waardering.

De manier waarop mondiaal bewustzijn, culturele diversiteit en samenwerking centraal stonden, getuigt van een eigentijdse en verbindende onderwijsvisie.

De inzet van verschillende disciplines, zoals techniek, kunst, muziek, storytelling en presentatievaardigheden, bood leerlingen de mogelijkheid om hun eigen kwaliteiten te ontdekken en in te zetten binnen een gezamenlijk doel.

De activiteiten laten zien dat er met enthousiasme, vakmanschap en oog voor ieder kind wordt gewerkt aan rijk, betekenisvol en toekomstgericht onderwijs.`,
    author: "Ron Hermans",
    role: "Schoolleider van bs. St. Martinus te Venlo | Voormalige duo-partner (periode aug. '22 - april '23)"
  },
  {
    quote: `Ik heb Ellen leren kennen als een heel bijzondere en betrokken collega in het jaar dat ik als waarnemend directeur werkte op OJBS de Omnibus in Baarlo.

Betrokken bij al haar kinderen maar met name bij de kinderen die iets meer, iets anders nodig hadden.

Bijzonder als in uniek: in haar energie, levenslust en optimisme, ondanks dat het niet allemaal liep zoals ik het haar gunde.

Zo mooi om nu te zien dat Ellen de stap heeft gezet, los van alle kaders, om echt voor zichzelf te kiezen.

Ik weet zeker dat zij vanuit haar visie en vaardigheden van betekenis zal zijn in het leven van mensen en kinderen die zich door haar energie durven laten meenemen.

Ik raad het iedereen aan die klaar is met gebaande paden; loop, vlieg, ren, spring of huppel met Ellen mee over de nog ongebaande paden!`,
    author: "Sandra Bertrand",
    role: "Waarnemend directeur bij OJBS De Omnibus Baarlo (periode mei '23 - juli '24) | Wilhelminastraat 3a, 5975 CK, Sevenum"
  }
];
