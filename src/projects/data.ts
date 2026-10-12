export type Project = {
  slug: string
  title: string
  description: string
  tags: string[]
  color: string
  iconPath: string
  iconColor: string
  dark: boolean
}

// Material Symbols (Rounded) glyphs, viewBox="0 -960 960 960".
const ASTERISK_ICON =
  'M451.5-131.5Q440-143 440-160v-224L282-225q-12 12-28.5 12T225-225q-12-12-12-28.5t12-28.5l159-158H160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h224L225-678q-12-12-12-28.5t12-28.5q12-12 28.5-12t28.5 12l158 159v-224q0-17 11.5-28.5T480-840q17 0 28.5 11.5T520-800v224l158-159q12-12 28.5-12t28.5 12q12 12 12 28.5T735-678L576-520h224q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H576l159 158q12 12 12 28.5T735-225q-12 12-28.5 12T678-225L520-384v224q0 17-11.5 28.5T480-120q-17 0-28.5-11.5Z'
const ADS_CLICK_ICON =
  'M480-640q-66 0-113 47t-47 113q0 45 22.5 83t62.5 59q16 8 22.5 23.5T427-283q-7 14-21 21t-28 0q-63-30-100.5-89T240-480q0-100 70-170t170-70q71 0 130.5 37.5T699-580q6 14-.5 28T678-532q-16 7-32 0t-24-23q-21-40-59-62.5T480-640Zm0-160q-134 0-227 93t-93 227q0 126 83 216t208 102q17 2 29.5 15t11.5 30q-1 17-12.5 28T451-79q-78-5-145.5-39t-118-88.5q-50.5-54.5-79-125T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q157 0 273.5 107T881-509q2 16-9.5 27.5T843-469q-17 1-30.5-11T797-509q-15-120-104.5-205.5T480-800Zm302 700L650-231l-30 91q-5 14-19 13.5T582-141l-91-303q-4-11 5-20t20-5l303 91q14 5 14.5 19T820-340l-91 30 132 132q17 17 17 39t-17 39q-17 17-39.5 17T782-100Z'
const PSYCHOLOGY_ICON =
  'm434-410 4 32q1 8 6.5 13t13.5 5h44q8 0 13.5-5t6.5-13l4-32q8-3 14.5-7t11.5-9l30 13q7 3 14 1t11-9l22-38q4-7 2.5-14t-7.5-12l-26-19q2-8 2-16t-2-16l26-19q6-5 7.5-12t-2.5-14l-22-38q-4-7-11-9t-14 1l-30 13q-5-5-11.5-9t-14.5-7l-4-32q-1-8-6.5-13t-13.5-5h-44q-8 0-13.5 5t-6.5 13l-4 32q-8 3-14.5 7t-11.5 9l-30-13q-7-3-14-1t-11 9l-22 38q-4 7-2.5 14t7.5 12l26 19q-2 8-2 16t2 16l-26 19q-6 5-7.5 12t2.5 14l22 38q4 7 11 9t14-1l30-13q5 5 11.5 9t14.5 7Zm3.5-67.5Q420-495 420-520t17.5-42.5Q455-580 480-580t42.5 17.5Q540-545 540-520t-17.5 42.5Q505-460 480-460t-42.5-17.5ZM240-252q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v40q0 17-11.5 28.5T560-80q-17 0-28.5-11.5T520-120v-80q0-17 11.5-28.5T560-240h120v-160q0-17 11.5-28.5T720-440h68l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v168q0 17-11.5 28.5T280-80q-17 0-28.5-11.5T240-120v-132Zm254-188Z'

export const projects: Project[] = [
  {
    slug: 'produtos-de-dados',
    title: 'Tornando produtos de dados mais fáceis de encontrar, entender e acessar',
    description: 'Redesign completo de uma plataforma de produtos de dados em expansão',
    tags: ['Globo', 'product designer', 'end-to-end', '2025'],
    color: '#FF59A1',
    iconPath: ASTERISK_ICON,
    iconColor: '#FF431D',
    dark: false,
  },
  {
    slug: 'one-click-distribution',
    title: 'One-Click Distribution',
    description: 'Repensando a distribuição editorial no Backstage',
    tags: ['Globo', 'product designer', 'end-to-end', '2025'],
    color: '#FF431D',
    iconPath: ADS_CLICK_ICON,
    iconColor: '#FFEE6A',
    dark: false,
  },
  {
    slug: 'gloria',
    title: 'Glor.IA',
    description: 'Descrição',
    tags: ['Globo', 'product designer', 'end-to-end', '2025'],
    color: '#FFEE6A',
    iconPath: PSYCHOLOGY_ICON,
    iconColor: '#121111',
    dark: true,
  },
]
