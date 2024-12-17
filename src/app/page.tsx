import IssueCard from './components/IssueCard'
import ShowCards from './components/ShowCards'
import TopUpCard from './components/TopUpCard'
import PayWithCard from './components/PayWithCard'
import ShowBalance from './components/ShowBalance'
import ShowHistory from './components/ShowHistory'

export default function Home() {
  return (
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Metrobus Transit System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <IssueCard />
          <ShowCards />
          <TopUpCard />
          <PayWithCard />
          <ShowBalance />
          <ShowHistory />
        </div>
      </main>
  )
}

