import React, { useState } from "react";
import {useQuery,gql,useLazyQuery } from '@apollo/client'

const Query_all_users=gql`
    query getUsers {
        users
        {
            id
            name
            age
            username
            nationality
        } 
    }
`

const Query_all_Movies=gql`
    query GetAllMovies{
        movies
        {
            id
            name
            year
        }
    }
`

const Get_Query_By_Name=gql`
    query getMovieByName($name:String!)
    {
        movie(name:$name){
            name
            year
        }
    }
`
const DisplayData =()=>{
    const {data,loading,error}=useQuery(Query_all_users);
    const {data:movieData}=useQuery(Query_all_Movies);
    const [movieSearch,setMoviename]=useState()

    const[fetchMovie,{data:movieSeachData,error:movieSeachError}]=useLazyQuery(Get_Query_By_Name)
    if(loading){
        return <h6>Data loading</h6>
    }

    if (error){
        console.log(error)
    }

    if(movieSeachError){
        console.log("there  was an error fetching Data")
    }
    // if(data){
    //     console.log(data)
    // }
return(
    <div>
        {data && data?.users?.map((data_item)=>{
            return (
            <div>
                <h2>Name:{data_item?.name}</h2>
                <h2>Age:{data_item?.age}</h2>
                <h2>UserName:{data_item?.username}</h2>
                <h2>Nationality:{data_item?.nationality}</h2>
            </div>
           )
        })}
  <hr/>

        {movieData && movieData?.movies?.map((movie_data)=>{
                return (
                <div>
                    <h2>id:{movie_data?.id}</h2>
                    <h2>Name:{movie_data?.name}</h2>
                    <h2>Year:{movie_data?.year}</h2>
                </div>
                )
            })}
             <hr/>
            <div>
                <input type="text" palceholder="Movie Name" onChange={(e)=>{setMoviename(e.target.value)}}></input>
                <button onClick={()=>{
                    fetchMovie({
                        variables:{
                            name:movieSearch
                        }
                    })
                }}>Fetch Data</button>
              
                <div>
                        {
                        movieSeachData&& 
                        <div>
                            <h3>Name:{movieSeachData.movie.name}</h3>
                            <h3>Year:{movieSeachData.movie.year}</h3>
                        </div>
                        }

                        {movieSeachError&&<h1 style={{color:"red"}}>There was an error Fetching the data</h1>}
                </div>
            </div>
    </div>
    
)
} 

export default DisplayData;