import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Loader from "@/components/ui/Loader";

import CertificateCard from "@/components/cards/CertificateCard";
import CertificateFormModal from "@/components/admin/CertificateFormModal";
import AddButton from "@/components/admin/AddButton";
import { useAdminAuth } from "@/context/AdminAuthContext";

const Certifications = () => {
  const { isAdmin, token } = useAdminAuth();

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState(null);

  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/certificates`,
      );

      setCertificates(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async () => {
    if (!certificateToDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/certificates/${certificateToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Certificate deleted successfully.");

      fetchCertificates();

      setShowDeleteModal(false);
      setCertificateToDelete(null);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Failed to delete certificate.",
      );
    }
  };

  if (loading) {
    return (
      <section id="certifications" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Loader text="Loading certificates..." />
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
            CERTIFICATIONS
          </p>

          <h2 className="mt-3 text-5xl font-bold text-foreground">
            Learning & Certifications
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Certifications and learning milestones that reflect my continuous
            commitment to improving my technical knowledge and software
            development skills.
          </p>
        </motion.div>

        {isAdmin && (
          <div className="mb-10 flex justify-center">
            <AddButton
              label="Add Certificate"
              onClick={() => {
                setEditingCertificate(null);
                setShowModal(true);
              }}
            />
          </div>
        )}

        {certificates.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate._id}
                id={certificate._id}
                title={certificate.title}
                issuer={certificate.issuer}
                image={certificate.image?.url}
                onEdit={() => {
                  setEditingCertificate(certificate);
                  setShowModal(true);
                }}
                onDelete={() => {
                  setCertificateToDelete(certificate._id);
                  setShowDeleteModal(true);
                }}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            No certificates added yet.
          </div>
        )}

        {showModal && (
          <CertificateFormModal
            initialData={editingCertificate}
            onClose={() => {
              setShowModal(false);
              setEditingCertificate(null);
            }}
            onSuccess={() => {
              fetchCertificates();
              setShowModal(false);
              setEditingCertificate(null);
            }}
          />
        )}
      </div>
      <ConfirmModal
        open={showDeleteModal}
        title="Delete Certificate"
        message="Are you sure you want to delete this certificate? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setCertificateToDelete(null);
        }}
      />
    </section>
  );
};

export default Certifications;