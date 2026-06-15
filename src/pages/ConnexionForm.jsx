import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import { useLocation } from "react-router-dom";

function ConnexionForm() {
  const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
  const initialFormState = {
    username: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const canSubmit = useMemo(
    () =>
      Boolean(
        form.email.trim() &&
        form.password.trim() &&
        !isSubmitting,
      ),
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
    setStatus({ type: "idle", message: "" });
    setCreatedUser(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message ?? response.statusText ?? "Une erreur est survenue");
      }

      setCreatedUser(payload);
      setStatus({ type: "success", message: "Utilisateur connecté avec succès." });
      localStorage.setItem("token", payload.token);

      setCreatedUser(payload.user);
      setStatus({
        type: "success",
        message: "Utilisateur connecté avec succès.",
      });
      localStorage.setItem("token", payload.token);
      setForm(initialFormState);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Impossible de contacter le serveur.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const location = useLocation();
  const mode = location.pathname === "/login" ? "login" : "register";

  return (
    <>
      <div className="login-page">
        <div className="login-card">
          <div className={`toggle-switch ${mode}`}>
            <div className="toggle-slider"></div>

            <Link to="/login" className={`toggle-option ${mode === "login" ? "active" : ""}`}>
              Connexion
            </Link>

            <Link to="/register" className={`toggle-option ${mode === "register" ? "active" : ""}`}>
              Inscription
            </Link>
          </div>
          <h2 className="login-title">Connexion</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label-form">Email</label>
              <input
                type="email"
                name="email"
                placeholder="ton@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="label-form">Mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <SubmitButton
              text={isSubmitting ? "Envoi..." : "Connexion"}
              disabled={!canSubmit}
            />
          </form>
          <div>
            {status.message ? (
              <p className={`feedback ${status.type}`}>{status.message}</p>
            ) : null}

            {createdUser ? (
              <div className="result-card">
                <h2>Utilisateur créé</h2>
                <pre>{JSON.stringify(createdUser, null, 2)}</pre>
              </div>
            ) : null}
          </div>
          <div className="auth-links">
            <Link to="/forgotPass">Mot de passe oublié ?</Link>
            <Link to="/register">Inscription</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConnexionForm;
