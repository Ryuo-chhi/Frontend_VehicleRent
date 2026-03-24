const DeveloperCard = ({ name, role, focus, initials }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-center hover:shadow-lg transition-shadow">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
        {initials}
      </div>
      <h3 className="text-base font-bold text-slate-900">{name}</h3>
      <p className="text-sm font-semibold text-blue-600 mt-1">{role}</p>
      <p className="text-sm text-slate-500 mt-2">{focus}</p>
    </article>
  );
};

export default DeveloperCard;
