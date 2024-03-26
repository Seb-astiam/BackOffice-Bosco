import { Nav } from "../components/nav";
import { SideBar } from "../components/sideBar";
import { Users } from "../components/users";

export const Inicio = () => {

    return (
      <div className='w-full h-[100vh] flex flex-col justify-start items-start' >
        <Nav />

        <div className="flex w-full">
            <SideBar />
            <Users />
        </div>
      </div>  
    )
  }
  