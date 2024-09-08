import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import moviesData from '../../data/movies.json'
import seriesData from '../../data/series.json'
import FittedText from '../_components/fitted-text'

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
export interface Series {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  video?: string
  name: string
  vote_average: number
  vote_count: number
}
function MovieCard({ movies }: { movies: Movie[] }) {
  const imageUrl = 'http://image.tmdb.org/t/p/w500'

  return (
    <React.Fragment>
      {movies.map((movie) => (
        <Card
          key={movie.id}
        >
          <div
            className="relative min-h-[20vh] aspect-video bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl}${movie.backdrop_path})`, // Dynamic background
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <FittedText
                content={movie.title}
              />
            </div>
          </div>
        </Card>
      ))}
    </React.Fragment>
  )
}

function SeriesCard({ series }: { series: Series[] }) {
  const imageUrl = 'http://image.tmdb.org/t/p/w500'

  return (
    <React.Fragment>
      {series.map((serie) => (
        <Card
          key={serie.id}
        >
          <div
            className="relative min-h-[20vh] aspect-video bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl}${serie.backdrop_path})`, // Dynamic background
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <FittedText
                content={serie.name}
              />

            </div>
          </div>
        </Card>
      ))}
    </React.Fragment>
  )
}

export default function HomePage() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div>
        <h2>Series</h2>
        <div className="scrollable-row" >
          <SeriesCard series={seriesData} />
        </div>
      </div>
      <div>
        <h2>Movies</h2>
        <div className="scrollable-row" >
          <MovieCard movies={moviesData} />
        </div>
      </div>

    </div>
  )
}
