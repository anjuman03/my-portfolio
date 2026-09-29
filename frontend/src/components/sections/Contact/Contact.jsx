import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSettings } from "@/context/SettingsContext";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaMapMarkerAlt,
} from "react-icons/fa";

const infoCardClass =
  "flex items-center gap-4 rounded-2xl bg-card p-5 text-card-foreground shadow-sm dark:border dark:border-border dark:shadow-none sm:p-6";

const iconClass = "text-2xl text-blue-600 dark:text-blue-400";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-blue-600 focus:shadow-md dark:border-input dark:focus:border-blue-400";

const labelClass = "mb-2 block font-medium text-foreground/80";

const socialClass =
  "rounded-full bg-card p-4 text-foreground shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white dark:border dark:border-border dark:shadow-none";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { settings } = useSettings();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    formData.append("subject", "New Portfolio Contact Message");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");

        e.target.reset();
      } else {
        toast.error(result.message || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            Contact
          </p>

          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Let's Connect
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Have a project, internship, or opportunity in mind? Feel free to
            reach out. I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={infoCardClass}
            >
              <FaEnvelope className={iconClass} />
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="break-all text-muted-foreground">
                  {settings?.email || "pathananjuman03@gmail.com"}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={infoCardClass}
            >
              <FaPhoneAlt className={iconClass} />
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <p className="text-muted-foreground">
                  {settings?.phone || "+91 8328544171"}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={infoCardClass}
            >
              <FaMapMarkerAlt className={iconClass} />
              <div>
                <h3 className="font-semibold text-foreground">Location</h3>
                <p className="text-muted-foreground">
                  {settings?.location || "Hyderabad, Telangana, India"}
                </p>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 pt-4 lg:justify-start">
              <motion.a
                href={settings?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={socialClass}
              >
                <FaGithub size={22} />
              </motion.a>
              <motion.a
                href={settings?.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={socialClass}
              >
                <FaLinkedin size={22} />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-card p-5 text-card-foreground shadow-sm dark:border dark:border-border dark:shadow-none sm:p-6 lg:p-8"
          >
            {/* Honeypot */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
            />

            {/* Name */}
            <div className="mb-6">
              <label className={labelClass}>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className={labelClass}>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className={labelClass}>Message</label>

              <textarea
                name="message"
                rows={5}
                placeholder="Write your message..."
                required
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;