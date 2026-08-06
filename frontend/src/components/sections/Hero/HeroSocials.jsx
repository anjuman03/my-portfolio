import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useSettings } from "@/context/SettingsContext";

const HeroSocials = () => {
  const { settings } = useSettings();
  console.log(settings?.email);
  return (
    <div className="fixed left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
      <a href={settings?.github || "#"} target="_blank" rel="noreferrer">
        {" "}
        <FaGithub className="cursor-pointer text-2xl hover:scale-110 transition" />
      </a>

      <a href={settings?.linkedin || "#"} target="_blank" rel="noreferrer">
        {" "}
        <FaLinkedin className="cursor-pointer text-2xl hover:scale-110 transition" />
      </a>

<a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${settings?.email}`}
  target="_blank"
  rel="noreferrer"
>        {" "}
        <FaEnvelope className="cursor-pointer text-2xl hover:scale-110 transition" />
      </a>
    </div>
  );
};

export default HeroSocials;
