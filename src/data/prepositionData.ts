export type CategoryId = 'spatial' | 'vector' | 'dependent' | 'idiomatic';

export interface CategoryMeta {
  id: CategoryId;
  title: string;
  shortTitle: string;
  formula: string;
  goldenRule: string;
  goldenDetail: string;
}

export const CATEGORY_META: Record<CategoryId, CategoryMeta> = {
  spatial: {
    id: 'spatial',
    title: 'Хийсвэр орон зай ба Цаг',
    shortTitle: 'Орон зай / Цаг',
    formula: 'AT (0D цэг) · ON (1D шугам/гадаргуу) · IN (3D хүрээ)',
    goldenRule: 'Цаг ба нөхцөл байдлыг "хэмжээс"-ээр хар.',
    goldenDetail:
      'Яг товлосон мөч бол цэг (at). Хуваарь эсвэл гадаргуугийн хүрэлцээ бол шугам (on). Тодорхой хүрээ, хоцрохгүй байх нөөц хугацаа, эсвэл үйл явдлын үр дүн бол сав (in).',
  },
  vector: {
    id: 'vector',
    title: 'Чиглэл ба Зорилго (To vs. For)',
    shortTitle: 'Чиглэл / Зорилго',
    formula: 'TO (тусах бай →) · FOR (зорилго, ашиг тус ☂)',
    goldenRule: '"Хэн рүү/юу руу тусах" ба "юуны төлөө"-г бүү холь.',
    goldenDetail:
      'Хор хөнөөл, түлхүүр, хандлага нь шууд нэг бай руу чиглэдэг тул TO авна (harmful to, key to). Харин шалтгаан, ашиг тус, хүсэл тэмүүлэл нь цаад зорилгыг заадаг тул FOR авна (reason for, anxious for).',
  },
  dependent: {
    id: 'dependent',
    title: 'Холбоот угтвар үгийн урхи',
    shortTitle: 'Холбоот үгс',
    formula: 'Үг ижил ч угтвар үг солигдоход утга 180° эргэнэ',
    goldenRule: 'Үйл үгийг угтвар үгтэй нь "багц" болгож унш.',
    goldenDetail:
      'consist of (бүрэлдэхүүн) vs consist in (мөн чанар), result in (үр дагавар) vs result from (шалтгаан). Дан үгийг нь орчуулах гэж оролдвол ЭЕШ-ийн урхинд шууд унана.',
  },
  idiomatic: {
    id: 'idiomatic',
    title: 'Логикгүй зуршил ба Монгол орчуулгын урхи',
    shortTitle: 'Зуршил / ЭЕШ урхи',
    formula: 'Монголоор "-аас" гэж буудаг ч англиар "from" биш!',
    goldenRule: 'Монгол "-аас / -тай" нөхцөлийг шууд бүү хуул.',
    goldenDetail:
      'Монголоор "хараат бус" гэхээр from, "гэрлэсэн" гэхээр with гэж боддог нь хамгийн том алдаа. Independent OF, immune TO, married TO, deprived OF гээд унаган хэлтний зуршлыг шууд хос болгож тогтоо.',
  },
};

export interface SpatialDimension {
  prep: 'AT' | 'ON' | 'IN';
  dimension: string;
  coreIdea: string;
  mentorLine: string;
  examples: {
    phrase: string;
    contrast: string;
    mn: string;
  }[];
}

