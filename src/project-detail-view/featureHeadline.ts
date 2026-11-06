export interface FeatureHeadlinePart {
  text: string;
  isHighlighted: boolean;
}

export function formatFeatureHeadline(
  text: string,
  highlightedWords: readonly string[] = [],
): FeatureHeadlinePart[] {
  const terms = [...new Set(highlightedWords.map((term) => term.trim()).filter(Boolean))]
    .sort((left, right) => right.length - left.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (terms.length === 0) {
    return [{ text, isHighlighted: false }];
  }

  const pattern = new RegExp(
    `(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?:${terms.join('|')})(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])`,
    'giu',
  );
  const parts: FeatureHeadlinePart[] = [];
  let offset = 0;

  for (const match of text.matchAll(pattern)) {
    if (match.index > offset) {
      parts.push({ text: text.slice(offset, match.index), isHighlighted: false });
    }

    parts.push({ text: match[0], isHighlighted: true });
    offset = match.index + match[0].length;
  }

  if (offset < text.length || parts.length === 0) {
    parts.push({ text: text.slice(offset), isHighlighted: false });
  }

  return parts;
}
