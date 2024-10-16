import TopCreators from "../../../components/topCreators/TopCreators"

const Home = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-9">
        <h2 className="pt-[40px] pb-[40px]">Home Feed</h2>
      </div>
      <TopCreators/>
    </div>
  )
}

export default Home
