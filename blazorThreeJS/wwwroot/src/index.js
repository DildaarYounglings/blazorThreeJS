import * as THREE from 'three';

window.ThreeJS_display = () => {
        // scene
        const scene = new THREE.Scene();
        // Create the sphere
        const geometry = new THREE.SphereGeometry(3, 64, 64);
        const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        // light
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 10, 10);
        scene.add(light);
        // Camera
        const field_of_view = 45;
        const aspect_ratio = 800 / 600;
        const camera = new THREE.PerspectiveCamera(field_of_view, aspect_ratio);
        camera.position.z = 20;
        scene.add(camera)

        // Renderer
        const canvas = document.getElementById("canvasElement");
        const render = new THREE.WebGL1Renderer({ canvas });
        render.setSize(800, 600);
        render.render(scene, camera);
    }
}

