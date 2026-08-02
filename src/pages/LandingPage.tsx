import { useState, useCallback, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CONNECTION_METHODS as INSTALLATION_METHODS } from '@/data/connectionMethods';

const AVAILABLE_PORTS = INSTALLATION_METHODS.map(m => m.title);

interface MachineItem {
  make: string;
  model: string;
  year: string;
  quantity: string;
  preferredMethod: string;
}

interface InstallRequest {
  id: string;
  submittedAt: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  items: MachineItem[];
  notes: string;
}

function createEmptyItem(): MachineItem {
  return { make: '', model: '', year: '', quantity: '', preferredMethod: '' };
}

const STORAGE_KEY = 'fieldin-install-requests';

function loadRequests(): InstallRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRequest(request: InstallRequest) {
  const existing = loadRequests();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, request]));
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

export function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = useCallback((src: string, alt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLightbox({ src, alt });
  }, []);
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    items: [createEmptyItem()],
    notes: '',
  });

  const updateItem = (index: number, field: keyof MachineItem, value: string | string[]) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };


  const addItem = () => {
    setForm(prev => ({ ...prev, items: [...prev.items, createEmptyItem()] }));
  };

  const removeItem = (index: number) => {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const request: InstallRequest = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      fullName: form.fullName.trim(),
      companyName: form.companyName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      items: form.items.map(item => ({
        make: item.make.trim(),
        model: item.model.trim(),
        year: item.year.trim(),
        quantity: item.quantity.trim(),
        preferredMethod: item.preferredMethod,
      })),
      notes: form.notes.trim(),
    };

    saveRequest(request);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      items: [createEmptyItem()],
      notes: '',
    });
  };

  return (
    <>
      {lightbox && (
        <ImageLightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
      {/* Hero */}
      <section className="landing-hero" style={{ margin: '0 -24px' }}>
        <div className="landing-hero-inner">
          <h1>Get Started with Fieldin</h1>
          <p>
            Welcome to your installation hub. Learn how Fieldin connects to your machines, tell us
            about your fleet, and we&apos;ll recommend the right hardware package for your operation.
          </p>
        </div>
      </section>

      {/* Installation Methods */}
      <section className="landing-section">
        <div className="landing-section-header">
          <h2>How It Connects</h2>
          <p>
            Fieldin devices connect to your machines in three ways — choose the wiring method that
            fits your equipment.
          </p>
        </div>

        <div className="install-options-grid">
          {INSTALLATION_METHODS.map(method => (
            <article key={method.id} className="install-option-card">
              {'image' in method && method.image ? (
                <div
                  className="install-option-photo install-option-photo-clickable"
                  onClick={e => openLightbox(method.image!, method.title, e)}
                >
                  <img src={method.image} alt={method.title} />
                </div>
              ) : (
                <div className="install-option-icon">{method.icon}</div>
              )}
              <h3>{method.title}</h3>
              <p className="install-option-desc">{method.description}</p>
              <Link to={method.route} className="install-option-learn-more">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Request Form */}
      <section id="request-form" className="landing-section landing-form-section">
        <div className="landing-section-header">
          <h2>Check Hardware Compatibility &amp; Solutions</h2>
          <p>Tell us about your machines and available connection ports.</p>
        </div>

        <div className="landing-form">
          {submitted ? (
            <div className="landing-success">
              <div className="landing-success-icon">✓</div>
              <h3>Thank you!</h3>
              <p>
                Our team will review your information and get back to you within 24 hours with
                compatibility guidance for your fleet.
              </p>
              <button type="button" className="btn btn-secondary" onClick={handleReset}>
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="landing-form-inner">
              <div className="form-section">
                <h4>Contact Information</h4>
                <div className="contact-row">
                  <div className="form-row">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="companyName">Company *</label>
                    <input
                      id="companyName"
                      type="text"
                      required
                      value={form.companyName}
                      onChange={e => setForm(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Green Valley Farms"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@farm.com"
                    />
                  </div>
                  <div className="form-row">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Your Machines</h4>
                <div className="machine-table-wrap">
                  <table className="machine-table">
                    <thead>
                      <tr>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th className="machine-th-qty">Qty</th>
                        <th>Available Port on Machine</th>
                        <th className="machine-th-action" aria-hidden="true" />
                      </tr>
                    </thead>
                    <tbody>
                      {form.items.map((item, index) => (
                        <tr key={index}>
                          <td data-label="Make">
                            <input
                              id={`make-${index}`}
                              type="text"
                              required
                              aria-label={`Make for machine ${index + 1}`}
                              value={item.make}
                              onChange={e => updateItem(index, 'make', e.target.value)}
                              placeholder="John Deere"
                            />
                          </td>
                          <td data-label="Model">
                            <input
                              id={`model-${index}`}
                              type="text"
                              required
                              aria-label={`Model for machine ${index + 1}`}
                              value={item.model}
                              onChange={e => updateItem(index, 'model', e.target.value)}
                              placeholder="6130R"
                            />
                          </td>
                          <td data-label="Year">
                            <input
                              id={`year-${index}`}
                              type="text"
                              required
                              aria-label={`Year for machine ${index + 1}`}
                              value={item.year}
                              onChange={e => updateItem(index, 'year', e.target.value)}
                              placeholder="2022"
                            />
                          </td>
                          <td data-label="Qty">
                            <input
                              id={`quantity-${index}`}
                              type="number"
                              required
                              min={1}
                              aria-label={`Quantity for machine ${index + 1}`}
                              value={item.quantity}
                              onChange={e => updateItem(index, 'quantity', e.target.value)}
                              placeholder="1"
                            />
                          </td>
                          <td data-label="Available Port on Machine">
                            <select
                              className="form-select"
                              value={item.preferredMethod}
                              onChange={e => updateItem(index, 'preferredMethod', e.target.value)}
                            >
                              <option value="">Which port does your machine have?</option>
                              {AVAILABLE_PORTS.map(port => (
                                <option key={port} value={port}>{port}</option>
                              ))}
                            </select>
                          </td>
                          <td className="machine-td-action">
                            {form.items.length > 1 && (
                              <button
                                type="button"
                                className="machine-row-remove"
                                onClick={() => removeItem(index)}
                                aria-label={`Remove machine ${index + 1}`}
                              >
                                &times;
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button type="button" className="btn btn-ghost btn-sm machine-item-add" onClick={addItem}>
                  + Add Another Machine
                </button>
              </div>

              <div className="form-section">
                <h4>Additional Information</h4>
                <div className="form-row">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Tell us about specific models, connectivity concerns, or timeline requirements..."
                    rows={3}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block landing-submit-btn">
                Submit Request
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="landing-section landing-links-section">
        <div className="landing-quick-links">
          <Link to="/machinery" className="landing-quick-link landing-quick-link-primary">
            <span className="landing-quick-link-icon">📖</span>
            <div>
              <strong>Machinery Documentation</strong>
              <span>Step-by-step install guides for your specific machines</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
          <Link to="/hardware" className="landing-quick-link landing-quick-link-subtle">
            <span className="landing-quick-link-icon">🔩</span>
            <div>
              <strong>Hardware Catalog</strong>
              <span>Browse available Fieldin devices and components</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
