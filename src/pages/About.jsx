import AboutStat from "../components/AboutStat";
import DeveloperCard from "../components/DeveloperCard";
import { aboutDevelopers, aboutIntro, aboutStats } from "../data/about";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 pt-24">
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-3 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 drop-shadow-md">
          About
        </h1>
        <div className="flex justify-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-blue-600 font-bold">
            VEHICLE
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">RENT</h1>
        </div>
      </div>
      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl mt-8 max-w-2xl w-full p-6 sm:p-8 text-center">
        {aboutIntro.map((paragraph) => (
          <p
            key={paragraph}
            className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10 text-center w-full max-w-3xl">
        {aboutStats.map((stat) => (
          <AboutStat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <section className="w-full max-w-5xl mt-14 mx-auto px-2 sm:px-0">
        <div className="text-center mb-6 w-full max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
            Meet The Developers
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            The team behind this vehicle rental project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aboutDevelopers.map((developer) => (
            <DeveloperCard
              key={developer.name}
              name={developer.name}
              role={developer.role}
              focus={developer.focus}
              initials={developer.initials}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
