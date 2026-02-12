import type { User, Project, UniversityEvent, Invitation } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Ana Silva', email: 'ana@usp.br', institution: 'USP', course: 'Ciência da Computação', rank: 'A', projectCount: 8, eventCount: 5, avatar: '', bio: 'Desenvolvedora full-stack apaixonada por IA.' },
  { id: '2', name: 'Carlos Santos', email: 'carlos@unicamp.br', institution: 'UNICAMP', course: 'Engenharia de Software', rank: 'B', projectCount: 5, eventCount: 3, avatar: '' },
  { id: '3', name: 'Maria Oliveira', email: 'maria@ufrj.br', institution: 'UFRJ', course: 'Sistemas de Informação', rank: 'S', projectCount: 12, eventCount: 7, avatar: '' },
  { id: '4', name: 'Pedro Costa', email: 'pedro@ufmg.br', institution: 'UFMG', course: 'Ciência de Dados', rank: 'C', projectCount: 3, eventCount: 2, avatar: '' },
  { id: '5', name: 'Juliana Lima', email: 'juliana@ufsc.br', institution: 'UFSC', course: 'Engenharia da Computação', rank: 'D', projectCount: 2, eventCount: 1, avatar: '' },
];

export const mockProjects: Project[] = [
  {
    id: '1', title: 'Sistema de Gestão Acadêmica', description: 'Plataforma completa para gestão de notas, frequência e histórico acadêmico com dashboard administrativo e portal do aluno. Desenvolvido com Spring Boot e React.', category: 'Desenvolvimento Web', rank: 'A', coverImage: '', pdfUrl: '#', repositoryUrl: 'https://github.com', author: mockUsers[0], participants: [mockUsers[1], mockUsers[3]], createdAt: '2026-01-15', comments: [
      { id: 'c1', author: mockUsers[1], content: 'Projeto muito bem estruturado! Parabéns pela arquitetura.', createdAt: '2026-01-20' },
      { id: 'c2', author: mockUsers[2], content: 'Gostaria de contribuir na parte de IA para recomendações.', createdAt: '2026-01-22' },
    ],
  },
  {
    id: '2', title: 'App de Caronas Universitárias', description: 'Aplicativo mobile para conectar estudantes que buscam caronas para a universidade. Inclui sistema de avaliação e rotas otimizadas.', category: 'Mobile', rank: 'C', coverImage: '', author: mockUsers[1], participants: [mockUsers[4]], createdAt: '2026-02-01', comments: [],
  },
  {
    id: '3', title: 'IA para Detecção de Plágio', description: 'Sistema avançado de detecção de plágio acadêmico utilizando NLP e deep learning. Analisa similaridade semântica entre documentos.', category: 'IA & Machine Learning', rank: 'S', coverImage: '', repositoryUrl: 'https://github.com', author: mockUsers[2], participants: [mockUsers[0], mockUsers[3]], createdAt: '2025-11-10', comments: [],
  },
  {
    id: '4', title: 'Plataforma de Monitoria Online', description: 'Sistema para agendar e realizar monitorias online com videoconferência integrada, compartilhamento de tela e quadro branco virtual.', category: 'Desenvolvimento Web', rank: 'B', coverImage: '', pdfUrl: '#', author: mockUsers[3], participants: [mockUsers[0]], createdAt: '2026-01-28', comments: [],
  },
  {
    id: '5', title: 'Bot de Atendimento ao Aluno', description: 'Chatbot inteligente para tirar dúvidas frequentes de alunos sobre matrícula, notas e calendário acadêmico.', category: 'IA & Machine Learning', rank: 'D', coverImage: '', author: mockUsers[4], participants: [], createdAt: '2026-02-05', comments: [],
  },
  {
    id: '6', title: 'Dashboard de Notas', description: 'Painel simples para visualização de notas e média acadêmica com gráficos interativos.', category: 'Ciência de Dados', rank: 'E', coverImage: '', author: mockUsers[1], participants: [mockUsers[4]], createdAt: '2026-02-08', comments: [],
  },
];

export const mockEvents: UniversityEvent[] = [
  { id: '1', title: 'HackUSP 2026', description: 'O maior hackathon universitário do Brasil. 48 horas de inovação, mentorias e networking com líderes da indústria tech.', type: 'hackathon', banner: '', date: '2026-03-15', location: 'São Paulo, SP', organizer: 'Centro Acadêmico de Computação', institution: 'USP', participants: [mockUsers[0], mockUsers[1], mockUsers[2]], status: 'open' },
  { id: '2', title: 'Conferência Nacional de IA', description: 'Conferência com palestras sobre os avanços mais recentes em inteligência artificial e suas aplicações na academia e indústria.', type: 'conference', banner: '', date: '2026-04-20', location: 'Rio de Janeiro, RJ', organizer: 'Departamento de Computação', institution: 'UFRJ', participants: [mockUsers[2], mockUsers[3]], status: 'open' },
  { id: '3', title: 'Jogos Universitários UFMG', description: 'Competição esportiva interuniversitária com diversas modalidades. Venha representar sua universidade!', type: 'games', banner: '', date: '2026-05-10', location: 'Belo Horizonte, MG', organizer: 'Diretório Acadêmico', institution: 'UFMG', participants: [mockUsers[3], mockUsers[4]], status: 'open' },
  { id: '4', title: 'Concurso de Inovação Tecnológica', description: 'Apresente sua solução inovadora e concorra a prêmios e incubação do seu projeto. Aberto a todos os cursos.', type: 'contest', banner: '', date: '2026-02-01', location: 'Campinas, SP', organizer: 'Incubadora UNICAMP', institution: 'UNICAMP', participants: mockUsers, status: 'closed' },
];

export const mockInvitations: Invitation[] = [
  { id: '1', projectId: '1', projectTitle: 'Sistema de Gestão Acadêmica', from: mockUsers[0], to: mockUsers[2], status: 'pending', createdAt: '2026-02-10' },
  { id: '2', projectId: '3', projectTitle: 'IA para Detecção de Plágio', from: mockUsers[2], to: mockUsers[4], status: 'accepted', createdAt: '2026-01-15' },
  { id: '3', projectId: '4', projectTitle: 'Plataforma de Monitoria Online', from: mockUsers[3], to: mockUsers[1], status: 'rejected', createdAt: '2026-01-30' },
];
