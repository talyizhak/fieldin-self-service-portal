import { Fragment, useState, useMemo, useCallback } from 'react';
import {
  loadHardwareEdits,
  saveHardwareEdits,
  mergeHardwareProducts,
  type HardwareProduct,
} from '@/data/hardware';

const CATEGORY_STYLE: Record<string, { bg: string; icon: string; badge: string }> = {
  telematics: { bg: '#27547D', icon: '📡', badge: 'hw-status-production' },
  beacons: { bg: '#2AB9C3', icon: '📶', badge: 'hw-status-beta' },
};

const GPS_ANTENNA_OPTIONS = ['Internal', 'External', 'Internal + External option', 'N/A'] as const;
const LTE_ANTENNA_OPTIONS = ['Internal', 'External', 'N/A'] as const;
const DRIVER_ID_OPTIONS = ['Dallas Reader', 'BLE Key', 'No', 'N/A'] as const;
const POWER_OPTIONS = ['Battery powered', 'Vehicle power + backup battery', 'Solar + battery', 'Coin cell battery'] as const;
const AVAILABILITY_OPTIONS = ['Available', 'End of Life', 'Beta Testing', 'Integration'] as const;
const TRAILER_BLE_OPTIONS = ['Yes', 'No', 'Future development'] as const;
const CATEGORY_OPTIONS = ['telematics', 'beacons'] as const;
const SUITABLE_FOR_OPTIONS = ['In-field machinery', 'ATVs / UTVs', 'Trucks & privates', 'Trailers / non-powered assets'] as const;
const CAB_TYPE_OPTIONS = ['Open Cab', 'Closed Cab', 'Open Cab - Under Panel'] as const;

function stopRowClick(e: React.SyntheticEvent) {
  e.stopPropagation();
}

function YesNoBadge({ value }: { value: boolean }) {
  return (
    <span className={`badge ${value ? 'hw-ss-yes' : 'hw-ss-neutral'}`}>
      {value ? 'Yes' : 'No'}
    </span>
  );
}

function AvailabilityBadge({ value }: { value: HardwareProduct['availability'] }) {
  const cls =
    value === 'Available' ? 'hw-ss-yes' :
    value === 'End of Life' ? 'hw-ss-neutral' :
    value === 'Beta Testing' ? 'hw-status-beta' :
    'hw-ss-future';
  return <span className={`badge ${cls}`}>{value}</span>;
}

function TrailerBleBadge({ value }: { value: HardwareProduct['trailerIdentificationBLE'] }) {
  const cls =
    value === 'Yes' ? 'hw-ss-yes' :
    value === 'Future development' ? 'hw-ss-future' :
    'hw-ss-neutral';
  return <span className={`badge ${cls}`}>{value}</span>;
}

function EditSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <select
      className="hw-edit-select"
      value={value}
      onClick={stopRowClick}
      onChange={e => onChange(e.target.value as T)}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

function EditInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      className="hw-edit-input"
      value={value}
      placeholder={placeholder}
      onClick={stopRowClick}
      onChange={e => onChange(e.target.value)}
    />
  );
}

function EditYesNo({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <EditSelect
      value={value ? 'Yes' : 'No'}
      options={['Yes', 'No'] as const}
      onChange={v => onChange(v === 'Yes')}
    />
  );
}