export const SPATIAL_DIMENSIONS: SpatialDimension[] = [
  {
    prep: 'AT',
    dimension: '0D · Огтлолцлын цэг',
    coreIdea: 'Яг нэг цэг, товчлуур шиг тодорхой байрлал эсвэл цагийн мөч.',
    mentorLine:
      'Хэрвээ чи Google Maps дээр ганц pin хатгаж чадах цэг эсвэл цаг хугацааны яг тэр мөчийг зааж байвал AT.',
    examples: [
      {
        phrase: 'at the end of the term',
        contrast: 'vs. in the end',
        mn: 'Яг төгсөх тэр цэг дээр (цаг хугацааны хязгаар).',
      },
      {
        phrase: 'at a crossroads',
        contrast: 'шийдвэрийн зааг',
        mn: 'Хоёр замын огтлолцсон цэг дээр гацсан үе.',
      },
      {
        phrase: 'at a loss for words',
        contrast: 'мухардах цэг',
        mn: 'Хэлэх үггүй болж гацсан яг тэр агшин.',
      },
    ],
  },
  {
    prep: 'ON',
    dimension: '1D / 2D · Шугам ба Гадаргуу',
    coreIdea: 'Ямар нэг зам, хуваарь, эрсдэлийн ирмэг эсвэл тавцан дээр гишгэж байгаа мэдрэмж.',
    mentorLine:
      'Галт тэрэгний зам шиг шулуун хуваарь дагаж яваа, эсвэл ямар нэг зүйлийн ирмэг дээр тэнцэж байвал ON.',
    examples: [
      {
        phrase: 'on time',
        contrast: 'vs. in time',
        mn: 'Яг хуваарийн шугам дээр таарсан (14:00 бол яг 14:00).',
      },
      {
        phrase: 'on the market',
        contrast: 'vs. in the market',
        mn: 'Борлуулалтын тавцан дээр өрөгдсөн (зарагдаж байгаа).',
      },
      {
        phrase: 'on the verge of burnout',
        contrast: 'ирмэг дээр',
        mn: 'Яг хавцлын ирмэг дээр тулаад зогсож буй төлөв.',
      },
    ],
  },
  {
    prep: 'IN',
    dimension: '3D · Хүрээ ба Орчин',
    coreIdea: 'Чамайг хүрээлж авсан нөхцөл байдал, доторх орон зай, эсвэл үйл явцын үр дүн.',
    mentorLine:
      'Хэрэв чи тэр зүйлийн дотор орчихсон, хүрээнд нь байгаа, эсвэл олон үйл явдлын эцэст хүрсэн бол IN.',
    examples: [
      {
        phrase: 'in the end',
        contrast: 'vs. at the end',
        mn: 'Бүх адал явдал, эргэлзээний эцсийн дүнд (finally).',
      },
      {
        phrase: 'in time for the deadline',
        contrast: 'vs. on time',
        mn: 'Хоцрохоос өмнө амжсан (цагийн нөөц хүрээн дотор).',
      },
      {
        phrase: 'in the market for a laptop',
        contrast: 'vs. on the market',
        mn: 'Зах зээл дотор худалдаж авах сонирхолтой яваа хүн.',
      },
    ],
  },
];

export interface VectorPair {
  id: string;
  label: string;
  toSentence: string;
  toHighlight: string;
  toLogic: string;
  forSentence: string;
  forHighlight: string;
  forLogic: string;
  mentorTip: string;
}

export const VECTOR_PAIRS: VectorPair[] = [
  {
    id: 'good',
    label: 'good to vs. good for',
    toSentence: 'She has always been remarkably good to her junior teammates.',
    toHighlight: 'good to',
    toLogic: 'Сэтгэл, хандлага тэр хүн рүү чиглэж туссан (сайхан хандах).',
    forSentence: 'Cold showers in the morning are surprisingly good for your focus.',
    forHighlight: 'good for',
    forLogic: 'Ямар нэг үр дүн, ашиг тусын төлөө үйлчилж байгаа (сайн нөлөөтэй).',
    mentorTip: 'Хүн рүү чиглэсэн зан чанар бол TO, эрүүл мэнд/үр дүнд ашигтай бол FOR.',
  },
  {
    id: 'anxious',
    label: 'anxious about vs. anxious for',
    toSentence: 'Many seniors are anxious about the upcoming ЭЕШ physics paper.',
    toHighlight: 'anxious about',
    toLogic: 'Сэтгэл зовнил тэр сэдвийг тойрч эргэлдэнэ (about = эргэн тойрон).',
    forSentence: 'Graduates are anxious for real-world experience after high school.',
    forHighlight: 'anxious for',
    forLogic: 'Тэр зүйлийг олж авахын төлөө яарч, хүсэн хүлээж байгаа (eager for).',
    mentorTip: 'ЭЕШ дээр "anxious" хараад шууд about бүү тавь. Хүсэж яарах утгатай бол FOR!',
  },
  {
    id: 'key-reason',
    label: 'key to vs. reason for',
    toSentence: 'Consistent sleep is the real key to high cognitive performance.',
    toHighlight: 'key to',
    toLogic: 'Түлхүүр нь цоож руу чиглэж ордог (key to, solution to, answer to).',
    forSentence: 'There was no convincing reason for the sudden server outage.',
    forHighlight: 'reason for',
    forLogic: 'Ямар нэг зүйл болсны цаад зорилго, учир шалтгаан (reason for, demand for).',
    mentorTip: 'Оюуны сэтгэхүйгээр бол "Түлхүүр цоож РУУ орно" -> тиймээс үргэлж TO.',
  },
  {
    id: 'shout',
    label: 'shout at vs. shout to',
    toSentence: 'The coach shouted at the referee after the controversial foul.',
    toHighlight: 'shout at',
    toLogic: 'Уур уцаартай сум шиг яг нэг цэг (бай) руу чиглэж хашхирах.',
    forSentence: 'She shouted to her friend across the crowded concert hall.',
    forHighlight: 'shout to',
    forLogic: 'Дуугаа хүргэхийн тулд нөгөө хүн рүүгээ чиглүүлж дуудах (уур биш).',
    mentorTip: 'AT нь ихэвчлэн түрэмгий, онилсон утгатай (laugh at, throw at, shout at).',
  },
];

