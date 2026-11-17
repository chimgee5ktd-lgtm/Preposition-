import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  PenLine,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  ERROR_PASSAGES,
  ErrorToken,
  INCLASS_TRAPS,
} from '../data/prepositionData';

interface Stage3InClassLabProps {
  trapAnswers: Record<string, string>;
  onTrapAnswer: (trapId: string, option: string) => void;
  errorAnswers: Record<string, string>;
  onErrorAnswer: (tokenId: string, option: string) => void;
  onResetStage3: () => void;
  onNextStage: () => void;
}

export default function Stage3InClassLab({
  trapAnswers,
  onTrapAnswer,
  errorAnswers,
  onErrorAnswer,
  onResetStage3,
  onNextStage,
}: Stage3InClassLabProps) {
  const [activeTab, setActiveTab] = useState<'traps' | 'spotting'>('traps');
  const [openPrompts, setOpenPrompts] = useState<Record<string, boolean>>({});
  const [selectedTokenId, setSelectedTokenId] = useState<string>('err1');

  const allTokens: ErrorToken[] = ERROR_PASSAGES.flatMap((p) =>
    p.segments
      .filter((seg): seg is { type: 'error'; token: ErrorToken } => seg.type === 'error')
      .map((seg) => seg.token)
  );

  const trapsDone = INCLASS_TRAPS.filter((t) => Boolean(trapAnswers[t.id])).length;
  const errorsDone = allTokens.filter((t) => Boolean(errorAnswers[t.id])).length;

  const toggleDiscussion = (id: string) => {
    setOpenPrompts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTrapSentence = (trap: (typeof INCLASS_TRAPS)[number]) => {
    const picked = trapAnswers[trap.id];
    const parts = picked ? picked.split(' / ') : [];
    const hasTwoGaps = Boolean(trap.sentenceMiddle);

    if (!hasTwoGaps) {
      return (
        <p className="font-serif text-lg leading-relaxed text-slate-900">
          {trap.sentenceBefore}
          <span
            className={`inline-block min-w-[60px] text-center font-mono text-sm font-bold px-2 py-0.5 mx-1 rounded-lg border ${
              !picked
                ? 'bg-white border-dashed border-blue-400 text-blue-700'
                : picked === trap.correct
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                : 'bg-rose-50 border-rose-400 text-rose-800'
            }`}
          >
            {picked ?? '___'}
          </span>
          {trap.sentenceAfter}
        </p>
      );
    }

    return (
      <p className="font-serif text-lg leading-relaxed text-slate-900">
        {trap.sentenceBefore}
        <span
          className={`inline-block min-w-[52px] text-center font-mono text-sm font-bold px-2 py-0.5 mx-1 rounded-lg border ${
            !picked
              ? 'bg-white border-dashed border-blue-400 text-blue-700'
              : picked === trap.correct
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
              : 'bg-rose-50 border-rose-400 text-rose-800'
          }`}
        >
          {parts[0] ?? '___'}
        </span>
        {trap.sentenceMiddle}
        <span
          className={`inline-block min-w-[52px] text-center font-mono text-sm font-bold px-2 py-0.5 mx-1 rounded-lg border ${
            !picked
              ? 'bg-white border-dashed border-blue-400 text-blue-700'
              : picked === trap.correct
              ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
              : 'bg-rose-50 border-rose-400 text-rose-800'
          }`}
        >
          {parts[1] ?? '___'}
        </span>
        {trap.sentenceAfter}
      </p>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-1">
              <span>3-р шат</span>
              <span aria-hidden="true">·</span>
              <span>Анги дээрх интерактив лаборатори</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              ЭЕШ-ийн урхи ба Бодит эх засах
            </h1>
          </div>

          {(trapsDone > 0 || errorsDone > 0) && (
            <button
              onClick={onResetStage3}
              className="self-start min-h-[40px] px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Шинээр хийх</span>
            </button>
          )}
        </div>

        {/* Sub-tab Switcher */}
        <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="3-р шатны даалгавар сонгох"
            className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl w-full sm:w-auto"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'traps'}
              onClick={() => setActiveTab('traps')}
              className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'traps'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ЭЕШ Урхи ({trapsDone}/{INCLASS_TRAPS.length})
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'spotting'}
              onClick={() => setActiveTab('spotting')}
              className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'spotting'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Улаан бал ({errorsDone}/{allTokens.length})
            </button>
          </div>

          <p className="text-xs text-slate-500">
            {activeTab === 'traps'
              ? 'Найзуудтайгаа ярилцаж байгаад зөв хосыг нь цохиорой.'
              : 'Эх доторх доогуур зураастай буруу угтвар үг дээр дарж зас.'}
          </p>
        </div>
      </section>

      {/* Mode A: ЭЕШ Traps Arena */}
      {activeTab === 'traps' && (
        <div className="space-y-4">
          {INCLASS_TRAPS.map((trap, idx) => {
            const picked = trapAnswers[trap.id];
            const isAnswered = Boolean(picked);
            const isCorrect = picked === trap.correct;
            const discussionOpen = Boolean(openPrompts[trap.id]);

            return (
              <article
                key={trap.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono font-semibold text-blue-600 tabular-nums">
                    УРХИ 0{idx + 1} · {trap.badgeLabel}
                  </span>
                  {isAnswered && (
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Урхи эвдлээ</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Урхинд уналаа</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
                  {renderTrapSentence(trap)}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {trap.options.map((opt) => {
                    const isPicked = picked === opt;
                    const isRight = opt === trap.correct;
                    let cls =
                      'bg-white border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50/40';
                    if (isAnswered) {
                      if (isRight) {
                        cls = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                      } else if (isPicked) {
                        cls = 'bg-rose-50 border-rose-500 text-rose-900';
                      } else {
                        cls = 'bg-slate-50 border-slate-200 text-slate-400 opacity-75';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        disabled={isAnswered}
                        onClick={() => onTrapAnswer(trap.id, opt)}
                        className={`min-h-[46px] px-3 py-2.5 rounded-xl border-2 font-mono text-sm font-semibold transition-all ${cls}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="space-y-3 pt-1">
                    <div
                      className={`p-4 rounded-xl border text-sm leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/70 border-rose-200 text-rose-950'
                      }`}
                    >
                      <strong className="block mb-1">
                        {isCorrect ? 'Яг зөв!' : `Зөв хариулт: ${trap.correct}`}
                      </strong>
                      {trap.explanation}
                    </div>

                    <div>
                      <button
                        onClick={() => toggleDiscussion(trap.id)}
                        className="min-h-[40px] px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 inline-flex items-center gap-2 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                        <span>
                          {discussionOpen
                            ? 'Ангийн сэдвийг хаах'
                            : 'Анги дээр хэлэлцэх сэдэв харах'}
                        </span>
                      </button>

                      {discussionOpen && (
                        <div className="mt-2.5 p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-sm text-slate-800">
                          <strong className="text-blue-900 block mb-0.5">
                            Багш & Найзуудтайгаа ярилц:
                          </strong>
                          {trap.classPrompt}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          <div className="flex justify-end">
            <button
              onClick={() => setActiveTab('spotting')}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <PenLine className="w-4 h-4" aria-hidden="true" />
              <span>Дараагийн хэсэг: Улаан балын лаборатори</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode B: Interactive Error Spotting */}
      {activeTab === 'spotting' && (
        <div className="space-y-6">
          {ERROR_PASSAGES.map((passage) => {
            const passageTokens = passage.segments
              .filter(
                (s): s is { type: 'error'; token: ErrorToken } => s.type === 'error'
              )
              .map((s) => s.token);
            const activeTokenInPassage = passageTokens.find(
              (t) => t.id === selectedTokenId
            );

            return (
              <section
                key={passage.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{passage.title}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{passage.contextLabel}</p>
                  </div>
                  <span className="font-mono text-xs font-semibold tabular-nums text-slate-600">
                    {passageTokens.filter((t) => Boolean(errorAnswers[t.id])).length}/
                    {passageTokens.length} зассан
                  </span>
                </div>

                {/* Clickable Passage */}
                <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 font-serif text-lg sm:text-[19px] leading-[1.9] text-slate-900">
                  {passage.segments.map((seg, idx) => {
                    if (seg.type === 'text') {
                      return <span key={idx}>{seg.value}</span>;
                    }

                    const { token } = seg;
                    const chosen = errorAnswers[token.id];
                    const isSelected = selectedTokenId === token.id;
                    const isFixedRight = chosen === token.correctWord;

                    return (
                      <button
                        key={token.id}
                        type="button"
                        onClick={() => setSelectedTokenId(token.id)}
                        className={`inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-lg font-mono text-base font-bold border transition-all align-baseline ${
                          !chosen
                            ? isSelected
                              ? 'bg-amber-100 border-amber-500 text-amber-950 ring-2 ring-amber-400/50'
                              : 'bg-amber-50 border-dashed border-amber-400 text-amber-900 hover:bg-amber-100'
                            : isFixedRight
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                            : 'bg-rose-50 border-rose-400 text-rose-800'
                        }`}
                      >
                        <span className={chosen ? 'line-through opacity-55 text-xs' : ''}>
                          {token.wrongWord}
                        </span>
                        {chosen && <span>→ {chosen}</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Inline Repair Controls for selected token inside this passage */}
                {activeTokenInPassage ? (
                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-blue-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-blue-700">
                        Алдаа засах: “
                        <span className="font-mono text-rose-600">
                          {activeTokenInPassage.wrongWord}
                        </span>
                        ” гэдгийг юугаар солих вэ?
                      </span>
                      <span className="text-xs text-slate-500">
                        Сонгоод шууд шалга
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {activeTokenInPassage.options.map((opt) => {
                        const picked = errorAnswers[activeTokenInPassage.id];
                        const isAnswered = Boolean(picked);
                        const isRight = opt === activeTokenInPassage.correctWord;
                        const isPicked = picked === opt;

                        let cls =
                          'bg-slate-50 border-slate-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50';
                        if (isAnswered) {
                          if (isRight) {
                            cls = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                          } else if (isPicked) {
                            cls = 'bg-rose-50 border-rose-500 text-rose-900';
                          } else {
                            cls = 'bg-slate-50 border-slate-200 text-slate-400 opacity-75';
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isAnswered}
                            onClick={() => onErrorAnswer(activeTokenInPassage.id, opt)}
                            className={`min-h-[44px] px-3 py-2 rounded-xl border-2 font-mono text-sm font-semibold transition-all ${cls}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {errorAnswers[activeTokenInPassage.id] && (
                      <div
                        className={`p-3.5 rounded-xl border text-sm leading-relaxed ${
                          errorAnswers[activeTokenInPassage.id] ===
                          activeTokenInPassage.correctWord
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                            : 'bg-rose-50/70 border-rose-200 text-rose-950'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-bold mb-1">
                          {errorAnswers[activeTokenInPassage.id] ===
                          activeTokenInPassage.correctWord ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                              <span>Яг оллоо!</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-700" aria-hidden="true" />
                              <span>
                                Зөв засвар:{' '}
                                <span className="font-mono underline">
                                  {activeTokenInPassage.correctWord}
                                </span>
                              </span>
                            </>
                          )}
                        </div>
                        <p>{activeTokenInPassage.explanation}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    Дээрх эх доторх шар хүрээтэй үг дээр дарж засах самбарыг нээнэ үү.
                  </p>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* Bottom CTA to Stage 4 */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-mono text-blue-300 mb-1 tabular-nums">
            3-Р ШАТНЫ ГҮЙЦЭТГЭЛ: {trapsDone + errorsDone}/{INCLASS_TRAPS.length + allTokens.length}
          </p>
          <h3 className="text-lg font-bold">
            Чиний алдааны хэв маягийг задалж харах уу?
          </h3>
        </div>
        <button
          onClick={onNextStage}
          className="min-h-[48px] px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
        >
          <span>4-р шат: Ухаалаг оношилгоо</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
