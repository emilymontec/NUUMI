import Card from '../ui/Card'

const BalanceCard = ({ total, variation }) => {
  const positive = variation >= 0

  return (
    <Card className={positive ? 'green' : 'red'}>
      <h3>Estado actual</h3>
      <h1>${total.toLocaleString()}</h1>
      <p>{variation}% vs mes anterior</p>
    </Card>
  )
}

export default BalanceCard
