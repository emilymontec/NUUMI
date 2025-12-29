import Card from "../ui/Card";

export default function MonthCard({ expenses }) {
  return (
    <Card
      title="Este mes"
      value={`$${expenses}`}
      color="from-green-400 to-green-600"
    />
  );
}
