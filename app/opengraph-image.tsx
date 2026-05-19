// ===== Link previews: Signal, iMessage, etc =====
// This file generates an OpenGraph image at build time, using the same palette and typography as the hero.
// After deploying, messengers may cache the old preview for a while — re-share the URL, add a cache buster ?c=2, or wait before expecting the new image to appear.
// Preview locally at http://localhost:3000/opengraph-image

import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const alt = 'Random Trip — For the people you keep meaning to see.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const cream = '#F2E8D5'
const forest = '#2A4A35'
const amber = '#D4821A'
const terra = '#B85C38'

async function loadFont(filename: string) {
  return readFile(join(process.cwd(), 'app/fonts', filename))
}

export default async function Image() {
  const [frauncesBlack, frauncesBlackItalic, dmSansMedium] = await Promise.all([
    loadFont('Fraunces-Black.ttf'),
    loadFont('Fraunces-BlackItalic.ttf'),
    loadFont('DMSans-Medium.ttf'),
  ])

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: forest,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 720,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(212,130,26,0.22) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: -60,
          width: 600,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(184,92,56,0.18) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(242,232,213,0.09) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            backgroundColor: amber,
            color: '#1C1A14',
            fontFamily: 'DM Sans',
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '10px 28px',
            borderRadius: 100,
            marginBottom: 48,
          }}
        >
          A trip ritual for people who matter
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'center',
            lineHeight: 0.9,
          }}
        >
          <span
            style={{
              fontFamily: 'Fraunces',
              fontSize: 128,
              fontWeight: 900,
              color: cream,
            }}
          >
            Random{' '}
          </span>
          <span
            style={{
              fontFamily: 'Fraunces',
              fontSize: 128,
              fontWeight: 900,
              fontStyle: 'italic',
              color: amber,
            }}
          >
            Trip.
          </span>
        </div>

        <p
          style={{
            fontFamily: 'DM Sans',
            fontSize: 36,
            fontWeight: 500,
            color: 'rgba(242,232,213,0.78)',
            marginTop: 40,
            maxWidth: 820,
            lineHeight: 1.45,
          }}
        >
          For the people you keep meaning to see.
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${terra} 0%, ${amber} 50%, #8AAF8A 100%)`,
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: frauncesBlack, style: 'normal', weight: 900 },
        { name: 'Fraunces', data: frauncesBlackItalic, style: 'italic', weight: 900 },
        { name: 'DM Sans', data: dmSansMedium, style: 'normal', weight: 500 },
      ],
    },
  )
}