export interface DependentDuel {
  id: string;
  title: string;
  left: {
    phrase: string;
    meaning: string;
    example: string;
    diagramType: 'parts' | 'forward' | 'person' | 'topic';
  };
  right: {
    phrase: string;
    meaning: string;
    example: string;
    diagramType: 'essence' | 'backward' | 'rule' | 'symptom';
  };
  trapWarning: string;
}

export const DEPENDENT_DUELS: DependentDuel[] = [
  {
    id: 'consist',
    title: 'consist OF vs. consist IN',
    left: {
      phrase: 'consist of',
      meaning: 'Биет болон тоолж болох хэсгүүдээс бүрэлдэн тогтох',
      example: 'The ЭЕШ English test consists of four distinct sections.',
      diagramType: 'parts',
    },
    right: {
      phrase: 'consist in',
      meaning: 'Гол мөн чанар, утга учир нь орших (= lie in)',
      example: 'True confidence consists in knowing what you still need to learn.',
      diagramType: 'essence',
    },
    trapWarning: 'ЭЕШ-ийн 800 онооны сонгодог урхи. "Жагсаасан хэсэг" биш "мөн чанар" ярьж байвал IN шүү!',
  },
  {
    id: 'result',
    title: 'result IN vs. result FROM',
    left: {
      phrase: 'result in',
      meaning: 'Урагшаа: [Шалтгаан] → [Үр дагавар]-т хүргэх',
      example: 'Ignoring sleep before exams often results in careless mistakes.',
      diagramType: 'forward',
    },
    right: {
      phrase: 'result from',
      meaning: 'Ухрах: [Үр дагавар] ← [Шалтгаан]-аас үүдэн гарах',
      example: 'His calm mindset resulted from months of deliberate practice.',
      diagramType: 'backward',
    },
    trapWarning: 'Сумны чиглэлийг л хар: IN бол үр дагавар руугаа, FROM бол эх үүсвэрээсээ.',
  },
  {
    id: 'complain',
    title: 'complain ABOUT vs. complain OF',
    left: {
      phrase: 'complain about',
      meaning: 'Үйлчилгээ, нөхцөл байдал, хэн нэгний тухай гомдоллох',
      example: 'Students frequently complain about ambiguous multiple-choice distractors.',
      diagramType: 'topic',
    },
    right: {
      phrase: 'complain of',
      meaning: 'Биеийн өвчин, зовуурь (migraine, fatigue) хэлж зовох',
      example: 'After staring at screens for ten hours, she complained of a sharp headache.',
      diagramType: 'symptom',
    },
    trapWarning: 'Өвчин, зовуурь хэлбэл OF. Бусад бүх бухимдал дээр ABOUT.',
  },
];

export interface IdiomHack {
  id: string;
  wrongGuess: string;
  correctForm: string;
  sentence: string;
  whyWrong: string;
  lifehack: string;
}

