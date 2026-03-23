import { LuPhone, LuMail, LuClock } from "react-icons/lu";

export const popularVehicles = [
  "Skoda Fabia",
  "Toyota Corolla High",
  "Ford Everest 4x4",
  "Mitsubishi Pajero Sport",
  "Lexus RX 350",
  "Honda Dream 125",
  "Honda Scoopy i",
  "Yamaha XMAX 300",
  "BMW R 1250 GS",
];

export const contactCardData = [
  {
    id: 1,
    Icon: LuPhone,
    title: "Call Us",
    details: "Monday - Friday, 9am - 6pm",
    contactInfo: "+1 (234) 567-890",
    iconWrapperClassName: "bg-blue-50",
    iconClassName: "text-blue-600",
    contactInfoClassName: "text-blue-600",
  },
  {
    id: 2,
    Icon: LuMail,
    title: "Email Us",
    details: "Typical response within 2 hours",
    contactInfo: "concierge@vehiclerent.com",
    iconWrapperClassName: "bg-indigo-50",
    iconClassName: "text-indigo-600",
    contactInfoClassName: "text-indigo-600",
  },
  {
    id: 3,
    Icon: LuClock,
    title: "Available Hours",
    iconClassName: "text-blue-400",
    schedule: [
      { days: "Mon - Fri", hours: "08:00 - 21:00" },
      { days: "Sat - Sun", hours: "09:00 - 18:00" },
    ],
  },
];

export default contactCardData;
