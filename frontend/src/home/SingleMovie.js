import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const SingleMovie = () => {
    const {id} = useParams();
const [movie, setMovie] = useState(null)
const [isSub, setIsSub] = useState(false)


    useEffect(() => {
        const fetchMovie = async () => {
            const response = await fetch(`http://localhost:4000/api/movies/${id}`)
            const data = await response.json()
            setMovie(data)
        }   
        fetchMovie()
        const isSub = localStorage.getItem("isSubscribed")
        setIsSub(isSub === "true" ? true : false)
    }, [id])
  return movie ? (
      <div className="d-flex container w-100" style={{
          margin: "0 auto",
      }}>
          <div className="row w-100">
              <div className="col-6">
                  {isSub ? (
                      <iframe width="560" height="315" src={movie.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />
                  ) : (
                          <>
                          <img src={movie.image} alt="" height={400}/>
                          <h5>Subscribe to watch movie</h5>
                          </>
                      )    
}
              </div>
              <div className="col-6" style={{
                display: "flex",
                  paddingLeft: "3rem",
                    flexDirection: "column",
              }}>
                  <h1>{movie.name}</h1>
                  <h3>{movie.description}</h3>
                  <h6>Year: {movie.year}</h6>
                  <h6>Oscar: {movie.oscar ? "Yes" : "No"}</h6>
                  
</div>
          </div>
</div>
  ): ("Loading...")
}

export default SingleMovie