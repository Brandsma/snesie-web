/**
 * Legal text, verbatim from the current snesie.nl site.
 * TODO before launch: fill in [KVK-nummer] and [Adres].
 */
export interface LegalPart {
  h: string;
  text?: string;
  items?: string[];
  after?: string;
  /** Render list items with a dash instead of numbers. */
  bullet?: boolean;
}

export interface LegalDoc {
  id: string;
  n: string;
  title: string;
  toc: string;
  parts: LegalPart[];
}

export const LEGAL_DOCS: LegalDoc[] = [
  {
    "id": "voorwaarden",
    "n": "1",
    "title": "Algemene Voorwaarden Stichting Snesie&",
    "toc": "Algemene voorwaarden",
    "parts": [
      {
        "h": "Artikel 1 - Definities",
        "text": "In deze algemene voorwaarden wordt verstaan onder:",
        "items": [
          "Stichting Snesie&: de gebruiker van deze algemene voorwaarden, gevestigd te Den Haag, ingeschreven bij de Kamer van Koophandel onder nummer [KVK-nummer].",
          "Website: de website van Stichting Snesie&, te bereiken via www.snesie.nl.",
          "Bezoeker: iedere natuurlijke of rechtspersoon die de Website bezoekt of gebruik maakt van de door Stichting Snesie& aangeboden diensten, producten of activiteiten.",
          "Deelnemer: een Bezoeker die zich heeft aangemeld voor of deelneemt aan een activiteit, project, interview of evenement van Stichting Snesie&.",
          "Overeenkomst: elke overeenkomst tussen Stichting Snesie& en een Deelnemer of Bezoeker.",
          "Oral History-materiaal: de verzamelde interviews, verhalen, foto's, documenten en andere erfgoedmaterialen die in het kader van de projecten van Stichting Snesie& worden vastgelegd."
        ]
      },
      {
        "h": "Artikel 2 - Toepasselijkheid",
        "items": [
          "Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, diensten, producten en activiteiten van Stichting Snesie&, waaronder mede begrepen het gebruik van de Website, deelname aan oral history-projecten, educatieve programma's, publieksprogrammering (zoals tentoonstellingen, lezingen, podcasts, documentaires en evenementen) en alle andere door Stichting Snesie& georganiseerde activiteiten.",
          "Afwijkingen van deze voorwaarden zijn slechts geldig indien deze uitdrukkelijk en schriftelijk zijn overeengekomen.",
          "Indien één of meerdere bepalingen van deze algemene voorwaarden nietig zijn of vernietigd worden, blijven de overige bepalingen volledig van toepassing."
        ]
      },
      {
        "h": "Artikel 3 - Aanbod en totstandkoming Overeenkomst",
        "items": [
          "Alle aanbiedingen van Stichting Snesie& zijn vrijblijvend en onder voorbehoud van beschikbaarheid.",
          "Een Overeenkomst komt tot stand op het moment dat een Bezoeker zich aanmeldt voor een activiteit of op een andere wijze accepteert gebruik te maken van de diensten van Stichting Snesie&."
        ]
      },
      {
        "h": "Artikel 4 - Deelname aan activiteiten en projecten",
        "items": [
          "Voor deelname aan activiteiten en projecten kan inschrijving of aanmelding vereist zijn. Stichting Snesie& behoudt zich het recht voor deelnemers te weigeren of te verwijderen indien daar gegronde redenen voor zijn, waaronder maar niet beperkt tot onvolledige of onjuiste informatie bij aanmelding, of gedrag dat in strijd is met de doelstellingen van de Stichting.",
          "Deelnemers aan oral history-projecten verlenen, na voorafgaande geïnformeerde toestemming, toestemming voor het vastleggen, bewerken, archiveren en publiceren van hun verhalen en bijbehorend materiaal, overeenkomstig de doelstellingen van Snesie& zoals beschreven in het beleidsplan.",
          "Stichting Snesie& streeft naar een veilige en respectvolle omgeving voor alle deelnemers. Discriminerend, intimiderend of anderszins ongepast gedrag wordt niet getolereerd en kan leiden tot uitsluiting van deelname."
        ]
      },
      {
        "h": "Artikel 5 - Intellectueel eigendom",
        "items": [
          "Alle intellectuele eigendomsrechten op de Website, de daarop getoonde content (waaronder teksten, afbeeldingen, video's, geluidsfragmenten en vormgeving) en de door Stichting Snesie& ontwikkelde materialen, berusten bij Stichting Snesie& of haar licentiegevers.",
          "Het is niet toegestaan om content van de Website of van Stichting Snesie& over te nemen, te verveelvoudigen of openbaar te maken zonder voorafgaande schriftelijke toestemming van Stichting Snesie&, tenzij dit noodzakelijk is voor een citaat of verwijzing met bronvermelding.",
          "Deelnemers die Oral History-materiaal aanleveren, behouden hun rechten op dit materiaal, maar verlenen Stichting Snesie& een niet-exclusieve, wereldwijde, royaltyvrije licentie om dit materiaal te gebruiken, te bewerken, te archiveren en openbaar te maken voor de doeleinden van de Stichting, zoals vastgelegd in de toestemmingsverklaring."
        ]
      },
      {
        "h": "Artikel 6 - Aansprakelijkheid",
        "items": [
          "Stichting Snesie& sluit, voor zover wettelijk toegestaan, iedere aansprakelijkheid uit voor schade die voortvloeit uit het gebruik van de Website of deelname aan activiteiten, tenzij de schade het gevolg is van opzet of bewuste roekeloosheid van Stichting Snesie&.",
          "Stichting Snesie& is niet aansprakelijk voor schade als gevolg van onjuiste of onvolledige informatie die door Deelnemers of derden is verstrekt.",
          "De Website en de inhoud daarvan worden aangeboden 'as is' en 'as available'. Stichting Snesie& geeft geen garanties omtrent de ononderbroken werking, veiligheid of foutloosheid van de Website."
        ]
      },
      {
        "h": "Artikel 7 - Wijzigingen",
        "text": "Stichting Snesie& behoudt zich het recht voor deze algemene voorwaarden eenzijdig te wijzigen. De gewijzigde voorwaarden worden op de Website gepubliceerd. Het is aan te raden de voorwaarden regelmatig te raadplegen."
      },
      {
        "h": "Artikel 8 - Toepasselijk recht en geschillen",
        "text": "Op alle rechtsbetrekkingen tussen Stichting Snesie& en Bezoekers/Deelnemers is het Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waar Stichting Snesie& is gevestigd."
      }
    ]
  },
  {
    "id": "privacy",
    "n": "2",
    "title": "Privacyverklaring Stichting Snesie&",
    "toc": "Privacyverklaring",
    "parts": [
      {
        "h": "Inleiding",
        "text": "Stichting Snesie& hecht grote waarde aan de bescherming van uw privacy en persoonsgegevens. Wij verwerken persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG). In deze privacyverklaring leggen wij uit welke persoonsgegevens wij verzamelen, waarom wij dat doen, hoe wij deze beschermen en wat uw rechten zijn."
      },
      {
        "h": "Verwerkingsverantwoordelijke",
        "text": "Stichting Snesie&, gevestigd te [Adres], ingeschreven bij de Kamer van Koophandel onder nummer [KVK-nummer], is verantwoordelijk voor de verwerking van persoonsgegevens."
      },
      {
        "h": "Welke persoonsgegevens verwerken wij en voor welke doeleinden?",
        "text": "Wij verwerken persoonsgegevens voor de volgende doeleinden:",
        "items": [
          "Projectuitvoering (o.a. Oral History): Voor de uitvoering van onze projecten, zoals het afnemen van oral history-interviews, kunnen wij de volgende gegevens verwerken: naam, contactgegevens, familiegeschiedenis, migratieverhalen, culturele achtergrond en andere informatie die u met ons deelt. Dit gebeurt altijd op basis van uw uitdrukkelijke toestemming.",
          "Communicatie en nieuwsbrieven: Wanneer u zich inschrijft voor onze nieuwsbrief of contact met ons opneemt, verwerken wij uw naam en e-mailadres om u te informeren over onze activiteiten.",
          "Websitebeheer en -optimalisatie: Wij verwerken technische gegevens zoals uw IP-adres, browsertype, de pagina's die u bezoekt en de duur van uw bezoek om onze Website te verbeteren en het gebruik te analyseren. Dit doen wij met behulp van cookies (zie cookiebeleid).",
          "Evenementen en publieksprogrammering: Voor aanmeldingen voor tentoonstellingen, lezingen, podcasts en andere evenementen verwerken wij uw naam en e-mailadres.",
          "Vrijwilligers en samenwerkingspartners: Wij verwerken persoonsgegevens van vrijwilligers en samenwerkingspartners voor de uitvoering van onze werkzaamheden."
        ]
      },
      {
        "h": "Grondslag voor verwerking",
        "text": "Wij verwerken persoonsgegevens op basis van een van de volgende gronden:",
        "items": [
          "Toestemming van de betrokkene (bijvoorbeeld voor deelname aan oral history-projecten of het ontvangen van de nieuwsbrief).",
          "De uitvoering van een overeenkomst (bijvoorbeeld voor deelname aan een activiteit).",
          "Een wettelijke verplichting.",
          "Gerechtvaardigd belang (bijvoorbeeld voor website-optimalisatie, mits uw privacy hierdoor niet onevenredig wordt geschaad)."
        ],
        "bullet": true
      },
      {
        "h": "Bewaartermijnen",
        "text": "Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk is voor de doeleinden waarvoor ze zijn verzameld. Oral History-materiaal wordt, met uw toestemming, duurzaam bewaard voor toekomstige generaties en onderzoekers in een erkend archief (zoals het CBG Centrum voor Familiegeschiedenis of het Haags Gemeentearchief)."
      },
      {
        "h": "Delen met derden",
        "text": "Wij delen uw persoonsgegevens alleen met derden indien dit noodzakelijk is voor de uitvoering van onze activiteiten (bijvoorbeeld met een archiefinstelling voor duurzame bewaring, of met een IT-leverancier voor websitebeheer) of wanneer wij daartoe wettelijk verplicht zijn. Wij sluiten met deze partijen verwerkersovereenkomsten af om de bescherming van uw gegevens te waarborgen."
      },
      {
        "h": "Uw rechten",
        "text": "U heeft het recht om:",
        "items": [
          "Inzage te krijgen in de persoonsgegevens die wij van u verwerken.",
          "Onjuiste gegevens te laten corrigeren.",
          "Verwijdering van uw gegevens te verzoeken (tenzij wij deze nodig hebben voor een wettelijke verplichting of een zwaarwegend belang).",
          "De verwerking van uw gegevens te beperken.",
          "Bezwaar te maken tegen de verwerking.",
          "Uw toestemming voor de verwerking in te trekken (voor zover de verwerking op toestemming is gebaseerd).",
          "Uw gegevens overdraagbaar te maken."
        ],
        "after": "Neem voor het uitoefenen van uw rechten contact met ons op via info@snesie.nl. U heeft ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens."
      },
      {
        "h": "Beveiliging",
        "text": "Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen verlies, misbruik, onbevoegde toegang en ongewenste openbaarmaking."
      },
      {
        "h": "Wijzigingen",
        "text": "Wij behouden ons het recht voor dit cookiebeleid te wijzigen. De actuele versie staat altijd op onze Website."
      }
    ]
  },
  {
    "id": "cookies",
    "n": "3",
    "title": "Cookiebeleid Stichting Snesie&",
    "toc": "Cookiebeleid",
    "parts": [
      {
        "h": "Wat zijn cookies?",
        "text": "Cookies zijn kleine tekstbestanden die een website op uw computer, tablet of mobiele telefoon plaatst wanneer u de website bezoekt. Ze slaan informatie op over uw websitebezoek, zodat de website u bijvoorbeeld kan herkennen bij een volgend bezoek."
      },
      {
        "h": "Welke cookies gebruiken wij?",
        "text": "Stichting Snesie& maakt gebruik van de volgende soorten cookies:",
        "items": [
          "Functionele cookies: Deze cookies zijn noodzakelijk voor het goed functioneren van de Website. Ze zorgen ervoor dat de Website naar behoren werkt en dat u bijvoorbeeld ingelogd kunt blijven. Deze cookies plaatsen wij altijd.",
          "Analytische cookies: Met deze cookies kunnen wij het websitebezoek meten en analyseren. Wij krijgen inzicht in hoe vaak onze site wordt bezocht, welke pagina's populair zijn en hoe bezoekers onze site gebruiken. Dit helpt ons de Website te verbeteren. De verzamelde statistieken kunnen wij niet herleiden tot personen. Voor analytische cookies vragen wij uw toestemming, tenzij zij slechts een geringe inbreuk op uw privacy maken.",
          "Third-party cookies: Voor functionaliteiten zoals het delen van content via social media (bijv. Facebook, Instagram, LinkedIn) of het insluiten van video's (bijv. YouTube) kunnen cookies van derden worden geplaatst. Deze cookies bewaren doorgaans geen persoonsgegevens die aan een individu zijn te koppelen. Voor deze cookies vragen wij uw uitdrukkelijke toestemming."
        ]
      },
      {
        "h": "Toestemming",
        "text": "Bij uw eerste bezoek aan onze Website vragen wij uw toestemming voor het plaatsen van niet-functionele cookies. U kunt uw cookie-instellingen op elk moment aanpassen via de browserinstellingen of via de cookie-instellingen op onze Website."
      },
      {
        "h": "Cookies uitschakelen",
        "text": "U kunt uw browser zo instellen dat u wordt gewaarschuwd wanneer cookies worden geplaatst, of dat alle cookies of alleen cookies van derden worden geweigerd. Houd er rekening mee dat sommige delen van de Website dan mogelijk niet of niet optimaal functioneren."
      },
      {
        "h": "Wijzigingen",
        "text": "Wij behouden ons het recht voor dit cookiebeleid te wijzigen. De actuele versie staat altijd op onze Website."
      }
    ]
  }
];
