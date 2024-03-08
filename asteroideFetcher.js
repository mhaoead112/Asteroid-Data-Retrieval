const apiKey = 'PNnVTPGu7u4RvlYigHf8YnK8V7bfUcJkayrWYZ0f';
const today = new Date();
const sevenDaysLater = new Date();
sevenDaysLater.setDate(today.getDate() + 7);

const startDate = today.toISOString().split('T')[0];
const endDate = sevenDaysLater.toISOString().split('T')[0];

const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

async function fetchAsteroids() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.near_earth_objects && Object.keys(data.near_earth_objects).length > 0) {
      let diameters = [];
      for (const date in data.near_earth_objects) {
        const asteroids = data.near_earth_objects[date];
        asteroids.forEach((asteroid) => {
          if (asteroid.estimated_diameter && asteroid.estimated_diameter.kilometers && asteroid.estimated_diameter.kilometers.estimated_diameter_max) {
            diameters.push(asteroid.estimated_diameter.kilometers.estimated_diameter_max);
          }
        });
      }
      console.log('Asteroid Diameters (in kilometers):', diameters.slice(0, 10));
    } else {
      console.log('No asteroid data available.');
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchAsteroids();
