import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "../thebeggarking/Build/thebeggarking.js",
    dataUrl: "../thebeggarking/Build/thebeggarking.data",
    frameworkUrl: "../thebeggarking/Build/thebeggarking.framework",
    codeUrl: "../thebeggarking/Build/thebeggarking.wasm",
  });

  return <Unity unityProvider={unityProvider} />;
}

export default UnityGame;
