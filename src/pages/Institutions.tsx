import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { Building2, Globe, ArrowRight } from 'lucide-react';
import type { Institution } from '@/types';

const mockInstitutions: Institution[] = [
  { id: '1', nome: 'Universidade de São Paulo', sigla: 'USP', website: 'https://usp.br', created_at: '2020-01-01' },
  { id: '2', nome: 'Universidade Estadual de Campinas', sigla: 'UNICAMP', website: 'https://unicamp.br', created_at: '2020-01-01' },
  { id: '3', nome: 'Universidade Federal do Rio de Janeiro', sigla: 'UFRJ', website: 'https://ufrj.br', created_at: '2020-01-01' },
  { id: '4', nome: 'Universidade Federal de Minas Gerais', sigla: 'UFMG', website: 'https://ufmg.br', created_at: '2020-01-01' },
  { id: '5', nome: 'Universidade Federal de Santa Catarina', sigla: 'UFSC', website: 'https://ufsc.br', created_at: '2020-01-01' },
  { id: '6', nome: 'Pontifícia Universidade Católica do RS', sigla: 'PUCRS', website: 'https://pucrs.br', created_at: '2020-01-01' },
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
        <p className="text-sm text-muted-foreground">Conheça as universidades da plataforma.</p>
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
                  {inst.logo ? (
                    <img src={inst.logo} alt={inst.sigla} className="w-8 h-8 object-contain" />
                  ) : (
                    <Building2 size={22} className="text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {inst.sigla}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{inst.nome}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
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
        <EmptyState title="Nenhuma instituição encontrada" description="Tente ajustar sua pesquisa." />
      )}
    </div>
  );
};

export default Institutions;
