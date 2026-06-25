# Developer & Update Guide - Ellen Bruist Mee Landingspagina

Deze handleiding legt uit hoe de mappenstructuur van de website in elkaar zit en hoe u (of uw klant) in de toekomst eenvoudig teksten, contactgegevens en **nieuwe projecten / referentieteksten** kunt toevoegen zonder dat u de complexe React-code hoeft aan te raken.

---

## 📂 Mappenstructuur

De belangrijkste bestanden en mappen zijn als volgt ingedeeld:

```text
ellen-bruist-mee/
├── src/
│   ├── data/
│   │   └── websiteData.js      <-- [CRUCIAAL] Alle teksten, quotes & projecten staan hier!
│   ├── assets/
│   │   ├── ellen-reis.jpg      <-- Foto van Ellen
│   │   └── hero.png            <-- Eventuele achtergrondafbeeldingen
│   ├── App.jsx                 <-- De code, layout en animaties (blijft ongewijzigd)
│   ├── index.css               <-- CSS stijlen, animaties en prestatie-instellingen
│   └── main.jsx                <-- Startpunt van React
├── package.json                <-- Projectafhankelijkheden en scripts (npm run build)
├── tailwind.config.js          <-- Kleurenpallet en fonts definitie
└── DEVELOPER_GUIDE.md          <-- Deze handleiding
```

---

## ✏️ Hoe doe ik aanpassingen? (Over 6 maanden of later)

Alle website-inhoud is gecentraliseerd in het bestand:
👉 **[src/data/websiteData.js](file:///C:/Users/Sil/.gemini/antigravity/scratch/ellen-bruist-mee/src/data/websiteData.js)**

Dit is een standaard JavaScript-bestand met gestructureerde arrays en objecten. U hoeft hier alleen de tekstwaarden aan te passen.

### 1. Nieuwe Projecten / Klantenklussen Toevoegen
Om een nieuw project toe te voegen in de sectie *"Een greep uit wat ik deed"* (op de homepage) en op de pagina *"Al mijn projecten"*, opent u `src/data/websiteData.js` en scrolt u naar de array `ALL_PROJECTS` (helemaal onderaan).

Voeg simpelweg een nieuw object toe aan de array:

```javascript
export const ALL_PROJECTS = [
  // Bestaande projecten...
  {
    title: 'Plastic Fantastic',
    category: 'Rondom de school',
    desc: 'Duurzaamheidsproject waarin kinderen samen reusachtige, fantasierijke dieren bouwden...',
    color: 'border-brand-turquoise/20 hover:border-brand-turquoise text-brand-aubergine',
    badgeBg: 'bg-brand-turquoise/10 text-brand-turquoise'
  },
  // VOEG HIER UW NIEUWE PROJECT TOE:
  {
    title: 'Naam van de nieuwe klantklus',
    category: 'Binnen de school', // Kies uit: 'Binnen de school', 'Rondom de school', of 'Rondom het kind'
    desc: 'Beschrijving van de geweldige resultaten en wat er precies gedaan is in 1 of 2 zinnen.',
    color: 'border-brand-orange/20 hover:border-brand-orange text-brand-aubergine',
    badgeBg: 'bg-brand-orange/10 text-brand-orange'
  }
];
```

*De projectenpagina filtert deze categorieën automatisch en voegt het project direct toe aan de lijst.*

---

### 2. Contactgegevens Wijzigen
Als de e-mail of het telefoonnummer van de klant verandert, past u dit aan in de `CONTACT_INFO` constante:

```javascript
export const CONTACT_INFO = {
  email: 'info@ellenbruistmee.nl',
  phone: '+31 6 12345678',
  workArea: 'Midden-Nederland & online'
};
```
*Dit wordt automatisch doorgevoerd op alle plekken op de website (inclusief het contactformulier, de directe maillinks en de footer).*

---

### 3. Citaten / Slogans Wijzigen
De quotes die op de startpagina in de zwevende quote-kaart roteren, kunt u aanpassen in de `HERO_QUOTES` array:

```javascript
export const HERO_QUOTES = [
  { 
    text: "Mislukken, zoveel leuker dan nooit proberen.", 
    style: "font-display font-black tracking-tight uppercase" 
  },
  { 
    text: "Nieuwe inspirerende quote voor op de kaart.", 
    style: "font-serif italic font-bold" // Lettertype stijl: font-serif italic, font-sans, of font-display
  }
];
```

---

## 🚀 De site opnieuw live zetten

Nadat u een wijziging heeft doorgevoerd in `src/data/websiteData.js`:

1. **Bouw de site opnieuw op:**
   Open uw terminal in de map `ellen-bruist-mee` en voer uit:
   ```bash
   npm run build
   ```
   Dit genereert een gloednieuwe, geoptimaliseerde `dist`-map.

2. **Uploaden naar Netlify:**
   - **Optie A (Snelst):** Sleep de nieuwe map `dist` opnieuw naar [Netlify Drop](https://app.netlify.com/drop).
   - **Optie B (Automatisch):** Als u de site aan GitHub heeft gekoppeld, hoeft u de wijzigingen alleen maar te pushen (`git add .`, `git commit -m "update projecten"`, `git push`). Netlify merkt dit en bouwt en deployt de site automatisch opnieuw binnen 10 seconden!
