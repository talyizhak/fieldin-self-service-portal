import { Link, useParams } from 'react-router-dom';
import { getConnectionMethod } from '@/data/connectionMethods';

function CameraIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function ConnectionDetailPage() {
  const { methodId } = useParams<{ methodId: string }>();
  const method = getConnectionMethod(methodId);

  if (!method) {
    return (
      <div className="connect-detail-page">
        <Link to="/" className="connect-detail-back">
          ← Back to Home
        </Link>
        <div className="empty-state">
          <h3>Connection type not found</h3>
          <p>The connection method you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="connect-detail-page">
      <Link to="/" className="connect-detail-back">
        ← Back to Home
      </Link>

      <header className="connect-detail-header">
        <div className="connect-detail-hero-image">
          <img src={method.image} alt={method.title} />
        </div>
        <div className="connect-detail-header-text">
          <h1>{method.title}</h1>
          <p className="connect-detail-overview">{method.overview}</p>
        </div>
      </header>

      <section className="connect-detail-section">
        <h2>Where to Find It</h2>
        <p className="connect-detail-section-desc">
          Connector location varies by make and model. Below are common examples — refer to your
          machine&apos;s documentation for exact placement.
        </p>

        <div className="connect-detail-locations-grid">
          {method.locations.map(entry => (
            <article key={entry.model} className="connect-detail-location-card">
              <div className="connect-detail-photo-placeholder">
                <CameraIcon />
                <span>Photo coming soon</span>
              </div>
              <h3>{entry.model}</h3>
              <p className="connect-detail-location-text">
                <strong>Location:</strong> {entry.location}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
