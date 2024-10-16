import { useGetAllUsersQuery } from '../../redux/api/user-slice'

const TopCreators = () => {
  const { data = [] } = useGetAllUsersQuery(true)
  return (
    <div className='col-span-3'>
      <div className="text-[#ffffff]  text-[24px] pt-[48px] pl-[24px] pr-[24px] pb-[40px]">
        <h2>TopCreators</h2>
      </div>
      <div className="">
        {data?.map((item: any) => (
          <div key={item._id}>
            <h2 className="font-semibold text-[16px] pb-[10px]">
              {item.username}
            </h2>
            <button className="pt-[6px] pb-[6px] pl-[18px] pr-[18px] bg-[#877EFF] rounded-md">
              {' '}
              Follow{' '}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCreators
