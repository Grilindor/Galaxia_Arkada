import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function UnityGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "./public/thebeggarking/Build/thebeggarking.js",
    dataUrl: "./public/thebeggarking/Build/thebeggarking.data",
    frameworkUrl: "./public/thebeggarking/Build/thebeggarking.framework",
    codeUrl: "./public/thebeggarking/Build/thebeggarking.wasm",
  });

  return <Unity unityProvider={unityProvider} />;
}

export default UnityGame;
