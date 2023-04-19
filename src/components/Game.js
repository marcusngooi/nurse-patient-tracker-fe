// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Game's Page
import React, { useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
function Game() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/build/WebGL.loader.js",
    dataUrl: "/build/WebGL.data",
    frameworkUrl: "/build/WebGL.framework.js",
    codeUrl: "/build/WebGL.wasm",
    streamingAssetsUrl: "/StreamingAssets",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  // Add an event listener for when the component unmounts
  useEffect(() => {
    return async () => {
      await unityProvider.unload();
    };
  }, []);

  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    height: "100%", // Set the height of the container to 100%
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Fitness Tracker Game</h1>
        <div style={styles}>
          <Unity
            unityProvider={unityProvider}
            style={{ width: 800, height: 600 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Game;
