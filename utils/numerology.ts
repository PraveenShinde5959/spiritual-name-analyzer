
// Basic numerology mapping (Chaldean system simplified)
const letterToNumber: { [key: string]: number } = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

function getReducedNumber(num: number): number {
  if (num === 11 || num === 22 || num === 33) { // Master Numbers
    return num;
  }
  let sum = num;
  while (sum > 9) {
    sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
}

export function calculateNumerologyScore(name: string): number {
  const cleanedName = name.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  for (const char of cleanedName) {
    sum += letterToNumber[char] || 0;
  }
  return getReducedNumber(sum);
}

export function getLuckyLetters(name: string): string[] {
  const cleanedName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const letterCounts: { [key: string]: number } = {};
  for (const char of cleanedName) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  const sortedLetters = Object.entries(letterCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([letter]) => letter);

  // Return top 3 most frequent letters, or fewer if not enough unique letters
  return sortedLetters.slice(0, 3);
}

export function getLuckyNumbers(name: string, dob?: string): number[] {
  const luckyNumbers: Set<number> = new Set();

  // From name numerology
  const nameScore = calculateNumerologyScore(name);
  if (nameScore > 0) luckyNumbers.add(nameScore);

  // From DOB (Life Path Number)
  if (dob) {
    const [year, month, day] = dob.split('-').map(Number);
    if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
      const dobSum = getReducedNumber(getReducedNumber(month) + getReducedNumber(day) + getReducedNumber(year));
      if (dobSum > 0) luckyNumbers.add(dobSum);
    }
  }

  // Add some numbers from the name's individual letter values
  const cleanedName = name.toUpperCase().replace(/[^A-Z]/g, '');
  for (const char of cleanedName) {
    const num = letterToNumber[char];
    if (num) luckyNumbers.add(num);
  }

  // Ensure a minimum of 3 lucky numbers, adding some common spiritual ones if needed
  while (luckyNumbers.size < 3) {
    const commonSpiritualNumbers = [7, 9, 3, 6, 8, 5, 1, 2, 4]; // In a spiritual context
    for (const num of commonSpiritualNumbers) {
      if (!luckyNumbers.has(num)) {
        luckyNumbers.add(num);
        if (luckyNumbers.size >= 3) break;
      }
    }
  }


  return Array.from(luckyNumbers).sort((a, b) => a - b).slice(0, 5); // Limit to top 5
}
