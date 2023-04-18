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

      const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        height: '100%', // Set the height of the container to 100%
      };
      
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Fitness Tracker Game</h1>
            <div style={styles}>
              <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
            </div>
          </div>
        </div>
      );
}

export default Game;