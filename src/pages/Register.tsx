import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Github, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const { register, loginWithGoogle, loginWithGithub, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', institution: '', course: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nome é obrigatório';
    if (!form.email) e.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido';
    if (!form.phone) e.phone = 'Telefone é obrigatório';
    if (!form.institution.trim()) e.institution = 'Instituição é obrigatória';
    if (!form.course.trim()) e.course = 'Curso é obrigatório';
    if (!form.password) e.password = 'Senha é obrigatória';
    else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Senhas não coincidem';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, institution: form.institution, course: form.course, password: form.password });
      toast({ title: 'Conta criada com sucesso!' });
      navigate('/dashboard');
    } catch {
      toast({ title: 'Erro ao criar conta', variant: 'destructive' });
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      if (provider === 'google') await loginWithGoogle();
      else await loginWithGithub();
      toast({ title: 'Login realizado com sucesso!' });
      navigate('/dashboard');
    } catch {
      toast({ title: 'Erro no login', variant: 'destructive' });
    }
  };

  const inputClass = 'w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50';

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Criar sua conta</h1>
        <p className="text-sm text-muted-foreground mt-2">Junte-se à comunidade acadêmica.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => handleOAuth('google')} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50">
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button onClick={() => handleOAuth('github')} disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors disabled:opacity-50">
            <Github size={16} /> GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="px-2 bg-card text-muted-foreground">ou preencha o formulário</span></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {([
            { key: 'name', label: 'Nome completo', placeholder: 'Seu nome', type: 'text' },
            { key: 'email', label: 'Email', placeholder: 'seu@email.com', type: 'email' },
            { key: 'phone', label: 'Telefone', placeholder: '(11) 99999-9999', type: 'tel' },
            { key: 'institution', label: 'Instituição', placeholder: 'Ex: USP, UNICAMP...', type: 'text' },
            { key: 'course', label: 'Curso', placeholder: 'Ex: Ciência da Computação', type: 'text' },
          ] as const).map(field => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
              <input type={field.type} value={form[field.key]} onChange={e => update(field.key, e.target.value)} className={inputClass} placeholder={field.placeholder} />
              {errors[field.key] && <p className="text-xs text-destructive mt-1">{errors[field.key]}</p>}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Senha</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} className={`${inputClass} pr-10`} placeholder="Mínimo 6 caracteres" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Confirmar senha</label>
            <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} className={inputClass} placeholder="Repita sua senha" />
            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
            Registrar
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem conta? <Link to="/login" className="text-primary font-medium hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
