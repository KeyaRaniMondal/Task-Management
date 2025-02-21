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
               <div className=' w-[1000px]'>
                    <DotLottieReact
                         src={'Animation - 1740044798781.json'}
                         loop
                         autoplay
                    />
               </div>
               <Login></Login>
          </div>
     )
};

export default Home;