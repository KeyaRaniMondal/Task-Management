import Login from "./login";
import bgimg from '../assets/bg.jpg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Home = () => {
     return (
          <div style={
               {
                    backgroundImage: `url(${bgimg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
               }
          }>
               <div>
               <div className="text-center">
                    <h2 className="text-2xl font-bold ">Task Management Website</h2>
               </div>
               <div className=' w-[1000px]'>
                    <DotLottieReact
                         src={'Animation - 1740044798781.json'}
                         loop
                         autoplay
                    />
               </div>
               </div>
          </div>
     )
};

export default Home;