const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI(); // to populate UI


var ticketPrice = +movieSelect.value; //plus sign is added to make it a number

// console.log(ticketPrice)

//save selected movie index and price to local storage
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats.length);


    //Copy selected seats into arr
    //map though array
    //return a new array with indexes
    const seatsIndex = [...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat); //we simply get the index accoding to the seats
    });
    // console.log(seatsIndex);
    // seatsIndex now needs to be stored in local storage
    // LOCAL STORAGE STORES STRINGS IN THE BROWSER
    // localStorage.setItem('name','Bread');   
    //Local storage can be accessed by window.localStorage

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    // console.log(selectedSeats);
    if(selectedSeats !== null && selectedSeats.length >0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) !== -1){
                seat.classList.add('selected');
            }
            
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    movieSelect.selectedIndex = selectedMovieIndex;
}

//Movie select event
movieSelect.addEventListener('change', e=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();

})


//Seat click event
container.addEventListener('click', (e)=>{
    //console.log(e.target); //This correctly tells us which element we are clicking
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        // console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

updateSelectedCount(); //calling it explicitly as we are not populating the count and total from local storage