"use client";

import { motion } from "framer-motion";

export function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/351913685068"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition-all hover:scale-110 hover:shadow-[0_16px_44px_rgba(37,211,102,0.6)]"
      aria-label="WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
    >
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.4.63 4.65 1.73 6.6L2 30l7.6-1.7A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="#fff" />
        <path d="M23.3 20.1c-.32-.16-1.9-.94-2.2-1.04-.3-.1-.52-.16-.74.16-.22.32-.86 1.04-1.04 1.26-.18.22-.38.24-.7.08-.32-.16-1.34-.5-2.54-1.58-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.5.14-.66.14-.14.32-.38.48-.56.16-.18.22-.32.32-.54.1-.22.06-.4-.02-.56-.08-.16-.74-1.78-1.02-2.44-.26-.64-.54-.56-.74-.56h-.62c-.22 0-.56.08-.86.4-.3.32-1.12 1.1-1.12 2.68 0 1.58 1.14 3.1 1.3 3.32.16.22 2.24 3.42 5.44 4.8.76.32 1.36.52 1.82.66.76.24 1.46.2 2 .12.62-.1 1.9-.78 2.16-1.52.26-.74.26-1.38.18-1.52-.08-.12-.28-.2-.6-.36z" fill="#25d366" />
      </svg>
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25d366] animate-ping opacity-75"></span>
    </motion.a>
  );
}
