'use client'
import { useEffect, useRef } from 'react'
import { LA_COUNTY_GEO, VENTURA_COUNTY_GEO } from '@/lib/countyBorders'

/**
 * Ventura service-area map. Ventura County is the highlighted/primary area
 * (bold red), with Los Angeles County shaded faintly alongside to show the
 * broader Southern California reach. Framed on Ventura.
 *
 * Mirrors the LA site's map pattern: 'use client', dynamic leaflet import in
 * useEffect, manual _leaflet_id cleanup to survive StrictMode double-mount.
 */
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

      // LA shaded faintly (secondary)
      L.geoJSON(LA_COUNTY_GEO as GeoJSON.GeoJsonObject, {
        style: { color: '#0B2A55', fillColor: '#0B2A55', fillOpacity: 0.08, weight: 1 },
      }).addTo(map).bindTooltip('Los Angeles County', { sticky: true, className: 'map-tooltip' })

      // Ventura highlighted (primary, brand red)
      const ventura = L.geoJSON(VENTURA_COUNTY_GEO as GeoJSON.GeoJsonObject, {
        style: { color: '#B81F2A', fillColor: '#B81F2A', fillOpacity: 0.30, weight: 2.5 },
      }).addTo(map).bindTooltip('Ventura County', { sticky: true, className: 'map-tooltip' })

      // Center/frame on Ventura, with a little room toward LA on the east.
      const b = ventura.getBounds().pad(0.15)
      map.fitBounds(b, { padding: [20, 20] })

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
        <span className="legend-dot legend-dot--la" /> Los Angeles County
      </div>
    </div>
  )
}
