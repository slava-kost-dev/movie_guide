import React, { useEffect, useState } from 'react';

import './app.css';
import Header from '../header/header';
import getDataMovie from '../../services/service';
import Main from '../main/main';

function App() {
  const [ nameSearch, getNameSearch ] = useState("");
  const [ totalResultsSearch, getTotalResultsSearch ] = useState(0);
  const [ dataElements, getDataElements ] = useState(null);
  const [ numberActivePage, getnumberActivePage ] = useState(1);

  function serviceCall(value) {
    getDataMovie(value, numberActivePage)
    .then((data) => {
      getDataElements(() => {
        return data.Search;        
      })

      if (data.totalResults) {
        return getTotalResultsSearch(data.totalResults);
      } else {
        getTotalResultsSearch(0);
      } 
    })
  }

  function onInputValue(e) {
    serviceCall(e.target.value);
    getNameSearch(e.target.value);
  }

  function onClickNexOrPrevtPage(e) {

    if (!isNaN(parseFloat(e.target.innerText))) {
      getnumberActivePage(parseFloat(e.target.innerText));
      e.target.classList.add('active');
    }

    if (e.target.id === "next" && numberActivePage < Math.ceil(totalResultsSearch / 10)) {
      getnumberActivePage((v) => v + 1);
    }

    if (e.target.id === "prev" && numberActivePage > 1) {
      getnumberActivePage((v) => v - 1);
    }   
  }
      
  useEffect(() => {
    serviceCall(nameSearch);
  }, [numberActivePage])

  return (
    <div className="wrapper">
      <Header onInputValue={onInputValue} />
      <Main 
        content={dataElements}
        totalResults={totalResultsSearch}
        nameSearch={nameSearch}
        onClickNextPage={onClickNexOrPrevtPage}
        numberActivePage={numberActivePage}
      />
    </div>
  )
}

export default App;