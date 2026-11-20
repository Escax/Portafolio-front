import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const emptyForm: ContactForm = { name: "", email: "", message: "" };

const fieldClass =
  "glass w-full rounded-2xl px-4 py-3 text-sm text-fg outline-none placeholder:text-fg/40 focus:border-fg/30";

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Por ahora solo simulamos el envío.
    // Más adelante aquí llamaremos a nuestra API de Spring Boot: POST /api/contact
    console.log(form);
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <section id="contact" className="mx-auto max-w-2xl px-6 py-24">
      <h2 className="text-3xl font-semibold tracking-tight">Contacto</h2>
      <p className="mt-2 text-fg/60">¿Tienes una idea o una oportunidad? Escríbeme.</p>

      <form onSubmit={handleSubmit} className="glass mt-10 space-y-4 rounded-3xl p-6">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
          className={fieldClass}
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Tu correo"
          required
          className={fieldClass}
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tu mensaje"
          rows={5}
          required
          className={fieldClass}
        />
        <button
          type="submit"
          className="w-full rounded-full bg-fg py-3 text-sm font-medium text-bg transition hover:bg-fg/85"
        >
          Enviar mensaje
        </button>
        {sent && (
          <p className="text-center text-sm text-emerald-300/80">
            ¡Mensaje enviado! Te responderé pronto.
          </p>
        )}
      </form>
    </section>
  );
}