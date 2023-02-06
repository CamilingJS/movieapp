beforeEach(()=>{
  document.querySelector('#target').innerHTML = ''; 
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData(){
      return [
        {Title: 'Avengers'},
        {Title: 'Not Avengers'},
        {Title: 'Some other movie'},
      ];
    },
    renderOption(movie){
      return movie.Title; 
    }
  });
})

it('Dropdown starts closed', () => {
  const dropdown = document.querySelector('.dropdown');
  expect(dropdown.className).not.to.include('in-active')
});

it('After searching, dropdown opens up', () => {
  const input = document.querySelector('input');
  input.value = 'avengers';
  input.dispatchEvent(new Event('input'))

  await waitFor('.dropdown-item')

  const dropdown = document.querySelector('.dropdown');
  expect(dropdown.className).to.include('in-active')
})

