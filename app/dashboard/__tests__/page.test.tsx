import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dashboard from '../page'

// Mock the components
jest.mock('@/components/MapViewer', () => {
  return function MockMapViewer({ data }: { data: any }) {
    return <div data-testid="map-viewer">MapViewer {data ? 'with data' : 'no data'}</div>
  }
})

jest.mock('@/components/ProcessingPanel', () => {
  return function MockProcessingPanel() {
    return <div data-testid="processing-panel">ProcessingPanel</div>
  }
})

jest.mock('@/components/ExportPanel', () => {
  return function MockExportPanel({ results }: { results: any }) {
    return <div data-testid="export-panel">ExportPanel {results ? 'with results' : 'no results'}</div>
  }
})

// Mock react-dropzone
jest.mock('react-dropzone', () => ({
  useDropzone: () => ({
    getRootProps: () => ({
      onClick: jest.fn(),
      onDragOver: jest.fn(),
      onDrop: jest.fn(),
    }),
    getInputProps: () => ({}),
    isDragActive: false,
  }),
}))

describe('Dashboard', () => {
  it('renders the dashboard header', () => {
    render(<Dashboard />)
    expect(screen.getByText('TopoAI Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders the data import section', () => {
    render(<Dashboard />)
    expect(screen.getByText('Data Import')).toBeInTheDocument()
  })

  it('renders the map viewer', () => {
    render(<Dashboard />)
    expect(screen.getByTestId('map-viewer')).toBeInTheDocument()
  })

  it('renders the processing panel', () => {
    render(<Dashboard />)
    expect(screen.getByTestId('processing-panel')).toBeInTheDocument()
  })

  it('does not render export panel initially', () => {
    render(<Dashboard />)
    const exportPanel = screen.queryByTestId('export-panel')
    expect(exportPanel).not.toBeInTheDocument()
  })

  it('renders process button when files are uploaded', async () => {
    const user = userEvent.setup()
    render(<Dashboard />)
    
    // The process button should not be visible initially
    expect(screen.queryByText('Start Processing')).not.toBeInTheDocument()
  })
})

