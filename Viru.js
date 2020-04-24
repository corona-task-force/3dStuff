import { View as GraphicsView } from 'expo-graphics';
import ExpoTHREE from 'expo-three';
import { Platform, StyleSheet, Text, View } from 'react-native';
// import OBJLoader from 'three-obj-loader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

import * as THREE from "three";

import React from 'react';

export default class Viru extends React.Component {
  componentWillMount() {
    THREE.suppressExpoWarnings();
  }

  render() {
    // Create an `ExpoGraphics.View` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <GraphicsView
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        style={styles.container}

      />
    );
  }

  // This is called by the `ExpoGraphics.View` once it's initialized
  onContextCreate = async ({
    gl,
    canvas,
    width,
    height,
    scale: pixelRatio,
  }) => {
      console.log(this,     gl,
        canvas, '?',
        width,
        height)
    this.renderer = new ExpoTHREE.Renderer({ gl, pixelRatio, width, height });
    console.log("apple")
    this.renderer.setClearColor(0xffffff  )
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
    });
    
    this.cube = new THREE.Mesh(geometry, material);

    this.scene.add(this.cube);


    var loader = new GLTFLoader();
    console.log(loader)

    // let that = this;
    const obj = await ExpoTHREE.loadAsync(require("./models/Pokemon/Bulbasaur/Bulbasaur_ColladaMax.DAE"))
    console.log(obj)
    let mesh = obj.scene;

    //this.bulb = new THREE.Mesh(geometry, material);

    // ExpoTHREE.utils.scaleLongestSideToSize(mesh, 5);
    // ExpoTHREE.utils.alignMesh(mesh, { y: 1 });

    obj.scene.position.set(0,-2.5,0)

    this.scene.add( obj.scene );

    this.scene.add(new THREE.AmbientLight(0x404040));

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(30, 30, 30);
    this.scene.add(light);

    // var dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    // dirLight.position.set( 0, 0, 1 ).normalize();
    // this.scene.add( dirLight );

    // var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    // this.scene.add( ambientLight );

    // var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    // directionalLight.position.set( 1, 1, 0 ).normalize();
    // this.scene.add( directionalLight );

    // let Bulbasaur
    // let self = this; 


    // var loadingManager = new THREE.LoadingManager( function () {
    //   //self.scene.add( Bulbasaur );
    // })
    // var loader = new ColladaLoader( loadingManager );
    // loader.load( 'models/Pokemon/Bulbasaur/Bulbasaur_ColladaMax.DAE', function ( collada ) {
    //   //Bulbasaur = collada.scene;
    //   console.log(collada)
    // } );

   
    //let mesh = obj.children[ 0 ];

    // const obj = await ExpoTHREE.loadAsync(
    //   [require('./dog/dog.obj')],
    //   null,
    //   imageName => resources[imageName],
    // );


    // let mesh = obj
    // console.log(mesh)
    
    //var geometry = new THREE.BufferGeometry();
    //geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    // mesh.scale.set( 1.5, 1.5, 1.5 );
    // mesh.position.set(0,10,100)
    //this.scene.add( mesh );
    // var loader = new GLTFLoader();
    // loader.load( "models/Horse.glb", function ( gltf ) {
    //   console.log(gltf)
    //   mesh = gltf.scene.children[ 0 ];
    //   mesh.scale.set( 1.5, 1.5, 1.5 );
    //   mesh.position.set(0,-15,-1000)

    //   scene.add( mesh );

    // })
    // loader.load( "models/Horse.glb", function ( obj ) {
    //   console.log(obj)
    //    let mesh = obj.children[ 0 ];
    //    //mesh.scale.set( 1.5, 1.5, 1.5 );
    //    mesh.position.set(0,-15,-1000)

    //   that.scene.add( mesh );
    // })
      
    //   // mixer = new THREE.AnimationMixer( mesh );

    //   // mixer.clipAction( gltf.animations[ 0 ] ).setDuration( .7 ).play();
    //   // animate()
    //   // window.mesh = mesh
    //   // window.mixer = mixer

    // } );

  };

  onRender = delta => {
    this.cube.rotation.x += 3.5 * delta;
    this.cube.rotation.y += 2 * delta;
    this.renderer.render(this.scene, this.camera);
  };
}


const styles = StyleSheet.create({
  container: {
      alignItems: 'stretch',
      width: "100%",
      height: "100%"
  }
})