import react, {useRef,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import photos from "../Data/photos"
import GridItem from './Components/GridItem'
import LocomotiveScroll from 'locomotive-scroll'
import "../Data/locoBasic.css"
import imagesLoaded from 'imagesloaded'


const clamp = (value,min, max) => value<=min? min: value>=max? max: value;


// This function will wait till all images are loaded
const preLoadImages = (selector) =>{
  return new Promise((resolve) =>{
    imagesLoaded(
      document.querySelectorAll(selector),
      {background: true},
      resolve
    )
  })
}
function App() {

  const leftChunk = [...photos].splice(0,5);
  const middleChunk = [...photos].splice(5,5);
  const rightChunk = [...photos].splice(10,15);



  useEffect(() => {
    const scrollElement = new LocomotiveScroll({
      el: ref.current,
      smooth: true,
      smartphone:{
        smooth: true,
      },
      getDirection: true,
      getSpeed: true,
    });


    // Scroll Event of Locomotive Scroll
    scrollElement.on("scroll", (obj)=>{
      scroll.current.current = obj.scroll.y; // Total distance covered from top
      const distance = scroll.current.current - scroll.current.cache; // Will compute the amount of distance scrolled
      scroll.current.cache = scroll.current.current; // Will store the total distance covered before this
      
      leftColumnRef.current.style.transform = `skewY(${clamp(distance, -10, 10)}deg)`;
      middleColumnRef.current.style.transform = `skewY(${clamp(-distance, -10, 10)}deg)`;
      rightColumnRef.current.style.transform = `skewY(${clamp(distance, -10, 10)}deg)`;
    
    })

    // When all images are loaded then it will update the locomotive scroll
    Promise.all(
      [preLoadImages(".grid-item-media")]).then(()=>{
      scrollElement.update();
    })  ;
  }, [])
  
  const ref = useRef(null)
  const leftColumnRef = useRef(null)
  const middleColumnRef = useRef(null)
  const rightColumnRef = useRef(null)

  const scroll = useRef({
    cache: 0,
    current: 0,
  })
  return (

    <div className="main-container" id="main-container" ref={ref} data-scroll-container>
      <div className="grid-wrap">
        <div className="left-column" ref={leftColumnRef}>
          {
            leftChunk.map(({url, description}, index)=>(
              <GridItem url = {url} description = {description} key={url}/>
            ))
          }
        </div>
        <div className="middle-column" data-scroll data-scroll-speed="-20">
          <div ref={middleColumnRef}>
            {
            middleChunk.map(({url, description}, index)=>(
              <GridItem url = {url} description = {description} key={url}/>
              ))
            }
            </div>
        </div>
        <div className="right-column" ref={rightColumnRef}>
        {
            rightChunk.map(({url, description}, index)=>(
              <GridItem url = {url} description = {description} key={url}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
