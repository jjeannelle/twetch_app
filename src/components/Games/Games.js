import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function Games() {

    const [games, setGames] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top');
            let dataArray = result.data.data;
            let finalArray = dataArray.map(game => {
                let newUrl = game.box_art_url
                .replace("{width}", "250")
                .replace("{height}", "300");
            game.box_art_url = newUrl;
            return game;
            });
            setGames(finalArray);
        }
        fetchData();
    }, [])

    return (
        <div className="PageContainer">

            <div className="PageHeading">
                <h1 className="PageHeading-title">Jeux les plus populaires</h1>
            </div>

            <ul className="ListCards">
                {games.map((game, index) => (
                    <li key={index} className="ListCards-item">
                        <div className="Card">
                            <img src={game.box_art_url} alt="jeuprofile pic" className="Card-picture"/>

                            <div className="Card-wrapper">
                                <h3 className="Card-title">{game.name}</h3>
                                <div className="Card-action">
                                <Link
                                    className="ButtonPrimary"
                                    to={{
                                        pathname: `/game/` + game.name,
                                        state : {
                                            gameID: game.id
                                        }
                                    }}
                                    > {game.name} </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
