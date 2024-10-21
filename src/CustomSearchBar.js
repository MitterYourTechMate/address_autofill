import { useState, useRef, useEffect } from "react"
import { useJsApiLoader } from "@react-google-maps/api"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const libraries = ["places"]

function CustomSearchBar() {
  const inputRef = useRef(null)
  const [predictions, setPredictions] = useState([])
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries,
  })

  const autocompleteService = useRef(null)

  useEffect(() => {
    if (isLoaded && !autocompleteService.current) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService()
    }
  }, [isLoaded])

  const handleInputChange = async (event) => {
    const value = event.target.value
    console.log(event.target.value)

    if (autocompleteService.current && value.length > 2) {
      autocompleteService.current.getPlacePredictions(
        { input: value },
        (predictions) => {
          console.log("predictions", predictions, value)
          setPredictions(predictions || [])
        }
      )
    }
  }

  const handleSelectPrediction = (prediction) => {
    console.log("Selected prediction:", prediction)
    setPredictions([])
  }

  return (
    <div style={{ marginTop: "10%", textAlign: "center" }}>
      {isLoaded && (
        <div>
          <input
            type="text"
            placeholder="Type location"
            onChange={handleInputChange}
            style={{
              width: "60%",
              height: "50px",
              padding: "0 12px",
              borderRadius: "8px",
              fontSize: "18px",
              fontFamily: "Arial, sans-serif",
              marginBottom: "10px",
              outline: "none",
              border: "1px solid #ddd",
            }}
          />
          <List
            style={{
              width: "60%",
              margin: "0 auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            {predictions.map((prediction) => (
              <ListItem
                key={prediction.place_id}
                style={{
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  padding: "10px 20px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onClick={() => handleSelectPrediction(prediction)}
              >
                {prediction.description}
              </ListItem>
            ))}
          </List>
        </div>
      )}
      <Button variant="outlined" size="large" sx={{ marginTop: "15px" }}>
        Search
      </Button>
    </div>
  )
}

export default CustomSearchBar
