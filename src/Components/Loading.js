import Lottie from 'react-lottie'
import * as animation from '../lottie/lottie_animation.json'

export default function Loading(){
  const isPaused = false
  const isStopped = false 
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
      }
    };
 
    return (
      <div>
        <Lottie
          options={defaultOptions}
          height={21}
          width={42}
          isStopped={isStopped}
          isPaused={isPaused}
        />
    </div>
    )
}