export const IDIOMATIC_HACKS: IdiomHack[] = [
  {
    id: 'independent',
    wrongGuess: 'independent from',
    correctForm: 'independent OF',
    sentence: 'Gen-Z creators want to stay financially independent of traditional agencies.',
    whyWrong: 'Монголоор "-аас хараат бус" гэдэг тул 10 сурагчийн 9 нь FROM гээд буудчихдаг.',
    lifehack: 'Адил эсрэг хоёулаа OF авдаг гэж тогтоо: dependent ON, харин independent OF.',
  },
  {
    id: 'married',
    wrongGuess: 'married with',
    correctForm: 'married TO',
    sentence: 'Don’t get married to your first essay draft; edit ruthlessly.',
    whyWrong: '"Хүнтэй гэрлэх" гээд шууд WITH тавьбал "хүүхэдтэй/гэр бүлтэй байх" гэсэн өөр утга болно.',
    lifehack: 'Хоёр зүйлийг хооронд нь холбох гагнуур бол TO (attached to, tied to, married to).',
  },
  {
    id: 'immune',
    wrongGuess: 'immune from / against',
    correctForm: 'immune TO',
    sentence: 'No brand is completely immune to public criticism online.',
    whyWrong: 'Халдвараас хамгаалагдах мэт санагдаад FROM эсвэл AGAINST сонгох гээд байдаг.',
    lifehack: 'Дархлаа бол довтолгооны өөдөөс тогтоох бамбай: vulnerable TO ба immune TO хоёулаа TO.',
  },
  {
    id: 'deprived',
    wrongGuess: 'deprived from',
    correctForm: 'deprived OF',
    sentence: 'Rural schools should never be deprived of high-speed internet access.',
    whyWrong: '"Юмнаас хоцрох/салах" гэсэн утгатай ч FROM биш OF авдаг хатуу хослол.',
    lifehack: 'Хулгайлах, салгах, хомсдуулах бүх "хасах" үйл үг OF авна (rob of, cure of, deprive of).',
  },
  {
    id: 'purpose',
    wrongGuess: 'by purpose / on mistake',
    correctForm: 'ON purpose · BY mistake',
    sentence: 'Did the exam committee drop that distractor on purpose or by mistake?',
    whyWrong: 'Хоёр эсрэг утгатай хэлц атлаа угтвар үг нь яг эсрэг байдаг.',
    lifehack: 'Зорилго бол чиний тавцан (ON purpose). Алдаа бол хажуугаар шүргээд өнгөрөх санамсаргүй явдал (BY mistake).',
  },
];

export interface DiagnosticQuestion {
  id: string;
  category: CategoryId;
  promptMn: string;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correct: string;
  trapOption: string;
  explanation: string;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'dq1',
    category: 'spatial',
    promptMn: 'Улаанбаатарын түгжрэлийг давж амжсан уу? Логик хэмжээсийг нь хар.',
    sentenceBefore: 'We were stuck in Ulaanbaatar traffic for an hour, yet we arrived just ',
    sentenceAfter: ' time to grab front-row seats before the doors locked.',
    options: ['on', 'in', 'at', 'by'],
    correct: 'in',
    trapOption: 'on',
    explanation:
      '"On time" гэвэл яг цагийн хуваарьт таарсан гэсэн үг. Энд хаалга хаагдахаас өмнөх нөөц хүрээн дотор амжсан тул "in time" орно.',
  },
  {
    id: 'dq2',
    category: 'dependent',
    promptMn: 'Энэ өгүүлбэр хэсгүүдийг жагсааж байна уу, эсвэл мөн чанарыг ярьж байна уу?',
    sentenceBefore: 'Effective leadership does not consist ',
    sentenceAfter: ' micromanaging every Slack message; it lies in building trust.',
    options: ['of', 'in', 'with', 'from'],
    correct: 'in',
    trapOption: 'of',
    explanation:
      'Энд л ихэнх нь унадаг юм даа. Тоолж болох хэсэг биш, жинхэнэ мөн чанар (= lie in) ярьж байгаа учраас "consist in" зөв.',
  },
  {
    id: 'dq3',
    category: 'vector',
    promptMn: 'Сөрөг нөлөө хаашаа чиглэж тусаж байна вэ?',
    sentenceBefore: 'Doomscrolling at 2 a.m. might feel relaxing, yet it is deeply detrimental ',
    sentenceAfter: ' deep REM sleep.',
    options: ['for', 'to', 'against', 'at'],
    correct: 'to',
    trapOption: 'for',
    explanation:
      '"Good for" гэдгээс болоод "detrimental for" гэж буудчихдаг. Хор хөнөөл шууд нэг бай руу чиглэж тусдаг тул "detrimental to / harmful to" авна.',
  },
  {
    id: 'dq4',
    category: 'dependent',
    promptMn: 'Нэг ижил тэмдэг нэр, гэхдээ утга нь хоёр тийшээ эргэсэн хос:',
    sentenceBefore: 'Investors are anxious ',
    sentenceAfter: ' the sudden policy shift, while founders are anxious for clearer regulations.',
    options: ['for', 'about', 'of', 'with'],
    correct: 'about',
    trapOption: 'for',
    explanation:
      'Арын хэсэгт "anxious for" (яарч хүлээх) байгаа ч эхний хэсэгт "сэтгэл зовних" утга тул "anxious about" орно.',
  },
  {
    id: 'dq5',
    category: 'idiomatic',
    promptMn: 'Монгол "-аас" нөхцөлөөр бүү сэтгэ. Шууд ЭЕШ-ийн зуршлаар нь барь.',
    sentenceBefore: 'Despite wanting to remain completely independent ',
    sentenceAfter: ' corporate sponsors, the podcast still needed ad revenue.',
    options: ['from', 'of', 'with', 'to'],
    correct: 'of',
    trapOption: 'from',
    explanation:
      'Монголоор "спонсоруудаас хараат бус" гэхээр 90% нь FROM тавьдаг. Гэхдээ англи хэлэнд үргэлж "independent OF" байдаг шүү!',
  },
];

