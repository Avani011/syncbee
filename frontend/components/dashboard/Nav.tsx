import Image from 'next/image';

const Nav = () => {
  return (
    <div className='flex flex-row justify-evenly items-center'>
        <h1 className=' text-4xl '>SyncBee</h1>

        <div className='flex bar-bg px-3 py-1 h-12 w-[600px] rounded-full'>
            <input className='w-[95%]' type='text' name='search-input'></input>

            <Image 
                src='/search.svg'
                alt='search-icon'
                height={25}
                width={25}
            />
        </div>

        <Image 
            src='/percentage.svg'
            alt='percentage-icon'
            height={35}
            width={35}
        />

        <Image 
            src='/notification.svg'
            alt='notification-icon'
            height={35}
            width={35}
        />
    </div>
  )
}

export default Nav
