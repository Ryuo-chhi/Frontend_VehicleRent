import React from "react";
import Button from "./Button";

const InquiryForm = ({ popularVehicles }) => {
  return (
    <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-900"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-900"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Inquiry Type
            </label>
            <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-900 appearance-none">
              <option>General Inquiry</option>
              <option>Vehicle Availability</option>
              <option>Corporate Rentals</option>
              <option>Technical Support</option>
              <option>Feedback</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
              Interested Vehicle (Optional)
            </label>
            <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-900 appearance-none">
              <option value="">Select a vehicle</option>
              {popularVehicles.map((v, i) => (
                <option key={i} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
            Your Message
          </label>
          <textarea
            rows="5"
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-blue-600 outline-none transition-all font-medium text-slate-900 resize-none"
            placeholder="How can we help you today?"
          ></textarea>
        </div>

        <Button variant="sendMessage" label="SEND MESSAGE" />
      </form>
    </div>
  );
};

export default InquiryForm;