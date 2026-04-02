import { useState } from 'react'
import { predictTabularCropDisease } from './api/client'
import Layout from './components/Layout'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    "region": "North India",
    "crop_type": "Wheat",
    "irrigation_type": "None",
    "fertilizer_type": "Organic",
    "soil_moisture_%": 35.95,
    "soil_pH": 5.99,
    "temperature_C": 17.79,
    "rainfall_mm": 75.62,
    "humidity_%": 77.03,
    "sunlight_hours": 7.27,
    "pesticide_usage_ml": 6.34,
    "NDVI_index": 0.63
  })
  
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    const isNumeric = [
        "soil_moisture_%", "soil_pH", "temperature_C", "rainfall_mm", 
        "humidity_%", "sunlight_hours", "pesticide_usage_ml", "NDVI_index"
    ].includes(name);

    setFormData(prev => ({
      ...prev,
      [name]: isNumeric ? Number(value) : value
    }))
  }

  const onAnalyze = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await predictTabularCropDisease(formData)
      setResult(response)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <main className="app-shell" style={{display: 'flex', gap: '2rem'}}>
        <section className="panel" style={{flex: 2}} id="analysis">
          <h1>KrishiVision</h1>
          <p className="subtitle">Enter numeric and contextual parameters for farm analysis.</p>
          
          <form onSubmit={onAnalyze} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'left', marginBottom: '20px'}}>
              <label style={{display: 'flex', flexDirection: 'column'}}>Region: 
                <input type="text" name="region" value={formData["region"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Crop Type: 
                <input type="text" name="crop_type" value={formData["crop_type"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Irrigation: 
                <input type="text" name="irrigation_type" value={formData["irrigation_type"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Fertilizer: 
                <input type="text" name="fertilizer_type" value={formData["fertilizer_type"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Moisture (%): 
                <input type="number" step="0.1" name="soil_moisture_%" value={formData["soil_moisture_%"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Soil pH: 
                <input type="number" step="0.1" name="soil_pH" value={formData["soil_pH"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Temp (°C): 
                <input type="number" step="0.1" name="temperature_C" value={formData["temperature_C"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Rainfall (mm): 
                <input type="number" step="1" name="rainfall_mm" value={formData["rainfall_mm"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Humidity (%): 
                <input type="number" step="0.1" name="humidity_%" value={formData["humidity_%"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Sunlight (hrs): 
                <input type="number" step="0.1" name="sunlight_hours" value={formData["sunlight_hours"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>Pesticide (ml): 
                <input type="number" step="1" name="pesticide_usage_ml" value={formData["pesticide_usage_ml"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
              <label style={{display: 'flex', flexDirection: 'column'}}>NDVI Index: 
                <input type="number" step="0.01" name="NDVI_index" value={formData["NDVI_index"]} onChange={handleChange} style={{padding: '5px'}}/>
              </label>
          </form>

          <button type="submit" disabled={isLoading} onClick={onAnalyze} style={{width: '100%', padding: '10px', fontSize: '1.1rem'}}>
              {isLoading ? 'Processing ML Model...' : 'Predict Farm Status'}
          </button>

          {error && <p className="message error">{error}</p>}
        </section>

        <section className="panel" style={{flex: 1}} id="results">
          <h2>Result</h2>
          {result ? (
            <div className="result" style={{textAlign: 'left'}}>
              <p>
                <strong>Status: </strong> 
                <span style={{fontSize: "1.2rem", fontWeight: "bold", color: result.disease === 'Severe' ? 'red' : 'green'}}>
                  {result.disease}
                </span>
              </p>
              <p>
                <strong>Confidence: </strong> {(result.confidence * 100).toFixed(1)}%
              </p>
              <div style={{marginTop: '1rem', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#333'}}>
                <strong>Recommendation: </strong> <br/>
                {result.recommendation}
              </div>
              
              <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Probabilities:</h4>
              <ul style={{fontSize: "0.9rem", margin: 0, paddingLeft: '1.2rem'}}>
                {result.probabilities && Object.entries(result.probabilities).map(([disease, prob]) => (
                   <li key={disease}>{disease}: {(prob * 100).toFixed(1)}%</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="empty">No active predictions. Submit the form to view results.</div>
          )}
        </section>
      </main>
    </Layout>
  )
}

export default App
