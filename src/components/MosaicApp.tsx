import React, {useEffect, useState} from "react";
import "../css/app.css"
import {
    ExpandButton,
    getLeaves,
    Mosaic,
    MosaicBranch,
    MosaicNode,
    MosaicWindow,
    MosaicZeroState,
    RemoveButton,
    SplitButton
} from "react-mosaic-component";
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import SelectComponent from "./SelectComponent";
import ShowComponent from "./ShowComponent";

interface ExampleWindowProps {
    id: number;
    path: MosaicBranch[];
    totalWindowCount: number;
    data: {};
}

interface ExampleAppState {
    currentNode: MosaicNode<number> | null;
}

const state: ExampleAppState = {
    currentNode: {
        direction: 'row',
        first: 1,
        second: {
            direction: 'column',
            first: 2,
            second: 3,
        },
        splitPercentage: 45,
    }
};

const totalWindowCount = getLeaves(state.currentNode).length;

const MosaicApp = () => {

    const [data, setData] = useState({});
    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        fetch('https://mocki.io/v1/786be44c-6e54-44a1-80c7-5367d379cf16', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resData => {
            return resData.json();
        }).then(res => setData(res)
        ).catch(err =>
            console.log(err)
        );
    }

    return <Mosaic<number>
        renderTile={(id, path) => (
            <Window id={id}
                    path={path}
                    totalWindowCount={totalWindowCount}
                    data={data}
                    key={id}/>
        )}
        initialValue={state.currentNode}
        zeroStateView={<MosaicZeroState createNode={() => totalWindowCount + 1}/>}
        blueprintNamespace="bp4"
        value={state.currentNode}/>

}

const Window = ({id, path, totalWindowCount, data}: ExampleWindowProps) => {

    const [selected, setSelected] = useState("");
    const _ = require('lodash');
    return <MosaicWindow<number>
        toolbarControls={[
            (!_.isEmpty(data))
            && <SelectComponent
                data={data}
                handleSelect={setSelected}/>,
            <ExpandButton/>,
            <SplitButton/>,
            <RemoveButton/>
        ]}
        createNode={() => totalWindowCount + 1}
        path={path}
        title="Company Info"
        key={id}
        className="size-min"
    >
        <div className="example-window">
            <ShowComponent company={selected} data={data}/>
        </div>
    </MosaicWindow>
}

export default MosaicApp;
