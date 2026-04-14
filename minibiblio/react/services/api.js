import config from '../config';
    
const API_BASE_URL = config.API_URL;
    
export const getBooks = () => {
    console.log('cridant API...');
    return fetch(API_BASE_URL+"/llibres")
    .then((response) => {
        if (!response.ok) {
        throw new Error("Error l'obtenir els llibres");
        }
        return response.json();
    })
    .catch((error) => {
        console.error('Error en la API:', error);
        return [];
    });
};

export const getBookImages = (bookId) => {
    console.log('obtenint imatges del llibre...');
    return fetch(API_BASE_URL + `/llibres/${bookId}/imatges`)
    .then((response) => {
        if (!response.ok) {
        throw new Error("Error l'obtenir les imatges");
        }
        return response.json();
    })
    .catch((error) => {
        console.error('Error en la API:', error);
        return [];
    });
};