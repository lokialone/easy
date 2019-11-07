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
void grient(vec2 st) {
	gl_FragColor = vec4(1.0,st.y,0.5,1.0);
}
float plot(vec2 st, float pct){
    return  smoothstep( pct - 0.01, pct, st.y) -
          smoothstep( pct, pct + 0.01, st.y);
}

vec2 getSt() {
    return  gl_FragCoord.xy / u_resolution;
}


void main() {
	vec2 st = getSt();

    // float x = st.x;
    float y = sin(st.x - u_time);
    vec3 color = vec3(y);
    // Plot a line
    float pct = plot(st, y);
    // color = (1.0 - pct)* color + pct *vec3(0.1686, 0.1176, 0.8784);
    color = pct *vec3(0.8784, 0.102, 0.5176);

	gl_FragColor = vec4(color, 1.0);
}