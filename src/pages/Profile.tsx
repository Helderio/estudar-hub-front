import { useParams } from 'react-router-dom';
import { mockUsers, mockProjects, mockEvents } from '@/data/mockData';
import { RankBadge } from '@/components/RankBadge';
import { ProjectCard } from '@/components/ProjectCard';
import { FolderOpen, CalendarDays, Award, Building2, GraduationCap } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];
  const userProjects = mockProjects.filter(p => p.author.id === user.id);
  const userEvents = mockEvents.filter(e => e.participants.some(p => p.id === user.id));

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Profile header */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl font-display font-bold text-primary shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-display text-2xl font-bold text-foreground">{user.name}</h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Building2 size={14} />{user.institution}</span>
              {user.course && <span className="flex items-center gap-1"><GraduationCap size={14} />{user.course}</span>}
            </div>
            {user.bio && <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>}
            <div className="mt-4">
              <RankBadge rank={user.rank} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          {[
            { icon: FolderOpen, label: 'Projetos', value: user.projectCount },
            { icon: CalendarDays, label: 'Eventos', value: user.eventCount },
            { icon: Award, label: 'Rank', value: user.rank },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <stat.icon size={18} className="mx-auto text-primary mb-1" />
              <p className="font-display text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Projetos ({userProjects.length})</h2>
        {userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum projeto publicado.</p>
        )}
      </div>

      {/* Events participated */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Eventos participados ({userEvents.length})</h2>
        {userEvents.length > 0 ? (
          <div className="space-y-3">
            {userEvents.map(e => (
              <div key={e.id} className="flex items-center gap-4 p-3 bg-card border border-border rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><CalendarDays size={18} className="text-primary" /></div>
                <div>
                  <p className="text-sm font-medium text-foreground">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(e.date).toLocaleDateString('pt-BR')} · {e.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum evento participado.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
