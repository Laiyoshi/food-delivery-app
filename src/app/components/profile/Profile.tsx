import Image from 'next/image'

const Profile = () => {
  return (
    <button className='w-[40px] h-[40px] rounded-full bg-[url(/images/avatar.webp)] bg-center bg-cover hover:outline-2 hover:outline-blue-600 active:outline-blue-700 cursor-pointer'>
    </button>
  )
}

export default Profile