import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  /** When true, screen is visible. When false, triggers fade-out. */
  visible: boolean;
  /** Called after fade-out animation completes */
  onExited?: () => void;
}

export default function LoadingScreen({ visible, onExited }: Props) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) {
      setProgress(100);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + (95 - prev) * 0.1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [visible]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence onExitComplete={onExited}>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white overflow-hidden"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.03, 0.08, 0.03]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#355152] rounded-full blur-[120px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* The Loader Centerpiece */}
            <div className="relative w-64 h-64 flex items-center justify-center">

              {/* Circular Progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100" cy="100" r={radius}
                  stroke="#F3F4F6" strokeWidth="2" fill="none"
                />
                <motion.circle
                  cx="100" cy="100" r={radius}
                  stroke="#355152"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ strokeDasharray: circumference }}
                />
              </svg>

              {/* Logo with Soft Pulse */}
              <motion.div
                animate={{ scale: [0.95, 1, 0.95] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 relative"
              >
                <img
                  src="/logo.png"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  alt="Logo"
                />
              </motion.div>
            </div>

            {/* Typography */}
            <div className="mt-12 text-center space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-black text-gray-900 tracking-[0.2em] uppercase"
              >
                {isRtl ? "جاري التحميل" : "Loading"}
              </motion.h2>

              <div className="flex items-center justify-center gap-4">
                <div className="h-1px w-8 bg-gray-100" />
                <span className="text-xs font-bold text-[#355152] tracking-[0.4em] uppercase opacity-60">
                  {Math.round(progress)}%
                </span>
                <div className="h-1px w-8 bg-gray-100" />
              </div>
            </div>
          </div>

          {/* Bottom Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-12 text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]"
          >
            Premium Dining Experience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}