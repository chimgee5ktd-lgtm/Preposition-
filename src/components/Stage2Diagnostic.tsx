import { useState } from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { CATEGORY_META, DIAGNOSTIC_QUESTIONS } from '../data/prepositionData';

interface Stage2DiagnosticProps {
  answers: Record<string, string>;
  onAnswer: (questionId: string, option: string) => void;
  onResetStage2: () => void;
  onNextStage: () => void;
}

export default function Stage2Diagnostic({
  answers,
  onAnswer,
  onResetStage2,
  onNextStage,
}: Stage2DiagnosticProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = DIAGNOSTIC_QUESTIONS.length;
  const answeredCount = DIAGNOSTIC_QUESTIONS.filter((q) => Boolean(answers[q.id])).length;
  const correctCount = DIAGNOSTIC_QUESTIONS.filter(
    (q) => answers[q.id] === q.correct
  ).length;

  const q = DIAGNOSTIC_QUESTIONS[currentIndex];
  const selected = answers[q.id];
  const isAnswered = Boolean(selected);
  const isCorrect = selected === q.correct;

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    onAnswer(q.id, opt);
  };

  return (
    <div className="space-y-6">
      {/* Header & Progress */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>2-р шат</span>
              <span aria-hidden="true">·</span>
              <span>Ангид ирэхээс өмнөх хурдан оношилгоо</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Өөрийгөө сорих 5 урхи асуулт
            </h1>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="font-mono text-sm font-semibold tabular-nums text-slate-700">
              {answeredCount}/{total} хариулсан
            </span>
            {answeredCount > 0 && (
              <button
                onClick={() => {
                  onResetStage2();
                  setCurrentIndex(0);
                }}
                className="min-h-[40px] px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Дахин өгөх</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Stepper Dots / Buttons */}
        <div className="flex items-center gap-2 pt-5">
          {DIAGNOSTIC_QUESTIONS.map((item, idx) => {
            const ans = answers[item.id];
            const active = idx === currentIndex;
            let stateStyle = 'bg-slate-100 text-slate-600 border-slate-200';
            if (ans === item.correct) {
              stateStyle = 'bg-emerald-50 text-emerald-700 border-emerald-300';
            } else if (ans) {
              stateStyle = 'bg-rose-50 text-rose-700 border-rose-300';
            }

            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Асуулт ${idx + 1}`}
                className={`flex-1 min-h-[44px] rounded-xl text-sm font-mono font-semibold tabular-nums border transition-all ${stateStyle} ${
                  active ? 'ring-2 ring-blue-600 ring-offset-1' : 'hover:bg-slate-200/70'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Question Card */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <span className="font-semibold text-blue-600">
            {CATEGORY_META[q.category].shortTitle}
          </span>
          <span className="font-mono tabular-nums">
            Асуулт {currentIndex + 1} / {total}
          </span>
        </div>

        <p className="text-sm font-medium text-slate-600">{q.promptMn}</p>

        {/* Sentence Prompt */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
          <p className="font-serif text-lg sm:text-xl leading-relaxed text-slate-900">
            {q.sentenceBefore}
            <span
              className={`inline-block min-w-[64px] text-center font-mono text-base font-bold px-2.5 py-0.5 mx-1 rounded-lg border ${
                !isAnswered
                  ? 'bg-white border-dashed border-blue-400 text-blue-700'
                  : isCorrect
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                  : 'bg-rose-50 border-rose-400 text-rose-800'
              }`}
            >
              {isAnswered ? selected : '___'}
            </span>
            {q.sentenceAfter}
          </p>
        </div>

        {/* Options Grid (44px+ touch targets) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {q.options.map((opt) => {
            const isPicked = selected === opt;
            const isRightOption = opt === q.correct;

            let btnClass =
              'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/40';
            if (isAnswered) {
              if (isRightOption) {
                btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900';
              } else if (isPicked) {
                btnClass = 'bg-rose-50 border-rose-500 text-rose-900';
              } else {
                btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-75';
              }
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelect(opt)}
                className={`min-h-[48px] px-4 py-3 rounded-xl border-2 font-mono text-base font-semibold transition-all flex items-center justify-center gap-2 ${btnClass}`}
              >
                <span>{opt}</span>
                {isAnswered && isRightOption && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                )}
                {isAnswered && isPicked && !isRightOption && (
                  <XCircle className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Mentor Feedback */}
        {isAnswered && (
          <div
            className={`rounded-xl p-5 border ${
              isCorrect
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                  <span>Зөв логик! Яг ингэж хардаг юм.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
                  <span>
                    Урхинд орлоо · Зөв нь <span className="font-mono underline">{q.correct}</span>
                  </span>
                </>
              )}
            </div>
            <p className="text-sm leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="min-h-[44px] px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors"
          >
            Өмнөх
          </button>

          {currentIndex < total - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(total - 1, prev + 1))}
              className="min-h-[44px] px-5 py-2 text-sm font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white inline-flex items-center gap-2 transition-colors"
            >
              <span>Дараагийнх</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={onNextStage}
              className="min-h-[44px] px-5 py-2 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white inline-flex items-center gap-2 transition-colors"
            >
              <span>3-р шат руу орох</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </section>

      {/* Completion Banner when all 5 answered */}
      {answeredCount === total && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-mono text-blue-300 mb-1 tabular-nums">
              ОНОШИЛГОО ДУУСЛАА · {correctCount}/{total} ЗӨВ
            </p>
            <h3 className="text-lg font-bold">
              {correctCount >= 4
                ? 'Сайн байна! Одоо анги дээрх ЭЕШ-ийн хүнд урхинуудыг задалъя.'
                : 'Анги дээрх бодит кейс дээр энэ алдаануудаа шууд засаад авъя.'}
            </h3>
          </div>
          <button
            onClick={onNextStage}
            className="min-h-[48px] px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
          >
            <span>3-р шат: Лаборатори</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
