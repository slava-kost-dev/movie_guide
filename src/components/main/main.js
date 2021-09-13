import React, { useEffect, useState } from 'react';

import './main.css';
import noPosterImage from '../../assets/images/not_poster.jpg';
import Spinner from '../spinner/spinner';

function Main(props) {
  const [ elements, getElements ] = useState(null);
  const [ moreButtons, getMoreButtons ] = useState(null);

  useEffect(() => {
    getElements(() => {

      if (props.content !== null && props.content !== undefined) {
        return props.content.map((item) => {
          let urlImage = item.Poster;
          if (item.Poster === 'N/A') urlImage = noPosterImage;
              
          return (
            <div className="main__content-item" key={item.imdbID}>
              <div className="main__content-item-block">
                <img className="main__content-item-image" src={urlImage} alt="" placeholder={item.Title} />
              </div>
              <h4 className="main__content-item-h" >Name: {item.Title}</h4>
              <p>Year: {item.Year}</p>
              <p>ImdbID: {item.imdbID}</p>
              <p>Type: {item.Type}</p>
            </div>
          )
        }) 
      }           
    })

    getMoreButtons(() => {
      const array = [];
      let totalPages = Math.ceil(props.totalResults / 10);

      if (totalPages === 0) return;

      if (totalPages < 10) {
        for (let i = 1; i <= totalPages; i++) {
          array.push(
            <button onClick={props.onClickNextPage} className="main__buttons-pages number-buttons" key={i + "button"}>{i}</button>
          )          
        }
      }

      if (totalPages >= 10 && props.numberActivePage < totalPages - 9) {
        for (let i = props.numberActivePage; i <= props.numberActivePage + 7; i++) {
          array.push(
            <button onClick={props.onClickNextPage} className="main__buttons-pages number-buttons" key={i + "button"}>{i}</button>
          )          
        }

        array.push(
          <button onClick={props.onClickNextPage} className="main__buttons-pages number-buttons" key="...button" disabled>...</button>
        )

        array.push(
          <button onClick={props.onClickNextPage} className="main__buttons-pages number-buttons" key={totalPages + "button"}>{totalPages}</button>
        ) 
      } else if (totalPages >= 10 && props.numberActivePage >= totalPages - 9) {
          for (let i = totalPages - 9; i <= totalPages; i++) {
            array.push(
              <button onClick={props.onClickNextPage} className="main__buttons-pages number-buttons" key={i + "button"}>{i}</button>
            )          
          }
      }

      return array;
    
    })
  }, [props.content, props.totalResults, props.numberActivePage]);

  return (
    <main className="main">
      <section className="main__results">
        <p>You searched for: "{props.nameSearch}", {props.totalResults} results found</p>
      </section>

      <section className="main__content">        
        {elements}
      </section>

      <section className="main__buttons">
        <button onClick={props.onClickNextPage} id="prev" className="main__buttons-pages">&lt;</button>
        {moreButtons}
        <button onClick={props.onClickNextPage} id="next" className="main__buttons-pages">&gt;</button>
      </section>      
    </main>
  )
}

export default Main;