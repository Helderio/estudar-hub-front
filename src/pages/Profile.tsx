import { useParams, Link } from 'react-router-dom';
import { mockUsers, mockProjects, mockEvents } from '@/data/mockData';
import { RankBadge } from '@/components/RankBadge';
import { ProjectCard } from '@/components/ProjectCard';
import { FolderOpen, CalendarDays, Award, Building2, GraduationCap, Edit, Github, Linkedin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];
  const isOwnProfile = !id || currentUser?.id === user.id;
  const resolvedUser = isOwnProfile && currentUser ? currentUser : user;
  const userProjects = mockProjects.filter(p => p.author.id === resolvedUser.id);
  const userEvents = mockEvents.filter(e => e.participants.some(p => p.id === resolvedUser.id));

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      {/* Profile header */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
           <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl font-display font-bold text-primary shrink-0">
            {resolvedUser.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <h1 className="font-display text-2xl font-bold text-foreground">{resolvedUser.name}</h1>
              {resolvedUser.userType === 'professor' && (
                <span className="text-xs px-2 py-0.5 rounded-md bg-accent/10 text-accent font-medium">Professor</span>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Building2 size={14} />{resolvedUser.institution}</span>
              {resolvedUser.course && <span className="flex items-center gap-1"><GraduationCap size={14} />{resolvedUser.course}</span>}
              {resolvedUser.year && <span className="text-xs bg-muted px-2 py-0.5 rounded">{resolvedUser.year}</span>}
            </div>
            {resolvedUser.bio && <p className="mt-3 text-sm text-muted-foreground">{resolvedUser.bio}</p>}
            <div className="mt-3 flex items-center gap-3 justify-center sm:justify-start">
              <RankBadge rank={resolvedUser.rank} />
              {resolvedUser.github && (
                <a href={resolvedUser.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <Github size={16} />
                </a>
              )}
              {resolvedUser.linkedin && (
                <a href={resolvedUser.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>
          {isOwnProfile && (
            <Link to="/edit-profile" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors shrink-0">
              <Edit size={14} /> Editar Perfil
            </Link>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
          {[
            { icon: FolderOpen, label: 'Projectos', value: resolvedUser.projectCount },
            { icon: CalendarDays, label: 'Eventos', value: resolvedUser.eventCount },
            { icon: Award, label: 'Rank', value: resolvedUser.rank },
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
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Projectos ({userProjects.length})</h2>
        {userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userProjects.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum projecto publicado.</p>
        )}
      </div>

      {/* Events */}
      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-4">Eventos ({userEvents.length})</h2>
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
