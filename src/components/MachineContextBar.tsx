import { useNavigate } from 'react-router-dom';
import type { Machine } from '@/data/types';
import { MachineSilhouette } from './MachineSilhouette';

interface Props {
  machine: Machine;
}

export function MachineContextBar({ machine }: Props) {
  const navigate = useNavigate();

  return (
    <div className="machine-context">
      <div className="mc-info">
        <div className="mc-thumb">
          {machine.photo ? (
            <img src={machine.photo} alt={machine.name} />
          ) : (
            <MachineSilhouette category={machine.category} />
          )}
        </div>
        <div>
          <h2>{machine.brand} {machine.name}</h2>
          <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{machine.years}</div>
        </div>
      </div>
      <button className="change-link" onClick={() => navigate('/machinery')}>
        Change Machine
      </button>
    </div>
  );
}
