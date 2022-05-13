const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '5be6879',
            s: searchTerm
        }
    });

    console.log(response.data);
};

const input = document.querySelector('input');

//Debouncing an input: Waiting for some time to pass after the last event to actually do something 
const debounce = (func, delay = 1000) => {
    let timeoutId; 
    return(...args) => {
        if(timeoutId){
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay)
    };
}

// let timeoutId; 
// const onInput = event => {
//     if(timeoutId){
//         clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(()=>{
//         fetchData(event.target.value); 
//     }, 500)
// };

// input.addEventListener('input', onInput);

const onInput = event => {
    fetchData(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));