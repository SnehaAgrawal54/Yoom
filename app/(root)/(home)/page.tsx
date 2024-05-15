import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

const Home = () => {
  const now=new Date()

  const time = now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
  const date = (new Intl.DateTimeFormat('en-US',{dateStyle:'full'})).format(now)

  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      {/* bg image */}
      <div className='w-full h-[300px] rounded-[20px] bg-hero bg-cover'>
        {/* info */}
        <div className='flex flex-col justify-between h-full max-md:px-5 max-md:py-8 p-11'>
          <h2 className='glassmorphism max-w-[273px] py-2 rounded text-center text-base font-normal'>
            Upcoming Meeting at:11:10pm
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {date}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList/>
    </section>
  )
}

export default Home