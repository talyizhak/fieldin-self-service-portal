import { SILHOUETTES } from '@/data/constants';
import type { MarkerInfo } from '@/data/types';

interface Props {
  category: string;
  marker?: MarkerInfo;
  className?: string;
}

export function MachineSilhouette({ category, marker, className }: Props) {
  const svgContent = SILHOUETTES[category] ?? SILHOUETTES['Tractor'];

  const markerSvg = marker ? `
    <line x1="${marker.x}" y1="${marker.y}" x2="${marker.x + marker.dx}" y2="${marker.y + marker.dy}"
      stroke="#F74D56" stroke-width="1.5" stroke-dasharray="4 2"/>
    <circle cx="${marker.x}" cy="${marker.y}" r="6" fill="#F74D56" opacity="0.9" class="marker-dot"/>
    <rect x="${marker.x + marker.dx - 4}" y="${marker.y + marker.dy - 12}" width="${marker.label.length * 7 + 10}" height="18" rx="3" fill="#F74D56"/>
    <text x="${marker.x + marker.dx + 1}" y="${marker.y + marker.dy + 1}" fill="#fff" font-size="10" font-weight="700">${marker.label}</text>
  ` : '';

  return (
    <svg
      className={className}
      viewBox="0 0 400 220"
      style={{ width: '100%', height: 'auto' }}
      dangerouslySetInnerHTML={{ __html: svgContent + markerSvg }}
    />
  );
}
