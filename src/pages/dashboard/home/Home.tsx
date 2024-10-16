import TopCreators from "../../../components/topCreators/TopCreators"

const Home = () => {
  return (
    <div className="grid grid-cols-12 bg-black h-screen overflow-y-auto">
      <div className="col-span-9">
        <div>
          <h2 className="pt-[60px] pl-[53px] pr-[53px]"> place for story  </h2>
          <div className="py-[54px] px-[53px]">
            <h2 className="font-bold text-white text-[30px]">Home Feed</h2>
          </div>
        </div>
      </div>
      <TopCreators/>
    </div>
  )
}

export default Home
