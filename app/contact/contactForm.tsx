'use client';

import BoxTextInput, { boxTextInputVariants } from "@/app/components/boxTextInput";
import { Button } from "@/app/components/ui/button";
import FormState from "@/app/util/formState";
import emailjs from "@emailjs/browser";
import { FormEventHandler, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

function ContactForm() {
  const [formState, setFormState] = useState<FormState | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    setFormState({ type: 'loading', message: 'Loading' });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
        {
          email: email.trim(),
          name: name.trim(),
          phone: phone.length > 0 ? phone : undefined,
          message: message.trim()
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY! }
      );
      setFormState({ type: 'success', message: 'Message sent' });
    } catch (e: unknown) {
      console.error(e);
      setFormState({ type: 'error', message: 'Error: Failed to send' });
    }
  }, [name, email, phone, message]);

  return (
    <form
      onSubmit={handleSubmit}
      inert={formState?.type === 'loading' || formState?.type === 'success'}
      className="flex flex-col gap-y-4"
    >
      <label className="flex flex-col">
        Name*
        <BoxTextInput
          value={name}
          onChange={(e) => { setName(e.currentTarget.value); }}
          required
          className="w-full"
        />
      </label>
      <label className="flex flex-col">
        Email Address*
        <BoxTextInput
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.currentTarget.value); }}
          required
          className="w-full"
        />
      </label>
      <label className="flex flex-col">
        Phone
        <BoxTextInput
          type="tel"
          value={phone}
          onChange={(e) => { setPhone(e.currentTarget.value); }}
          className="w-full"
        />
      </label>
      <label className="flex flex-col">
        Message*
        <textarea
          value={message}
          onChange={(e) => { setMessage(e.currentTarget.value) }}
          required
          className={twMerge(boxTextInputVariants(), 'w-full min-h-24')}
        />
      </label>
      <Button
        type="submit"
        className={`self-center
          ${formState?.type === 'success' ? 'text-green-500 border-green-500'
            : formState?.type === 'error' ? 'text-red-500 border-red-500'
              : ''}`
        }
      >
        {formState ? formState.message : 'Submit'}
      </Button>
    </form>
  );
}

export default ContactForm;
