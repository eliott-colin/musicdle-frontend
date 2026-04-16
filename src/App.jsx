import { useMemo, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

const initialFormState = {
  username: '',
  email: '',
  password: '',
};

export default function App() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const canSubmit = useMemo(
    () => Boolean(form.username.trim() && form.email.trim() && form.password.trim() && !isSubmitting),
    [form, isSubmitting],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });
    setCreatedUser(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message ?? 'Une erreur est survenue');
      }

      setCreatedUser(payload);
      setStatus({ type: 'success', message: 'Utilisateur créé avec succès.' });
      setForm(initialFormState);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Impossible de contacter le serveur.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <p className="eyebrow">Musicdle MVP</p>
        <h1>Créer un compte</h1>
        <p className="intro">
          Formulaire 
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label>
            <span>Nom</span>
            <input
              name="username"
              type="text"
              placeholder="John Doe"
              value={form.username}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            <span>Mot de passe</span>
            <input
              name="password"
              type="password"
              placeholder="secret123"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Envoi...' : 'Créer le compte'}
          </button>
        </form>

        {status.message ? (
          <p className={`feedback ${status.type}`}>{status.message}</p>
        ) : null}

        {createdUser ? (
          <div className="result-card">
            <h2>Utilisateur créé</h2>
            <pre>{JSON.stringify(createdUser, null, 2)}</pre>
          </div>
        ) : null}

      </section>
    </main>
  );
}