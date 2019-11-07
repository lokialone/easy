#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse; 

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);
float PI = 3.1415926535897932384626433832795;

vec2 getSt() {
    return  gl_FragCoord.xy / u_resolution;
}

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

vec3 exmaple() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.7059, 0.349, 0.349);

    vec3 pct = vec3(st.x);

    pct.r = smoothstep(0.0,1.0, st.x);
    pct.g = sin(st.x * PI);
    pct.b = pow(st.x,0.5);

    color = mix(colorA, colorB, 0.6);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));
    return color;
}

vec3 rainbow() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(1.0,0.0,0.0);
    vec3 orange = vec3(0.9451, 0.5882, 0.051);
    vec3 yellow = vec3(0.9451, 0.9333, 0.0392);
    vec3 green = vec3(0.0431, 0.9686, 0.0431);
    vec3 blue = vec3(0.0549, 0.1176, 0.9608);
    vec3 indigo = vec3(0.051, 0.749, 0.9608);
    vec3 purple = vec3(0.7176, 0.0235, 0.8941);
    
    color = mix(color, orange, step(0.15, st.x));
    color = mix(color, yellow, step(0.3, st.x));
    color = mix(color, green, step(0.45, st.x));
    color = mix(color, blue, step(0.6, st.x));
    color = mix(color, indigo, step(0.75, st.x));
    color = mix(color, purple, step(0.9, st.x));
    return color;
}

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // We map x (0.0 - 1.0) to the hue (0.0 - 1.0)
    // And the y (0.0 - 1.0) to the brightness
    color = hsb2rgb(vec3(st.x,1.0,st.y));

    gl_FragColor = vec4(color,1.0);

}