export interface TrapChallenge {
  id: string;
  category: CategoryId;
  badgeLabel: string;
  sentenceBefore: string;
  sentenceMiddle?: string;
  sentenceAfter: string;
  options: string[];
  correct: string;
  explanation: string;
  classPrompt: string;
}

export const INCLASS_TRAPS: TrapChallenge[] = [
  {
    id: 'trap1',
    category: 'spatial',
    badgeLabel: 'Цаг хугацааны хос урхи',
    sentenceBefore: '',
    sentenceMiddle: ' the end of the three-hour debate, nobody budged—so ',
    sentenceAfter: ' the end, the council shelved the proposal.',
    options: ['At / in', 'In / at', 'On / in', 'By / at'],
    correct: 'At / in',
    explanation:
      'Эхнийх нь мэтгэлцээн дуусах тодорхой цэг тул "At the end of". Хоёр дахь нь бүх үйл явдлын эцсийн дүн буюу "finally" утга тул "in the end".',
    classPrompt:
      'Ангидаа асуу: "At the end of the movie" ба "In the end, the hero survived" хоёрын аль нь plot twist-д илүү тохирох вэ?',
  },
  {
    id: 'trap2',
    category: 'dependent',
    badgeLabel: 'Шалтгаан → Үр дагавар',
    sentenceBefore: 'The unexpected dip in test scores resulted ',
    sentenceMiddle: ' rushed reading, which ultimately resulted ',
    sentenceAfter: ' students missing easy points.',
    options: ['from / in', 'in / from', 'of / to', 'by / into'],
    correct: 'from / in',
    explanation:
      'Урвуу сум (←) буюу шалтгаанаас үүдсэн бол "result from". Урагш сум (→) буюу үр дагаварт хүргэсэн бол "result in".',
    classPrompt:
      'Самбар дээр ганц өгүүлбэрээ байрлалыг нь солиод бичээд үз: "Rushed reading resulted ___ the dip." Угтвар үг яаж солигдох вэ?',
  },
  {
    id: 'trap3',
    category: 'idiomatic',
    badgeLabel: 'Дархлааны хуурамч "from"',
    sentenceBefore: 'Having grown up online, Gen-Z readers are surprisingly immune ',
    sentenceAfter: ' clickbait headlines that fooled earlier generations.',
    options: ['to', 'from', 'against', 'with'],
    correct: 'to',
    explanation:
      'Халдвараас хамгаалагдах гэж бодоод FROM эсвэл AGAINST тавих нь хамгийн элбэг алдаа. "Immune TO" болон "vulnerable TO" хоёулаа ТО авдаг.',
    classPrompt:
      'Үнэхээр бид clickbait-д дархлаатай болсон уу, эсвэл зүгээр л өөр төрлийн урхинд ордог болсон уу? 2 минутын англи мэтгэлцээн!',
  },
  {
    id: 'trap4',
    category: 'vector',
    badgeLabel: 'Чиглэл vs. Дуу хоолой',
    sentenceBefore: 'Never shout ',
    sentenceMiddle: ' a teammate over a minor bug; instead, shout ',
    sentenceAfter: ' the designer across the room if you need the Figma link.',
    options: ['at / to', 'to / at', 'for / at', 'on / to'],
    correct: 'at / to',
    explanation:
      'Уурлаж довтлох бай бол AT (shout at, throw at). Дуугаа хүргэж дуудах энгийн чиглэл бол TO (shout to).',
    classPrompt:
      'Яг үүнтэй ижил утга өөрчлөгддөг өөр хос ол: "throw at" vs "throw to" хоёр ямар ялгаатай вэ?',
  },
];

