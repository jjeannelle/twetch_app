import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

export default function Sidebar() {
  const [topStreams, setTopStreams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/helix/streams");

      let dataArray = result.data.data;

      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });
      let userIDs = dataArray.map((stream) => {
        return stream.user_id;
      });

      // Création des URLs personnalisés

      let baseUrlGames = "https://api.twitch.tv/helix/games?";
      let baseUrlUsers = "https://api.twitch.tv/helix/users?";

      let queryParamsGame = "";
      let queryParamsUsers = "";

      gameIDs.map((id) => {
        return (queryParamsGame = queryParamsGame + `id=${id}&`);
      });
      userIDs.map((id) => {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
      });

      // url final
      let urlFinalGames = baseUrlGames + queryParamsGame;
      let urlFinalUsers = baseUrlUsers + queryParamsUsers;
      // console.log(urlFinalGames);

      // appel
      let gamesNames = await api.get(urlFinalGames);
      let getUsers = await api.get(urlFinalUsers);

      let gamesNameArray = gamesNames.data.data;
      let arrayUsers = getUsers.data.data;

      // création du tableau final
      let finalArray = dataArray.map((stream) => {
        stream.gameName = "";
        stream.truePic = "";
        stream.login = "";

        gamesNameArray.forEach((name) => {
          arrayUsers.forEach((user) => {
            if (stream.user_id === user.id && stream.game_id === name.id) {
              stream.truePic = user.profile_image_url;
              stream.gameName = name.name;
              stream.login = user.login;
            }
          });
        });

        return stream;
      });

      setTopStreams(finalArray.slice(0, 6));
    };

    fetchData();
  }, []);

  return (
    <div className="PanelLeft">
      <div className="PanelLeft-container">
        <h2 className="PanelLeft-title">Chaînes recommandées</h2>
        <ul className="PanelLeft-list">
          {topStreams.map((stream, index) => (
            <li key={index} className="PanelLeft-item">
                <Link
                  key={index}
                  className="PanelLeft-link"
                  to={{
                    pathname: `/live/${stream.login}`,
                  }}
                >
                    <img
                      src={stream.truePic}
                      alt="logo user"
                      className="PanelLeft-picture"
                    />
                    <div className="PanelLeft-content">
                      <span className="PanelLeft-subtitle">{stream.user_name}</span>
                      <span className="PanelLeft-desc">{stream.gameName}</span>
                    </div>

                    <div className="PanelLeft-user">
                      <span className="PanelLeft-number">{stream.viewer_count}</span>
                    </div>

                </Link>
              </li>
          ))}
        </ul>
        
      </div>
    </div>
  );
}
