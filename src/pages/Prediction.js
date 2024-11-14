import React, { useState } from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'

// Import images
import image1 from '../prediction/CPALL.png'
import image2 from '../prediction/DELTA.png'
import image3 from '../prediction/ADVANC.png'

const images = [
  { src: image1, alt: "CPALL" },
  { src: image2, alt: "DELTA" },
  { src: image3, alt: "ADVANC" }
];

function Prediction() {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedImage(images[selectedIndex]);
  };

  return (
    <div className='home'>
        <Sidebar/>
        <div className='homeContainer'>
          <Navbar/>
          <div className='prediction'>
            <select onChange={handleChange}>
              {images.map((image, index) => (
                <option key={index} value={index}>
                  {image.alt}
                </option>
              ))}
            </select>
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div> 
        </div>
    </div>
  )
}

export default Prediction