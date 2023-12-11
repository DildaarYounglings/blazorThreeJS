
        // main.js
function threeExample(canvasId) { // NOTE: three dancing balls example
    let canvas = document.getElementById(canvasId);

    // NOTE: create the scene to place objects in
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x6699cc); // NOTE: make the background blue for the sky
    scene.matrixWorldAutoUpdate = true;

    // NOTE: the width and height of the parent element; this information is static and should be updated when the browser window is resized
    let size = {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        width: canvas.parentNode.offsetWidth,
        height: canvas.parentNode.offsetHeight
        
    };

    // NOTE: issue these statements when resizing the window
    /*camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(size.width, size.height);*/



    // NOTE: create the camera with 53 degree field of view; this is how the scene is viewed by the user
    let camera = new THREE.PerspectiveCamera(
        /*field of view*/ 45,
        /*aspect ration*/ size.windowWidth / size.height,
        /*range before camera lose sight of objects on scene*/1,
        /*end range before camera lose sight of objects on scene*/5000
    );

    // NOTE: position the camera in space a bit
    camera.position.z = 20;/*higher the value the more futher away from the center of the scene. the lower the value the closer to center of the screen*/


    var renderer = new THREE.WebGLRenderer({
        canvas: canvas
    });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(size.windowWidth, size.windowHeight);
    renderer.render(scene, camera);



    // NOTE: create three spheres
    let geometry = new THREE.SphereGeometry(3, 64, 64);
    let material = new THREE.MeshStandardMaterial({
        color: "#00ff83",
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // NOTE: create the ground
    /*var plane = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshLambertMaterial({ color: 0x00aa00 }));
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = -50;
    plane.rotation.x = 4.75;
    plane.receiveShadow = true;
    scene.add(plane);*/



    // NOTE: this light will follow the mouse cursor
    let light = new THREE.PointLight(0xffffff);
    light.position.x = 51.5;
    light.position.y = 862.5;
    light.position.z = 10;
    light.castShadow = true;
    light.shadow.camera.top = 2500;
    light.shadow.camera.bottom = - 2500;
    light.shadow.camera.left = - 2500;
    light.shadow.camera.right = 2500;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 1000;
    light.shadow.mapSize.set(2048, 2048);

    scene.add(light);

    // NOTE: this function will set the light based on the mouse cursor
    /*var moveLight = function (event) {
        var offX = 0;
        var offY = 0;
        if (typeof window.pageXOffset != "undefined") {
            offX = window.pageXOffset;
            offY = window.pageYOffset;
        }
        else {
            if (document.documentElement.scrollTop == 0) {
                offX = document.body.scrollLeft;
                offY = document.body.scrollTop;
            }
            else {
                offX = document.documentElement.scrollLeft;
                offY = document.documentElement.scrollTop;
            }
        }
        var x, y;
        if (typeof event.pageX != "undefined") {
            x = event.pageX;
            y = event.pageY;
        }
        else {
            x = event.clientX;
            y = event.clientY;
        }
        x -= offX;
        y -= offY;
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }

        light.position.x = x - size.width / 2;
        light.position.y = size.height / 2 - y;
    };*/

    var handler = function (element, type, func) {
        if (element.addEventListener) {
            element.addEventListener(type, func, false);
        } else if (window.attachEvent) {
            element.attachEvent("on" + type, func);
        } else {
            element["on" + type] = func;
        }
    };

    //handler(canvas, "mousemove", moveLight);




    // NOTE: MUST HAVE AN ANIMATE FUNCTION
    var animate = function () {
        var time = Date.now();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        size.windowWidth = window.innerWidth;
        size.windowHeight = window.innerHeight;

        camera.aspect = size.windowWidth / size.windowHeight;
        renderer.setSize(size.windowWidth, size.windowHeight);
    })
}