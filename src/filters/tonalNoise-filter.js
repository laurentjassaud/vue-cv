export function TonalNoiseFilter () {
    const vertexShader = null
    const fragmentShader = `
        precision highp float;
        
        varying vec2 vTextureCoord;
        varying vec4 vColor; 

        uniform float uNoise;
        uniform float uTonal;
        uniform float uSeed;
        uniform sampler2D uSampler;                

        float rand(vec2 co)
        {
            return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main()
        {
            vec4 color = texture2D(uSampler, vTextureCoord);
            float randomValue = rand(gl_FragCoord.xy * uSeed);
            float diff = (randomValue - uTonal) * uNoise;


            // Un-premultiply alpha before applying the color matrix. See issue #3539.
            if (color.a > 0.0) {
                color.rgb /= color.a;
            }
              
            color.r += diff;
            color.g += diff;
            color.b += diff;

            // Premultiply alpha again.
            color.rgb *= color.a;
                        
            gl_FragColor = color;
        }
    `
    PIXI.Filter.call(
        this,
        vertexShader,
        fragmentShader
    )

    this.uniforms.uNoise = 0.5
    this.uniforms.uSeed = 0.5
    this.uniforms.uTonal = 0.5

}

TonalNoiseFilter.prototype = Object.create(PIXI.Filter.prototype)
TonalNoiseFilter.prototype.constructor = TonalNoiseFilter