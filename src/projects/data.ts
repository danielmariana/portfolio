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

// Material Symbols (Sharp) glyphs, viewBox="0 -960 960 960".
const ASTERISK_ICON =
  'M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z'
const ADS_CLICK_ICON =
  'M468-240q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480-640q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84Zm48 158q-9 2-18 2h-18q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v18q0 9-2 18l-78-24v-12q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h12l24 78Zm305 22L650-231 600-80 480-480l400 120-151 50 171 171-79 79Z'
const PSYCHOLOGY_ICON =
  'M440-360h80l6-50q8-3 14.5-7t11.5-9l46 20 40-68-40-30q2-8 2-16t-2-16l40-30-40-68-46 20q-5-5-11.5-9t-14.5-7l-6-50h-80l-6 50q-8 3-14.5 7t-11.5 9l-46-20-40 68 40 30q-2 8-2 16t2 16l-40 30 40 68 46-20q5 5 11.5 9t14.5 7l6 50Zm-2.5-117.5Q420-495 420-520t17.5-42.5Q455-580 480-580t42.5 17.5Q540-545 540-520t-17.5 42.5Q505-460 480-460t-42.5-17.5ZM240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l64 255H760v200H600v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Z'

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
