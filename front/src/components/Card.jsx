export default function Card({ title, value, color }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-md text-white bg-gradient-to-br ${color}`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
