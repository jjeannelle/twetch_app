import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
import Erreur from "../Errors/SearchError";

export default function SearchResult() {
  const { slug } = useParams();

  const [result, setResult] = useState(true);
  const [streamerInfo, setStreamerInfo] = useState([]);

  let cleanSearch = slug.replace(/ /g, "");

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/users?login=${cleanSearch}`
      );

      if (result.data.data.length === 0) {
        setResult(false);
      } else {
        setStreamerInfo(result.data.data);
      }
    };
    fetchData();
  }, [cleanSearch]);

  return result ? (
    <div className="PageContainer">
      <div className="PageHeading">
        <h1 className="PageHeading-title">Résultats de recherche : </h1>
      </div>

      <div className="ListCards">
        {streamerInfo.map((stream, index) => (
          <div key={index} className="Card">
            <img
              src={stream.profile_image_url}
              alt="resultat profile"
              className="Card-picture"
            />

            <div className="Card-wrapper">
              <h3 className="Card-title">{stream.display_name}</h3>
              <div className="Card-content">{stream.description}</div>
              <div className="Card-action">
                <Link
                  className="ButtonPrimary"
                  to={{
                    pathname: `/live/${stream.login}`,
                  }}
                >
                  <div className="btnCarte btnResult">
                    Regarder {stream.display_name}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Erreur result={cleanSearch} />
  );
}
