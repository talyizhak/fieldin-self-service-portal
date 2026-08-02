import type { LEDRow } from '@/data/types';

interface Props {
  title: string;
  rows: LEDRow[];
}

function getLedStyle(pattern: string): { color: string; blink: boolean } {
  const lower = pattern.toLowerCase();
  const blink = lower.includes('blink');
  let color = '#888';
  if (lower.includes('green')) color = '#22c55e';
  else if (lower.includes('blue')) color = '#3b82f6';
  else if (lower.includes('white')) color = '#e0e0e0';
  else if (lower.includes('red')) color = '#ef4444';
  return { color, blink };
}

export function LEDTable({ title, rows }: Props) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={{ fontSize: 16, margin: '0 0 10px' }}>{title}</h3>
      <table className="detail-tbl">
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Pattern</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const led = getLedStyle(row.pattern);
            return (
              <tr key={i}>
                <td>{row.indicator}</td>
                <td>
                  <span
                    className={`led-dot${led.blink ? ' led-blink' : ''}`}
                    style={{ backgroundColor: led.color }}
                  />
                  {row.pattern}
                </td>
                <td>{row.meaning}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
