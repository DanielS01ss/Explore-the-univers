const auth_key = "eeMOMUTwO7hh4UCainEen7iGDAKqMzg8bmguajPn";
const used_data = [];
const url_request = " https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,st_dist,pl_discmethod,pl_orbper&format=json";
const loading_text = document.querySelector("#loading-logo");

function handleReq(data){
    const start = performance.now();
    let procesed_data = JSON.parse(data);
    procesed_data = procesed_data.slice(0,11);
    ///aici scoatem ecranul de procesare
    ///adica aicea deja s-au incarcat datele si numai trebuie sa afisam loading
    loading_text.classList.add("hidden");
    const exoplanetsContainer = document.querySelector(".exoplanets-container");
    exoplanetsContainer.classList.remove("hidden");

    for(const planet of procesed_data)
    {
        const {pl_discmethod,pl_name,pl_orbper,st_dist} = planet;
        // let discoveryMethod = planet.pl_discmethod;
        // let  name = planet.pl_name;
        // let timeToOrbit = planet.pl_orbper;
        // let distance = planet.st_dist;

        const planetContainer = document.createElement("div");
        const planetTitle = document.createElement("h1");
        const image = document.createElement("img");
        const planetDescription = document.createElement("p");

        planetContainer.classList.add("planet");
        planetTitle.classList.add("planet-title");
        image.setAttribute("src","Images/exoplanet.jpg");
        image.classList.add("exo-img");
        image.setAttribute("alt","exoplanet-logo");
        planetDescription.classList.add("planet-description");

        planetTitle.textContent = `${pl_name}`;
        planetDescription.textContent = `This exoplanet is nammed ${pl_name} and it was identified by ${pl_discmethod}.It takes ${pl_orbper} days to orbit it's sun and it's at ${st_dist} light years from us`;
        

        planetContainer.appendChild(planetTitle);
        planetContainer.appendChild(image);
        planetContainer.appendChild(planetDescription);

        exoplanetsContainer.appendChild(planetContainer);

    }
    
}


/*
    PARAMETRII DE CARE TREBUIE SA NE PESE ( AVEM NEVOIE DE EI )

    pl_name => numele planetei
    st_distance => distanta pana la planeta
    pl_discmethod => metoda dupa care a fost identificata planeta
    pl_orbper=> cat ii ia sa orbiteze in jurul propriului soare

*/

$.ajax({
    url:url_request

}).done(handleReq);