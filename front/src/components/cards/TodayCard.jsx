import Card from "../ui/Card";

export default function TodayCard({ expenses }) {
  return (
    <Card
      title="Hoy"
      value={`-$${expenses}`}
      color="from-red-400 to-red-600"
    />
  );
}
