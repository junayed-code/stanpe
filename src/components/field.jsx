/**
 *
 * @param {{error: string | boolean} & import("react").InputHTMLAttributes} param0
 * @returns {import("react").ReactNode}
 */
const Field = ({
  id,
  name = id,
  error,
  type = "text",
  className = "",
  ...rest
}) => {
  return (
    <label htmlFor={id}>
      <input
        {...rest}
        id={id}
        name={name}
        type={type}
        className={"w-full inline-block outline-none text-xl px-4 py-2 rounded-md border-2 focus:border-indigo-300 "
          .concat(error ? "border-rose-500 " : "border-slate-200 ")
          .concat(className)
          .trim()}
      />
      {error && <p className="text-rose-500 pl-1">{error}</p>}
    </label>
  );
};

export default Field;