function EditMultiSelect({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: readonly string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <div className="hw-edit-multi" onClick={stopRowClick}>
      <div className="hw-tag-list hw-edit-multi-tags">
        {value.length === 0 ? (
          <span className="hw-edit-multi-empty">None selected</span>
        ) : (
          value.map(item => (
            <span key={item} className="hw-tag hw-tag-usecase">{item}</span>
          ))
        )}
      </div>
      <div className="hw-edit-multi-options">
        {options.map(opt => {
          const checked = value.includes(opt);
          return (
            <label key={opt} className="hw-edit-multi-option">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                  const next = checked ? value.filter(v => v !== opt) : [...value, opt];
                  onChange(next);
                }}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ProductThumb({ product, onClickImage }: { product: HardwareProduct; onClickImage?: (src: string, alt: string, e: React.MouseEvent) => void }) {
  const style = CATEGORY_STYLE[product.category] || { bg: '#999', icon: '📦', badge: '' };

  if (product.image_url) {
    return (
      <div
        className="hw-thumb hw-thumb-clickable"
        onClick={e => onClickImage?.(product.image_url, product.name, e)}
      >
        <img
          src={product.image_url}
          alt={product.name}
          onError={e => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hw-thumb-fallback-hidden');
          }}
        />
        <span className="hw-thumb-fallback hw-thumb-fallback-hidden" style={{ background: style.bg }}>
          {style.icon}
        </span>
      </div>
    );
  }

  return (
    <div className="hw-thumb">
      <span className="hw-thumb-fallback" style={{ background: style.bg }}>{style.icon}</span>
    </div>
  );
}

function ExpandedDetail({
  product,
  editMode,
  onUpdate,
  onClickImage,
}: {
  product: HardwareProduct;
  editMode: boolean;
  onUpdate: (patch: Partial<HardwareProduct>) => void;
  onClickImage?: (src: string, alt: string, e: React.MouseEvent) => void;
}) {
  const style = CATEGORY_STYLE[product.category] || { bg: '#999', icon: '📦', badge: '' };

  return (
    <div className="hw-detail-panel">
      {product.image_url ? (
        <div
          className="hw-detail-image hw-detail-image-clickable"
          onClick={e => onClickImage?.(product.image_url, product.name, e)}
        >
          <img src={product.image_url} alt={product.name} />
        </div>
      ) : (
        <div className="hw-detail-image hw-detail-image-empty" style={{ background: style.bg }}>
          <span>{style.icon}</span>
        </div>
      )}
      <div className="hw-detail-specs">
        <table className="detail-tbl">
          <tbody>
            {editMode && (
              <>
                <tr>
                  <td>Product Name</td>
                  <td>
                    <EditInput
                      value={product.name}
                      onChange={name => onUpdate({ name })}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>
                    <EditSelect
                      value={product.category}
                      options={CATEGORY_OPTIONS}
                      onChange={category => onUpdate({ category })}
                    />
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td>GPS Antenna</td>
              <td>
                {editMode ? (
                  <EditSelect
                    value={product.gpsAntenna}
                    options={GPS_ANTENNA_OPTIONS}
                    onChange={gpsAntenna => onUpdate({ gpsAntenna })}
                  />
                ) : product.gpsAntenna}
              </td>
            </tr>
            <tr>
              <td>LTE Antenna</td>
              <td>
                {editMode ? (
                  <EditSelect
                    value={product.lteAntenna}
                    options={LTE_ANTENNA_OPTIONS}
                    onChange={lteAntenna => onUpdate({ lteAntenna })}
                  />
                ) : product.lteAntenna}
              </td>
            </tr>
            <tr>
              <td>Driver ID</td>
              <td>
                {editMode ? (
                  <EditSelect
                    value={product.driverId}
                    options={DRIVER_ID_OPTIONS}
                    onChange={driverId => onUpdate({ driverId })}
                  />
                ) : product.driverId}
              </td>
            </tr>
            <tr>
              <td>Network Compatibility</td>
              <td>
                {editMode ? (
                  <EditInput
                    value={product.networkCompatibility}
                    onChange={networkCompatibility => onUpdate({ networkCompatibility })}
                  />
                ) : product.networkCompatibility}
              </td>
            </tr>
            <tr>
              <td>Power</td>
              <td>
                {editMode ? (
                  <EditSelect
                    value={product.power}
                    options={POWER_OPTIONS}
                    onChange={power => onUpdate({ power })}
                  />
                ) : product.power}
              </td>
            </tr>
            <tr>
              <td>CAN Bus Capable</td>
              <td>
                {editMode ? (
                  <EditYesNo value={product.canbusCapable} onChange={canbusCapable => onUpdate({ canbusCapable })} />
                ) : (
                  <YesNoBadge value={product.canbusCapable} />
                )}
              </td>
            </tr>
            <tr>
              <td>Self Install Ready</td>
              <td>
                {editMode ? (
                  <EditYesNo value={product.selfInstallReady} onChange={selfInstallReady => onUpdate({ selfInstallReady })} />
                ) : (
                  <YesNoBadge value={product.selfInstallReady} />
                )}
              </td>
            </tr>
            <tr>
              <td>Availability</td>
              <td>
                {editMode ? (
                  <EditSelect
                    value={product.availability}
                    options={AVAILABILITY_OPTIONS}
                    onChange={availability => onUpdate({ availability })}
                  />
                ) : (
                  <AvailabilityBadge value={product.availability} />
                )}
              </td>
            </tr>
            {(editMode || product.expectedOn) && (
              <tr>
                <td>Expected On</td>
                <td>
                  {editMode ? (
                    <EditInput
                      value={product.expectedOn ?? ''}
                      placeholder="e.g. 2025-Q3, Aug 2025, TBD"
                      onChange={expectedOn => onUpdate({ expectedOn: expectedOn || undefined })}
                    />
                  ) : product.expectedOn}
                </td>
              </tr>
            )}
            <tr>
              <td>Suitable for Self Install</td>
              <td>
                {editMode ? (
                  <EditYesNo value={product.suitableForSelfInstall} onChange={suitableForSelfInstall => onUpdate({ suitableForSelfInstall })} />
                ) : (
                  <YesNoBadge value={product.suitableForSelfInstall} />
                )}
              </td>
            </tr>
            <tr>
              <td>Suitable For</td>
              <td>
                {editMode ? (
                  <EditMultiSelect
                    value={product.suitableFor}
                    options={SUITABLE_FOR_OPTIONS}
                    onChange={suitableFor => onUpdate({ suitableFor })}
                  />
                ) : (
                  <div className="hw-tag-list">
                    {product.suitableFor.map(item => (
                      <span key={item} className="hw-tag hw-tag-usecase">{item}</span>
                    ))}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Cab Type</td>
              <td>
                {editMode ? (
                  <EditMultiSelect
                    value={product.cabType}
                    options={CAB_TYPE_OPTIONS}
                    onChange={cabType => onUpdate({ cabType })}
                  />
                ) : (
                  <div className="hw-tag-list">
                    {product.cabType.map(item => (
                      <span key={item} className="hw-tag hw-tag-usecase">{item}</span>
                    ))}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td>Trailer Identification (BLE)</td>
              <td>
                {editMode ? (
                  <EditSelect
                    value={product.trailerIdentificationBLE}
                    options={TRAILER_BLE_OPTIONS}
                    onChange={trailerIdentificationBLE => onUpdate({ trailerIdentificationBLE })}
                  />
                ) : (
                  <TrailerBleBadge value={product.trailerIdentificationBLE} />
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="hw-lightbox-overlay" onClick={onClose}>
      <div className="hw-lightbox-content" onClick={e => e.stopPropagation()}>
        <button className="hw-lightbox-close" onClick={onClose}>&times;</button>
        <img src={src} alt={alt} />
        <div className="hw-lightbox-caption">{alt}</div>
      </div>
    </div>
  );
}

function EditModeToggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`hw-edit-toggle${active ? ' hw-edit-toggle-active' : ''}`}
      onClick={onToggle}
      title={active ? 'Exit edit mode' : 'Enable edit mode'}
      aria-label={active ? 'Exit edit mode' : 'Enable edit mode'}
      aria-pressed={active}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      {active ? 'Editing' : 'Edit'}
    </button>
  );
}

export function HardwarePage() {
  const [search, setSearch] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [products, setProducts] = useState<HardwareProduct[]>(() => mergeHardwareProducts(loadHardwareEdits()));

  const updateProduct = useCallback((id: number, patch: Partial<HardwareProduct>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)));
    const prevEdits = loadHardwareEdits();
    const next = { ...prevEdits, [id]: { ...prevEdits[id], ...patch } };
    saveHardwareEdits(next);
  }, []);

  const openLightbox = useCallback((src: string, alt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox({ src, alt });
  }, []);

  const filtered = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(p => {
      const haystack = [
        p.name,
        p.category,
        p.power,
        p.gpsAntenna,
        p.lteAntenna,
        p.driverId,
        p.networkCompatibility,
        p.trailerIdentificationBLE,
        p.availability,
        p.expectedOn ?? '',
        ...p.suitableFor,
        ...p.cabType,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [search, products]);

  function toggleExpand(id: number) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
      <div className="hw-hero">
        <div className="container">
          <div className="hw-hero-row">
            <div>
              <h1>Hardware Catalog</h1>
              <p>Internal reference — Fieldin hardware products and curated specs</p>
            </div>
            <div className="hw-hero-badges">
              <EditModeToggle active={editMode} onToggle={() => setEditMode(v => !v)} />
              <span className="badge hw-badge-internal">INTERNAL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="hw-filters" style={{ paddingTop: '18px' }}>
          <div className="hw-filter-group">
            <div className="hw-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, category, power, network..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="result-count" style={{ marginBottom: '12px' }}>
          {filtered.length} product{filtered.length === 1 ? '' : 's'}
          {editMode && <span className="hw-edit-mode-hint"> — edit mode active</span>}
        </div>

        <div className="hw-table-wrap">
          <table className="hw-table">
            <thead>
              <tr>
                <th style={{ width: '5%' }}></th>
                <th className="hw-th-product" style={{ width: '22%' }}>Product</th>
                <th style={{ width: '10%' }}>Category</th>
                <th style={{ width: '18%' }}>Power</th>
                <th style={{ width: '10%' }}>CAN Bus</th>
                <th style={{ width: '12%' }}>Self Install</th>
                <th style={{ width: '12%' }}>Availability</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="hw-empty-row">
                    No products match your search.
                  </td>
                </tr>
              ) : (
                filtered.map(product => {
                  const isExpanded = expandedIds.has(product.id);
                  const cat = CATEGORY_STYLE[product.category] || { bg: '#999', icon: '📦', badge: '' };
                  return (
                    <Fragment key={product.id}>
                      <tr
                        className={`hw-product-row${isExpanded ? ' hw-expanded' : ''}`}
                        onClick={() => toggleExpand(product.id)}
                      >
                        <td>
                          <ProductThumb product={product} onClickImage={openLightbox} />
                        </td>
                        <td className="hw-td-product">
                          <div className="hw-product-cell">
                            <div className="hw-product-name">{product.name}</div>
                            <span className={`hw-expand-arrow${isExpanded ? ' hw-open' : ''}`}>▸</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${cat.badge}`}>
                            {product.category === 'telematics' ? 'Telematics' : 'Beacon'}
                          </span>
                        </td>
                        <td className="hw-td-power">{product.power}</td>
                        <td><YesNoBadge value={product.canbusCapable} /></td>
                        <td><YesNoBadge value={product.selfInstallReady} /></td>
                        <td>
                          <AvailabilityBadge value={product.availability} />
                          {product.expectedOn && (
                            <span className="hw-ss-notes">{product.expectedOn}</span>
                          )}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="hw-detail-row">
                          <td colSpan={7}>
                            <ExpandedDetail
                              product={product}
                              editMode={editMode}
                              onUpdate={patch => updateProduct(product.id, patch)}
                              onClickImage={openLightbox}
                            />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
