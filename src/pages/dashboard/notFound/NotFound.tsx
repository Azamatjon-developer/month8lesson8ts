import { Link } from 'react-router-dom' // Assuming you're using React Router

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-[72px] font-bold text-white mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-lg md:text-xl  mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#877EFF] text-white rounded-lg shadow-lg  transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
