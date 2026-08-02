import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MACHINES } from '@/data/machines';
import { TELEMATICS_LED, BEACON_LED, CLOUD_STEPS } from '@/data/constants';
import { WizardStepper } from '@/components/WizardStepper';
import { MachineContextBar } from '@/components/MachineContextBar';
import { MachineSilhouette } from '@/components/MachineSilhouette';
import { LEDTable } from '@/components/LEDTable';

export function MachineDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const machine = MACHINES.find(m => m.id === id);

  const [activeStep, setActiveStep] = useState(1);
  const [unitType, setUnitType] = useState<'telematics' | 'beacon'>('telematics');
  const [completed, setCompleted] = useState(false);

  if (!machine) {
    return (
      <div className="empty-state">
        <h3>Machine not found</h3>
        <p>The machine you're looking for doesn't exist in our database.</p>
        <Link to="/machinery" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>← Back to Machines</Link>
      </div>
    );
  }

  const handleStepClick = (step: number) => {
    if (step === 0) {
      navigate('/machinery');
    } else if (step < activeStep) {
      setActiveStep(step);
    }
  };

  const handleNext = () => {
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    } else {
      navigate('/machinery');
    }
  };

  const mountInfo = machine.mount[unitType];

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/machinery">Machines</Link> &nbsp;/&nbsp; {machine.brand} {machine.name}
      </div>

      {/* Machine Hero */}
      <div className="m-hero">
        <div className="m-hero-img">
          {machine.photo ? (
            <img src={machine.photo} alt={`${machine.brand} ${machine.name}`} />
          ) : (
            <MachineSilhouette category={machine.category} />
          )}
        </div>
        <div className="m-hero-info">
          <div className="brand-cat">
            <span className="badge">{machine.brand}</span>
            <span className="badge cat">{machine.category}</span>
          </div>
          <h1>{machine.brand} {machine.name}</h1>
          <div className="sub">{machine.years}</div>
          <table className="spec-table">
            <tbody>
              {Object.entries(machine.specs).map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Machine Context Bar */}
      <MachineContextBar machine={machine} />

      {/* Wizard Stepper */}
      <WizardStepper activeStep={activeStep} onStepClick={handleStepClick} />

      {/* Completion Banner */}
      {completed && (
        <div className="complete-banner" style={{ marginTop: 18 }}>
          ✓ Installation complete — all steps verified for {machine.brand} {machine.name}.
        </div>
      )}

      {/* Step Panels */}
      <div className="step-panel">
        {/* Step 1: Locate Port */}
        {activeStep === 1 && (
          <>
            <h2>
              <span className="step-num">2</span>
              Locate the Diagnostic Port
            </h2>
            <div className="step-desc">{machine.connect.location}</div>
            <div className="diagram-wrap">
              <div className="diagram-box">
                {machine.connect.photo ? (
                  <>
                    <img src={machine.connect.photo} alt="Connector location" />
                    <div className="diagram-caption">Connector photo — {machine.brand} {machine.name}</div>
                  </>
                ) : (
                  <>
                    <MachineSilhouette category={machine.category} marker={machine.connect.marker} />
                    <div className="diagram-caption">Approximate connector location — {machine.brand} {machine.name}</div>
                  </>
                )}
              </div>
              <div className="info-panel">
                <table className="detail-tbl">
                  <thead>
                    <tr><th>Step</th><th>Instructions</th></tr>
                  </thead>
                  <tbody>
                    {machine.connect.steps.map((step, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Step {i + 1}</td>
                        <td>{step}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="note-box">
                  <strong>Connector type:</strong> {machine.connect.port}
                </div>
                {machine.issues.length > 0 && (
                  <div className="note-box warn" style={{ marginTop: 10 }}>
                    <strong>Known issues:</strong>
                    <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                      {machine.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Step 2: Mount Unit */}
        {activeStep === 2 && (
          <>
            <h2>
              <span className="step-num">3</span>
              Mount the Unit
            </h2>
            <div className="step-desc">Choose your unit type and follow the mounting guidance below.</div>

            <div className="unit-toggle">
              <button
                className={unitType === 'telematics' ? 'active' : ''}
                onClick={() => setUnitType('telematics')}
              >
                Telematics Unit
              </button>
              <button
                className={unitType === 'beacon' ? 'active' : ''}
                onClick={() => setUnitType('beacon')}
              >
                BLE Beacon
              </button>
            </div>

            <div className="diagram-wrap">
              <div className="diagram-box">
                <MachineSilhouette category={machine.category} marker={mountInfo.marker} />
                <div className="diagram-caption">
                  {unitType === 'telematics' ? 'Telematics Unit' : 'BLE Beacon'} mount location
                </div>
              </div>
              <div className="info-panel">
                <div className="mount-cards">
                  <div className="mount-card">
                    <h4>Orientation</h4>
                    <p>{mountInfo.orientation}</p>
                  </div>
                  <div className="mount-card">
                    <h4>Cab Position</h4>
                    <p>{mountInfo.cabPosition}</p>
                  </div>
                  <div className="mount-card">
                    <h4>Proximity Notes</h4>
                    <p>{mountInfo.proximity}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Connect & LEDs */}
        {activeStep === 3 && (
          <>
            <h2>
              <span className="step-num">4</span>
              Connect &amp; Verify LEDs
            </h2>
            <div className="step-desc">
              After connecting the harness and powering the unit, verify the LED indicators match the expected patterns below.
            </div>
            <LEDTable title="Telematics Unit LEDs" rows={TELEMATICS_LED} />
            <LEDTable title="BLE Beacon LEDs" rows={BEACON_LED} />
          </>
        )}

        {/* Step 4: Harness Slack */}
        {activeStep === 4 && (
          <>
            <h2>
              <span className="step-num">5</span>
              Manage Harness Slack
            </h2>
            <div className="step-desc">{machine.slack.guidance}</div>
            {machine.slack.cautions.length > 0 && (
              <div className="note-box warn">
                <strong>Cautions:</strong>
                <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                  {machine.slack.cautions.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Step 5: App Configuration */}
        {activeStep === 5 && (
          <>
            <h2>
              <span className="step-num">6</span>
              App Configuration
            </h2>
            <div className="step-desc">
              Complete the cloud-side setup to link this machine to your Fieldin account.
            </div>
            <ol className="cloud-steps">
              {CLOUD_STEPS.map((step, i) => (
                <li key={i}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>

      {/* Wizard Navigation */}
      <div className="wizard-actions">
        <button className="btn btn-ghost" onClick={handlePrev}>
          ← {activeStep === 1 ? 'Back to Machines' : 'Previous'}
        </button>
        <div style={{ fontSize: 13, color: 'var(--text-light)' }}>
          Step {activeStep + 1} of 6
        </div>
        {!completed ? (
          <button className="btn btn-primary" onClick={handleNext}>
            {activeStep === 5 ? 'Complete Installation ✓' : 'Next →'}
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={() => navigate('/machinery')}>
            Back to All Machines
          </button>
        )}
      </div>
    </>
  );
}
