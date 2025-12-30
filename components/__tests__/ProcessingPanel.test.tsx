import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProcessingPanel from '../ProcessingPanel'

describe('ProcessingPanel', () => {
  it('renders the panel title', () => {
    render(<ProcessingPanel />)
    expect(screen.getByText('Processing Settings')).toBeInTheDocument()
  })

  it('renders DEM resolution selector', () => {
    render(<ProcessingPanel />)
    expect(screen.getByLabelText(/DEM Resolution/i)).toBeInTheDocument()
    const select = screen.getByLabelText(/DEM Resolution/i) as HTMLSelectElement
    expect(select.value).toBe('10')
  })

  it('allows changing DEM resolution', async () => {
    const user = userEvent.setup()
    render(<ProcessingPanel />)
    const select = screen.getByLabelText(/DEM Resolution/i) as HTMLSelectElement
    
    await user.selectOptions(select, '25')
    expect(select.value).toBe('25')
  })

  it('renders contour interval selector', () => {
    render(<ProcessingPanel />)
    expect(screen.getByLabelText(/Contour Interval/i)).toBeInTheDocument()
    const select = screen.getByLabelText(/Contour Interval/i) as HTMLSelectElement
    expect(select.value).toBe('1')
  })

  it('allows changing contour interval', async () => {
    const user = userEvent.setup()
    render(<ProcessingPanel />)
    const select = screen.getByLabelText(/Contour Interval/i) as HTMLSelectElement
    
    await user.selectOptions(select, '2')
    expect(select.value).toBe('2')
  })

  it('renders analysis options checkboxes', () => {
    render(<ProcessingPanel />)
    expect(screen.getByText('Slope Analysis')).toBeInTheDocument()
    expect(screen.getByText('Aspect Analysis')).toBeInTheDocument()
    
    const slopeCheckbox = screen.getByLabelText(/Slope Analysis/i) as HTMLInputElement
    const aspectCheckbox = screen.getByLabelText(/Aspect Analysis/i) as HTMLInputElement
    
    expect(slopeCheckbox.checked).toBe(true)
    expect(aspectCheckbox.checked).toBe(true)
  })

  it('allows toggling analysis options', async () => {
    const user = userEvent.setup()
    render(<ProcessingPanel />)
    
    const slopeCheckbox = screen.getByLabelText(/Slope Analysis/i) as HTMLInputElement
    await user.click(slopeCheckbox)
    expect(slopeCheckbox.checked).toBe(false)
    
    await user.click(slopeCheckbox)
    expect(slopeCheckbox.checked).toBe(true)
  })

  it('renders AI processing status', () => {
    render(<ProcessingPanel />)
    expect(screen.getByText('AI Processing')).toBeInTheDocument()
    expect(screen.getByText('Noise Removal')).toBeInTheDocument()
    expect(screen.getByText('Ground Classification')).toBeInTheDocument()
    expect(screen.getByText('Terrain Detection')).toBeInTheDocument()
  })
})







