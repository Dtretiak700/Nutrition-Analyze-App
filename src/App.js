import { useEffect, useState } from 'react';
import './App.css';
import Nutrition from './Nutrition';
import LoaderPage from './Loader/LoaderPage';
import Swal from 'sweetalert2';

function App() {
  const MY_ID = "a9fcd1e5";
  const MY_KEY = "f0e487573cf9724234e8820c4b89f4ad"

  const [mySearch, setMySearch] = useState("");
  const [nutrition, setNutrition] = useState();
  const [wordSubmitted, setWordSubmitted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAnalysis = async (ingr) => {
    setIsLoading(true);

    const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, {
      method: "POST",
      body: JSON.stringify(
        {ingr : ingr}
      ),
      headers: {
        'content-type' : 'application/json;charset=UTF-8' 
      }
    });

    if (response.ok) {
      setIsLoading(false);
      const data = await response.json();
      setNutrition(data);
    } else {
      setIsLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ingredients entered incorrectly! Please, try again",
        showConfirmButton: false,
        timer: 3000
      });
    }
  }

  useEffect(() => {
    if(wordSubmitted !== "") {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      getAnalysis(ingr); 
    }
  }, [wordSubmitted])

  const searchIngredients = (e) => {
    setMySearch(e.target.value);
  }

  const finalSubmit = (e) => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  return (
    <div className="App">
        {isLoading && <LoaderPage />}
        <p className='text'>Enter an ingredient list for what you are cooking, like "1 cup rice", etc.</p>
        <form onSubmit={finalSubmit} className='form-container'>
          <input 
            onChange={searchIngredients}
            value={mySearch}
            placeholder="Type here..."/>
          <button className='btn'>Analyze</button>
        </form>
        <div className='nutrition-info'>
          {nutrition && <h2 className='heading'>Nutrition Facts</h2>}
          {nutrition && <div className='wide-line'></div>}
          {nutrition && <h2 className='main-text'>Calories {nutrition.calories} kcal</h2>}
          {nutrition && <div className='thick-line'></div>}
          {nutrition && Object.values(nutrition.totalNutrients).map((element, index) => (
            <Nutrition 
              key={index}
              label={element.label}
              quantity={element.quantity}
              unit = {element.unit}/>
          ))}
        </div>
    </div>
  );
}

export default App;
