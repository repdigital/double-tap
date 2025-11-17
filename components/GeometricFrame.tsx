'use client'

export const GeometricFrame = () => {
  return (
    <div className="geometric-frame absolute inset-0 pointer-events-none z-10">
      {/* Top-Left Bracket */}
      <svg
        className="bracket bracket-tl absolute top-0 left-0"
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <path
          d="M 60 20 L 20 20 L 20 60"
          stroke="var(--primary)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bracket-path"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: 'drawBracket 400ms ease-out forwards 200ms'
          }}
        />
      </svg>

      {/* Top-Right Bracket */}
      <svg
        className="bracket bracket-tr absolute top-0 right-0"
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <path
          d="M 0 20 L 40 20 L 40 60"
          stroke="var(--primary)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bracket-path"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: 'drawBracket 400ms ease-out forwards 300ms'
          }}
        />
      </svg>

      {/* Bottom-Right Bracket */}
      <svg
        className="bracket bracket-br absolute bottom-0 right-0"
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <path
          d="M 0 40 L 40 40 L 40 0"
          stroke="var(--primary)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bracket-path"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: 'drawBracket 400ms ease-out forwards 400ms'
          }}
        />
      </svg>

      {/* Bottom-Left Bracket */}
      <svg
        className="bracket bracket-bl absolute bottom-0 left-0"
        width="60"
        height="60"
        viewBox="0 0 60 60"
      >
        <path
          d="M 60 40 L 20 40 L 20 0"
          stroke="var(--primary)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="bracket-path"
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: 'drawBracket 400ms ease-out forwards 500ms'
          }}
        />
      </svg>
    </div>
  )
}
