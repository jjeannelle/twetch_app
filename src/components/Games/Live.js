import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import api from '../../api';

export default function Live() {

    const {slug} = useParams();
    
    const [infoStream, setInfoStream] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);

            if(result.data.data.length === 0) {
                setInfoStream(false)
            } else {
                setInfoStream(result.data.data[0]);
            }
        }
        fetchData();
    }, [slug]);

    return (

        infoStream  ?

        <div className="PageContainer">
            <div className="LiveStream">
                <div className="LiveStream-player">
                    <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
                </div>
                <div className="LiveStream-wrapper">
                    <div className="LiveStream-title">{infoStream.user_name}</div>
                    <div className="LiveStream-subtitle">{infoStream.title}</div>
                    <div className="LiveStream-game">{infoStream.game_name}</div>
                    <div className="LiveStream-viewers">Viewers : {infoStream.viewer_count}</div>
                    <div className="LiveStream-content">Langue : {infoStream.language}</div>
                </div>
            </div>
        </div>

        :

        <div className="PageContainer">
            <div className="LiveStream">
                <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
                <div className="LiveStream-wrapper">
                    <div className="LiveStream-title">Le Streamer est offline ! </div>
                </div>
            </div>
        </div>
    )
}
