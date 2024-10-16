import TopCreators from "../../../components/topCreators/TopCreators"

const Home = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <h2>Home Feed</h2>
      </div>
      <TopCreators/>
    </div>
  )
}

export default Home
