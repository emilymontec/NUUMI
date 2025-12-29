import Card from "../ui/Card";

export default function StatusCard({ balance }) {
  return (
    <Card
      title="Estado actual"
      value={`$${balance}`}
      color="from-indigo-400 to-indigo-600"
    />
  );
}
