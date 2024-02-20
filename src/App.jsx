import { useEffect, useState } from "react";
import Loading from "./assets/Loading";
import Tours from "./assets/Tours";

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isloading,setIsLoading] = useState(true);
  const [tours,setTours] = useState([]);

  const removeTour = (id) =>{
    const newTours = tours.filter((tour) => {
      if(tour.id !== id){
        return tour;
      }
    });
    setTours(newTours);
  }

  const fetchTours = async ()=>{
    setIsLoading(true);
    try{
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);

    }catch(error){
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    fetchTours();
  },[])

  if(isloading){
    return (<main>
      <Loading />
    </main>);
  }
  if(tours.length === 0){
    return <main>
      <div className="title">
        <h2>No tours left</h2>
        <button type="button" className="btn" style={{marginTop:'2rem'}} onClick={fetchTours}>Show tours</button>
      </div>
    </main>
  }

  return (<main>
    <Tours tours={tours} removeTour={removeTour} />


  </main>);
};
export default App;
