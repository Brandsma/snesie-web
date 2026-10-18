/**
 * Example family tree on the home page (fictional people).
 * Rows go from great-grandparents (8) down to "Jij" (1); the parents of the
 * node at index i in row r+1 are at indices 2i and 2i+1 in row r.
 */
export interface TreeNode {
  id: string;
  gen: string;
  short: string;
  title: string;
  text: string;
  unknown: boolean;
}

export interface TreeRow {
  label: string;
  nodes: TreeNode[];
}

const K = (id: string, gen: string, short: string, title: string, text: string): TreeNode => ({ id, gen, short, title, text, unknown: false });
const U = (id: string, gen: string, short: string, title: string, text: string): TreeNode => ({ id, gen, short, title, text, unknown: true });

export const TREE: TreeRow[] = [
  {
    label: 'Overgroot­ouders',
    nodes: [
      K('og1', 'Overgrootouders', 'Overgrootvader', 'Overgrootvader, ca. 1884', 'Vertrok uit Guangdong en kwam rond 1905 aan in Paramaribo. Opende een winkel in het district.'),
      U('og2', 'Overgrootouders', 'Overgrootmoeder', 'Overgrootmoeder', 'Ze runde de winkel en zorgde voor het gezin. Haar naam is nergens opgeschreven.'),
      U('og3', 'Overgrootouders', 'Overgrootvader', 'Overgrootvader', 'Niemand in de familie weet nog waar hij vandaan kwam.'),
      U('og4', 'Overgrootouders', 'Overgrootmoeder', 'Overgrootmoeder', 'Er is één foto van haar. Op de achterkant staat geen naam.'),
      K('og5', 'Overgrootouders', 'Overgrootvader', 'Overgrootvader, ca. 1879', 'Kwam als contractarbeider. Na zijn contract bleef hij in Suriname.'),
      U('og6', 'Overgrootouders', 'Overgrootmoeder', 'Overgrootmoeder', 'Creoolse overgrootmoeder. Haar familienaam verdween uit het familiegeheugen.'),
      K('og7', 'Overgrootouders', 'Overgrootmoeder', 'Overgrootmoeder, ca. 1890', 'Reisde per schip om te trouwen met een man die ze alleen van een foto kende.'),
      U('og8', 'Overgrootouders', 'Overgrootvader', 'Overgrootvader', 'Over hem werd thuis nooit gesproken.'),
    ],
  },
  {
    label: 'Grootouders',
    nodes: [
      K('g1', 'Grootouders', 'Opa', 'Opa, 1912', 'Geboren in Paramaribo. Als kind naar China gestuurd om de taal en cultuur van zijn voorouders te leren.'),
      K('g2', 'Grootouders', 'Oma', 'Oma, 1918', 'Werkte haar hele leven in de winkel. Kookte elke zondag voor de hele familie.'),
      K('g3', 'Grootouders', 'Opa', 'Opa, 1915', 'Sprak Hakka, Sranantongo en Nederlands.'),
      U('g4', 'Grootouders', 'Oma', 'Oma', 'Haar meisjesnaam weet niemand meer zeker.'),
    ],
  },
  {
    label: 'Ouders',
    nodes: [
      K('p1', 'Ouders', 'Vader', 'Vader, 1948', 'Vertrok in 1975 naar Nederland.'),
      K('p2', 'Ouders', 'Moeder', 'Moeder, 1952', 'Verstaat nog een beetje Hakka, maar spreekt het niet meer.'),
    ],
  },
  { label: '', nodes: [K('me', 'Jij', 'Jij', 'Jij', 'Waar begint jouw verhaal? Vraag het na, nu het nog kan.')] },
];

export const DEFAULT_SELECTED = 'og2';

/** Ids on the path from the given node down to "Jij" (inclusive). */
export function lineage(id: string, tree: TreeRow[] = TREE): Set<string> {
  const path = new Set<string>();
  let r = tree.findIndex((row) => row.nodes.some((n) => n.id === id));
  if (r < 0) return path;
  let i = tree[r].nodes.findIndex((n) => n.id === id);
  for (; r < tree.length; r++, i = Math.floor(i / 2)) path.add(tree[r].nodes[i].id);
  return path;
}

export const yearOf = (n: TreeNode) => n.title.match(/\d{4}/)?.[0];
