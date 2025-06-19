<h1>🧠 Code Visualizer</h1>

<p>An interactive code visualizer built with <strong>React</strong> and <strong>Vite</strong>, inspired by 
<a href="https://pythontutor.com/" target="_blank">PythonTutor.com</a>. This tool helps you understand how your code runs by showing stack frames, heap memory, and variable references in real time.</p>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li>🧮 Paste Java/Python/C++ code and visualize execution step-by-step</li>
  <li>🧠 Stack & Heap memory visualization</li>
  <li>🎯 Variable tracking and reference arrows</li>
  <li>⏩ Step forward/backward through execution</li>
  <li>💡 Test input support</li>
  <li>🌙 Dark/light mode toggle</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React, Tailwind CSS, Konva.js</li>
  <li><strong>Backend</strong> (optional): Node.js / Flask (for code execution engine)</li>
  <li><strong>Build Tool:</strong> Vite</li>
</ul>

<hr>

<h2>📦 Installation</h2>
<pre><code>
git clone https://github.com/your-username/code-visualizer.git
cd code-visualizer
npm install
npm run dev
</code></pre>

<hr>

<h2>📁 Project Structure</h2>
<pre><code>
code-visualizer/
├── public/             # Static assets
├── src/
│   ├── components/     # React UI components
│   ├── visualizer/     # Stack/Heap render logic
│   ├── editor/         # Code editor & language input
│   └── App.jsx         # Main entry point
├── package.json
└── vite.config.js
</code></pre>

<hr>

<h2>⚙️ Usage</h2>
<ol>
  <li>Select language (Java/Python/C++)</li>
  <li>Paste your code in the editor</li>
  <li>Click <strong>"Visualize"</strong></li>
  <li>Use ⏮️ ⏭️ buttons to step through execution</li>
  <li>See stack/heap change in real time</li>
</ol>

<hr>

<h2>📈 Future Plans</h2>
<ul>
  <li>✅ Code execution sandbox (Docker-based)</li>
  <li>✅ Save & share visualization sessions</li>
  <li>✅ Support for function call tree</li>
  <li>✅ Drag & zoom canvas</li>
</ul>

<hr>

<h2>🤝 Contributing</h2>
<p>Pull requests are welcome! For major changes, open an issue first.</p>

<hr>

<h2>📝 License</h2>
<p>This project is under the GPL-3.0 license
.</p>
