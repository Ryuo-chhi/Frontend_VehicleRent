import React from "react";
import ContactCard, { AvailableHour } from "../components/ContactCard";
import InquiryForm from "../components/InquiryForm";
import contactCardData, { popularVehicles } from "../data/contactCard";

const Contact = () => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 pt-28 pb-20 w-full">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
              Contact Us
            </div>

            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
              How Can We <span className="text-blue-600">Help?</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Have questions about our premium fleet or membership? Our
              concierge team is available 24/7 to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactCardData.map((card) =>
                card.schedule ? (
                  <AvailableHour key={card.id} {...card} />
                ) : (
                  <ContactCard key={card.id} {...card} />
                ),
              )}
            </div>
            <InquiryForm popularVehicles={popularVehicles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
