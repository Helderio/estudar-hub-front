import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building2, Globe, ExternalLink, MapPin, Users } from 'lucide-react';
import { mockProjects } from '@/data/mockData';
import { ProjectCard } from '@/components/ProjectCard';

const mockInstitutions = [
  { id: '1', nome: 'Universidade Katyavala Bwila', sigla: 'UKB', website: 'https://ukb.ao', location: 'Benguela', students: 1540, courses: ['Engenharia Informática', 'Medicina', 'Direito', 'Economia'] },
  { id: '2', nome: 'Instituto Superior de Ciências da Educação', sigla: 'ISCED-BG', website: 'https://isced-benguela.ao', location: 'Benguela', students: 980, courses: ['Educação', 'Psicologia', 'Direito'] },
  { id: '3', nome: 'Universidade Mandume Ya Ndemufayo', sigla: 'UMA', website: 'https://umandume.ao', location: 'Lobito', students: 720, courses: ['Medicina', 'Ciências da Saúde'] },
  { id: '4', nome: 'Instituto Superior Politécnico de Benguela', sigla: 'ISPB', website: 'https://ispb.ao', location: 'Benguela', students: 560, courses: ['Economia', 'Gestão de Empresas'] },
  { id: '5', nome: 'Universidade Jean Piaget de Angola', sigla: 'UJP', website: 'https://unipiaget.ao', location: 'Benguela', students: 430, courses: ['Engenharia Informática', 'Gestão'] },
  { id: '6', nome: 'Instituto Superior Politécnico do Lobito', sigla: 'ISPL', website: 'https://ispl.ao', location: 'Lobito', students: 320, courses: ['Engenharia', 'Gestão'] },
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
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{institution.sigla}</h1>
            <p className="text-muted-foreground">{institution.nome}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={14} /> {institution.location}</span>
              <span className="flex items-center gap-1"><Users size={14} /> {institution.students.toLocaleString()} estudantes</span>
            </div>
            {institution.website && (
              <a href={institution.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline">
                <Globe size={14} /> {institution.website.replace('https://', '')} <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Courses */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3">Cursos disponíveis</h3>
          <div className="flex flex-wrap gap-2">
            {institution.courses.map(c => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium">{c}</span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">
          Projectos ({institutionProjects.length})
        </h2>
        {institutionProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutionProjects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum projecto desta instituição ainda.</p>
        )}
      </div>
    </div>
  );
};

export default InstitutionDetails;
