/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { TDepartementGeoJSON } from '~/server-only/geojson/get-departments'
import 'leaflet/dist/leaflet.css'
import { MapContainer, useMap } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { LatLngTuple, LeafletMouseEvent } from 'leaflet'
import { GeoJSON, TileLayer } from 'react-leaflet'
import { useQueryState, useQueryStates, parseAsFloat } from 'nuqs'
import { useEffect, useState, useMemo, SetStateAction, Dispatch } from 'react'
import { useEpci } from '~/hooks/use-epci'
import { fr } from '@codegouvfr/react-dsfr'
import { tss } from 'tss-react'
import Button from '@codegouvfr/react-dsfr/Button'

interface MapState {
  hasInteraction: boolean
  instance: L.Map | null
}

type FranceMapProps = {
  departements: TDepartementGeoJSON
}

const MapEventHandler = ({ eventHandler }: { eventHandler: Dispatch<SetStateAction<MapState>> }) => {
  const map = useMap()

  map.on('moveend', () => {
    eventHandler((prevState) => ({ ...prevState, hasInteraction: false }))
  })
  map.on('movestart', () => {
    eventHandler((prevState) => ({ ...prevState, hasInteraction: true }))
  })

  useEffect(() => {
    const handleLoad = () => {
      eventHandler((prevState) => ({ ...prevState, instance: map }))
    }
    map.whenReady(handleLoad)
    return () => {
      map.off('load', handleLoad)
    }
  }, [map, eventHandler])

  return null
}

export default function FranceMap({ departements }: FranceMapProps) {
  const { classes, cx } = useStyles()
  const [mapState, setMapState] = useState<MapState>({
    hasInteraction: false,
    instance: null,
  })
  const [coordinates] = useQueryStates({
    lat: parseAsFloat.withDefault(46.603354),
    lng: parseAsFloat.withDefault(1.888334),
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDepartment, setSelectedDepartment] = useQueryState('departement')
  const [selectedEpci, setSelectedEpci] = useQueryState('epci')

  useEffect(() => {
    const { instance } = mapState
    const foundDepartement = departements.features.find((feature) => feature.properties.nom === selectedDepartment)?.geometry
      .coordinates[0][0]

    if (foundDepartement && instance) {
      const [lng, lat] = foundDepartement
      instance.flyTo([lat, lng], 7, { animate: true })
    }
  }, [mapState.instance, selectedDepartment])

  const { data: epci } = useEpci()

  const memoizedMap = useMemo(() => {
    const { hasInteraction, instance } = mapState
    const center: LatLngTuple = [coordinates.lat, coordinates.lng]

    const onClickDepartment = (leafletMouseEvent: LeafletMouseEvent) => {
      const { latlng, propagatedFrom } = leafletMouseEvent
      setSelectedEpci(null)
      setSelectedDepartment(propagatedFrom.feature.properties.nom)
      if (instance) {
        instance.flyTo(latlng, 7, { animate: true })
      }
    }

    const onClickEpci = (leafletMouseEvent: LeafletMouseEvent) => {
      const { propagatedFrom } = leafletMouseEvent
      setSelectedEpci(propagatedFrom.feature.properties.lib_zo)
    }

    if (!selectedDepartment) {
      return null
    }

    return (
      <MapContainer center={center} zoom={6} className={cx(classes.mapContainer)}>
        <MapEventHandler eventHandler={setMapState} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {departements && !hasInteraction && (
          <GeoJSON
            data={departements as GeoJSON.GeoJsonObject}
            style={{
              dashArray: '4',
              fillOpacity: 0,
              opacity: 1,
              weight: 0.8,
            }}
            eventHandlers={{ click: (leafletMouseEvent: LeafletMouseEvent) => onClickDepartment(leafletMouseEvent) }}
          />
        )}

        {epci && !hasInteraction && (
          <GeoJSON
            data={epci as GeoJSON.GeoJsonObject}
            style={() => ({
              color: 'white',
              dashArray: '3',
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              opacity: 1,
              weight: 2,
            })}
            eventHandlers={{ click: (leafletMouseEvent: LeafletMouseEvent) => onClickEpci(leafletMouseEvent) }}
          />
        )}
      </MapContainer>
    )
  }, [coordinates, departements, epci, setSelectedEpci, mapState, setSelectedDepartment, selectedDepartment])

  const epcis = epci?.features.find((feature) => feature.properties.lib_zo === selectedEpci)?.properties.epcis || []
  return (
    <div className={fr.cx('fr-grid-row')} style={{ height: '100%' }}>
      <div className={fr.cx('fr-col-12', 'fr-col-md-6', 'fr-pr-4v')}>{memoizedMap}</div>
      {epcis.length > 0 && (
        <div className={cx(fr.cx('fr-col-12', 'fr-col-md-6', 'fr-p-4v'), classes.card)}>
          <div>
            <h2>EPCI du bassin d&apos;habitat</h2>
            {epcis.map((epci) => (
              <div className={classes.epciList} key={epci.code_epci}>
                <span key={epci.code_epci}>{epci.nom_epci}</span>
              </div>
            ))}
          </div>
          <div className={classes.buttonContainer}>
            <Button
              linkProps={{
                href: '#',
              }}
            >
              Valider et passer à l&apos;étape suivante
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const useStyles = tss.create({
  buttonContainer: {
    marginLeft: 'auto',
  },
  card: {
    background: fr.colors.decisions.background.default.grey.default,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  epciList: {
    border: '1px solid',
    borderColor: fr.colors.decisions.border.default.grey.default,
    padding: '1rem',
  },
  mapContainer: {
    '[href]': {
      backgroundImage: 'unset !important',
    },
    height: '100%',
    width: '100%',
  },
})
