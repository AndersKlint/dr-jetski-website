function relativeLuminance(channels: number[]): number {
  const linear = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function prepareProjectTextColor(projectColor = '#ee7135', projectSlug?: string): string {
  return projectSlug === 'waytoclip'
    ? `hsl(from ${projectColor} h s calc(l + 25))`
    : projectColor;
}

export function prepareProjectColor(projectColor = '#ee7135'): {
  rawColor: string;
  readableAccent: string;
} {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(projectColor.slice(offset, offset + 2), 16));
  const surfaceLuminance = relativeLuminance([25, 27, 31]);
  let readableChannels = channels;
  for (let step = 1; (relativeLuminance(readableChannels) + 0.05) / (surfaceLuminance + 0.05) < 4.5; step++) {
    readableChannels = channels.map((channel) => Math.round(channel + (255 - channel) * step / 20));
  }
  return {
    rawColor: projectColor,
    readableAccent: `#${readableChannels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`,
  };
}
