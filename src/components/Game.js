// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Home's Page
import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
function Game()
{
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
    
      return (
        <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
      );
}

export default Game;