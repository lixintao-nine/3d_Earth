let renderer, scene, camera, cube, cloudMesh;
const cameraX = 0
const cameraY = 0
const cameraZ = 3.5
action();
function action() {
    onload();
    run();
}
function onload() {
    let container = document.getElementById("container");//获取container

    scene = new THREE.Scene();//创建场景

    camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 1, 4000);
    camera.position.set(cameraX, cameraY, cameraZ);//创建相机并设置位置

    //let axe=new THREE.AxesHelper(20);
    //scene.add(axe);//辅助工具，用于创建相机时，相机找到合适的位置

    let group = new THREE.Group();//创建群组，用来存放地球和大气层


    let pointLight = new THREE.PointLight();//创建点光源
    pointLight.position.set(cameraX - 10, cameraY + 4, cameraZ + 15);//设置光源的位置
    pointLight.intensity = 0.5;//设置光强
    // let pointLight2 = new THREE.PointLight();//创建点光源
    // pointLight2.position.set(cameraX + 10, cameraY - 4, cameraZ - 15);//设置光源的位置
    // pointLight2.intensity = 0.5;//设置光强
    scene.add(pointLight);
    // scene.add(pointLight2);
    //---环境光，全局---
    var ambient = new THREE.AmbientLight(0xffffff);//环境光
    ambient.intensity = 0.8
    scene.add(ambient);


    let geometry = new THREE.SphereGeometry(1, 32, 32);//创建一个球
    let textureLoader = new THREE.TextureLoader();
    let surfaceMap = textureLoader.load("./img/Earth.png");//创建颜色贴图
    let normalMap = textureLoader.load("./img/EarthNormal.png");//创建法线贴图
    let specularMap = textureLoader.load("./img/EarthSpec.png");//创建高光贴图
    let material = new THREE.MeshPhongMaterial({ map: surfaceMap, normalMap: normalMap, specularMap: specularMap });
    cube = new THREE.Mesh(geometry, material);//将几何体和材料放到网格中
    cube.rotation.x = Math.PI / 5;
    group.add(cube);

    let cloudGeometry = new THREE.SphereGeometry(1.005, 32, 32);//创建大气层所在的球面
    let cloudMap = textureLoader.load("./img/大气2.png");
    let cloudMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, map: cloudMap, transparent: true });
    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    group.add(cloudMesh);
    scene.add(group);//把群组添加到场景中

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearAlpha(0.6);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    let contorl = new THREE.OrbitControls(camera, renderer.domElement);//添加鼠标滚动缩放，旋转对象


}

function run() {

    requestAnimationFrame(run);
    // 云层速度
    cloudMesh.rotation.y += 0.002;
    // 自转速度
    cube.rotation.y += 0.001;
    renderer.render(scene, camera);

}
