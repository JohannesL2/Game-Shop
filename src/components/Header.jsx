import Cartbtn from "./CartBtn"

const Header = () => {
  return (
    <header>
      <div className="container mx-auto flex items-center">
      <div className='flex items-center justify-center space-x-3 mb-6'>
      <img className='size-30' src="Logo.png" alt="" />
      <h1 className='text-3xl font-bold'>LevelUp Store</h1>
      </div>
      <Cartbtn/>
      </div>
    </header>
  )
}

export default Header