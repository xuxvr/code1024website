// Three.js 3D背景场景
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.createParticles();
        this.createProjectPreviews();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // 创建场景
        this.scene = new THREE.Scene();

        // 创建相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // 添加到DOM
        const container = document.getElementById('three-container');
        container.appendChild(this.renderer.domElement);
    }

    createParticles() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color1 = new THREE.Color(0x6366f1); // 主色
        const color2 = new THREE.Color(0x8b5cf6); // 次色
        const color3 = new THREE.Color(0x06b6d4); // 强调色

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // 位置
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;

            // 颜色
            const colorChoice = Math.random();
            let color;
            if (colorChoice < 0.33) {
                color = color1;
            } else if (colorChoice < 0.66) {
                color = color2;
            } else {
                color = color3;
            }

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // 大小
            sizes[i] = Math.random() * 3 + 1;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // 添加时间动画
                    mvPosition.x += sin(time * 0.5 + position.y * 0.1) * 0.5;
                    mvPosition.y += cos(time * 0.3 + position.x * 0.1) * 0.5;
                    
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distance = length(gl_PointCoord - vec2(0.5));
                    if (distance > 0.5) discard;
                    
                    float alpha = 1.0 - distance * 2.0;
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            vertexColors: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createProjectPreviews() {
        // 为项目卡片创建3D预览
        this.createProject1Preview();
        this.createProject2Preview();
        this.createProject3Preview();
        this.createProject4Preview();
        this.createProject5Preview();
    }

    createProject1Preview() {
        // VR项目 - 创建VR头盔模型
        const container = document.getElementById('project-1-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // 创建VR头盔几何体
        const headsetGeometry = new THREE.BoxGeometry(2, 1, 1.5);
        const headsetMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x6366f1,
            shininess: 100
        });
        const headset = new THREE.Mesh(headsetGeometry, headsetMaterial);

        // 添加镜片
        const lensGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
        const lensMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x000000,
            transparent: true,
            opacity: 0.8
        });
        
        const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
        leftLens.position.set(-0.4, 0, 0.8);
        leftLens.rotation.x = Math.PI / 2;
        
        const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
        rightLens.position.set(0.4, 0, 0.8);
        rightLens.rotation.x = Math.PI / 2;

        const vrGroup = new THREE.Group();
        vrGroup.add(headset);
        vrGroup.add(leftLens);
        vrGroup.add(rightLens);
        
        scene.add(vrGroup);

        // 添加光照
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight);
        scene.add(directionalLight);

        camera.position.z = 5;

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            vrGroup.rotation.y += 0.01;
            vrGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
            renderer.render(scene, camera);
        };
        animate();
    }

    createProject2Preview() {
        // Web 3D可视化项目 - 创建数据可视化图表
        const container = document.getElementById('project-2-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // 创建数据柱状图
        const bars = [];
        const barCount = 8;
        
        for (let i = 0; i < barCount; i++) {
            const height = Math.random() * 3 + 0.5;
            const barGeometry = new THREE.BoxGeometry(0.3, height, 0.3);
            const barMaterial = new THREE.MeshPhongMaterial({ 
                color: new THREE.Color().setHSL(i / barCount, 0.8, 0.6)
            });
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            
            bar.position.x = (i - barCount / 2) * 0.5;
            bar.position.y = height / 2 - 1;
            
            bars.push(bar);
            scene.add(bar);
        }

        // 添加光照
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight);
        scene.add(directionalLight);

        camera.position.set(3, 2, 5);
        camera.lookAt(0, 0, 0);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            bars.forEach((bar, index) => {
                bar.rotation.y += 0.01;
                bar.position.y = Math.sin(Date.now() * 0.002 + index) * 0.2 + bar.geometry.parameters.height / 2 - 1;
            });
            renderer.render(scene, camera);
        };
        animate();
    }

    createProject3Preview() {
        // 全栈Web应用项目 - 创建服务器和数据库图标
        const container = document.getElementById('project-3-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // 创建服务器机架
        const serverGeometry = new THREE.BoxGeometry(2, 3, 1);
        const serverMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const server = new THREE.Mesh(serverGeometry, serverMaterial);

        // 添加服务器指示灯
        const lightGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const greenLight = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const redLight = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        
        for (let i = 0; i < 6; i++) {
            const light = new THREE.Mesh(lightGeometry, i % 2 === 0 ? greenLight : redLight);
            light.position.set(-0.8, 1 - i * 0.3, 0.51);
            server.add(light);
        }

        // 创建数据库圆柱
        const dbGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
        const dbMaterial = new THREE.MeshPhongMaterial({ color: 0x8b5cf6 });
        
        const databases = [];
        for (let i = 0; i < 3; i++) {
            const db = new THREE.Mesh(dbGeometry, dbMaterial);
            db.position.set(2.5, -1 + i * 0.4, 0);
            databases.push(db);
            scene.add(db);
        }

        scene.add(server);

        // 添加光照
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight);
        scene.add(directionalLight);

        camera.position.set(4, 2, 5);
        camera.lookAt(0, 0, 0);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            server.rotation.y += 0.005;
            databases.forEach((db, index) => {
                db.rotation.y += 0.01;
                db.position.y = -1 + index * 0.4 + Math.sin(Date.now() * 0.003 + index) * 0.1;
            });
            renderer.render(scene, camera);
        };
        animate();
    }

    createProject4Preview() {
        // AI智能助手项目 - 创建AI大脑和神经网络
        const container = document.getElementById('project-4-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // 创建AI大脑核心
        const brainGeometry = new THREE.SphereGeometry(1, 32, 32);
        const brainMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x6366f1,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        const brain = new THREE.Mesh(brainGeometry, brainMaterial);
        scene.add(brain);

        // 创建神经网络节点
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
        
        for (let i = 0; i < 20; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
            const radius = 2 + Math.random() * 1;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            node.position.x = radius * Math.sin(phi) * Math.cos(theta);
            node.position.y = radius * Math.sin(phi) * Math.sin(theta);
            node.position.z = radius * Math.cos(phi);
            
            nodes.push(node);
            scene.add(node);
        }

        // 创建连接线
        const connections = [];
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.6
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() < 0.3) { // 30%的概率创建连接
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                        nodes[i].position,
                        nodes[j].position
                    ]);
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    connections.push(line);
                    scene.add(line);
                }
            }
        }

        // 创建数据流粒子
        const particleCount = 50;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            particlePositions[i3] = (Math.random() - 0.5) * 6;
            particlePositions[i3 + 1] = (Math.random() - 0.5) * 6;
            particlePositions[i3 + 2] = (Math.random() - 0.5) * 6;

            const color = new THREE.Color(0x00ff88);
            particleColors[i3] = color.r;
            particleColors[i3 + 1] = color.g;
            particleColors[i3 + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // 添加光照
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight);
        scene.add(directionalLight);

        camera.position.set(4, 2, 5);
        camera.lookAt(0, 0, 0);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // 大脑旋转和脉动
            brain.rotation.y += 0.01;
            brain.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
            
            // 节点动画
            nodes.forEach((node, index) => {
                node.rotation.y += 0.02;
                const scale = 1 + Math.sin(time * 3 + index) * 0.3;
                node.scale.setScalar(scale);
            });
            
            // 粒子流动
            particles.rotation.y += 0.005;
            particles.rotation.x += 0.003;
            
            // 连接线闪烁
            connections.forEach((connection, index) => {
                const opacity = 0.3 + Math.sin(time * 4 + index) * 0.3;
                connection.material.opacity = Math.max(0.1, opacity);
            });
            
            renderer.render(scene, camera);
        };
        animate();
    }

    createProject5Preview() {
        // 跨平台移动应用项目 - 创建手机和小程序界面
        const container = document.getElementById('project-5-3d');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // 创建手机外壳
        const phoneGeometry = new THREE.BoxGeometry(1.2, 2.4, 0.2);
        const phoneMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,
            shininess: 100
        });
        const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
        phone.position.x = -1.5;

        // 创建手机屏幕
        const screenGeometry = new THREE.PlaneGeometry(1, 2);
        const screenMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x3498db,
            transparent: true,
            opacity: 0.8
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(-1.5, 0, 0.11);

        // 创建Flutter logo (简化的蝴蝶形状)
        const flutterGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const flutterMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x02569B
        });
        const flutterLogo = new THREE.Mesh(flutterGeometry, flutterMaterial);
        flutterLogo.position.set(-1.5, 0.5, 0.15);

        // 创建微信小程序图标 (绿色方块)
        const wechatGeometry = new THREE.BoxGeometry(0.4, 0.4, 0.1);
        const wechatMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x07C160
        });
        const wechatIcon = new THREE.Mesh(wechatGeometry, wechatMaterial);
        wechatIcon.position.set(-1.5, -0.5, 0.15);

        // 创建第二个手机 (展示跨平台)
        const phone2 = phone.clone();
        phone2.position.x = 1.5;
        const screen2 = screen.clone();
        screen2.position.set(1.5, 0, 0.11);
        screen2.material = new THREE.MeshBasicMaterial({ 
            color: 0xe74c3c,
            transparent: true,
            opacity: 0.8
        });

        // 创建云开发图标
        const cloudGeometry = new THREE.SphereGeometry(0.2, 8, 6);
        const cloudMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xecf0f1,
            transparent: true,
            opacity: 0.9
        });
        
        const clouds = [];
        for (let i = 0; i < 5; i++) {
            const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
            const angle = (i / 5) * Math.PI * 2;
            cloud.position.set(
                Math.cos(angle) * 2,
                Math.sin(angle) * 1.5,
                1
            );
            clouds.push(cloud);
            scene.add(cloud);
        }

        // 创建连接线 (表示跨平台同步)
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-1.5, 0, 0),
            new THREE.Vector3(1.5, 0, 0)
        ]);
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xf39c12,
            transparent: true,
            opacity: 0.7
        });
        const connectionLine = new THREE.Line(lineGeometry, lineMaterial);

        // 创建数据传输粒子
        const particleCount = 20;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const t = i / particleCount;
            particlePositions[i3] = -1.5 + t * 3; // x: 从左手机到右手机
            particlePositions[i3 + 1] = Math.sin(t * Math.PI * 4) * 0.3; // y: 波浪形
            particlePositions[i3 + 2] = 0;

            const color = new THREE.Color(0xf39c12);
            particleColors[i3] = color.r;
            particleColors[i3 + 1] = color.g;
            particleColors[i3 + 2] = color.b;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);

        // 添加所有对象到场景
        scene.add(phone);
        scene.add(screen);
        scene.add(flutterLogo);
        scene.add(wechatIcon);
        scene.add(phone2);
        scene.add(screen2);
        scene.add(connectionLine);
        scene.add(particles);

        // 添加光照
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(ambientLight);
        scene.add(directionalLight);

        camera.position.set(0, 1, 5);
        camera.lookAt(0, 0, 0);

        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            
            const time = Date.now() * 0.001;
            
            // 手机轻微摆动
            phone.rotation.y = Math.sin(time * 0.5) * 0.1;
            phone2.rotation.y = Math.sin(time * 0.5 + Math.PI) * 0.1;
            
            // Flutter logo 旋转
            flutterLogo.rotation.y += 0.02;
            flutterLogo.rotation.z = Math.sin(time * 2) * 0.2;
            
            // 微信图标缩放
            const scale = 1 + Math.sin(time * 3) * 0.1;
            wechatIcon.scale.setScalar(scale);
            
            // 云朵浮动
            clouds.forEach((cloud, index) => {
                cloud.position.y += Math.sin(time * 2 + index) * 0.01;
                cloud.rotation.y += 0.01;
            });
            
            // 粒子流动动画
            const positions = particles.geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const t = (time * 0.5 + i / particleCount) % 1;
                positions[i3] = -1.5 + t * 3;
                positions[i3 + 1] = Math.sin(t * Math.PI * 4) * 0.3;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            
            // 连接线闪烁
            connectionLine.material.opacity = 0.4 + Math.sin(time * 4) * 0.3;
            
            renderer.render(scene, camera);
        };
        animate();
    }

    addEventListeners() {
        // 鼠标移动事件
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX - this.windowHalf.x) / this.windowHalf.x;
            this.mouse.y = (event.clientY - this.windowHalf.y) / this.windowHalf.y;
        });

        // 窗口大小调整事件
        window.addEventListener('resize', () => {
            this.windowHalf.x = window.innerWidth / 2;
            this.windowHalf.y = window.innerHeight / 2;
            
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // 更新粒子动画
        if (this.particles) {
            this.particles.material.uniforms.time.value = time;
            this.particles.rotation.y = time * 0.1;
            
            // 鼠标交互
            this.particles.rotation.x += (this.mouse.y * 0.1 - this.particles.rotation.x) * 0.05;
            this.particles.rotation.y += (this.mouse.x * 0.1 - this.particles.rotation.y) * 0.05;
        }

        // 相机轻微移动
        this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.02;
        this.camera.position.y += (-this.mouse.y * 0.5 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}

// 页面加载完成后初始化3D场景
document.addEventListener('DOMContentLoaded', () => {
    new ThreeScene();
}); 