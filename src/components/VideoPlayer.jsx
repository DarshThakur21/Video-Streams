import React, { useEffect, useRef } from 'react'
import videojs from 'video.js';
// import "videos.js/dist/video-js.css";

function VideoPlayer({ src }) {

    const videoRef = useRef(null)
    const playerRef = useRef(null)

    useEffect(() => {

        playerRef.current = videojs(videoRef.current, {
            controls: true,
            autoplay: true,
            muted: true,
            preload: "auto",

        });
        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };



    }, [src]);

    return
    (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-big-play-centered" style={{ width: '500px', height: '500px' }} />
        </div>
    )
}


export default VideoPlayer