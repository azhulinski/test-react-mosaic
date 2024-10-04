import React from "react";
import {Mosaic, MosaicBranch, MosaicWindow} from "react-mosaic-component";
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import './app.css';
import WeatherMain from "./components/WeatherMain";
import './css/Weather.css'
import Currency from "./components/Currency";

const MosaicApp = () => {

    const Window = (id: string, path: MosaicBranch[]) => (
        <MosaicWindow
            toolbarControls={[]}
            path={path}
            title={id}>
            {id === 'Weather Widget' && <WeatherMain/>}
            {id === 'Currency Widget' && <Currency/>}
        </MosaicWindow>
    )

    return <Mosaic
        renderTile={Window}
        initialValue={{
            direction: "row",
            first: "Weather Widget",
            second: "Currency Widget"
        }}
    />
}

export default MosaicApp;
