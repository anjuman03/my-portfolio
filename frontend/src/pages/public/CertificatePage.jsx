import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import axios from "axios";

import Footer from "@/components/common/Footer";
import AnimatedBackground from "@/components/common/AnimatedBackground";

const CertificatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    const fetchCertificate = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/certificates/${id}`
        );

        setCertificate(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-foreground">Loading...</h1>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-3xl font-bold text-foreground">
          Certificate Not Found
        </h1>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-20 top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/20" />
        <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-500/20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Back Button */}
        <button
          onClick={() => navigate("/?section=certifications")}
          className="my-10 inline-flex items-center gap-2 rounded-xl bg-white/90 px-5 py-3 font-medium text-slate-700 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:text-blue-600 dark:border dark:border-border dark:bg-card/90 dark:text-foreground dark:shadow-none dark:hover:text-blue-400"
        >
          <FaArrowLeft />
          Back to Certifications
        </button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            CERTIFICATE
          </p>

          <h1 className="mt-3 text-5xl font-bold text-foreground">
            {certificate.title}
          </h1>

          <p className="mt-3 text-lg text-muted-foreground">
            {certificate.issuer}
          </p>

          {certificate.issueDate && (
            <p className="mt-2 text-sm text-muted-foreground">
              Issued on{" "}
              {new Date(
                certificate.issueDate
              ).toLocaleDateString()}
            </p>
          )}
        </motion.div>

        {/* Certificate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-border dark:bg-card/70 dark:shadow-none"
        >
          <motion.img
            src={certificate.image?.url}
            alt={certificate.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 shadow-2xl dark:border-border dark:shadow-black/40"
          />

          <div className="mt-10 flex justify-center">
            <a
              href={certificate.image?.url}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700 dark:shadow-blue-500/20"
            >
              <FaDownload />
              Download Certificate
            </a>
          </div>
        </motion.div>

      </div>

      <Footer />
    </main>
  );
};

export default CertificatePage;