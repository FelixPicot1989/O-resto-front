import './ContactForm.scss';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import isValidDomain from 'is-valid-domain';
import ToastNotif from '../ToastNotif/ToastNotif';

function ContactForm() {
  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_YOUR_PUBLIC_KEY;
  const form = useRef();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetForm = () => {
    setEmail('');
    setName('');
    setMessage('');
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleMessageChange = (evt) => {
    setMessage(evt.target.value);
  };

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const sendEmail = (evt) => {
    evt.preventDefault();
    setLoading(true);

    if (!email.trim() || !name.trim() || !message.trim()) {
      setError('Veuillez remplir tous les champs');
      setTimeout(() => {
        setError(false);
      }, 7000);
      setLoading(false);
      return;
    }

    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      setError("L'email n'est pas valide");
      setTimeout(() => {
        setError(false);
      }, 7000);
      setLoading(false);
      return;
    }

    const domain = emailParts[1];
    if (!isValidDomain(domain)) {
      setError("Le domaine de l'email n'est pas valide");
    } else {
      emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
        () => {
          setSuccess('Message bien envoyé');
          resetForm();
          setLoading(false);
        },
        () => {
          setError("Une erreur c'est produite");
          setLoading(false);
        }
      );
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 7000);
  };

  return (
    <>
      <section name="contact" className="Contact">
        <div className="Contact-container">
          <div className="Contact-header">
            <h2 className="Contact-title">Nous contacter</h2>
          </div>
          <form method="POST" ref={form} onSubmit={sendEmail} className="Contact-form">
            <input
              className="Contact-input-name"
              type="text"
              placeholder="Quel est votre prénom ?"
              name="user_name"
              value={name}
              onChange={handleNameChange}
            />
            <input
              className="Contact-input-email"
              type="email"
              placeholder="Quel est votre email ?"
              name="user_email"
              value={email}
              onChange={handleEmailChange}
            />
            <textarea
              className="Contact-input-message"
              name="message"
              rows="10"
              placeholder="Quel est votre demande ?"
              value={message}
              onChange={handleMessageChange}
            />
            <button type="submit" className="Contact-submit" disabled={isSubmitted}>
              {loading ? 'Envoie en cours...' : 'Envoyer'}
            </button>
          </form>
        </div>
      </section>
      <ToastNotif
        success={success}
        toggleToast={() => {
          setSuccess(null);
        }}
      />
      <ToastNotif
        error={error}
        toggleToast={() => {
          setError(null);
        }}
      />
    </>
  );
}

export default ContactForm;
