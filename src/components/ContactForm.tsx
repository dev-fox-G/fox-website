"use client";

import emailjs from "@emailjs/browser";
import { useState, type FormEvent, type ReactNode } from "react";
import { budgetOptions, serviceOptions, site } from "@/data/site";
import { btnPrimary, cn } from "@/lib/ui";

/* EmailJS credentials come from environment variables (see .env.example). */
const emailjsConfig = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
};

const controlClass =
  "w-full rounded-[10px] border-[1.5px] border-[#D5D8E8] bg-white px-4 py-[0.8rem] text-base text-ink transition " +
  "placeholder:text-[#8A90AE] hover:border-[#AEB3CF] focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/16 " +
  "[&:user-invalid]:border-[#C8372D]";

function Field({ id, label, optional, children }: { id: string; label: string; optional?: boolean; children: ReactNode }) {
  return (
    <div className="grid min-w-0 gap-[0.4rem]">
      <label htmlFor={id} className="text-[0.95rem] font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ id, placeholder, options }: { id: string; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      {/* `name` must match the variable used in the EmailJS template */}
      <select id={id} name={id} defaultValue="" className={cn(controlClass, "appearance-none pr-10")}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-body"
        viewBox="0 0 12 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="1 1.5 6 6.5 11 1.5" />
      </svg>
    </div>
  );
}

type Status = "success" | "error" | null;

export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus(null);

    // Spam trap: bots fill hidden fields, people never see it
    const trap = form.elements.namedItem("website") as HTMLInputElement | null;
    if (trap?.value) return;

    const { publicKey, serviceId, templateId } = emailjsConfig;
    if (!publicKey || !serviceId || !templateId) {
      console.error(
        "[DevFox] EmailJS is not set up. Add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID " +
          "and NEXT_PUBLIC_EMAILJS_TEMPLATE_ID to .env.local (see .env.example).",
      );
      setStatus("error");
      return;
    }

    setSending(true);
    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("[DevFox] EmailJS error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="on"
      className="grid gap-[1.15rem] rounded-[18px] bg-white p-[1.4rem] text-body sm:rounded-3xl sm:p-9"
    >
      <div className="grid gap-[1.15rem] sm:grid-cols-2">
        <Field id="from_name" label="Your name">
          <input type="text" id="from_name" name="from_name" autoComplete="name" required className={controlClass} />
        </Field>
        <Field id="from_email" label="Email address">
          <input type="email" id="from_email" name="from_email" autoComplete="email" required className={controlClass} />
        </Field>
      </div>

      <div className="grid gap-[1.15rem] sm:grid-cols-2">
        <Field id="company" label="Company" optional>
          <input type="text" id="company" name="company" autoComplete="organization" className={controlClass} />
        </Field>
        <Field id="project_type" label="Service needed">
          <Select id="project_type" placeholder="Select a service" options={serviceOptions} />
        </Field>
      </div>

      <Field id="budget" label="Budget range">
        <Select id="budget" placeholder="Select a budget range" options={budgetOptions} />
      </Field>

      <Field id="message" label="About your project">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="What are you building, who is it for, and when do you need it?"
          className={cn(controlClass, "min-h-[130px] resize-y")}
        />
      </Field>

      {/* Spam trap: real visitors never see or fill this in */}
      <div className="absolute -left-[9999px] size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={sending} className={cn(btnPrimary, "mt-1 w-full py-4 disabled:cursor-progress disabled:opacity-70")}>
        {sending && (
          <span
            className="size-[18px] animate-spin rounded-full border-[2.5px] border-ink/30 border-t-ink"
            aria-hidden="true"
          />
        )}
        <span>{sending ? "Sending…" : "Send message"}</span>
      </button>

      <div role="status" aria-live="polite" className="empty:hidden">
        {status === "success" && (
          <p className="rounded-[10px] bg-[#E4F5EC] px-4 py-[0.9rem] text-[0.98rem] leading-normal text-[#0E6B43]">
            Thank you. Your message has been sent and we will reply within 24 hours.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-[10px] bg-[#FCEAE8] px-4 py-[0.9rem] text-[0.98rem] leading-normal text-[#A6261C]">
            Sorry, your message could not be sent. Please email us directly at{" "}
            <a href={`mailto:${site.email}`} className="font-semibold underline">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
