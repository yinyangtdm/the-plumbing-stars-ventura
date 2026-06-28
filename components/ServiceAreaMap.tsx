'use client'
import { useEffect, useRef } from 'react'
import { VENTURA_COUNTY_GEO } from '@/lib/countyBorders'

const CLIP_LAT = 34.34 // horizontal cut just above Moorpark (~34.285°N)

function clipRing(ring: number[][], maxLat: number): number[][] {
  const out: number[][] = []
  const n = ring.length - 1 // GeoJSON rings repeat first point at end
  for (let i = 0; i < n; i++) {
    const cur = ring[i]
    const nxt = ring[(i + 1) % n]
    const curIn = cur[1] <= maxLat
    const nxtIn = nxt[1] <= maxLat
    if (curIn) out.push(cur)
    if (curIn !== nxtIn) {
      const t = (maxLat - cur[1]) / (nxt[1] - cur[1])
      out.push([cur[0] + t * (nxt[0] - cur[0]), maxLat])
    }
  }
  if (out.length >= 3) out.push(out[0])
  return out
}

function clipToMaxLat(geo: unknown, maxLat: number): unknown {
  const obj = geo as { type: string; coordinates?: unknown; geometry?: unknown; features?: unknown[] }
  if (obj.type === 'Polygon') {
    return {
      ...obj,
      coordinates: (obj.coordinates as number[][][])
        .map(r => clipRing(r, maxLat))
        .filter(r => r.length >= 4),
    }
  }
  if (obj.type === 'MultiPolygon') {
    return {
      ...obj,
      coordinates: (obj.coordinates as number[][][][])
        .map(poly => poly.map(r => clipRing(r, maxLat)).filter(r => r.length >= 4))
        .filter(poly => poly.length > 0),
    }
  }
  if (obj.type === 'Feature') {
    return { ...obj, geometry: clipToMaxLat(obj.geometry, maxLat) }
  }
  if (obj.type === 'FeatureCollection') {
    return { ...obj, features: (obj.features ?? []).map(f => clipToMaxLat(f, maxLat)) }
  }
  return geo
}

export default function ServiceAreaMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<ReturnType<typeof import('leaflet')['map']> | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then((L) => {
      // @ts-expect-error leaflet internals
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

      const container = containerRef.current! as HTMLElement & { _leaflet_id?: number }
      if (container._leaflet_id) delete container._leaflet_id

      const map = L.map(containerRef.current!, {
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 14,
      }).addTo(map)

      const clipped = clipToMaxLat(VENTURA_COUNTY_GEO, CLIP_LAT)
      const ventura = L.geoJSON(clipped as GeoJSON.GeoJsonObject, {
        style: { color: '#B81F2A', fillColor: '#B81F2A', fillOpacity: 0.30, weight: 2.5 },
      }).addTo(map).bindTooltip('Ventura County', { sticky: true, className: 'map-tooltip' })

      map.fitBounds(ventura.getBounds().pad(0.15), { padding: [20, 20] })

      mapRef.current = map
    })

    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="service-map-wrap">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={containerRef} className="service-map" />
      <div className="map-legend">
        <span className="legend-dot legend-dot--ventura" /> Ventura County
      </div>
    </div>
  )
}
