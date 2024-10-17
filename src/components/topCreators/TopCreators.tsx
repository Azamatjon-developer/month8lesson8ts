import { useGetAllUsersQuery } from '../../redux/api/user-slice'

const TopCreators = () => {
  const { data = [] } = useGetAllUsersQuery(true)
  return (
    <div className="col-span-3">
      <div className="text-[#ffffff]  text-[24px] pt-[48px] pl-[24px] pr-[24px] pb-[40px]">
        <h2>TopCreators</h2>
      </div>
      <div className="flex">
        <div className="grid grid-cols-12">
          {data?.map((item: any) => (
            <div className="col-span-6 " key={item._id}>
              <div className="border flex flex-col gap-[44px] mb-[24px] border-slate-500 w-[190px] h-[190px] rounded-lg pt-[24px] pl-[34px] pr-[34px] pb-[24px] text-center ">
                <h2 className="font-semibold text-[16px] text-white pb-[10px]">
                  {item.username}
                </h2>
                <button className="pt-[6px] pb-[6px] pl-[18px] pr-[18px] bg-[#877EFF] rounded-md">
                  {' '}
                  Follow{' '}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopCreators
