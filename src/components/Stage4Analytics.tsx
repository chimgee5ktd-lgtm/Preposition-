import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Compass,
  RotateCcw,
  Target,
} from 'lucide-react';
import {
  CATEGORY_META,
  CategoryId,
  DIAGNOSTIC_QUESTIONS,
  diagnoseStudent,
  ERROR_PASSAGES,
  ErrorToken,
  INCLASS_TRAPS,
} from '../data/prepositionData';

interface Stage4AnalyticsProps {
  diagnosticAnswers: Record<string, string>;
  trapAnswers: Record<string, string>;
  errorAnswers: Record<string, string>;
  onJumpToStage: (stage: 1 | 2 | 3) => void;
  onResetAll: () => void;
}

interface MissedItem {
  id: string;
  source: string;
  category: CategoryId;
  userAnswer: string;
  correctAnswer: string;
  note: string;
}

export default function Stage4Analytics({
  diagnosticAnswers,
  trapAnswers,
  errorAnswers,
  onJumpToStage,
  onResetAll,
}: Stage4AnalyticsProps) {
  const categoryStats: Record<CategoryId, { answered: number; correct: number; total: number }> = {
    spatial: { answered: 0, correct: 0, total: 0 },
    vector: { answered: 0, correct: 0, total: 0 },
    dependent: { answered: 0, correct: 0, total: 0 },
    idiomatic: { answered: 0, correct: 0, total: 0 },
  };

  const missedItems: MissedItem[] = [];

  // 1. Stage 2
  DIAGNOSTIC_QUESTIONS.forEach((q, idx) => {
    categoryStats[q.category].total += 1;
    const ans = diagnosticAnswers[q.id];
    if (ans) {
      categoryStats[q.category].answered += 1;
      if (ans === q.correct) {
        categoryStats[q.category].correct += 1;
      } else {
        missedItems.push({
          id: q.id,
          source: `2-р шат · Асуулт ${idx + 1}`,
          category: q.category,
          userAnswer: ans,
          correctAnswer: q.correct,
          note: q.explanation,
        });
      }
    }
  });

  // 2. Stage 3A
  INCLASS_TRAPS.forEach((trap, idx) => {
    categoryStats[trap.category].total += 1;
    const ans = trapAnswers[trap.id];
    if (ans) {
      categoryStats[trap.category].answered += 1;
      if (ans === trap.correct) {
        categoryStats[trap.category].correct += 1;
      } else {
        missedItems.push({
          id: trap.id,
          source: `3-р шат · Урхи 0${idx + 1}`,
          category: trap.category,
          userAnswer: ans,
          correctAnswer: trap.correct,
          note: trap.explanation,
        });
      }
    }
  });

  // 3. Stage 3B
  const allErrorTokens: ErrorToken[] = ERROR_PASSAGES.flatMap((p) =>
    p.segments
      .filter((s): s is { type: 'error'; token: ErrorToken } => s.type === 'error')
      .map((s) => s.token)
  );

  allErrorTokens.forEach((token) => {
    categoryStats[token.category].total += 1;
    const ans = errorAnswers[token.id];
    if (ans) {
      categoryStats[token.category].answered += 1;
      if (ans === token.correctWord) {
        categoryStats[token.category].correct += 1;
      } else {
        missedItems.push({
          id: token.id,
          source: `Улаан бал · “${token.wrongWord}” → ?`,
          category: token.category,
          userAnswer: ans,
          correctAnswer: token.correctWord,
          note: token.explanation,
        });
      }
    }
  });

  const totalCheckpoints =
    DIAGNOSTIC_QUESTIONS.length + INCLASS_TRAPS.length + allErrorTokens.length;
  const totalAnswered = Object.values(categoryStats).reduce((s, c) => s + c.answered, 0);
  const totalCorrect = Object.values(categoryStats).reduce((s, c) => s + c.correct, 0);
  const overallPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const diagnosis = diagnoseStudent(totalAnswered, totalCorrect, categoryStats);

  // Rank categories from weakest to strongest to prioritize 3 Golden Rules
  const orderedCategories = (Object.keys(CATEGORY_META) as CategoryId[]).sort((a, b) => {
    const statA = categoryStats[a];
    const statB = categoryStats[b];
    const accA = statA.answered > 0 ? statA.correct / statA.answered : 1;
    const accB = statB.answered > 0 ? statB.correct / statB.answered : 1;
    return accA - accB;
  });

  const topThreeRules = orderedCategories.slice(0, 3).map((catId) => CATEGORY_META[catId]);

  const badgeToneMap = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-950',
    blue: 'bg-blue-50 border-blue-200 text-blue-950',
    amber: 'bg-amber-50 border-amber-200 text-amber-950',
    rose: 'bg-rose-50 border-rose-200 text-rose-950',
  }[diagnosis.badgeColor];

  return (
    <div className="space-y-8">
      {/* Archetype Diagnosis Card */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <span>4-р шат</span>
              <span aria-hidden="true">·</span>
              <span>Бодит өгөгдөлд суурилсан оношилгоо</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {diagnosis.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-600">{diagnosis.subtitle}</p>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 shrink-0 flex items-center gap-4 self-start">
            <div>
              <span className="block text-[11px] font-mono text-slate-400">НИЙТ ОНОВЧ</span>
              <span className="text-2xl font-mono font-bold tabular-nums">
                {totalAnswered > 0 ? `${overallPct}%` : '—'}
              </span>
            </div>
            <div className="h-9 w-px bg-slate-700" aria-hidden="true" />
            <div>
              <span className="block text-[11px] font-mono text-slate-400">ГҮЙЦЭТГЭЛ</span>
              <span className="text-base font-mono font-semibold tabular-nums">
                {totalCorrect}/{totalAnswered}{' '}
                <span className="text-xs text-slate-400">({totalCheckpoints}-аас)</span>
              </span>
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-xl border ${badgeToneMap}`}>
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm leading-relaxed">
              <strong className="block mb-1">Менторын дүгнэлт:</strong>
              {diagnosis.mentorNote}
            </div>
          </div>
        </div>

        {totalAnswered < totalCheckpoints && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
            <span className="text-slate-700">
              Бүтэн онош гаргуулахын тулд үлдсэн{' '}
              <strong className="font-mono tabular-nums">
                {totalCheckpoints - totalAnswered}
              </strong>{' '}
              даалгаврыг гүйцээгээрэй.
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onJumpToStage(2)}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-800 whitespace-nowrap"
              >
                2-р шат руу
              </button>
              <button
                onClick={() => onJumpToStage(3)}
                className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white whitespace-nowrap"
              >
                3-р шат руу
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 4-Axis Category Breakdown */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Төрөл тус бүрийн нарийвчилсан задаргаа
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Яг аль сэтгэлгээний зураглал дээр оноо алдсанаа хар.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(CATEGORY_META) as CategoryId[]).map((catId) => {
            const meta = CATEGORY_META[catId];
            const stat = categoryStats[catId];
            const pct =
              stat.answered > 0 ? Math.round((stat.correct / stat.answered) * 100) : null;
            const isWeak = pct !== null && pct < 65;
            const isStrong = pct !== null && pct >= 85;

            return (
              <div
                key={catId}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{meta.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{meta.formula}</p>
                  </div>
                  <span className="font-mono text-sm font-bold tabular-nums text-slate-900 shrink-0">
                    {pct !== null ? `${pct}%` : '—'}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      pct === null
                        ? 'bg-slate-300 w-0'
                        : isWeak
                        ? 'bg-rose-500'
                        : isStrong
                        ? 'bg-emerald-600'
                        : 'bg-blue-600'
                    }`}
                    style={{ width: `${pct ?? 0}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono tabular-nums text-slate-600">
                    {stat.correct}/{stat.answered} зөв (нийт {stat.total})
                  </span>
                  {pct !== null && (
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isWeak
                          ? 'text-rose-700'
                          : isStrong
                          ? 'text-emerald-700'
                          : 'text-blue-700'
                      }`}
                    >
                      {isWeak ? (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Анхаарах бүс</span>
                        </>
                      ) : isStrong ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Бат бөх</span>
                        </>
                      ) : (
                        <>
                          <Target className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Тогтворжиж байна</span>
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Missed Items Log (Only if mistakes exist) */}
      {missedItems.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Алдсан {missedItems.length} урхиа нэг мөр цэвэрлэе
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Шалгалт дээр дахиж давтахгүйн тулд яг энд нь харж ав.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {missedItems.map((item) => (
              <div key={item.id} className="py-4 first:pt-1 last:pb-0 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-500">{item.source}</span>
                  <div className="font-mono font-semibold flex items-center gap-2">
                    <span className="text-rose-600 line-through">{item.userAnswer}</span>
                    <span aria-hidden="true">→</span>
                    <span className="text-emerald-700">{item.correctAnswer}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3 Golden Rules */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5">
        <div>
          <p className="text-xs font-medium text-blue-600 mb-1">Шалгалтын өмнөх луужин</p>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            ЭЕШ-д орохоос өмнө санах 3 Алтан Дүрэм
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThreeRules.map((rule, index) => (
            <div
              key={rule.id}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="font-mono text-xs font-bold text-blue-600 tabular-nums">
                  0{index + 1}. {rule.shortTitle}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">{rule.goldenRule}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{rule.goldenDetail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={() => onJumpToStage(1)}
          className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
        >
          <Compass className="w-4 h-4 text-blue-600" aria-hidden="true" />
          <span>1-р шат: Логик зураглал руу буцах</span>
        </button>

        <button
          onClick={onResetAll}
          className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Бүх дасгалыг шинээр эхлүүлэх</span>
        </button>
      </div>
    </div>
  );
}
