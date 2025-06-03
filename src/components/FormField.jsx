export default function FormField({ label, type = 'text', name, value, onChange }) {
    return (
      <div className="mb-4">
        <label className="block mb-1 font-semibold">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
    );
  }
  