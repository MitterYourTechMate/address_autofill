import logo from './logo.svg';
import './App.css';
import { GoogleMap, useJsApiLoader, StandaloneSearchBox} from '@react-google-maps/api';
import { useRef } from 'react';

function App() {
  const inputref = useRef(null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries:["places"]
  })

  console.log(isLoaded)

  const handleOnPlacesChanged = () => {
    let address = inputref.current.getPlaces()
    console.log("address", address)
  }

  return (
    <div style={{marginTop:"10%", textAlign:"center"}}>
      {isLoaded && 
      <StandaloneSearchBox
        onLoad={(ref) => inputref.current = ref}
        onPlacesChanged={handleOnPlacesChanged}
      >
        <input
          type="text"
          placeholder="Start typing your address"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `50%`,
            height: `50px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            marginTop: "30px",
          }}
        />
        </StandaloneSearchBox>
        }
    </div>
  );
}

export default App;
