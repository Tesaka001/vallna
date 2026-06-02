// Canonical Dreamspell reference data (MVP subset).
// Full content lives in _docs/02_vallna_13month_reference_v1_0.md.
// Layer 1 text is injected into profile_json for LLM prompts.

export type DreamspellSeal = {
  number: number;
  name: string;
  colour: "Red" | "White" | "Blue" | "Yellow";
  power: string;
  action: string;
  essence: string;
  layer1: string;
};

export type DreamspellTone = {
  number: number;
  name: string;
  power: string;
  action: string;
  essence: string;
  layer1: string;
};

export type DreamspellWavespell = {
  number: number;
  name: string;
  theme: string;
};

export const DREAMSPELL_KIN1_ANCHOR = new Date(Date.UTC(1987, 6, 26));

export const DREAMSPELL_SEALS: DreamspellSeal[] = [
  { number: 1, name: "Red Dragon", colour: "Red", power: "Nurtures", action: "Being", essence: "Birth", layer1: "You carry primal nurturing energy. Today supports beginning something new, returning to your source, or simply being rather than doing. Trust instinct over logic." },
  { number: 2, name: "White Wind", colour: "White", power: "Communicates", action: "Breathing", essence: "Spirit", layer1: "You carry the energy of communication and spirit. Today supports speaking truth, listening deeply, and allowing inspiration to move through you. Speak only what you mean." },
  { number: 3, name: "Blue Night", colour: "Blue", power: "Dreams", action: "Intuiting", essence: "Abundance", layer1: "You carry dreaming and abundance energy. Today supports sitting with what is not yet clear, trusting the unknown, and noticing what your deeper mind is showing you. Pay attention to dreams tonight." },
  { number: 4, name: "Yellow Seed", colour: "Yellow", power: "Plants", action: "Targeting", essence: "Flowering", layer1: "You carry the energy of potential and targeted awareness. Today supports setting clear intentions, planting something new, and asking: what am I growing toward? Focus matters today." },
  { number: 5, name: "Red Serpent", colour: "Red", power: "Survives", action: "Instinct", essence: "Life Force", layer1: "You carry life force and instinctual intelligence. Today supports listening to your body, honouring what you feel, and reclaiming energy that has been suppressed or scattered." },
  { number: 6, name: "White World-Bridger", colour: "White", power: "Equalizes", action: "Death", essence: "Opportunity", layer1: "You carry the energy of necessary endings and new openings. Today supports releasing what has completed its cycle and recognising that every ending creates space for something new." },
  { number: 7, name: "Blue Hand", colour: "Blue", power: "Accomplishes", action: "Knowing", essence: "Healing", layer1: "You carry healing and accomplishment energy. Today supports completing what is unfinished, using your hands and body as instruments of knowing, and asking: what do I know that I have not yet acted on?" },
  { number: 8, name: "Yellow Star", colour: "Yellow", power: "Beautifies", action: "Art", essence: "Elegance", layer1: "You carry beauty and artistic intelligence. Today supports noticing what is beautiful, expressing something with care and intention, and asking: where am I settling for less than elegance in my life?" },
  { number: 9, name: "Red Moon", colour: "Red", power: "Purifies", action: "Flowing", essence: "Universal Water", layer1: "You carry purification and emotional flow. Today supports releasing what is stagnant, following natural rhythms, and allowing feelings to move through rather than accumulate." },
  { number: 10, name: "White Dog", colour: "White", power: "Loves", action: "Loyalty", essence: "Heart", layer1: "You carry love and loyalty energy. Today supports leading from the heart, asking who and what you are truly loyal to, and noticing where love is present even when you have not named it." },
  { number: 11, name: "Blue Monkey", colour: "Blue", power: "Plays", action: "Magic", essence: "Illusion", layer1: "You carry playful intelligence and magic. Today supports lightness, creativity, and the discovery that what has become too serious may benefit from a different angle." },
  { number: 12, name: "Yellow Human", colour: "Yellow", power: "Influences", action: "Wisdom", essence: "Free Will", layer1: "You carry wisdom and free will energy. Today supports choosing consciously rather than reacting automatically, asking what the wise part of you would do, and recognising the influence you have whether or not you intend it." },
  { number: 13, name: "Red Skywalker", colour: "Red", power: "Explores", action: "Wakefulness", essence: "Space", layer1: "You carry exploration and wakefulness energy. Today supports expanding beyond familiar boundaries, staying awake to what is present, and trusting the path even without a complete map." },
  { number: 14, name: "White Wizard", colour: "White", power: "Enchants", action: "Timelessness", essence: "Receptivity", layer1: "You carry timelessness and receptivity. Today supports aligning with what is already wanting to happen, working with the current rather than against it, and allowing rather than forcing." },
  { number: 15, name: "Blue Eagle", colour: "Blue", power: "Creates", action: "Vision", essence: "Mind", layer1: "You carry vision and creative mind energy. Today supports seeing the larger picture, lifting out of the immediate detail to understand the pattern, and asking: what is the vision that is trying to come through me?" },
  { number: 16, name: "Yellow Warrior", colour: "Yellow", power: "Questions", action: "Intelligence", essence: "Fearlessness", layer1: "You carry questioning and fearlessness energy. Today supports asking the question you have been afraid to ask, meeting fear with curiosity rather than avoidance, and trusting your own intelligence even when it contradicts what you have been told." },
  { number: 17, name: "Red Earth", colour: "Red", power: "Navigates", action: "Synchronizing", essence: "Evolution", layer1: "You carry navigation and synchronicity energy. Today supports paying attention to signs and meaningful coincidences, trusting the path even without a map, and asking: what is trying to find me rather than what am I trying to find?" },
  { number: 18, name: "White Mirror", colour: "White", power: "Reflects", action: "Order", essence: "Endlessness", layer1: "You carry reflection and order energy. Today supports honest self-examination, asking what you are seeing in others that is actually in you, and trusting that what you perceive clearly can be changed." },
  { number: 19, name: "Blue Storm", colour: "Blue", power: "Catalyzes", action: "Self-Generation", essence: "Energy", layer1: "You carry catalytic and self-generating energy. Today supports allowing necessary disruption, recognising that the storm clears what the gentle rain cannot, and asking: what needs to be broken open in order to grow?" },
  { number: 20, name: "Yellow Sun", colour: "Yellow", power: "Enlightens", action: "Life", essence: "Universal Fire", layer1: "You carry enlightenment and life energy. Today supports radiating rather than seeking, recognising where your light is already present, and asking: what would I do today if I already knew I was enough?" },
];

