import React from "react";
import { LuArrowRight, LuSend } from "react-icons/lu";

const Button = ({ label, variant, onClick }) => {
  const variants = {
    cta: "bg-[#105cff] text-[#f5f6fa] w-48 h-13.5 text-[16px] shadow-[0px_4px_4px_0px_rgba(13,153,255,0.45)] hover:bg-[#0d4ed8] hover:-translate-y-0.5 hover:shadow-[0px_8px_18px_0px_rgba(13,153,255,0.28)]",
    learnMore:
      "bg-[#f5f6fa] text-[#414141] w-36 h-11.5 text-3.5 border-2 border-[#d9d9d9] hover:bg-[#eceef5] hover:border-[#bfc4d3] hover:-translate-y-0.5",
    sendMessage:
      "bg-black text-white w-48 h-13 text-4 hover:bg-[#1f1f1f] hover:-translate-y-0.5 hover:shadow-[0px_8px_20px_0px_rgba(0,0,0,0.2)]",
  };
  
  return (
    <button
      onClick={onClick}
      className={`rounded-xl cursor-pointer font-semibold relative flex items-center justify-center gap-2 transition-all duration-200 ease-out ${variants[variant]}`}
    >
      {variant === "sendMessage" && <LuSend className="w-4 h-4" />}
      {label}
      {variant === "cta" && <LuArrowRight className="text-[#E6E6E6] w-5 h-4" />}
    </button>
  );
};

export default Button;

// How to use:
/* 
<Button variant="cta" label="Browse Vehicles" onClick={() => alert('CTA!')} />
<Button variant="learnMore" label="Learn More" />
<Button variant="sendMessage" label="SEND MESSAGE" /> 
*/
