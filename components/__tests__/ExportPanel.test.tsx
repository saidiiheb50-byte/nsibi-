import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExportPanel from '../ExportPanel'

describe('ExportPanel', () => {
  const mockResults = {
    dem: { status: 'ready', resolution: '10cm' },
    contours: { status: 'ready', count: 1247, interval: '1m' },
    slope: { status: 'ready' },
    aspect: { status: 'ready' },
  }

  it('renders the panel title', () => {
    render(<ExportPanel results={mockResults} />)
    expect(screen.getByText('Export Results')).toBeInTheDocument()
  })

  it('displays processing complete message', () => {
    render(<ExportPanel results={mockResults} />)
    expect(screen.getByText('Processing Complete')).toBeInTheDocument()
  })

  it('displays all completed results', () => {
    render(<ExportPanel results={mockResults} />)
    expect(screen.getByText('DEM')).toBeInTheDocument()
    expect(screen.getByText(/Contours \(1247\)/)).toBeInTheDocument()
    expect(screen.getByText('Slope Analysis')).toBeInTheDocument()
    expect(screen.getByText('Aspect Analysis')).toBeInTheDocument()
  })

  it('renders all export format buttons', () => {
    render(<ExportPanel results={mockResults} />)
    expect(screen.getByText('AutoCAD DWG')).toBeInTheDocument()
    expect(screen.getByText('AutoCAD DXF')).toBeInTheDocument()
    expect(screen.getByText('Shapefile')).toBeInTheDocument()
    expect(screen.getByText('CSV Points')).toBeInTheDocument()
    expect(screen.getByText('LandXML')).toBeInTheDocument()
  })

  it('handles export button click', async () => {
    const user = userEvent.setup()
    render(<ExportPanel results={mockResults} />)
    
    const dwgButton = screen.getByText('AutoCAD DWG').closest('button')
    expect(dwgButton).not.toBeDisabled()
    
    await user.click(dwgButton!)
    
    // Button should show loading state
    await waitFor(() => {
      expect(dwgButton).toBeDisabled()
    })
    
    // After export completes, button should be enabled again
    await waitFor(() => {
      expect(dwgButton).not.toBeDisabled()
    }, { timeout: 3000 })
  })

  it('handles missing results gracefully', () => {
    render(<ExportPanel results={{}} />)
    expect(screen.getByText('Export Results')).toBeInTheDocument()
    expect(screen.queryByText('DEM')).not.toBeInTheDocument()
  })
})




