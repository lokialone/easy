#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // 画布尺寸（宽，高）
uniform vec2 u_mouse;      // 鼠标位置（在屏幕上哪个像素）
uniform float u_time;     // 时间（加载后的秒数）

void pink() {
    gl_FragColor = vec4(1.0,0.0,1.0,1.0);
}
void sinRed() {
    gl_FragColor = vec4(abs(sin(u_time)),0.0,0.0,1.0);
}
void grient() {
    vec2 st = gl_FragCoord.xy/u_resolution;
	gl_FragColor = vec4(1.0,st.y,0.5,1.0);
}
float plot(vec2 st, float pct) {
    return smoothstep( pet-0.02, pct, st.y)
}
void main() {
	grient();
}
