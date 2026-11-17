import { useEffect, useState } from 'react';
import { BarChart3, CheckSquare, Compass, FlaskConical } from 'lucide-react';
import Stage1Concepts from './components/Stage1Concepts';
import Stage2Diagnostic from './components/Stage2Diagnostic';
import Stage3InClassLab from './components/Stage3InClassLab';
import Stage4Analytics from './components/Stage4Analytics';

type StageId = 1 | 2 | 3 | 4;

interface StoredProgress {
  diagnosticAnswers: Record<string, string>;
  trapAnswers: Record<string, string>;
  errorAnswers: Record<string, string>;
}

const STORAGE_KEY = 'preposition_logic_lab_v1';

const STAGES: { id: StageId; shortLabel: string; desktopLabel: string; icon: typeof Compass }[] = [
  { id: 1, shortLabel: 'Зураглал', desktopLabel: '1. Логик зураглал', icon: Compass },
  { id: 2, shortLabel: 'Сорил', desktopLabel: '2. Богино сорил', icon: CheckSquare },
  { id: 3, shortLabel: 'Лаб', desktopLabel: '3. Ангийн лаб', icon: FlaskConical },
  { id: 4, shortLabel: 'Онош', desktopLabel: '4. Дүн шинжилгээ', icon: BarChart3 },
];

export default function App() {
  const [stage, setStage] = useState<StageId>(1);
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredProgress;
        return parsed.diagnosticAnswers ?? {};
      }
    } catch {
      // Ignore storage read errors
    }
    return {};
  });

  const [trapAnswers, setTrapAnswers] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredProgress;
        return parsed.trapAnswers ?? {};
      }
    } catch {
      // Ignore storage read errors
    }
    return {};
  });

  const [errorAnswers, setErrorAnswers] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredProgress;
        return parsed.errorAnswers ?? {};
      }
    } catch {
      // Ignore storage read errors
    }
    return {};
  });

  useEffect(() => {
    try {
      const payload: StoredProgress = {
        diagnosticAnswers,
        trapAnswers,
        errorAnswers,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage write errors
    }
  }, [diagnosticAnswers, trapAnswers, errorAnswers]);

  const goToStage = (next: StageId) => {
    setStage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiagnosticAnswer = (questionId: string, option: string) => {
    setDiagnosticAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleTrapAnswer = (trapId: string, option: string) => {
    setTrapAnswers((prev) => ({ ...prev, [trapId]: option }));
  };

  const handleErrorAnswer = (tokenId: string, option: string) => {
    setErrorAnswers((prev) => ({ ...prev, [tokenId]: option }));
  };

  const handleResetAll = () => {
    setDiagnosticAnswers({});
    setTrapAnswers({});
    setErrorAnswers({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage clear errors
    }
    goToStage(1);
  };

  const totalAnswered =
    Object.keys(diagnosticAnswers).length +
    Object.keys(trapAnswers).length +
    Object.keys(errorAnswers).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar: Clean 3-zone contract, static on mobile to maximize viewport */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
          <button
            onClick={() => goToStage(1)}
            className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Preposition Logic
          </button>

          <nav
            aria-label="Flipped Learning 4 шат"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            {STAGES.map((item) => {
              const active = stage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => goToStage(item.id)}
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                    active
                      ? 'text-blue-600 border-blue-600 font-semibold'
                      : 'text-slate-600 border-transparent hover:text-slate-900'
                  }`}
                >
                  {item.desktopLabel}
                </button>
              );
            })}
          </nav>

          <div className="shrink-0">
            <button
              onClick={() => goToStage(4)}
              className="min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors whitespace-nowrap shrink-0 tabular-nums"
            >
              Онош харах ({totalAnswered}/15)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 md:pb-12">
        {stage === 1 && <Stage1Concepts onNextStage={() => goToStage(2)} />}

        {stage === 2 && (
          <Stage2Diagnostic
            answers={diagnosticAnswers}
            onAnswer={handleDiagnosticAnswer}
            onResetStage2={() => setDiagnosticAnswers({})}
            onNextStage={() => goToStage(3)}
          />
        )}

        {stage === 3 && (
          <Stage3InClassLab
            trapAnswers={trapAnswers}
            onTrapAnswer={handleTrapAnswer}
            errorAnswers={errorAnswers}
            onErrorAnswer={handleErrorAnswer}
            onResetStage3={() => {
              setTrapAnswers({});
              setErrorAnswers({});
            }}
            onNextStage={() => goToStage(4)}
          />
        )}

        {stage === 4 && (
          <Stage4Analytics
            diagnosticAnswers={diagnosticAnswers}
            trapAnswers={trapAnswers}
            errorAnswers={errorAnswers}
            onJumpToStage={(target) => goToStage(target)}
            onResetAll={handleResetAll}
          />
        )}
      </main>

      {/* Quiet Desktop Footer */}
      <footer className="hidden md:block border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-slate-500">
          <span>Preposition Logic Lab · ЭЕШ 800 & B2–C1 Flipped Learning</span>
          <span>12-р ангийн төгсөгчдөд зориулсан интерактив дадлага</span>
        </div>
      </footer>

      {/* Mobile Fixed Bottom Thumb Navigation (<15% mobile height) */}
      <nav
        aria-label="Гар утасны үндсэн цэс"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200"
      >
        <div className="grid grid-cols-4 h-16">
          {STAGES.map((item) => {
            const Icon = item.icon;
            const active = stage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => goToStage(item.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-[11px] leading-none whitespace-nowrap">
                  {item.id}. {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
