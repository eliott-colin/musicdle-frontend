import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

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
    <>
      <Navbar />
      <Outlet />
    </>
  )
}