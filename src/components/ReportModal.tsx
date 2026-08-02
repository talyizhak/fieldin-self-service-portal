import { useState } from 'react';
import { useAppContext } from './AppContext';
import { MACHINES } from '@/data/machines';

export function ReportModal() {
  const { reportModalOpen, closeReportModal, addReport } = useAppContext();
  const [machine, setMachine] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!reportModalOpen) return null;

  const handleSubmit = () => {
    if (!machine || !category || !description.trim()) return;
    addReport(machine, category, description.trim());
    setSubmitted(true);
    setTimeout(() => {
      setMachine('');
      setCategory('');
      setDescription('');
      setSubmitted(false);
      closeReportModal();
    }, 1500);
  };

  const handleClose = () => {
    setMachine('');
    setCategory('');
    setDescription('');
    setSubmitted(false);
    closeReportModal();
  };

  return (
    <div className="overlay open">
      <div className="modal">
        <button className="close-x" onClick={handleClose}>&times;</button>
        <h3>Need Help?</h3>
        <div className="sub">Help us improve the install guides. Describe the issue you encountered.</div>

        {submitted && (
          <div className="success-banner">
            ✓ Report submitted — thank you for the feedback!
          </div>
        )}

        <div className="form-row">
          <label>Machine</label>
          <select value={machine} onChange={e => setMachine(e.target.value)}>
            <option value="">Select a machine…</option>
            {MACHINES.map(m => (
              <option key={m.id} value={`${m.brand} ${m.name}`}>
                {m.brand} {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Select…</option>
            <option value="Connector / Port">Connector / Port</option>
            <option value="Mounting">Mounting</option>
            <option value="Harness / Wiring">Harness / Wiring</option>
            <option value="LED / Power">LED / Power</option>
            <option value="App / Cloud">App / Cloud</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            placeholder="Describe the issue in detail…"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={handleClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit Report</button>
        </div>
      </div>
    </div>
  );
}
