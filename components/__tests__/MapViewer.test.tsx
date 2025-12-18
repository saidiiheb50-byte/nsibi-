import { render, screen } from '@testing-library/react'
import MapViewer from '../MapViewer'

describe('MapViewer', () => {
  it('renders the canvas component', () => {
    render(<MapViewer data={null} />)
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
  })

  it('displays overlay info when no data', () => {
    render(<MapViewer data={null} />)
    expect(screen.getByText('3D Terrain View')).toBeInTheDocument()
    expect(screen.getByText(/Upload data to visualize terrain/)).toBeInTheDocument()
  })

  it('displays DEM information when data is provided', () => {
    const mockData = {
      dem: { resolution: '10cm' },
      contours: { count: 100, interval: '1m' },
    }
    render(<MapViewer data={mockData} />)
    expect(screen.getByText('3D Terrain View')).toBeInTheDocument()
    expect(screen.getByText(/DEM Resolution: 10cm/)).toBeInTheDocument()
    expect(screen.getByText(/Contours: 100/)).toBeInTheDocument()
    expect(screen.getByText(/Interval: 1m/)).toBeInTheDocument()
  })

  it('renders orbit controls and camera', () => {
    render(<MapViewer data={null} />)
    expect(screen.getByTestId('orbit-controls')).toBeInTheDocument()
    expect(screen.getByTestId('perspective-camera')).toBeInTheDocument()
  })
})