export const DREAMSPELL_TONES: DreamspellTone[] = [
  { number: 1, name: "Magnetic", power: "Unifies", action: "Attracting", essence: "Purpose", layer1: "Today carries the energy of unified purpose. Something is beginning. Ask: what is the single most important thing I am here to do? Let everything else be secondary to that." },
  { number: 2, name: "Lunar", power: "Stabilizes", action: "Polarizing", essence: "Challenge", layer1: "Today brings necessary tension and challenge. Something is polarizing — two forces are in contrast. Rather than resolving it too quickly, sit with the tension and ask: what is this challenge revealing?" },
  { number: 3, name: "Electric", power: "Activates", action: "Bonding", essence: "Service", layer1: "Today activates and energises. Something wants to move. Ask: who do I need, and who needs me? Service and collaboration amplify what working alone cannot achieve." },
  { number: 4, name: "Self-Existing", power: "Measures", action: "Defining", essence: "Form", layer1: "Today supports defining, measuring, and giving form to what has been conceptual. Something needs to become concrete. What needs a structure, a plan, a specific shape today?" },
  { number: 5, name: "Overtone", power: "Empowers", action: "Commanding", essence: "Radiance", layer1: "Today carries the energy of personal radiance and authority. Something wants to be expressed with full presence. Ask: where am I holding back my natural power?" },
  { number: 6, name: "Rhythmic", power: "Organizes", action: "Balancing", essence: "Equality", layer1: "Today supports finding natural rhythm and balance. Something wants to be organised around what already wants to move. Ask: where am I forcing rather than aligning?" },
  { number: 7, name: "Resonant", power: "Channels", action: "Inspiring", essence: "Attunement", layer1: "Today supports deep attunement and inspiration. Something wants to be heard when you become still enough to listen. Ask: what is trying to come through when I stop pushing?" },
  { number: 8, name: "Galactic", power: "Harmonizes", action: "Modeling", essence: "Integrity", layer1: "Today supports integrity and harmonising your actions with your values. Something wants to be modelled through how you live, not only what you say. Ask: where is the gap between what I believe and what I do?" },
  { number: 9, name: "Solar", power: "Pulses", action: "Realizing", essence: "Intention", layer1: "Today pulses with realisation and intention. Something is crystallising into clarity. What have you been working toward that is now becoming real? What intention is ready to be fully committed to?" },
  { number: 10, name: "Planetary", power: "Perfects", action: "Producing", essence: "Manifestation", layer1: "Today supports bringing something into tangible form. Something is ready to be produced and shared. Ask: what is good enough to release today?" },
  { number: 11, name: "Spectral", power: "Dissolves", action: "Releasing", essence: "Liberation", layer1: "Today supports necessary release and dissolution. Something has completed its form and wants to be freed. Ask: what am I holding onto that is already finished?" },
  { number: 12, name: "Crystal", power: "Cooperates", action: "Dedicating", essence: "Universalization", layer1: "Today supports cooperation, sharing, and dedication to something larger than yourself. What are you working on that wants to be shared? Who could you collaborate with today in a way that serves both of you?" },
  { number: 13, name: "Cosmic", power: "Endures", action: "Transcending", essence: "Presence", layer1: "Today carries the energy of completion and transcendence. Something has run its full course. Honour what has been, release it fully, and allow yourself to simply be present with what is — without needing it to become anything else." },
];

