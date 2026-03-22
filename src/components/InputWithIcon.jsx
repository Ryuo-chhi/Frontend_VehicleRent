// InputWithIcon.jsx

const InputWithIcon = ({ icon: Icon, type, name, placeholder, rightIcon, handleChange }) => {
  return (
    <div className="relative w-full">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/3 text-gray-400">
          {rightIcon}
        </div>
      )}
      <input
        className="h-14 w-full border-gray-200 border-2 outline-none rounded-xl pl-10 pr-3"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default InputWithIcon;