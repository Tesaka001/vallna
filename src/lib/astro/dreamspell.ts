import {
  DREAMSPELL_KIN1_ANCHOR,
  DREAMSPELL_SEALS,
  DREAMSPELL_TONES,
  DREAMSPELL_WAVESPELLS,
  type DreamspellSeal,
  type DreamspellTone,
  type DreamspellWavespell,
} from "./dreamspell-data";

export type DreamspellSignature = {
  kin: number;
  seal: DreamspellSeal;
  tone: DreamspellTone;
  wavespell: DreamspellWavespell & { position: number };
};

function daysBetweenUtc(start: Date, end: Date): number {
  const msPerDay = 86_400_000;
  return Math.floor((end.getTime() - start.getTime()) / msPerDay);
}

/** Dreamspell Kin (1–260) from a birth date. Anchor: 26 Jul 1987 = Kin 1. */
export function computeDreamspellKin(birthDate: Date): number {
  const utcBirth = new Date(
    Date.UTC(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()),
  );
  const days = daysBetweenUtc(DREAMSPELL_KIN1_ANCHOR, utcBirth);
  return (((days % 260) + 260) % 260) + 1;
}

export function computeDreamspellSignature(birthDate: Date): DreamspellSignature {
  const kin = computeDreamspellKin(birthDate);
  const toneNumber = ((kin - 1) % 13) + 1;
  const sealNumber = ((kin - 1) % 20) + 1;
  const wavespellStartKin = kin - toneNumber + 1;
  const wavespellSealNumber = ((wavespellStartKin - 1) % 20) + 1;

  const seal = DREAMSPELL_SEALS[sealNumber - 1];
  const tone = DREAMSPELL_TONES[toneNumber - 1];
  const wavespell = DREAMSPELL_WAVESPELLS[wavespellSealNumber - 1];

  return {
    kin,
    seal,
    tone,
    wavespell: {
      ...wavespell,
      position: toneNumber,
    },
  };
}
