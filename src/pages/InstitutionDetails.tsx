import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Globe, ExternalLink } from 'lucide-react';
import { mockProjects } from '@/data/mockData';
import { ProjectCard } from '@/components/ProjectCard';
import type { Institution } from '@/types';

const mockInstitutions: Institution[] = [
  { id: '1', nome: 'Universidade de São Paulo', sigla: 'USP', website: 'https://usp.br', created_at: '2020-01-01' },
  { id: '2', nome: 'Universidade Estadual de Campinas', sigla: 'UNICAMP', website: 'https://unicamp.br', created_at: '2020-01-01' },
  { id: '3', nome: 'Universidade Federal do Rio de Janeiro', sigla: 'UFRJ', website: 'https://ufrj.br', created_at: '2020-01-01' },
  { id: '4', nome: 'Universidade Federal de Minas Gerais', sigla: 'UFMG', website: 'https://ufmg.br', created_at: '2020-01-01' },
  { id: '5', nome: 'Universidade Federal de Santa Catarina', sigla: 'UFSC', website: 'https://ufsc.br', created_at: '2020-01-01' },
  { id: '6', nome: 'Pontifícia Universidade Católica do RS', sigla: 'PUCRS', website: 'https://pucrs.br', created_at: '2020-01-01' },
];

const InstitutionDetails = () => {
  const { id } = useParams();
  const institution = mockInstitutions.find((i) => i.id === id);

  if (!institution) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Instituição não encontrada.</p>
        <Link to="/institutions" className="text-primary hover:underline mt-2 inline-block">Voltar</Link>
      </div>
    );
  }

  const institutionProjects = mockProjects.filter(
    (p) => p.author.institution === institution.sigla
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <Link to="/institutions" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={16} /> Voltar
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Building2 size={28} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{institution.sigla}</h1>
            <p className="text-muted-foreground">{institution.nome}</p>
            {institution.website && (
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
              >
                <Globe size={14} /> {institution.website.replace('https://', '')}
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Projetos ({institutionProjects.length})
        </h2>
        {institutionProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutionProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum projeto desta instituição ainda.</p>
        )}
      </div>
    </div>
  );
};

export default InstitutionDetails;
