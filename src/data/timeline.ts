/**
 * "De tocht" timeline cards on the home page.
 * DRAFT: dates and texts still need checking against the timeline PDF.
 */
export interface TimelineCard {
  year: string;
  place: string;
  title: string;
  text: string;
}

export const TIMELINE: TimelineCard[] = [
  { year: '1853', place: 'Java → Suriname', title: 'De eerste Chinese contractarbeiders', text: 'Een eerste kleine groep Chinese contractarbeiders komt via Java naar Suriname om op de plantages te werken.' },
  { year: '1858', place: 'Macau → Paramaribo', title: 'Schepen uit Zuid-China', text: 'Honderden Chinezen maken de lange zeereis. Ze verlaten hun geboortegrond vanwege oorlog, armoede of politieke onrust. Sommigen overleven de reis niet.' },
  { year: '1863', place: 'Suriname', title: 'Afschaffing van de slavernij', text: 'De koloniale overheid zoekt nieuwe arbeidskrachten voor de plantages. De werving van contractarbeiders uit Azië neemt toe.' },
  { year: '1865', place: 'Hongkong → Suriname', title: 'Nieuwe werving', text: 'Opnieuw vertrekken schepen met Chinese contractarbeiders. Velen blijven na hun contract in Suriname.' },
  { year: '1880', place: 'Paramaribo', title: 'Een eigen vereniging', text: 'Oprichting van Kong Ngie Tong Sang, een ontmoetingsplek en steunpunt voor de Hakka-gemeenschap.' },
  { year: '1900+', place: 'Guangdong → Suriname', title: 'Vrije migratie en winkels', text: 'Hakka-Chinezen komen op eigen initiatief. Winkeliers, ondernemers, vaders en moeders bouwen een nieuw bestaan op, in de stad en in de districten.' },
  { year: '1975', place: 'Suriname → Nederland', title: 'Onafhankelijkheid en vertrek', text: 'Rond de onafhankelijkheid van Suriname vertrekken veel Chinees-Surinaamse families naar Nederland.' },
  { year: 'Nu', place: 'Nederland', title: 'Nederlandse stemmen', text: 'Nieuwe generaties zoeken naar namen, talen en verhalen die bijna verdwenen. Snesie& brengt ze samen.' },
];
