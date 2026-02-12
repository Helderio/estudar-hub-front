import { useState, useMemo } from 'react';
import { mockEvents } from '@/data/mockData';
import { EventCard } from '@/components/EventCard';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { EVENT_TYPES } from '@/types';
import type { EventType } from '@/types';

const typeKeys = Object.keys(EVENT_TYPES) as EventType[];

const Events = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<EventType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<'open' | 'closed' | null>(null);

  const filtered = useMemo(() => {
    return mockEvents.filter(e => {
      if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedType && e.type !== selectedType) return false;
      if (selectedStatus && e.status !== selectedStatus) return false;
      return true;
    });
  }, [search, selectedType, selectedStatus]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Eventos Universitários</h1>
        <p className="text-sm text-muted-foreground">Descubra eventos acadêmicos da sua região.</p>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Pesquisar eventos..." />

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedType(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!selectedType ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>Todos</button>
        {typeKeys.map(t => (
          <button key={t} onClick={() => setSelectedType(t === selectedType ? null : t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedType === t ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{EVENT_TYPES[t]}</button>
        ))}
        <div className="w-px bg-border mx-1" />
        <button onClick={() => setSelectedStatus(selectedStatus === 'open' ? null : 'open')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedStatus === 'open' ? 'bg-rank-e/20 text-rank-e' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>Abertos</button>
        <button onClick={() => setSelectedStatus(selectedStatus === 'closed' ? null : 'closed')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedStatus === 'closed' ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>Encerrados</button>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      ) : (
        <EmptyState title="Nenhum evento encontrado" description="Tente ajustar seus filtros." />
      )}
    </div>
  );
};

export default Events;
