let scene, camera, renderer, mesh;
let meshFloor, ambientLight, light, controls;
let keyboard = {};
let player = { height:33, speed:0.3, turnSpeed:Math.PI*0.02 };
let USE_WIREFRAME = false;
 
function init(){

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);

  let skyMaterialArray = [];
  for (let   i = 0; i < 6; i++)
   skyMaterialArray.push( new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('assets/textures/sky.jpg'),
    side: THREE.BackSide
   }));
   let skyGeometry = new THREE.CubeGeometry( 950,900, 1000 );
   let skyMaterial = new THREE.MeshFaceMaterial( skyMaterialArray );
   let skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
   scene.add(skyBox);

   //MODELS 
      let loader = new THREE.GLTFLoader();
      loader.load( 'assets/models/tree/scene.gltf', 
      function (gltf) {
         scene.add(gltf.scene);
         gltf.scene.scale.set(0.03,0.03,0.03);
         gltf.scene.position.x = -11;
         gltf.scene.position.z = 5;
         gltf.scene.rotation.y = 5.03;
         gltf.scene.rotation.x = 0;
      }, undefined, function(error) {
         console.error(error);
      } );

      let loader2 = new THREE.GLTFLoader();
      loader2.load( 'assets/models/tree/scene.gltf', 
      function (gltf) {
         scene.add(gltf.scene);
         gltf.scene.scale.set(0.03,0.03,0.03);
         gltf.scene.position.x = 11;
         gltf.scene.position.z = 5;
         gltf.scene.rotation.y = 4.5;
         gltf.scene.rotation.x = 0;
      }, undefined, function(error) {
         console.error(error);
      } );

   //ROOF
   textureRoof = new THREE.TextureLoader().load( 'assets/textures/Roof.jpg' );
   meshRoof = new THREE.Mesh(
      new THREE.CylinderGeometry(2,10,6),
      new THREE.MeshPhongMaterial({map:textureRoof, wireframe:USE_WIREFRAME})
      );
      meshRoof.position.y = 10;
      meshRoof.position.x = 0;
      meshRoof.position.z = 0;
      meshRoof.receiveShadow = true;
      meshRoof.castShadow = true;
      scene.add(meshRoof);

  //BOX LEFT WALL
  textureWall= new THREE.TextureLoader().load( 'assets/textures/JapaneseWall.jpg' );
  meshWallLeft = new THREE.Mesh(
     new THREE.BoxGeometry(11,7,1),
     new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
  );
  meshWallLeft.position.y = 5;
  meshWallLeft.position.x = 4.5;
  meshWallLeft.receiveShadow = true;
  meshWallLeft.castShadow = true;
  meshWallLeft.rotation.y = 42.4;
  scene.add(meshWallLeft);

  //BOX RIGHT WALL
  textureWall= new THREE.TextureLoader().load( 'assets/textures/JapaneseWall.jpg' );
  meshWallRight = new THREE.Mesh(
   new THREE.BoxGeometry(11,7,1),
   new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
   );
   meshWallRight.position.y = 5;
   meshWallRight.position.x = -4.5;
   meshWallRight.receiveShadow = true;
   meshWallRight.castShadow = true;
   meshWallRight.rotation.y = 42.4;

   scene.add(meshWallRight);

   //BOX NORTH WALL
   textureWall= new THREE.TextureLoader().load( 'assets/textures/JapaneseWall.jpg' );
   meshWallNorth = new THREE.Mesh(
      new THREE.BoxGeometry(11,7,1),
      new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
      );
      meshWallNorth.position.y = 5;
      meshWallNorth.position.x = 0;
      meshWallNorth.position.z = 4.5;
      meshWallNorth.receiveShadow = true;
      meshWallNorth.castShadow = true;
      meshWallNorth.rotation.y = 59.7;
      scene.add(meshWallNorth);

   //BOX SOUTH WALL
   textureWall= new THREE.TextureLoader().load( 'assets/textures/JapaneseWall.jpg' );
   meshWallSouth = new THREE.Mesh(
   new THREE.BoxGeometry(11,7,1),
   new THREE.MeshPhongMaterial({map:textureWall, wireframe:USE_WIREFRAME})
   );
   meshWallSouth.position.y = 5;
   meshWallSouth.position.x = 0;
   meshWallSouth.position.z = -4.5;
   meshWallSouth.receiveShadow = true;
   meshWallSouth.castShadow = true;
   meshWallSouth.rotation.y = 59.7;
   scene.add(meshWallSouth);
   
   //BOX BED
   textureBed= new THREE.TextureLoader().load( 'assets/textures/bedsheet.jpg' );
   meshBed = new THREE.Mesh(
      new THREE.BoxGeometry(3,5,0.4),
      new THREE.MeshPhongMaterial({map:textureBed, wireframe:USE_WIREFRAME})
      );
      meshBed.position.y = 3.4;
      meshBed.position.x = 0;
      meshBed.position.z = 1;
      meshBed.receiveShadow = true;
      meshBed.castShadow = true;
      meshBed.rotation.y = 59.7;
      meshBed.rotation.x = 14.1;
   
      scene.add(meshBed);

   //BOX DRESSER
   textureChest= new THREE.TextureLoader().load( 'assets/textures/chest.jpg' );
   meshDresser = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,0.5),
      new THREE.MeshPhongMaterial({map:textureChest, wireframe:USE_WIREFRAME})
   );
   meshDresser.position.y = 3.5;
   meshDresser.position.x = -2.5;
   meshDresser.position.z = 3;
   meshDresser.receiveShadow = true;
   meshDresser.castShadow = true;
   scene.add(meshDresser);

   //CYCLINDER PILLOW
   meshPillow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5,0.4,0.3,12),
      new THREE.MeshPhongMaterial({color:0xffffff, wireframe:USE_WIREFRAME})
   );
   meshPillow.position.y = 3.8;
   meshPillow.position.x = -0.2;
   meshPillow.position.z = 3;
   meshPillow.receiveShadow = true;
   meshPillow.castShadow = true;
   scene.add(meshPillow);

   //BOX GEOMETRY DOOR INSIDE
   textureDoor= new THREE.TextureLoader().load( 'assets/textures/Door.png' );
   meshDoor = new THREE.Mesh(
      new THREE.BoxGeometry(4,3,1),
      new THREE.MeshPhongMaterial({map:textureDoor, wireframe:USE_WIREFRAME})
   );
   meshDoor.position.y = 4.8;
   meshDoor.position.x = 0;
   meshDoor.position.z = -4;
   meshDoor.receiveShadow = true;
   meshDoor.castShadow = true;
   scene.add(meshDoor);

   //BOX GEOMETRY DOOR OUTSIDE
   textureDoor= new THREE.TextureLoader().load( 'assets/textures/Door.png' );
   meshDoorOutside = new THREE.Mesh(
      new THREE.BoxGeometry(4,4,1),
      new THREE.MeshPhongMaterial({map:textureDoor, wireframe:USE_WIREFRAME})
   );
   meshDoorOutside.position.y = 4;
   meshDoorOutside.position.x = 0;
   meshDoorOutside.position.z = -4.9;
   meshDoorOutside.receiveShadow = true;
   meshDoorOutside.castShadow = true;
   scene.add(meshDoorOutside);

   //WINDOWS
   textureWindows= new THREE.TextureLoader().load( 'assets/textures/Door.png' );
   meshWindows = new THREE.Mesh(
      new THREE.BoxGeometry(2,2,1),
      new THREE.MeshPhongMaterial({map:textureWindows, wireframe:USE_WIREFRAME})
   );
   meshWindows.position.y = 4.8;
   meshWindows.position.x = -5.3;
   meshWindows.position.z = -0;
   meshWindows.rotation.y -= Math.PI / 2;
   meshWindows.receiveShadow = true;
   meshWindows.castShadow = true;
   scene.add(meshWindows);

   //WINDOWS 2
   textureWindows2= new THREE.TextureLoader().load( 'assets/textures/Door.png' );
   meshWindows2 = new THREE.Mesh(
      new THREE.BoxGeometry(2,2,1),
      new THREE.MeshPhongMaterial({map:textureWindows2, wireframe:USE_WIREFRAME})
   );
   meshWindows2.position.y = 4.8;
   meshWindows2.position.x = 5.3;
   meshWindows2.position.z = 0;
   meshWindows2.rotation.y = Math.PI / 2;
   meshWindows2.receiveShadow = true;
   meshWindows2.castShadow = true;
   scene.add(meshWindows2);

   //CHEST
   textureChest= new THREE.TextureLoader().load( 'assets/textures/Treasure.jpg' );
   meshChest = new THREE.Mesh(
      new THREE.BoxGeometry(2,1,1),
      new THREE.MeshPhongMaterial({map:textureChest, wireframe:USE_WIREFRAME})
   );
   meshChest.position.y = 2.5;
   meshChest.position.x = 0;
   meshChest.position.z = -6;
   meshChest.receiveShadow = true;
   meshChest.castShadow = true;
   scene.add(meshChest);
    
   //FLOOR
   textureFloor = new THREE.TextureLoader().load( 'assets/textures/wood.jpg' );
   meshFloor = new THREE.Mesh(
      new THREE.PlaneGeometry(10,10,14,10),
      new THREE.MeshPhongMaterial({map:textureFloor, wireframe:USE_WIREFRAME})
      
   );
   meshFloor.position.y = 3;
   meshFloor.rotation.x -= Math.PI / 2;
   meshFloor.receiveShadow = true;
   scene.add(meshFloor);
   
   //FLOOR BOTTOM
   textureFloorBottom = new THREE.TextureLoader().load( 'assets/textures/FloorBottom.jpg' );
   meshFloorBottom = new THREE.Mesh(
      new THREE.BoxGeometry(13,15,2),
      new THREE.MeshPhongMaterial({map:textureFloorBottom, wireframe:USE_WIREFRAME})
   );
   meshFloorBottom.position.y = 1;
   meshFloorBottom.rotation.x -= Math.PI / 2;
   meshFloorBottom.receiveShadow = true;
   scene.add(meshFloorBottom);

   //GRASS OUTSIDE TEXTURES
   textureFloorOutside = new THREE.TextureLoader().load( 'assets/textures/grass.jpg' );
   meshFloorOutside = new THREE.Mesh(
      new THREE.PlaneGeometry(95,95,95,95),
      new THREE.MeshPhongMaterial({map: textureFloorOutside, wireframe:USE_WIREFRAME, opacity: 1,
         transparent: true, 
         side: THREE.DoubleSide, 
         depthWrite: true}) 
   );   
   meshFloorOutside.rotation.x -= Math.PI / 2;
   meshFloorOutside.position.y += -0.1;
   meshFloorOutside.receiveShadow = true;
   scene.add(meshFloorOutside);

   //ROAD
   textureRoad= new THREE.TextureLoader().load( 'assets/textures/Road.jpg' );
   meshRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(4,25,5),
      new THREE.MeshPhongMaterial({map:textureRoad, wireframe:USE_WIREFRAME})
      );
      meshRoad.position.y = 0;
      meshRoad.position.x = 0;
      meshRoad.position.z = -9;
      meshRoad.receiveShadow = true;
      meshRoad.castShadow = true;
      meshRoad.rotation.y = 59.7;
      meshRoad.rotation.x = -11;
      scene.add(meshRoad);
   
   //TORI LEFT
   textureToriLeft= new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshToriLeft = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,10),
      new THREE.MeshPhongMaterial({map:textureToriLeft, wireframe:USE_WIREFRAME})
      );
      meshToriLeft.position.y = 5;
      meshToriLeft.position.x = 2.5;
      meshToriLeft.position.z = -21;
      meshToriLeft.receiveShadow = true;
      meshToriLeft.castShadow = true;
      meshToriLeft.rotation.y = 59.7;
      meshToriLeft.rotation.x = -11;
      scene.add(meshToriLeft);

   //TORI RIGHT
   textureToriRight = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshToriRight = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,10),
      new THREE.MeshPhongMaterial({map:textureToriRight, wireframe:USE_WIREFRAME})
      );
      meshToriRight.position.y = 5;
      meshToriRight.position.x = -2.5;
      meshToriRight.position.z = -21.1;
      meshToriRight.receiveShadow = true;
      meshToriRight.castShadow = true;
      meshToriRight.rotation.y = 59.7;
      meshToriRight.rotation.x = 11;
      scene.add(meshToriRight);

   //TORI UPPER
   textureToriUpper = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshToriUpper = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,8),
      new THREE.MeshPhongMaterial({map:textureToriUpper, wireframe:USE_WIREFRAME})
      );
      meshToriUpper.position.y = 8;
      meshToriUpper.position.x = 0;
      meshToriUpper.position.z = -22;
      meshToriUpper.receiveShadow = true;
      meshToriUpper.castShadow = true;
      meshToriUpper.rotation.y = 55;
      scene.add(meshToriUpper);

   //TORI UPPER 2
   textureToriUpper2 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshToriUpper2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,10),
      new THREE.MeshPhongMaterial({map:textureToriUpper2, wireframe:USE_WIREFRAME})
      );
      meshToriUpper2.position.y = 10;
      meshToriUpper2.position.x = 0;
      meshToriUpper2.position.z = -21.5;
      meshToriUpper2.receiveShadow = true;
      meshToriUpper2.castShadow = true;
      meshToriUpper2.rotation.y = 55;
      scene.add(meshToriUpper2);

   //TORI STAND LEFT
   textureStand = new THREE.TextureLoader().load();
   meshStand = new THREE.Mesh(
      new THREE.CylinderGeometry(1,1,2),
      new THREE.MeshPhongMaterial({map:textureStand, wireframe:USE_WIREFRAME})
      );
      meshStand.position.y = 1;
      meshStand.position.x = 2.5;
      meshStand.position.z = -21.1;
      meshStand.receiveShadow = true;
      meshStand.castShadow = true;
      meshStand.rotation.y = 55;
      scene.add(meshStand);

   //TORI STAND RIGHT
      textureStandRight = new THREE.TextureLoader().load();
      meshStandRight = new THREE.Mesh(
         new THREE.CylinderGeometry(1,1,2),
         new THREE.MeshPhongMaterial({map:textureStandRight, wireframe:USE_WIREFRAME})
         );
         meshStandRight.position.y = 1;
         meshStandRight.position.x = -2.5;
         meshStandRight.position.z = -21.1;
         meshStandRight.receiveShadow = true;
         meshStandRight.castShadow = true;
         meshStandRight.rotation.y = 55;
         scene.add(meshStandRight);

   // BARRIER CENTER
   textureBarrier = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrier = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrier, wireframe:USE_WIREFRAME})
      );
      meshBarrier.position.y = 3;
      meshBarrier.position.x = 0;
      meshBarrier.position.z = 21.5;
      meshBarrier.receiveShadow = true;
      meshBarrier.castShadow = true;
      meshBarrier.rotation.y = 55;
      scene.add(meshBarrier);

   //BARRIER NORTH
   textureBarrierNorth = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierNorth = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,40),
      new THREE.MeshPhongMaterial({map:textureBarrierNorth, wireframe:USE_WIREFRAME})
      );
      meshBarrierNorth.position.y = 5;
      meshBarrierNorth.position.x = 0;
      meshBarrierNorth.position.z = 21.5;
      meshBarrierNorth.receiveShadow = true;
      meshBarrierNorth.castShadow = true;
      meshBarrierNorth.rotation.y = 55;
      scene.add(meshBarrierNorth);

   //BARRIER NORTH 2
   textureBarrierNorth2 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierNorth2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,40),
      new THREE.MeshPhongMaterial({map:textureBarrierNorth2, wireframe:USE_WIREFRAME})
      );
      meshBarrierNorth2.position.x = 0;
      meshBarrierNorth2.position.y = 0.8;
      meshBarrierNorth2.position.z = 21.5;
      meshBarrierNorth2.receiveShadow = true;
      meshBarrierNorth2.castShadow = true;
      meshBarrierNorth2.rotation.y = 55;
      scene.add(meshBarrierNorth2);

   //BARRIER LEFT
   textureWallLeft = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshWallLeft = new THREE.Mesh(
      new THREE.BoxGeometry(43,1,1),
      new THREE.MeshPhongMaterial({map:textureWallLeft, wireframe:USE_WIREFRAME})
    );
   meshWallLeft.position.x = 18;
   meshWallLeft.position.y = 0.8;
   meshWallLeft.position.Z = -5;
   meshWallLeft.receiveShadow = true;
   meshWallLeft.castShadow = true;
   meshWallLeft.rotation.y = Math.PI/2;
   scene.add(meshWallLeft);

   //BARRIER LEFT 2
   textureWallLeft2 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshWallLeft2 = new THREE.Mesh(
      new THREE.BoxGeometry(43,1,1),
      new THREE.MeshPhongMaterial({map:textureWallLeft2, wireframe:USE_WIREFRAME})
    );
   meshWallLeft2.position.x = 18;
   meshWallLeft2.position.y = 5;
   meshWallLeft2.position.Z = -5;
   meshWallLeft2.receiveShadow = true;
   meshWallLeft2.castShadow = true;
   meshWallLeft2.rotation.y = Math.PI/2;
   scene.add(meshWallLeft2);

   //BARRIER RIGHT
   textureWallRight= new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshWallRight = new THREE.Mesh(
      new THREE.BoxGeometry(43,1,1),
      new THREE.MeshPhongMaterial({map:textureWallRight, wireframe:USE_WIREFRAME})
      );
   meshWallRight.position.x = -18;
   meshWallRight.position.y = 1;
   meshWallRight.position.Z = -5;
   meshWallRight.receiveShadow = true;
   meshWallRight.castShadow = true;
   meshWallRight.rotation.y = Math.PI/2;
   scene.add(meshWallRight);

   //BARRIER RIGHT 2
   textureWallRight2= new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshWallRight2 = new THREE.Mesh(
      new THREE.BoxGeometry(43,1,1),
      new THREE.MeshPhongMaterial({map:textureWallRight2, wireframe:USE_WIREFRAME})
      );
   meshWallRight2.position.x = -18;
   meshWallRight2.position.y = 5;
   meshWallRight2.position.Z = -5;
   meshWallRight2.receiveShadow = true;
   meshWallRight2.castShadow = true;
   meshWallRight2.rotation.y = Math.PI/2;
   scene.add(meshWallRight2);

   //BARRIER SOUTH TO LEFT
   textureBarrierSouth = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierSouth = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,10),
      new THREE.MeshPhongMaterial({map:textureBarrierSouth, wireframe:USE_WIREFRAME})
      );
      meshBarrierSouth.position.y = 5;
      meshBarrierSouth.position.x = 14;
      meshBarrierSouth.position.z = -21.5;
      meshBarrierSouth.receiveShadow = true;
      meshBarrierSouth.castShadow = true;
      meshBarrierSouth.rotation.y = 55;
      scene.add(meshBarrierSouth);

   //BARRIER SOUTH TO LEFT 2
   textureBarrierSouth2 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierSouth2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,10),
      new THREE.MeshPhongMaterial({map:textureBarrierSouth2, wireframe:USE_WIREFRAME})
      );
      meshBarrierSouth2.position.y = 0.8;
      meshBarrierSouth2.position.x = 14;
      meshBarrierSouth2.position.z = -21.5;
      meshBarrierSouth2.receiveShadow = true;
      meshBarrierSouth2.castShadow = true;
      meshBarrierSouth2.rotation.y = 55;
      scene.add(meshBarrierSouth2);

   //BARRIER SOUTH TO RIGHT
   textureBarrierRight = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierRight = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,10),
      new THREE.MeshPhongMaterial({map:textureBarrierRight, wireframe:USE_WIREFRAME})
      );
      meshBarrierRight.position.y = 5;
      meshBarrierRight.position.x = -14;
      meshBarrierRight.position.z = -21.5;
      meshBarrierRight.receiveShadow = true;
      meshBarrierRight.castShadow = true;
      meshBarrierRight.rotation.y = 55;
      scene.add(meshBarrierRight);

   //BARRIER SOUTH TO RIGHT 2
   textureBarrierRight2 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierRight2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,10),
      new THREE.MeshPhongMaterial({map:textureBarrierRight2, wireframe:USE_WIREFRAME})
      );
      meshBarrierRight2.position.y = 0.8;
      meshBarrierRight2.position.x = -14;
      meshBarrierRight2.position.z = -21.5;
      meshBarrierRight2.receiveShadow = true;
      meshBarrierRight2.castShadow = true;
      meshBarrierRight2.rotation.y = 55;
      scene.add(meshBarrierRight2);

   //BARRIER STICK NORTH TO LEFT
   textureBarrierStickLeft = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierStickLeft = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierStickLeft, wireframe:USE_WIREFRAME})
      );
      meshBarrierStickLeft.position.y = 3;
      meshBarrierStickLeft.position.x = 18;
      meshBarrierStickLeft.position.z = 21;
      meshBarrierStickLeft.receiveShadow = true;
      meshBarrierStickLeft.castShadow = true;
      meshBarrierStickLeft.rotation.y = 55;
      scene.add(meshBarrierStickLeft);

   //BARRIER STICK NORTH TO LEFT 2
   textureBarrierStickLeft2 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierStickLeft2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierStickLeft2, wireframe:USE_WIREFRAME})
      );
      meshBarrierStickLeft2.position.y = 3;
      meshBarrierStickLeft2.position.x = 18;
      meshBarrierStickLeft2.position.z = -21.5;
      meshBarrierStickLeft2.receiveShadow = true;
      meshBarrierStickLeft2.castShadow = true;
      meshBarrierStickLeft2.rotation.y = 55;
      scene.add(meshBarrierStickLeft2);

   //BARRIER STICK NORTH TO LEFT 3
   textureBarrierStickLeft3 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierStickLeft3 = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierStickLeft3, wireframe:USE_WIREFRAME})
      );
      meshBarrierStickLeft3.position.y = 3;
      meshBarrierStickLeft3.position.x = 9.5;
      meshBarrierStickLeft3.position.z = -21.5;
      meshBarrierStickLeft3.receiveShadow = true;
      meshBarrierStickLeft3.castShadow = true;
      meshBarrierStickLeft3.rotation.y = 55;
      scene.add(meshBarrierStickLeft3);

   //BARRIER STICK CENTER TO LEFT
   textureBarrierCenter = new THREE.TextureLoader().load('assets/textures/TorriRed.jpg')
   meshBarrierCenter = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierCenter, wireframe:USE_WIREFRAME})
      );
      meshBarrierCenter.position.y = 3;
      meshBarrierCenter.position.x = 18;
      meshBarrierCenter.position.z = -1;
      meshBarrierCenter.receiveShadow = true;
      meshBarrierCenter.castShadow = true;
      meshBarrierCenter.rotation.y = 55;
      scene.add(meshBarrierCenter);
      
   //BARRIER STICK NORTH TO RIGHT
   textureBarrierStickRight = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierStickRight = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierStickRight, wireframe:USE_WIREFRAME})
      );
      meshBarrierStickRight.position.y = 3;
      meshBarrierStickRight.position.x = -18;
      meshBarrierStickRight.position.z = 22;
      meshBarrierStickRight.receiveShadow = true;
      meshBarrierStickRight.castShadow = true;
      meshBarrierStickRight.rotation.y = 55;
      scene.add(meshBarrierStickRight);

   //BARRIER STICK NORTH TO RIGHT 2
   textureBarrierStickRight2 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierStickRight2 = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierStickRight2, wireframe:USE_WIREFRAME})
      );
      meshBarrierStickRight2.position.y = 3;
      meshBarrierStickRight2.position.x = -18;
      meshBarrierStickRight2.position.z = -21.5;
      meshBarrierStickRight2.receiveShadow = true;
      meshBarrierStickRight2.castShadow = true;
      meshBarrierStickRight2.rotation.y = 55;
      scene.add(meshBarrierStickRight2);

   //BARRIER STICK NORTH TO RIGHT3
   textureBarrierStickRight3 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierStickRight3 = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierStickRight3, wireframe:USE_WIREFRAME})
      );
      meshBarrierStickRight3.position.y = 3;
      meshBarrierStickRight3.position.x = -9.5;
      meshBarrierStickRight3.position.z = -21.5;
      meshBarrierStickRight3.receiveShadow = true;
      meshBarrierStickRight3.castShadow = true;
      meshBarrierStickRight3.rotation.y = 55;
      scene.add(meshBarrierStickRight3);
      
   //BARRIER STICK NORTH TO CENTER
   textureBarrierStickRight3 = new THREE.TextureLoader().load( 'assets/textures/TorriRed.jpg' );
   meshBarrierStickRight3 = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierStickRight3, wireframe:USE_WIREFRAME})
      );
      meshBarrierStickRight3.position.y = 3;
      meshBarrierStickRight3.position.x = -9.5;
      meshBarrierStickRight3.position.z = -21.5;
      meshBarrierStickRight3.receiveShadow = true;
      meshBarrierStickRight3.castShadow = true;
      meshBarrierStickRight3.rotation.y = 55;
      scene.add(meshBarrierStickRight3);

   //BARRIER STICK CENTER TO RIGHT
   textureBarrierCenter1 = new THREE.TextureLoader().load('assets/textures/TorriRed.jpg')
   meshBarrierCenter1 = new THREE.Mesh(
      new THREE.BoxGeometry(1,5,1),
      new THREE.MeshPhongMaterial({map:textureBarrierCenter1, wireframe:USE_WIREFRAME})
      );
      meshBarrierCenter1.position.y = 3;
      meshBarrierCenter1.position.x = -18;
      meshBarrierCenter1.position.z = -1;
      meshBarrierCenter1.receiveShadow = true;
      meshBarrierCenter1.castShadow = true;
      meshBarrierCenter1.rotation.y = 55;
      scene.add(meshBarrierCenter1);

   //LAMP LEFT
   textureLampLeft= new THREE.TextureLoader().load();
   meshLampLeft = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,4),
      new THREE.MeshPhongMaterial({map:textureLampLeft, wireframe:USE_WIREFRAME})
      );
      meshLampLeft.position.y = 2;
      meshLampLeft.position.x = 4;
      meshLampLeft.position.z = -20;
      meshLampLeft.receiveShadow = true;
      meshLampLeft.castShadow = true;
      meshLampLeft.rotation.y = 59.7;
      meshLampLeft.rotation.x = -11;
      scene.add(meshLampLeft);
   
   //LIGHT LEFT
   textureLightLeft= new THREE.TextureLoader().load('assets/textures/GlassLight.jpg');
   meshLightLeft = new THREE.Mesh(
      new THREE.CylinderGeometry(1,1.3,1.2),
      new THREE.MeshPhongMaterial({map:textureLightLeft, wireframe:USE_WIREFRAME})
      );
      meshLightLeft.position.y = 3.3;
      meshLightLeft.position.x = 4;
      meshLightLeft.position.z = -20;
      meshLightLeft.receiveShadow = true;
      meshLightLeft.castShadow = true;
      meshLightLeft.rotation.y = 59.7;
      meshLightLeft.rotation.x = 0;
      scene.add(meshLightLeft);

   //LAMP RIGHT
   textureLampRight = new THREE.TextureLoader().load();
   meshLampRight = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,4),
      new THREE.MeshPhongMaterial({map:textureLampRight, wireframe:USE_WIREFRAME})
      );
      meshLampRight.position.y = 2;
      meshLampRight.position.x = -4;
      meshLampRight.position.z = -20;
      meshLampRight.receiveShadow = true;
      meshLampRight.castShadow = true;
      meshLampRight.rotation.y = 59.7;
      meshLampRight.rotation.x = -11;
      scene.add(meshLampRight);

   //LIGHT RIGHT
   textureLightRight= new THREE.TextureLoader().load('assets/textures/GlassLight.jpg');
   meshLightRight = new THREE.Mesh(
      new THREE.CylinderGeometry(1,1.3,1.2),
      new THREE.MeshPhongMaterial({map:textureLightRight, wireframe:USE_WIREFRAME})
      );
      meshLightRight.position.y = 3.3;
      meshLightRight.position.x = -4;
      meshLightRight.position.z = -20;
      meshLightRight.receiveShadow = true;
      meshLightRight.castShadow = true;
      meshLightRight.rotation.y = 59.7;
      meshLightRight.rotation.x = 0;
      scene.add(meshLightRight);

   // FLAG CENTER
   textureLetter = new THREE.TextureLoader().load('assets/textures/JapaneseWelcome.jpg');
   meshLetter = new THREE.Mesh(
      new THREE.PlaneGeometry(2,3,1),
      new THREE.MeshPhongMaterial({map:textureLetter, wireframe:USE_WIREFRAME})
      );
      meshLetter.position.y = 8.7;
      meshLetter.position.x = 0;
      meshLetter.position.z = -22.8;
      meshLetter.receiveShadow = true;
      meshLetter.castShadow = true;
      meshLetter.rotation.x -= Math.PI / 1;
      meshLetter.rotation.y = 0;
      scene.add(meshLetter);

  // LIGHTS LAMP (ESSENTIAL FOR EACH OBJECT)
  ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
  light = new THREE.PointLight(0xffffff, 2, 15);
  light.position.set(9,5,-10);
  light.position.x = 1;
  light.position.z = -13;
  light.castShadow = true;


  // Will not light anything closer than 0.1 units or further than 25 units
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);
  let spotLight = new THREE.SpotLight( 0xFFFFFF, 0.2);
  spotLight.position.set( 7, 200, 30 );
  spotLight.target.position.set( 10, -350, -55 );
  spotLight.castShadow = true;
  spotLight.position.z = 1005;
  spotLight.position.x = 340;
  scene.add( spotLight.target );
  scene.add( spotLight );

  //Set up shadow properties for the spotLight
  spotLight.shadow.mapSize.width = 112; // default
  spotLight.shadow.mapSize.height = 212; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 1500; // default
 
  camera.position.set(-10, player.height,-55);
  camera.lookAt(new THREE.Vector3(0,player.height,0));
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1280, 720);

  // Enable Shadows in the Renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  document.body.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls (camera);
  animate();
  
}

function animate(){
  requestAnimationFrame(animate);
  controls.update();

  if(keyboard[87]){ // W key
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ // S key
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ // A key
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ // D key
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
  if(keyboard[37]){ // left arrow key
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){ // right arrow key
     camera.rotation.y += player.turnSpeed;
  }
  renderer.render(scene, camera);
   }
   function keyDown(event){
   keyboard[event.keyCode] = true;
   }
   function keyUp(event){
   keyboard[event.keyCode] = false;
   }
   window.addEventListener('keydown', keyDown);
   window.addEventListener('keyup', keyUp);
   window.onload = init;