export interface ErrorToken {
  id: string;
  wrongWord: string;
  correctWord: string;
  options: string[];
  category: CategoryId;
  explanation: string;
}

export interface ErrorPassage {
  id: string;
  title: string;
  contextLabel: string;
  segments: Array<
    | { type: 'text'; value: string }
    | { type: 'error'; token: ErrorToken }
  >;
}

export const ERROR_PASSAGES: ErrorPassage[] = [
  {
    id: 'ielts-essay',
    title: 'IELTS Task 2 Эсээний хэсэг',
    contextLabel: 'Эрдэм шинжилгээний бичвэр · 3 алдаа нуугдсан',
    segments: [
      {
        type: 'text',
        value: 'Modern megacities may look self-sufficient on the surface, as they consist ',
      },
      {
        type: 'error',
        token: {
          id: 'err1',
          wrongWord: 'in',
          correctWord: 'of',
          options: ['of', 'in', 'from', 'with'],
          category: 'dependent',
          explanation:
            'Энд мега хот нь сая сая оршин суугч, олон дүүргээс БҮРДЭЖ байгаа (parts) тул "consist in" биш "consist OF" байх ёстой.',
        },
      },
      {
        type: 'text',
        value:
          ' millions of commuters and sprawling transit hubs. Yet urban life remains heavily dependent ',
      },
      {
        type: 'error',
        token: {
          id: 'err2',
          wrongWord: 'from',
          correctWord: 'on',
          options: ['on', 'from', 'of', 'to'],
          category: 'idiomatic',
          explanation:
            'Монголоор "хангамжаас хамааралтай" гэхээр FROM тавьчихдаг. Гэвч dependent үргэлж ON (эсвэл upon) авна.',
        },
      },
      {
        type: 'text',
        value:
          ' fragile global supply chains. Therefore, decentralizing local production is the real key ',
      },
      {
        type: 'error',
        token: {
          id: 'err3',
          wrongWord: 'for',
          correctWord: 'to',
          options: ['to', 'for', 'of', 'in'],
          category: 'vector',
          explanation:
            'Түлхүүр нь тодорхой шийдэл рүү чиглэн таардаг тул "key for" бус "key TO" (solution to, answer to) орно.',
        },
      },
      {
        type: 'text',
        value: ' long-term resilience.',
      },
    ],
  },
  {
    id: 'genz-post',
    title: 'Tech Startup Сошиал Пост',
    contextLabel: 'Амьд англи хэл · 3 алдаа нуугдсан',
    segments: [
      {
        type: 'text',
        value: 'Hot take for student builders: don’t get married ',
      },
      {
        type: 'error',
        token: {
          id: 'err4',
          wrongWord: 'with',
          correctWord: 'to',
          options: ['to', 'with', 'for', 'by'],
          category: 'idiomatic',
          explanation:
            'Ямар нэг санаа эсвэл технологитой хэт зууралдахыг "married WITH" биш "married TO" гэдэг.',
        },
      },
      {
        type: 'text',
        value: ' your first wireframe. ',
      },
      {
        type: 'error',
        token: {
          id: 'err5',
          wrongWord: 'On',
          correctWord: 'In',
          options: ['In', 'On', 'At', 'By'],
          category: 'spatial',
          explanation:
            'Үйл явцын эцсийн дүнд (= finally) гэхэд "On the end" гэж хэзээ ч хэлэхгүй. Үргэлж "IN the end".',
        },
      },
      {
        type: 'text',
        value:
          ' the end, shipping something real beats obsessing over pixels and leaving users deprived ',
      },
      {
        type: 'error',
        token: {
          id: 'err6',
          wrongWord: 'from',
          correctWord: 'of',
          options: ['of', 'from', 'with', 'for'],
          category: 'idiomatic',
          explanation:
            'Хэрэглэгчдийг бодит шийдлээс хомсдуулах: "deprived FROM" биш "deprived OF"!',
        },
      },
      {
        type: 'text',
        value: ' a working product.',
      },
    ],
  },
];

