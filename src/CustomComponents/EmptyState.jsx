import { Calendar } from "lucide-react";

const EmptyState = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-4">
        <Calendar size={64} className="text-muted-foreground" />

        <span className="absolute -top-2 -right-2 bg-gray-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          0
        </span>
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
