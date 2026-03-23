import React from "react";

export const ContactCard = ({
  Icon,
  title,
  details,
  contactInfo,
  iconWrapperClassName,
  iconClassName,
  contactInfoClassName,
}) => {
  return (
    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${iconWrapperClassName}`}
      >
        <Icon className={`w-6 h-6 ${iconClassName}`} />
      </div>
      <div>
        <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-slate-500 text-sm mb-4">{details}</p>
        <p className={`text-lg font-bold ${contactInfoClassName}`}>
          {contactInfo}
        </p>
      </div>
    </div>
  );
};

export const AvailableHour = ({ Icon, title, iconClassName, schedule }) => {
  return (
    <div className="p-8 bg-slate-900 rounded-3xl shadow-xl text-white">
      <div className="flex items-center gap-3 mb-8">
        <Icon className={`w-6 h-6 ${iconClassName}`} />
        <h3 className="text-lg font-black uppercase tracking-tight">{title}</h3>
      </div>
      <div className="space-y-4">
        {schedule.map((item) => (
          <div
            key={item.days}
            className="flex justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0"
          >
            <span className="text-slate-400 text-sm font-bold">
              {item.days}
            </span>
            <span className="font-bold text-sm">{item.hours}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;
