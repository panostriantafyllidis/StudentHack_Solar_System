// This module exports a function that updates and displays the information window for Earth

export function displayInfo() {
  const infoWindow = document.getElementById("infoWindow");
  const infoTitle = document.getElementById("infoTitle");
  const infoContent = document.getElementById("infoContent");

  // Set the content specific to Earth
  infoTitle.innerText = "Earth";
  infoContent.innerHTML = `
        <p>Earth is the third planet from the Sun and the only astronomical object known to harbor life. 
        About 29.2% of Earth's surface is land consisting of continents and islands. The remaining 70.8% 
        is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, but also by lakes, 
        rivers, and other freshwater, which together constitute the hydrosphere.</p>
        <p>Earth's atmosphere consists primarily of nitrogen and oxygen. Its atmosphere and proximity to the Sun 
        allow for life to exist on Earth. Its surface temperature, weather, and natural resources make it an 
        ideal place for various forms of life to thrive.</p>
        <a href='https://en.wikipedia.org/wiki/Earth' target='_blank'>More about Earth</a>
    `;

  // Display the info window
  infoWindow.style.display = "block";
}
