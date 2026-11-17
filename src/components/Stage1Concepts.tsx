import { useState } from 'react';
import { ArrowRight, Compass, Eye, ShieldAlert, Sparkles } from 'lucide-react';
import {
  DEPENDENT_DUELS,
  IDIOMATIC_HACKS,
  SPATIAL_DIMENSIONS,
  VECTOR_PAIRS,
} from '../data/prepositionData';

interface Stage1ConceptsProps {
  onNextStage: () => void;
}

export default function Stage1Concepts({ onNextStage }: Stage1ConceptsProps) {
  const [activeSpatial, setActiveSpatial] = useState<'AT' | 'ON' | 'IN'>('AT');
  const [activeVectorId, setActiveVectorId] = useState<string>(VECTOR_PAIRS[0].id);
  const [activeDuelId, setActiveDuelId] = useState<string>(DEPENDENT_DUELS[0].id);
  const [revealedHacks, setRevealedHacks] = useState<Record<string, boolean>>({
    independent: true,
  });

  const currentSpatial =
    SPATIAL_DIMENSIONS.find((item) => item.prep === activeSpatial) ?? SPATIAL_DIMENSIONS[0];
  const currentVector =
    VECTOR_PAIRS.find((item) => item.id === activeVectorId) ?? VECTOR_PAIRS[0];
  const currentDuel =
    DEPENDENT_DUELS.find((item) => item.id === activeDuelId) ?? DEPENDENT_DUELS[0];

  const toggleHack = (id: string) => {
    setRevealedHacks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-10">
      {/* Intro Hero */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-3">
          <span>1-р шат</span>
          <span aria-hidden="true">·</span>
          <span>Хичээлийн өмнөх ойлголт</span>
          <span aria-hidden="true">·</span>
          <span>B2–C1 логик зураглал</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance mb-3">
          Дүрэм бүү цээжил. Зүгээр л орон зайг нь төсөөл.
        </h1>
        <p className="text-slate-600 text-[15px] leading-relaxed max-w-2xl">
          Угтвар үгийг хүснэгтээс цээжлэхээр шалгалт дээр өгүүлбэрийн контекст эргэхэд л гацдаг.
          Доорх 3 логик зураглалыг нэг гүйлгээд харчих. Анги дээр ирэхэд чинь ЭЕШ-ийн урхинууд шал
          өөр харагдана.
        </p>
      </section>

      {/* Schema 1: 0D / 1D / 3D Spatial-Temporal Lens */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-blue-600 mb-1">01. Орон зай ба Цагийн хэмжээс</p>
            <h2 className="text-xl font-bold text-slate-900">AT, ON, IN — Хийсвэр хэрэглээ</h2>
          </div>

          <div
            role="tablist"
            aria-label="AT ON IN хэмжээс сонгох"
            className="inline-flex items-center p-1 bg-slate-100 rounded-xl self-start"
          >
            {(['AT', 'ON', 'IN'] as const).map((prep) => {
              const active = activeSpatial === prep;
              return (
                <button
                  key={prep}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveSpatial(prep)}
                  className={`min-h-[40px] px-4 py-1.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {prep}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
          {/* Interactive SVG Canvas */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
              <span>VISUAL SCHEMA</span>
              <span className="font-semibold text-slate-800">{currentSpatial.dimension}</span>
            </div>

            <div className="w-full flex items-center justify-center py-4">
              <svg
                viewBox="0 0 320 200"
                className="w-full max-w-[300px] h-auto"
                role="img"
                aria-label={`${currentSpatial.prep} орон зайн логик бүдүүвч`}
              >
                {/* Grid backdrop */}
                <defs>
                  <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="0.8"
                    />
                  </pattern>
                </defs>
                <rect width="320" height="200" rx="12" fill="#FFFFFF" stroke="#E2E8F0" />
                <rect width="320" height="200" rx="12" fill="url(#gridPattern)" opacity="0.6" />

                {activeSpatial === 'AT' && (
                  <g>
                    {/* 0D Point Focus */}
                    <line x1="30" y1="100" x2="290" y2="100" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="160" y1="20" x2="160" y2="180" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                    <circle cx="160" cy="100" r="44" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
                    <circle cx="160" cy="100" r="22" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
                    <circle cx="160" cy="100" r="7" fill="#2563EB" />
                    <text x="160" y="34" textAnchor="middle" fill="#1E40AF" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      EXACT POINT (t = 0)
                    </text>
                    <text x="160" y="168" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="600">
                      at the end · at a crossroads · at a loss
                    </text>
                  </g>
                )}

                {activeSpatial === 'ON' && (
                  <g>
                    {/* 1D Timeline / 2D Surface Edge */}
                    <line x1="32" y1="120" x2="288" y2="120" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
                    <line x1="32" y1="120" x2="215" y2="120" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
                    <rect x="135" y="72" width="54" height="36" rx="8" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
                    <text x="162" y="95" textAnchor="middle" fill="#1D4ED8" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      ON
                    </text>
                    <circle cx="162" cy="120" r="6" fill="#2563EB" />
                    <polygon points="288,120 278,114 278,126" fill="#94A3B8" />
                    <text x="160" y="40" textAnchor="middle" fill="#1E40AF" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      TRACK / SURFACE / EDGE
                    </text>
                    <text x="160" y="168" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="600">
                      on time · on the market · on the verge
                    </text>
                  </g>
                )}

                {activeSpatial === 'IN' && (
                  <g>
                    {/* 3D Enclosure / Container */}
                    <rect x="65" y="52" width="190" height="96" rx="14" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" strokeDasharray="6 3" />
                    <rect x="122" y="78" width="76" height="44" rx="8" fill="#2563EB" />
                    <text x="160" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      INSIDE
                    </text>
                    <text x="160" y="34" textAnchor="middle" fill="#1E40AF" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      ENCLOSURE / OUTCOME FRAME
                    </text>
                    <text x="160" y="176" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="600">
                      in time · in the end · in the market
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-200 rounded-xl p-3">
              <strong className="text-slate-900">Менторын хараа:</strong> {currentSpatial.mentorLine}
            </p>
          </div>

          {/* Real B2-C1 Examples */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <p className="text-sm text-slate-700 font-medium mb-4">{currentSpatial.coreIdea}</p>
              <div className="space-y-3">
                {currentSpatial.examples.map((ex) => (
                  <div
                    key={ex.phrase}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <span className="font-serif text-base font-semibold text-slate-900">
                        {ex.phrase}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{ex.contrast}</span>
                    </div>
                    <p className="text-sm text-slate-600">{ex.mn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema 2: Vector vs Intent (TO vs FOR) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="pb-5 border-b border-slate-100">
          <p className="text-xs font-medium text-blue-600 mb-1">02. Чиглэл ба Зорилго</p>
          <h2 className="text-xl font-bold text-slate-900 mb-3">TO (тусах бай) vs. FOR (цаад зорилго)</h2>
          <div className="flex flex-wrap gap-2">
            {VECTOR_PAIRS.map((pair) => {
              const active = pair.id === activeVectorId;
              return (
                <button
                  key={pair.id}
                  onClick={() => setActiveVectorId(pair.id)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pair.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          {/* Card 1: TO / ABOUT / AT */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/70">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold text-blue-700">
                {currentVector.toHighlight.toUpperCase()}
              </span>
              <Compass className="w-4 h-4 text-blue-600" aria-hidden="true" />
            </div>
            <p className="font-serif text-base text-slate-900 leading-relaxed mb-3">
              “{currentVector.toSentence}”
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">{currentVector.toLogic}</p>
          </div>

          {/* Card 2: FOR / TO */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/70">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold text-amber-700">
                {currentVector.forHighlight.toUpperCase()}
              </span>
              <Eye className="w-4 h-4 text-amber-600" aria-hidden="true" />
            </div>
            <p className="font-serif text-base text-slate-900 leading-relaxed mb-3">
              “{currentVector.forSentence}”
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">{currentVector.forLogic}</p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-sm text-slate-800">
          <strong className="text-blue-900">Товч дүрэм биш, мэдрэмж:</strong> {currentVector.mentorTip}
        </div>
      </section>

      {/* Schema 3: Dependent Preposition Duels */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="pb-5 border-b border-slate-100">
          <p className="text-xs font-medium text-blue-600 mb-1">03. Холбоот угтвар үгийн урхи</p>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Нэг үйл үг — Хоёр өөр ертөнц</h2>
          <div className="flex flex-wrap gap-2">
            {DEPENDENT_DUELS.map((duel) => {
              const active = duel.id === activeDuelId;
              return (
                <button
                  key={duel.id}
                  onClick={() => setActiveDuelId(duel.id)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {duel.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <div className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm font-bold text-slate-900">
                {currentDuel.left.phrase}
              </span>
              <span className="text-xs font-mono text-slate-500">
                {currentDuel.left.diagramType === 'parts'
                  ? 'A = x + y + z'
                  : currentDuel.left.diagramType === 'forward'
                  ? 'Cause → Effect'
                  : 'General Topic'}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 mb-3">{currentDuel.left.meaning}</p>
            <p className="font-serif text-[15px] text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {currentDuel.left.example}
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-sm font-bold text-blue-700">
                {currentDuel.right.phrase}
              </span>
              <span className="text-xs font-mono text-blue-600">
                {currentDuel.right.diagramType === 'essence'
                  ? 'Core ⊂ Meaning'
                  : currentDuel.right.diagramType === 'backward'
                  ? 'Effect ← Cause'
                  : 'Body Symptom'}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 mb-3">{currentDuel.right.meaning}</p>
            <p className="font-serif text-[15px] text-slate-800 bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              {currentDuel.right.example}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-950">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <p>{currentDuel.trapWarning}</p>
        </div>
      </section>

      {/* Schema 4: Honest Mentor Corner (Idiomatic Lifehacks) */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
        <div className="pb-5 border-b border-slate-100">
          <p className="text-xs font-medium text-blue-600 mb-1">04. Шударга менторын булан</p>
          <h2 className="text-xl font-bold text-slate-900">
            Логик ажиллахгүй үед яах вэ? (Зуршил & Лайфхак)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Англи хэл бол математик биш. Зарим угтвар үг ямар ч логикгүй, зүгээр л унаган хэлтнүүдийн
            зуршил байдаг. Карт бүрийг дарж ЭЕШ-ийн лайфхакийг нь нээ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-6">
          {IDIOMATIC_HACKS.map((hack) => {
            const open = !!revealedHacks[hack.id];
            return (
              <div
                key={hack.id}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-xs font-mono text-rose-600 line-through">
                      {hack.wrongGuess}
                    </span>
                    <button
                      onClick={() => toggleHack(hack.id)}
                      className="min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
                    >
                      {open ? 'Нуух' : 'Лайфхак нээх'}
                    </button>
                  </div>
                  <p className="font-serif text-[15px] text-slate-900 mb-2">“{hack.sentence}”</p>
                </div>

                {open && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 font-mono font-bold text-emerald-700">
                      <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Зөв нь: {hack.correctForm}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{hack.whyWrong}</p>
                    <p className="text-slate-800 text-xs font-medium leading-relaxed">
                      Хэрхэн тогтоох: {hack.lifehack}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 text-white rounded-2xl p-6">
        <div>
          <h3 className="text-lg font-bold">Логик зураглал толгойд буусан уу?</h3>
          <p className="text-sm text-slate-300">
            Одоо 60 секундийн дотор 5 оношлох асуултаар өөрийгөө шалгаад үзье.
          </p>
        </div>
        <button
          onClick={onNextStage}
          className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
        >
          <span>2-р шат: Богино сорил</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