export const DREAMSPELL_WAVESPELLS: DreamspellWavespell[] = [
  { number: 1, name: "Red Dragon Wavespell", theme: "The Wavespell of Birth" },
  { number: 2, name: "White Wind Wavespell", theme: "The Wavespell of Spirit" },
  { number: 3, name: "Blue Night Wavespell", theme: "The Wavespell of Abundance" },
  { number: 4, name: "Yellow Seed Wavespell", theme: "The Wavespell of Flowering" },
  { number: 5, name: "Red Serpent Wavespell", theme: "The Wavespell of Life Force" },
  { number: 6, name: "White World-Bridger Wavespell", theme: "The Wavespell of Death and Opportunity" },
  { number: 7, name: "Blue Hand Wavespell", theme: "The Wavespell of Accomplishment" },
  { number: 8, name: "Yellow Star Wavespell", theme: "The Wavespell of Elegance" },
  { number: 9, name: "Red Moon Wavespell", theme: "The Wavespell of Purification" },
  { number: 10, name: "White Dog Wavespell", theme: "The Wavespell of Love" },
  { number: 11, name: "Blue Monkey Wavespell", theme: "The Wavespell of Magic" },
  { number: 12, name: "Yellow Human Wavespell", theme: "The Wavespell of Free Will" },
  { number: 13, name: "Red Skywalker Wavespell", theme: "The Wavespell of Space" },
  { number: 14, name: "White Wizard Wavespell", theme: "The Wavespell of Timelessness" },
  { number: 15, name: "Blue Eagle Wavespell", theme: "The Wavespell of Vision" },
  { number: 16, name: "Yellow Warrior Wavespell", theme: "The Wavespell of Intelligence" },
  { number: 17, name: "Red Earth Wavespell", theme: "The Wavespell of Synchronicity" },
  { number: 18, name: "White Mirror Wavespell", theme: "The Wavespell of Reflection" },
  { number: 19, name: "Blue Storm Wavespell", theme: "The Wavespell of Self-Generation" },
  { number: 20, name: "Yellow Sun Wavespell", theme: "The Wavespell of Enlightenment" },
];
