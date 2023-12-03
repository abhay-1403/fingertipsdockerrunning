import React from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
function SideBar({ showSideBar }) {
    const location = useLocation()
    
  const navigate = useNavigate()
    //Array of menu items as objects
    const menuItems = [
        { //Title and path for every menu item
            title: 'Home',
            path: '/home'
        },
        {
            title: 'Posted',
            path: '/posted'
        },
        {
            title: 'Add',
            path: '/add'
        },
        // {
        //     title: 'Profile',
        //     path: '/profile'
        // },
        {
            title: 'Logout',
            path: '/logout'
        },
    ]
    const logout=()=>{
        localStorage.removeItem('users-pro')
        navigate('/')
      }
    return (
        //By default flex is row only
        //We are using here flex column [this is the side bar transition color and all]
        <div className={`min-h-screen max-h-full transition-all duration-300 bg-primary h-screen flex flex-col overflow-hidden ${showSideBar ? "w-48" : "w-0"
            }`}>
            {/* //This is the flex for project title */}
            <div>
                <h1 className='text-3xl font-bold mt-6 ml-4 text-gray-200'>FingerTips</h1>
            </div>
            {/* //This is the flex for menu items */}
            <div className="flex flex-col mt-20">
                {menuItems.map((item) => {
                    return item.title !== "Logout" ? (
                        <Link
                            to={`${item.path}`}
                            className={`pl-10 py-5 text-white font-bold hover:bg-gray-50 hover:text-gray-800 text-sm ${location.pathname.includes(item.path) && 'bg-[#559167af] text-[#58ff58] font-bold'}`}
                        >{item.title}
                        </Link>
                    ) : (
                        <span
                           onClick={logout}
                            className={`pl-10 py-5 text-white font-bold hover:bg-gray-50 hover:text-gray-800 text-sm 'bg-[#559167af] font-bold'}`}>
                            Logout
                        </span>
                    );
                })}
            </div>
        </div>
    )
}

export default SideBar
{/* menu items map means for every iteration we will be getting one item and the we return an link tag */ }
{/* Template literals - Here backticks are used bcoz we are using conditional literal $*/ }