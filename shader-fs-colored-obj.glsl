precision mediump float;

    varying vec3 vVertexColor;
    varying vec3 vLightWeighting;

    uniform sampler2D uSampler;

    void main(void) {
        gl_FragColor = vec4(vVertexColor.rgb * vLightWeighting, 1.0);
    }