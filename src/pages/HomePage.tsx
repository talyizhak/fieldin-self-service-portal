import { useState } from 'react';
import { MachineCard } from '@/components/MachineCard';
import { MACHINES } from '@/data/machines';

export function HomePage() {
  const [search, setSearch] = useState('');

  const filtered = MACHINES.filter(m => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      m.brand.toLowerCase().includes(q)
      || m.name.toLowerCase().includes(q)
      || m.category.toLowerCase().includes(q)
      || m.years.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="hero" style={{ margin: '0 -24px', padding: '52px 24px 40px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h1>Machinery Documentation</h1>
          <p>Step-by-step guides for mounting Fieldin Telematics Units and BLE Beacons on your machinery. Search for your machine to begin.</p>

          <div style={{ maxWidth: 520, marginTop: 22 }}>
            <div className="hw-search-wrap" style={{ background: 'rgba(255,255,255,.15)', borderRadius: 10 }}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="#c9d9cd" style={{ position: 'absolute', left: 14, top: 12, width: 18, height: 18 }}>
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by brand, model, or category (e.g. Kubota, 8R 410, Sprayer)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ background: 'transparent', color: '#fff', paddingLeft: 42, fontSize: 15, padding: '13px 16px 13px 42px', border: 'none', borderRadius: 10, width: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '18px 0 6px' }}>
        <div className="result-count">
          {filtered.length} machine{filtered.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No machines match your search</h3>
          <p>Try a different brand, model, or category name.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map(m => (
            <MachineCard key={m.id} machine={m} />
          ))}
        </div>
      )}
    </>
  );
}
