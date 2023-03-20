import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";
import { MovieContext } from "../context/MovieContext";

const MovieDetail = () => {
  const [moviedetails, setMoviedetails] = useState("");
  const [videoKey, setVideoKey] = useState();
  const { id } = useParams();
  const {
    title,
    poster_path,
    overview,
    release_date,
    vote_average,
    vote_count,
  } = moviedetails;

  const { API_KEY } = useContext(MovieContext);
  const DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImg =
    "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2056&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  const getDetails = async () => {
    let { data } = await axios(DETAIL_API);
    setMoviedetails(data);
    console.log(data);
  };

  const getVideo = async () => {
    let { data } = await axios(videoUrl);
    console.log(data.results);
    setVideoKey(data.results[1].key);
  };

  useEffect(() => {
    getDetails();
    getVideo();
  }, []);

  return (
    <div className="md:container px-10 mx-auto py-5  dark:bg-gray-dark-main">
      <h1 className="text-center text-white text-3xl">{title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className="md:container flex justify-center px-10">
        <div className="flex flex-col lg:flex-row max-w-6xl rounded-lg bg-gray-100 shadow-lg">
          <img
            className=" lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImg}
            alt="poster"
          />
          <div className="p-6 flex flex-col justify-between dark:bg-gray-dark-main ">
            <div>
              <h5 className="text-gray-900 text-xl font-medium mb-2 dark:text-white">
                Overview
              </h5>
              <p className="text-gray-700 text-base mb-4 dark:text-white">
                {overview}
              </p>
            </div>
            <ul className="bg-gray-100 rounded-lg border border-gray-400 text-gray-900 dark:bg-gray-dark-main dark:text-white">
              <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
                {"Release Date : " + release_date}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 w-full">
                {`Rate: ${vote_average ? vote_average.toFixed(1) : "N/A"}`}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 w-full">
                {"Total Vote : " + vote_count}
              </li>
              <li className="px-6 py-2 border-gray-400 w-full rounded-t-lg">
                <Link
                  to={-1}
                  className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                >
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
