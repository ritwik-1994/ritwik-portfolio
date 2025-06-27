'use client';
import { motion } from "framer-motion";

interface FunFactCardProps {
  image: string;
  text: string;
  emoji: string;
}

export default function FunFactCard({ image, text, emoji }: FunFactCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 8px 28px 0 rgba(124,198,254,0.11)" }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
      className="relative flex flex-col rounded-2xl bg-white/90 border border-[#e5e5e5] overflow-hidden shadow-md w-full max-w-xs mx-auto min-h-[340px]"
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={text}
          className="object-cover w-full h-full"
          style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
        />
        {/* Emoji overlay */}
        <motion.span
          className="absolute bottom-3 right-3 text-3xl"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: -10 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          {emoji}
        </motion.span>
      </div>
      {/* Text */}
      <div className="p-5 flex-1 flex items-center justify-center">
        <span className="text-base text-[#23272f] font-semibold text-center">{text}</span>
      </div>
    </motion.div>
  );
}
