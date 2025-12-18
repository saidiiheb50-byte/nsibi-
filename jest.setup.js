// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock @react-three/fiber and @react-three/drei
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
  useThree: jest.fn(() => ({
    camera: {},
    scene: {},
    gl: {},
  })),
}))

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  PerspectiveCamera: () => <div data-testid="perspective-camera" />,
  Grid: () => <div data-testid="grid" />,
  Stats: () => <div data-testid="stats" />,
}))

// Mock three.js
jest.mock('three', () => ({
  Mesh: jest.fn(),
  PlaneGeometry: jest.fn(),
  MeshStandardMaterial: jest.fn(),
  Float32Array: Float32Array,
  Math: {
    PI: Math.PI,
    sin: Math.sin,
    cos: Math.cos,
  },
}))




