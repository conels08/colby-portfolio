"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const { isHud } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight ${
            isHud ? "hud-glow" : ""
          }`}>
            Let's Work Together
          </h1>
          <p className={`text-lg text-[var(--muted)] ${
            isHud ? "hud-glow" : ""
          }`}>
            Tell me about your project and I'll get back to you within 24 hours
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${isHud ? "hud-glow" : ""}`}>
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className={`font-semibold mb-2 ${isHud ? "hud-glow" : ""}`}>
                  Email
                </h3>
                <a
                  href="mailto:colby@example.com"
                  className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  colby@example.com
                </a>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isHud ? "hud-glow" : ""}`}>
                  Calendly
                </h3>
                <a
                  href="https://calendly.com/colby-nelsen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Schedule a call
                </a>
              </div>

              <div>
                <h3 className={`font-semibold mb-2 ${isHud ? "hud-glow" : ""}`}>
                  Response Time
                </h3>
                <p className="text-[var(--muted)]">
                  I typically respond to all inquiries within 24 hours
                </p>
              </div>
            </div>

            <div className={`mt-8 p-6 rounded-lg ${
              isHud
                ? "border border-[var(--border)]"
                : "bg-[var(--card)] border border-[var(--border)]"
            }`}>
              <h3 className={`font-semibold mb-3 ${isHud ? "hud-glow" : ""}`}>
                What happens next?
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                <li>1. I'll review your project requirements</li>
                <li>2. Schedule a call to discuss details</li>
                <li>3. Get a detailed quote and timeline</li>
                <li>4. Start building your project</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${isHud ? "hud-glow" : ""}`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isHud
                      ? "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                      : "border-[var(--border)] bg-[var(--background)]"
                  } focus:outline-none focus:border-[var(--accent)] transition-colors`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${isHud ? "hud-glow" : ""}`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isHud
                      ? "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                      : "border-[var(--border)] bg-[var(--background)]"
                  } focus:outline-none focus:border-[var(--accent)] transition-colors`}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${isHud ? "hud-glow" : ""}`}
                >
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    isHud
                      ? "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                      : "border-[var(--border)] bg-[var(--background)]"
                  } focus:outline-none focus:border-[var(--accent)] transition-colors resize-none`}
                  placeholder="Tell me about your project, timeline, and budget..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                  status === "sending"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } ${
                  isHud
                    ? "border border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                }`}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-4 rounded-lg ${
                    isHud
                      ? "border border-[var(--foreground)] hud-glow"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">I'll get back to you soon.</p>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-4 rounded-lg ${
                    isHud
                      ? "border border-red-500 text-red-400"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <p className="font-medium">Error sending message</p>
                  <p className="text-sm">Please try again or email me directly.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
