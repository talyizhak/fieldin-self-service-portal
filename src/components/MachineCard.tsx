import { useNavigate } from 'react-router-dom';
import type { Machine } from '@/data/types';
import { MachineSilhouette } from './MachineSilhouette';

interface Props {
  machine: Machine;
}

export function MachineCard({ machine }: Props) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/machine/${machine.id}`)}>
      <div className="card-img">
        {machine.photo ? (
          <img src={machine.photo} alt={`${machine.brand} ${machine.name}`} />
        ) : (
          <MachineSilhouette category={machine.category} />
        )}
      </div>
      <div className="card-body">
        <div className="brand-cat">
          <span className="badge">{machine.brand}</span>
          <span className="badge cat">{machine.category}</span>
        </div>
        <h3>{machine.brand} {machine.name}</h3>
        <div className="years">{machine.years}</div>
        <div className="unit-icons">
          <span>📡 Telematics</span>
          <span>📶 BLE Beacon</span>
        </div>
        <div className="card-cta">
          <button className="btn btn-primary btn-sm btn-block">
            Install Guide →
          </button>
        </div>
      </div>
    </div>
  );
}
