import fs from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params
  const filePath = path.join(process.cwd(), 'public', 'geojson', `${filename}.geojson`)

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const geojsonData = JSON.parse(fileContent)

    return NextResponse.json(geojsonData, {
      headers: {
        'Content-Type': 'application/geo+json',
      },
    })
  } catch (error) {
    console.error('Error reading GeoJSON file:', error)
    return NextResponse.json({ error: 'GeoJSON file not found or invalid' }, { status: 404 })
  }
}
