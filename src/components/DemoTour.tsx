import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  targetId?: string;
}

const steps: Step[] = [
  { title: 'O teu perfil está pronto!', description: 'Vês o teu nome e instituição aqui em cima, com os dados que registaste.', targetId: 'tour-greeting' },
  { title: 'Projectos da comunidade', description: 'Aqui aparecem os projectos académicos publicados. Podes filtrar por rank ou categoria.' },
  { title: 'Publica o teu projecto', description: 'Submete o teu trabalho académico para a comunidade avaliar.', targetId: 'tour-create-btn' },
  { title: 'Navega pela plataforma', description: 'Acede a eventos, convites, instituições e o teu chat por aqui.' },
  { title: 'Está tudo pronto!', description: 'A tua conta está configurada. Explora a plataforma à vontade.' },
];

export const DemoTour = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (localStorage.getItem('demo_tour_done')) return;
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = steps[current].targetId;
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setRect(el.getBoundingClientRect());
        return;
      }
    }
    setRect(null);
  }, [current, visible]);

  const close = useCallback(() => {
    setVisible(false);
    localStorage.setItem('demo_tour_done', '1');
  }, []);

  const next = () => current < steps.length - 1 ? setCurrent(c => c + 1) : close();
  const prev = () => setCurrent(c => Math.max(0, c - 1));

  if (!visible) return null;

  const step = steps[current];

  // Position tooltip near target or center
  const tooltipStyle: React.CSSProperties = rect
    ? { position: 'fixed', top: rect.bottom + 12, left: Math.max(16, Math.min(rect.left, window.innerWidth - 340)), zIndex: 10001 }
    : { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10001 };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[10000] pointer-events-auto" onClick={close}>
        <svg className="w-full h-full">
          <defs>
            <mask id="tour-mask">
              <rect width="100%" height="100%" fill="white" />
              {rect && (
                <rect
                  x={rect.left - 6} y={rect.top - 6}
                  width={rect.width + 12} height={rect.height + 12}
                  rx={12} fill="black"
                />
              )}
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#tour-mask)" />
        </svg>
      </div>

      {/* Highlight ring */}
      {rect && (
        <div
          className="fixed z-[10001] pointer-events-none rounded-xl ring-2 ring-primary ring-offset-2 ring-offset-background"
          style={{ top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12 }}
        />
      )}

      {/* Tooltip */}
      <div style={tooltipStyle} className="w-80 bg-card border border-border rounded-2xl shadow-xl p-5 pointer-events-auto animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
          <button onClick={close} className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{current + 1} / {steps.length}</span>
          <div className="flex gap-2">
            <button onClick={close} className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              Saltar tour
            </button>
            {current > 0 && (
              <button onClick={prev} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted/50 transition-colors">
                <ChevronLeft size={14} /> Anterior
              </button>
            )}
            <button onClick={next} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">
              {current < steps.length - 1 ? <>Próximo <ChevronRight size={14} /></> : 'Concluir'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
