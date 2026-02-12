export type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export const RANK_INFO: Record<Rank, { label: string; description: string }> = {
  E: { label: 'Muito Simples', description: 'Projetos introdutórios e exercícios básicos' },
  D: { label: 'Simples', description: 'Projetos com escopo pequeno e baixa complexidade' },
  C: { label: 'Médio', description: 'Projetos com complexidade moderada e múltiplas funcionalidades' },
  B: { label: 'Avançado', description: 'Projetos robustos com arquitetura complexa' },
  A: { label: 'TCC', description: 'Trabalhos de conclusão de curso com fundamentação teórica' },
  S: { label: 'Pesquisa Científica', description: 'Pesquisa acadêmica com contribuição original ao conhecimento' },
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  institution: string;
  course: string;
  avatar?: string;
  rank: Rank;
  projectCount: number;
  eventCount: number;
  bio?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  rank: Rank;
  coverImage: string;
  pdfUrl?: string;
  repositoryUrl?: string;
  author: User;
  participants: User[];
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export type EventType = 'hackathon' | 'conference' | 'contest' | 'games';

export interface UniversityEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  banner: string;
  date: string;
  location: string;
  organizer: string;
  institution: string;
  participants: User[];
  status: 'open' | 'closed';
}

export type ParticipationStatus = 'pending' | 'accepted' | 'rejected';

export interface Invitation {
  id: string;
  projectId: string;
  projectTitle: string;
  from: User;
  to: User;
  status: ParticipationStatus;
  createdAt: string;
}

export const PROJECT_CATEGORIES = [
  'Desenvolvimento Web',
  'Mobile',
  'IA & Machine Learning',
  'Ciência de Dados',
  'IoT',
  'Segurança',
  'DevOps',
  'Banco de Dados',
  'Jogos',
  'Outro',
] as const;

export const EVENT_TYPES: Record<EventType, string> = {
  hackathon: 'Hackathon',
  conference: 'Conferência',
  contest: 'Concurso',
  games: 'Jogos Universitários',
};
