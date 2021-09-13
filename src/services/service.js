async function getDataMovie(serchInput, numberActivePage) {
  console.log(numberActivePage)
  let valueArray = serchInput.split(' ');
  let serchValue = serchInput;

  if (valueArray[valueArray.length - 1] === "") {
    serchValue = valueArray.pop();
    serchValue = valueArray.join();
    serchValue += "&nbsp;";
  } 

  const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${serchValue}*&page=${numberActivePage}`);
  return await response.json(); // parses JSON response into native JavaScript objects
}

export default getDataMovie;