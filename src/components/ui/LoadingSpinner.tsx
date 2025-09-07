import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6", 
  lg: "w-8 h-8"
};

const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  return (
    <motion.div
      className={cn(
        "inline-block border-2 border-current border-t-transparent rounded-full",
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    />
  );
};

export default LoadingSpinner;