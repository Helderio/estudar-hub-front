export const overviewStats = {
  totalUsers: 12_847,
  totalProjects: 3_562,
  totalEvents: 284,
  totalInstitutions: 47,
  userGrowth: 12.5,
  projectGrowth: 8.3,
  eventGrowth: 23.1,
  institutionGrowth: 4.2,
};

export const userGrowthData = [
  { month: 'Jan', users: 4200, projects: 890 },
  { month: 'Fev', users: 5100, projects: 1020 },
  { month: 'Mar', users: 5800, projects: 1180 },
  { month: 'Abr', users: 6400, projects: 1350 },
  { month: 'Mai', users: 7200, projects: 1560 },
  { month: 'Jun', users: 8100, projects: 1780 },
  { month: 'Jul', users: 9000, projects: 2010 },
  { month: 'Ago', users: 9800, projects: 2250 },
  { month: 'Set', users: 10600, projects: 2480 },
  { month: 'Out', users: 11300, projects: 2750 },
  { month: 'Nov', users: 12100, projects: 3100 },
  { month: 'Dez', users: 12847, projects: 3562 },
];

export const rankDistribution = [
  { rank: 'E', count: 1200, fill: 'hsl(142, 71%, 45%)' },
  { rank: 'D', count: 850, fill: 'hsl(173, 80%, 40%)' },
  { rank: 'C', count: 620, fill: 'hsl(45, 93%, 47%)' },
  { rank: 'B', count: 480, fill: 'hsl(25, 95%, 53%)' },
  { rank: 'A', count: 310, fill: 'hsl(0, 84%, 60%)' },
  { rank: 'S', count: 102, fill: 'hsl(270, 76%, 55%)' },
];

export const categoryDistribution = [
  { name: 'Desenvolvimento Web', value: 980 },
  { name: 'Mobile', value: 620 },
  { name: 'IA & ML', value: 510 },
  { name: 'Ciência de Dados', value: 430 },
  { name: 'IoT', value: 280 },
  { name: 'Segurança', value: 210 },
  { name: 'DevOps', value: 180 },
  { name: 'Jogos', value: 160 },
  { name: 'Outros', value: 192 },
];

export const recentUsers = [
  { id: '1', name: 'Ana Silva', email: 'ana@usp.br', institution: 'USP', course: 'Ciência da Computação', rank: 'B' as const, projects: 5, joinedAt: '2026-02-12' },
  { id: '2', name: 'Pedro Santos', email: 'pedro@unicamp.br', institution: 'Unicamp', course: 'Engenharia de Software', rank: 'A' as const, projects: 8, joinedAt: '2026-02-11' },
  { id: '3', name: 'Maria Costa', email: 'maria@ufrj.br', institution: 'UFRJ', course: 'Sistemas de Informação', rank: 'C' as const, projects: 3, joinedAt: '2026-02-10' },
  { id: '4', name: 'Lucas Oliveira', email: 'lucas@ufmg.br', institution: 'UFMG', course: 'Ciência da Computação', rank: 'S' as const, projects: 12, joinedAt: '2026-02-09' },
  { id: '5', name: 'Julia Ferreira', email: 'julia@pucrs.br', institution: 'PUCRS', course: 'Análise de Dados', rank: 'D' as const, projects: 2, joinedAt: '2026-02-08' },
];

export const topInstitutions = [
  { name: 'USP', users: 2340, projects: 780 },
  { name: 'Unicamp', users: 1890, projects: 620 },
  { name: 'UFRJ', users: 1560, projects: 510 },
  { name: 'UFMG', users: 1230, projects: 430 },
  { name: 'PUCRS', users: 980, projects: 350 },
];
