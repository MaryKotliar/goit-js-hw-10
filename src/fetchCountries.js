

export function fetchCountries(name) {
    // Change the number of items in the group here  
    return fetch(`https://restcountries.com/v2/name/${name}/?fields=name,capital,population,flags,languages`).then(
    (response) => {
        if (!response.ok) {
        throw new Error(response.status);
        }
        return response.json();
    }
    );
}