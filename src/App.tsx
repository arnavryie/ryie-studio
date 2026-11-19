import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DemoPage } from './pages/DemoPage'
import { HomePage } from './pages/HomePage'
import { PitchPage } from './pages/PitchPage'
import { UgcPage } from './pages/UgcPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<Navigate to="/demo/clinic" replace />} />
        <Route path="/demo/:niche" element={<DemoPage />} />
        <Route path="/ugc" element={<UgcPage />} />
        <Route path="/pitch" element={<PitchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
