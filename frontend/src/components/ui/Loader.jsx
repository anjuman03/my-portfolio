import { Loader2 } from "lucide-react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[250px] flex-col items-center justify-center">
      <Loader2
        size={42}
        className="animate-spin text-blue-600"
      />

      <p className="mt-4 text-sm font-medium text-slate-500">
        {text}
      </p>
    </div>
  );
};

export default Loader;