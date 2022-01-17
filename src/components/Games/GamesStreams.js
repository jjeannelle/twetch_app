import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api";

export default function GamesStreams() {
  const { slug } = useParams();
  const location = useLocation();

  const [streamData, setStreamData] = useState([]);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`
      );
      let dataArray = result.data.data;

      let finalArray = dataArray.map((stream) => {
        let newUrl = stream.thumbnail_url
          .replace("{width}", "320")
          .replace("{height}", "180");
        stream.thumbnail_url = newUrl;
        return stream;
      });

      // calcul du total des viewers
      let totalViewers = finalArray.reduce((acc, val) => {
        return acc + val.viewer_count;
      }, 0);

      setStreamData(finalArray);
      setViewers(totalViewers);
    };
    fetchData();
  }, [location.state.gameID]);

    return (
        <div className="PageContainer">
            <div className="PageHeading">
                <h1 className="PageHeading-title">Streams : {slug}</h1>
                <h3 className="PageHeading-subtitle sousTitreGameStreams">
                <strong className="textColored">{viewers}</strong> personnes regardent{" "}
                {slug}
                </h3>
            </div>

            <ul className="ListCards">
                {streamData.map((stream, index) => (
                <li key={index} className="ListCards-item">
                    <div className="Card">
                        <img
                        src={stream.thumbnail_url}
                        alt="jeu carte img"
                        className="Card-picture"
                        />

                        <div className="Card-wrapper">
                            <h3 className="Card-title">{stream.user_name}</h3>
                            <p className="Card-content">
                                Nombre de viewers : {stream.viewer_count}
                            </p>
                            <div className="Card-action">
                                <Link
                                    className="ButtonPrimary"
                                    to={{
                                    pathname: `/live/${stream.user_login}`,
                                    }}
                                >
                                    <span>Regarder {stream.user_name}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
}
