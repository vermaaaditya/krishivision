import { useMemo, useState } from 'react'
import { predictCropDisease } from './api/client'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const hasFile = useMemo(() => Boolean(file), [file])

  const onFileChange = (event) => {
    const selected = event.target.files?.[0]
    setResult(null)
    setError('')

    if (!selected) {
      setFile(null)
      return
    }

    if (!selected.type.startsWith('image/')) {
      setError('Only image files are allowed.')
      setFile(null)
      return
    }

    setFile(selected)
  }

  const onAnalyze = async () => {
    if (!file || isLoading) {
      return
    }

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await predictCropDisease(file)
      setResult(response)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="panel">
        <h1>KrishiVision</h1>
        <p className="subtitle">Upload a crop image and run disease classification.</p>

        <label className="upload-box" htmlFor="imageUpload">
          <input
            id="imageUpload"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={onFileChange}
          />
          <span>{hasFile ? file.name : 'Choose crop image (JPG/PNG)'}</span>
        </label>

        <button type="button" onClick={onAnalyze} disabled={!hasFile || isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Crop'}
        </button>

        {error && <p className="message error">{error}</p>}
      </section>

      <section className="panel">
        <h2>Preview</h2>
        {hasFile ? (
          <div className="result">
            <p>
              <strong>File:</strong> {file.name}
            </p>
            <p>
              <strong>Type:</strong> {file.type}
            </p>
            <p>
              <strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        ) : (
          <div className="empty">No image selected</div>
        )}
      </section>

      <section className="panel">
        <h2>Prediction</h2>
        {result ? (
          <div className="result">
            <p>
              <strong>Disease:</strong> {result.disease}
            </p>
            <p>
              <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
            </p>
            <p>
              <strong>Recommendation:</strong> {result.recommendation}
            </p>
          </div>
        ) : (
          <div className="empty">Prediction will appear after analysis.</div>
        )}
      </section>
    </main>
  )
}

export default App
