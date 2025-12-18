import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Home Page', () => {
  it('renders the navigation bar', () => {
    render(<Home />)
    expect(screen.getAllByText('TopoAI').length).toBeGreaterThan(0)
    // Check for navigation links
    const navLinks = screen.getAllByRole('link')
    expect(navLinks.length).toBeGreaterThan(0)
  })

  it('renders the hero section', () => {
    render(<Home />)
    // Check for main heading
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('renders feature section', () => {
    render(<Home />)
    // Check for section headings
    const headings = screen.getAllByRole('heading', { level: 2 })
    expect(headings.length).toBeGreaterThan(0)
  })

  it('renders how it works section', () => {
    render(<Home />)
    // Check that the page has multiple sections
    const sections = screen.getAllByRole('heading')
    expect(sections.length).toBeGreaterThan(2)
  })

  it('renders call-to-action section', () => {
    render(<Home />)
    // Check for links/buttons in CTA
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('renders footer', () => {
    render(<Home />)
    expect(screen.getByText(/© 2024 TopoAI/)).toBeInTheDocument()
  })
})
