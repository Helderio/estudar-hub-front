import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { mockProjects } from '@/data/mockData';
import { ProjectCard } from '@/components/ProjectCard';
import { SearchBar } from '@/components/SearchBar';
import { RankBadge } from '@/components/RankBadge';
import { EmptyState } from '@/components/EmptyState';
import type { Rank } from '@/types';
import { PROJECT_CATEGORIES } from '@/types';

const ranks: Rank[] = ['E', 'D', 'C', 'B', 'A', 'S'];

const Dashboard = () => {
  const [search, setSearch] = useState('');
  const [selectedRank, setSelectedRank] = useState<Rank | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockProjects.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedRank && p.rank !== selectedRank) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      return true;
    });
  }, [search, selectedRank, selectedCategory]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Projectos</h1>
          <p className="text-sm text-muted-foreground">Explore projectos académicos da comunidade.</p>
        </div>
        <Link to="/create-project" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          <Plus size={16} /> Criar Projecto
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} placeholder="Pesquisar projectos..." />
        </div>
        <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors sm:w-auto">
          <SlidersHorizontal size={16} /> Filtros
        </button>
      </div>

      {showFilters && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-4 animate-fade-in">
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Rank</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedRank(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!selectedRank ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>Todos</button>
              {ranks.map(r => (
                <button key={r} onClick={() => setSelectedRank(r === selectedRank ? null : r)}>
                  <RankBadge rank={r} size="sm" showTooltip={false} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Categoria</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedCategory(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>Todas</button>
              {PROJECT_CATEGORIES.map(c => (
                <button key={c} onClick={() => setSelectedCategory(c === selectedCategory ? null : c)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      ) : (
        <EmptyState title="Nenhum projecto encontrado" description="Tente ajustar os filtros ou crie um novo projecto." />
      )}
    </div>
  );
};

export default Dashboard;
