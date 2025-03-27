import { Typewriter } from "react-simple-typewriter";

import {Header, Footer} from "../components";

export const RecommendationsPage = () => {
  return (
    <>
      <Header />
      <div className="bg-animated-gradient pt-16 min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center animate-glow">
        <h1 className="text-3xl font-bold mt-10 text-cyan-400">
        <Typewriter
            words={["Рекомендації"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={35}
            delaySpeed={100}/>
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis euismod velit nec magna faucibus, sed scelerisque lorem faucibus.
        </p>
      </div>
      <Footer />
    </>
  )
}
