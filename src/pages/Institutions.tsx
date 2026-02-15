import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { Building2, Globe, ArrowRight, MapPin } from 'lucide-react';
import type { Institution } from '@/types';

const mockInstitutions: (Institution & { location: string; students: number })[] = [
  { id: '1', nome: 'Universidade Katyavala Bwila', sigla: 'UKB', website: 'https://ukb.ao', created_at: '2009-01-01', location: 'Benguela', students: 1540 },
  { id: '2', nome: 'Instituto Superior de Ciências da Educação', sigla: 'ISCED-BG', website: 'https://isced-benguela.ao', created_at: '1980-01-01', location: 'Benguela', students: 980 },
  { id: '3', nome: 'Universidade Mandume Ya Ndemufayo', sigla: 'UMA', website: 'https://umandume.ao', created_at: '2014-01-01', location: 'Lobito', students: 720 },
  { id: '4', nome: 'Instituto Superior Politécnico de Benguela', sigla: 'ISPB', website: 'https://ispb.ao', created_at: '2010-01-01', location: 'Benguela', students: 560 },
  { id: '5', nome: 'Universidade Jean Piaget de Angola', sigla: 'UJP', website: 'https://unipiaget.ao', created_at: '2005-01-01', location: 'Benguela', students: 430 },
  { id: '6', nome: 'Instituto Superior Politécnico do Lobito', sigla: 'ISPL', website: 'https://ispl.ao', created_at: '2012-01-01', location: 'Lobito', students: 320 },
];

const Institutions = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return mockInstitutions.filter((i) => {
      if (search && !i.nome.toLowerCase().includes(search.toLowerCase()) && !i.sigla.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Instituições</h1>
        <p className="text-sm text-muted-foreground">Universidades e institutos parceiros em Benguela.</p>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Pesquisar instituições..." />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inst) => (
            <Link
              key={inst.id}
              to={`/institutions/${inst.id}`}
              className="group rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 size={22} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {inst.sigla}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{inst.nome}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={12} /> {inst.location}</span>
                <span>{inst.students.toLocaleString()} estudantes</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                {inst.website && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Globe size={12} /> {inst.website.replace('https://', '')}
                  </span>
                )}
                <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="Nenhuma instituição encontrada" description="Tente ajustar a sua pesquisa." />
      )}
    </div>
  );
};

export default Institutions;
