// import { useEffect, useRef } from "react";
// import Hls from "hls.js";

// const Video = ({ url }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (!url) return;

//     let hls;
//     const video = videoRef.current;
//     const m3u8Url = extractM3U8Link(url);

//     if (video.canPlayType("application/vnd.apple.mpegurl")) {
//       video.src = m3u8Url;
//     } else if (Hls.isSupported()) {
//       hls = new Hls();
//       hls.loadSource(m3u8Url);
//       hls.attachMedia(video);
//     }

//     return () => {
//       if (hls) {
//         hls.destroy();
//       }
//     };
//   }, [url]);

//   const extractM3U8Link = (url) => {
//     const urlObj = new URL(url);
//     return urlObj.searchParams.get("url");
//   };

//   return (
//     <video
//       ref={videoRef}
//       controls
//       style={{ width: "100%", height: "500px" }}
//       className="mb-5"
//     />
//   );
// };

// export default Video;

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const Video = ({ url }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null); // thêm cái này để giữ instance hls

  useEffect(() => {
    if (!url) return;

    const video = videoRef.current;
    const m3u8Url = extractM3U8Link(url);

    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = m3u8Url;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;
      hls.loadSource(m3u8Url);
      hls.attachMedia(video);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url]);

  const extractM3U8Link = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("url");
  };

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: "100%", height: "500px" }}
      className="mb-5"
    />
  );
};

export default Video;
