const Y_VALUE_PATTERN = /^(?:0(?:\.\d+)?|1(?:\.0+)?|\.\d+)$/;

export interface ImageOverlayEntry {
  mediaSource: string;
  text: string;
  y: number;
}

function overlayError(filePath: string, line: number, message: string): Error {
  return new Error(`${filePath}:${line}: ${message}`);
}

export function mediaSourceBasename(source: string): string | null {
  let pathname = source;
  if (/^https?:\/\//i.test(source)) {
    try {
      pathname = new URL(source).pathname;
    } catch {
      return null;
    }
  }
  const segment = pathname.split('/').at(-1);
  return segment === undefined || segment.length === 0 ? null : segment;
}

export function parseImageOverlayText(raw: string, filePath: string): ImageOverlayEntry[] {
  const lines = raw.replace(/\r\n?/g, '\n').split('\n');
  const entries: ImageOverlayEntry[] = [];
  const firstLineBySource = new Map<string, number>();
  let index = 0;

  while (index < lines.length) {
    const line = lines[index] as string;
    if (line.trim() === '') {
      index += 1;
      continue;
    }
    if (line.startsWith('````')) {
      throw overlayError(filePath, index + 1, 'Unsupported fence; use exactly three backticks');
    }
    if (!line.startsWith('```')) {
      throw overlayError(filePath, index + 1, 'Expected a fenced overlay block starting with ```filename');
    }
    if (line.trim() === '```') {
      throw overlayError(filePath, index + 1, 'Unexpected closing fence');
    }

    const openingLine = index + 1;
    const tokens = line.slice(3).trim().split(/\s+/);
    if (tokens.length > 2 || tokens[0] === '') {
      throw overlayError(filePath, openingLine, 'Expected "filename" or "filename y=<decimal>" after ```');
    }

    const mediaSource = tokens[0] as string;
    let y = 0.5;
    const yToken = tokens[1];
    if (yToken !== undefined) {
      if (!yToken.startsWith('y=')) {
        throw overlayError(filePath, openingLine, `Unexpected header token "${yToken}"; expected y=<decimal>`);
      }
      const rawY = yToken.slice(2);
      if (!Y_VALUE_PATTERN.test(rawY)) {
        throw overlayError(filePath, openingLine, `Invalid y value "${rawY}"; expected a decimal from 0 to 1`);
      }
      y = Number(rawY);
    }

    const firstLine = firstLineBySource.get(mediaSource);
    if (firstLine !== undefined) {
      throw overlayError(filePath, openingLine, `Duplicate overlay entry for "${mediaSource}"; first defined on line ${firstLine}`);
    }

    const textLines: string[] = [];
    index += 1;
    let isClosed = false;
    while (index < lines.length) {
      const blockLine = lines[index] as string;
      if (blockLine.startsWith('```')) {
        if (blockLine.trim() !== '```') {
          throw overlayError(filePath, index + 1, 'Nested or malformed fence inside overlay text');
        }
        isClosed = true;
        break;
      }
      textLines.push(blockLine);
      index += 1;
    }
    if (!isClosed) {
      throw overlayError(filePath, openingLine, 'Unterminated fenced overlay block');
    }

    const text = textLines.join('\n');
    if (text.trim() === '') {
      throw overlayError(filePath, openingLine, `Overlay text for "${mediaSource}" must not be empty`);
    }

    firstLineBySource.set(mediaSource, openingLine);
    entries.push({ mediaSource, text, y });
    index += 1;
  }

  return entries;
}
