import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";

const MoebiusCarousel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 🎬 Escena y cámara
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    // 🎨 Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 🎮 Controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 🔷 Geometría de cinta de Möbius
    const mobiusFunction = (u, t, target) => {
      u *= Math.PI * 2;
      t = t * 2 - 1;
      const major = 1.5;
      const a = major + (t / 2) * Math.cos(u / 2);
      const x = a * Math.cos(u);
      const y = a * Math.sin(u);
      const z = (t / 2) * Math.sin(u / 2);
      target.set(x, y, z);
    };

    const mobiusGeometry = new ParametricGeometry(mobiusFunction, 200, 30);

    const mobiusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
    });

    const mobiusMesh = new THREE.Mesh(mobiusGeometry, mobiusMaterial);
    scene.add(mobiusMesh);

    // 🖼️ Carga de imágenes
    const textureLoader = new THREE.TextureLoader();
    const imageUrls = [
      "/images/ilustracion.png",
      "/images/kazuo_kiriyama.png",
      "/images/one-piece-bg-3.jpg",
      "/images/prueba_clip.jpg",
      "/images/avatar3.png",
    ];
    
    const imageMeshes = [];

    imageUrls.forEach((url, i) => {
      textureLoader.load(
        url,
        (texture) => {
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
          });
          const geometry = new THREE.PlaneGeometry(0.8, 0.6);
          const mesh = new THREE.Mesh(geometry, material);

          // 🌀 Posiciona la imagen a lo largo de la cinta de Möbius
          const u = (i / imageUrls.length) * Math.PI * 2;
          const t = 0; // valor medio de la cinta
          const pos = new THREE.Vector3();
          mobiusFunction(u / (Math.PI * 2), 0.05, pos); // Calcula posición

          mesh.position.copy(pos);

          // 🔄 Calcula la orientación tangencial a la superficie
          const tangent = new THREE.Vector3();
          const normal = new THREE.Vector3();
          const binormal = new THREE.Vector3();

          const du = 0.0001;
          const dt = 0.0001;
          const posU = new THREE.Vector3();
          const posT = new THREE.Vector3();

          mobiusFunction((u + du) / (Math.PI * 2), 0.05, posU);
          mobiusFunction(u / (Math.PI * 2), 0.05 + dt, posT);

          tangent.subVectors(posU, pos).normalize();
          normal.subVectors(posT, pos).normalize();
          binormal.crossVectors(tangent, normal).normalize();

          const matrix = new THREE.Matrix4();
          matrix.makeBasis(tangent, binormal, normal);
          mesh.quaternion.setFromRotationMatrix(matrix);

          scene.add(mesh);
          imageMeshes.push(mesh);
        },
        undefined,
        (error) => {
          console.error("Error cargando textura:", error);
        }
      );
    });

    // ⚙️ Animación
    const animate = () => {
      requestAnimationFrame(animate);
      mobiusMesh.rotation.y += 0.004;
      imageMeshes.forEach((mesh) => {
        mesh.rotation.y += 0.004; // mantiene sincronía con la cinta
      });
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 🧹 Cleanup y resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default MoebiusCarousel;
