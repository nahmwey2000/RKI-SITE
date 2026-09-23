/* ============================================================
   The hero picture, under a radial zoom blur that follows the
   pointer. One quad, one texture, fourteen samples along the
   line between the pixel and wherever you are looking.

   It is the ZOOM! / RKI ARCHIVES treatment from the reels,
   made live rather than baked into the photograph.
   ============================================================ */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_tex;
uniform vec2 u_canvas;    // canvas size in px
uniform vec2 u_image;     // image size in px
uniform vec2 u_focus;     // 0..1, where the blur converges
uniform float u_strength; // 0..1
uniform float u_time;

// cover-fit the texture inside the canvas
vec2 cover(vec2 uv) {
  float ca = u_canvas.x / u_canvas.y;
  float ia = u_image.x / u_image.y;
  // crop the long side, the way object-fit: cover does
  vec2 s = ca > ia ? vec2(1.0, ia / ca) : vec2(ca / ia, 1.0);
  return (uv - 0.5) * s + 0.5;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = cover(v_uv);
  vec2 d = u_focus - uv;

  float jitter = hash(v_uv + fract(u_time)) * 0.6;
  vec3 sum = vec3(0.0);
  float total = 0.0;

  for (int i = 0; i < 14; i++) {
    float t = (float(i) + jitter) / 14.0;
    float scale = t * u_strength * 0.26;
    vec2 p = uv + d * scale;
    // weight the near samples heavier so the image stays readable
    float w = 1.0 - t * 0.55;
    vec3 c = texture2D(u_tex, clamp(p, 0.001, 0.999)).rgb;
    // a hair of chromatic separation on the outer samples
    float ca = scale * 0.5;
    c.r = texture2D(u_tex, clamp(uv + d * (scale + ca), 0.001, 0.999)).r;
    sum += c * w;
    total += w;
  }

  vec3 col = sum / total;

  // black and white, then lift the blacks a touch so it is not a void
  float g = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(col, vec3(g), 0.86);
  col = pow(col, vec3(1.1)) * 0.94;

  // vignette
  float r = distance(v_uv, vec2(0.5));
  col *= 1.0 - smoothstep(0.42, 1.0, r) * 0.55;

  gl_FragColor = vec4(col, 1.0);
}`;

export type ZoomBlur = { destroy: () => void };

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

/**
 * Mounts the effect on a canvas. Returns null when WebGL or the image is not
 * available, which is the caller's cue to leave the plain <img> on screen.
 */
export function mountZoomBlur(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  opts: { reducedMotion: boolean },
): ZoomBlur | null {
  const gl = (canvas.getContext('webgl', { antialias: false, alpha: false }) ??
    canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;

  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  const u = {
    canvas: gl.getUniformLocation(prog, 'u_canvas'),
    image: gl.getUniformLocation(prog, 'u_image'),
    focus: gl.getUniformLocation(prog, 'u_focus'),
    strength: gl.getUniformLocation(prog, 'u_strength'),
    time: gl.getUniformLocation(prog, 'u_time'),
  };
  gl.uniform2f(u.image, image.naturalWidth, image.naturalHeight);

  // pointer state
  let targetX = 0.5;
  let targetY = 0.45;
  let x = 0.5;
  let y = 0.45;
  let speed = 0;
  let strength = 0.12;
  let lastX = 0.5;
  let lastY = 0.45;
  let running = true;

  const onPointer = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    targetX = (e.clientX - r.left) / r.width;
    targetY = (e.clientY - r.top) / r.height;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (w === canvas.width && h === canvas.height) return;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.canvas, w, h);
  };
  resize();
  window.addEventListener('resize', resize);

  const draw = (t: number) => {
    if (!running) return;
    resize();

    // ease toward the pointer, and read how fast it is travelling
    x += (targetX - x) * 0.08;
    y += (targetY - y) * 0.08;
    const dx = x - lastX;
    const dy = y - lastY;
    lastX = x;
    lastY = y;
    speed = Math.min(1, Math.hypot(dx, dy) * 26);

    // resting breath, so the picture is never completely still on touch
    const breath = opts.reducedMotion ? 0 : 0.035 * Math.sin(t / 2400);
    const want = opts.reducedMotion ? 0.08 : 0.09 + speed * 0.85 + breath;
    strength += (want - strength) * 0.07;

    gl.uniform2f(u.focus, x, 1 - y);
    gl.uniform1f(u.strength, Math.max(0, Math.min(1.0, strength)));
    gl.uniform1f(u.time, t / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    frame = requestAnimationFrame(draw);
  };
  let frame = requestAnimationFrame(draw);

  return {
    destroy() {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    },
  };
}