export interface ArchetypeResult {
  title: string;
  subtitle: string;
  mentorNote: string;
  badgeColor: 'emerald' | 'blue' | 'amber' | 'rose';
}

export function diagnoseStudent(
  totalAnswered: number,
  totalCorrect: number,
  categoryStats: Record<CategoryId, { answered: number; correct: number }>
): ArchetypeResult {
  if (totalAnswered === 0) {
    return {
      title: 'Онош хараахан гараагүй',
      subtitle: 'Эхлээд 2 ба 3-р шатны дасгалуудаас ажиллаарай',
      mentorNote:
        'Одоогоор ямар ч сорил бөглөөгүй байна. 2-р шат руу ороод 5 асуултыг 60 секундэд цохиод үз.',
      badgeColor: 'blue',
    };
  }

  const accuracy = totalCorrect / totalAnswered;
  const idiomaticAcc =
    categoryStats.idiomatic.answered > 0
      ? categoryStats.idiomatic.correct / categoryStats.idiomatic.answered
      : 1;
  const spatialAcc =
    categoryStats.spatial.answered > 0
      ? categoryStats.spatial.correct / categoryStats.spatial.answered
      : 1;
  const dependentAcc =
    categoryStats.dependent.answered > 0
      ? categoryStats.dependent.correct / categoryStats.dependent.answered
      : 1;

  if (accuracy >= 0.85 && totalAnswered >= 10) {
    return {
      title: 'Логик мэдрэгч · ЭЕШ 800 түвшин',
      subtitle: 'Чи угтвар үгийг цээжилдэг биш, орон зайгаар хардаг болжээ',
      mentorNote:
        'Гайхалтай. Холбоот угтвар үг болон хийсвэр цагийн урхинуудад чи огт автсангүй. Одоо шалгалт дээр зөвхөн анхаарал сарнихаас л болгоомжил.',
      badgeColor: 'emerald',
    };
  }

  if (accuracy >= 0.65) {
    if (idiomaticAcc < 0.6) {
      return {
        title: 'Монгол орчуулгын олз',
        subtitle: 'Логик чинь сайн ч "-аас / -тай" гэж буухдаа бүдэрч байна',
        mentorNote:
          'Орон зай ба чиглэлийг чи сайн барьж байна. Харин "independent of", "deprived of", "married to" гэх мэт монгол орчуулгаас зөрдөг хослолууд дээр оноогоо алджээ.',
        badgeColor: 'amber',
      };
    }
    if (dependentAcc < 0.6 || spatialAcc < 0.6) {
      return {
        title: 'Дүрэм цээжлэгч (Шилжилтийн үе)',
        subtitle: 'Сурсан дүрмээ ашиглаж байгаа ч контекст эргэхэд эргэлзэж байна',
        mentorNote:
          'Чи "consist" хараад шууд "of", "end" хараад шууд "at" гэх мэт рефлекстэй байна. Өгүүлбэрийг бүтнээр нь уншаад утгын зургийг нь хар.',
        badgeColor: 'blue',
      };
    }
    return {
      title: 'Нарийн ялгааны анчин',
      subtitle: 'Суурь маш сайн, жижиг урхинуудыг цэвэрлэхэд л 800 бэлэн',
      mentorNote:
        'Нийт гүйцэтгэл өндөр байна. Алдсан ганц хоёр нарийн хослолоо доорх задаргаанаас хараад тэмдэглэчих.',
      badgeColor: 'blue',
    };
  }

  return {
    title: 'Таамаглагч · Дахин зураглах шаардлагатай',
    subtitle: 'Монголоор орчуулж таах арга чинь ЭЕШ дээр ажиллахгүй',
    mentorNote:
      'Шударга хэлэхэд чи мэдрэмжээрээ буудсан байна. 1-р шатны SVG зураглал руу буцаж ороод AT/ON/IN ба TO/FOR хоёрын ялгааг нүдээрээ дахиад хар даа.',
    badgeColor: 'rose',
  };
}
