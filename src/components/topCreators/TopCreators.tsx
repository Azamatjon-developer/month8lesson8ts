import { useGetAllUsersQuery } from '../../redux/api/user-slice'

const TopCreators = () => {
  const { data = [] } = useGetAllUsersQuery(true)
  console.log(data)
  return (
    <div className="text-[#ffffff] text-[24px] pt-[48px] pl-[24px] pr-[24px] pb-[40px]">
      <h2>TopCreators</h2>
      {data?.map((item: any) => (
        <div key={item._id}>
          <p>{item.username}</p>
        </div>
      ))}
    </div>
  )
}

export default TopCreators
