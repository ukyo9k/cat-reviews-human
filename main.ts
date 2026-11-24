import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One funny single-line one-star review, written by a house cat about its human.
// Specific complaint (the laptop keyboard), feline voice (the human is judged
// by cat standards), deadpan review shape, sting in the last few words.
const review =
  "One star. He types on my keyboard all day, then acts shocked when I sit on it. I live here. He just pays the rent.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// Gate check, mirroring the competition gate: 1-200 chars, single line,
// not only whitespace. Fail loudly instead of writing an invalid entry.
if (
  review.length < 1 ||
  review.length > 200 ||
  review.includes("\n") ||
  review.trim().length === 0
) {
  throw new Error(
    `Review fails the gate: ${review.length} chars, single line required.`,
  );
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, review, "utf8");

// Keep a local copy next to the repo for inspection (harmless; the grader
// reads /output/entry.txt).
const localDir = join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(localDir, { recursive: true });
writeFileSync(join(localDir, "entry.txt"), review, "utf8");
