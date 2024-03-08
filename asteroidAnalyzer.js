async function takeFetched() {
    let asteroidsDiameters = await fetchAsteroids();
    
    let sum = 0;
    asteroidsDiameters.forEach( d => {
        sum = sum +d
    })
 
    let average= sum/asteroidsDiameters.length;
    let totalCount = asteroidsDiameters.length;
    console.log("Total Count: " , totalCount , "Averege diameter: " , average)
}
takeFetched();
