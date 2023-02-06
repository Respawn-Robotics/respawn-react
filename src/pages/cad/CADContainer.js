import React from "react";
import { Canvas } from "@react-three/fiber";

import { Stage, PresentationControls } from "@react-three/drei"

import {useGLTF} from "@react-three/drei";

function CadModel(props) {
    const { scene } = useGLTF('/bmw.glb');

    return (
        <primitive object={scene} scale={0.01} {...props} />
    );
}

function CADContainer() {

    return (
        <Canvas dpr={[1, 2]} shadows camera={{fov: 45}} style={{"position": "absolute"}}>
            <color attach="background" args={["#101010"]} />
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                <Stage environment={null}>
                    <CadModel scale={0.01} />
                </Stage>
            </PresentationControls>
        </Canvas>
    );
}

export default CADContainer;