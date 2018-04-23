export function DistortFilter () {

    PIXI.Filter.call(
        this,
        null,
        `
            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform vec4 filterArea; 
            uniform vec2 res;

            uniform float time;
            uniform float amplitude;

            vec2 mapCoord(vec2 uv)
            {
                uv *= filterArea.xy;
                return uv;
            }

            vec2 unmapCoord(vec2 uv) {
                uv /= filterArea.xy;
                return uv;
            }

            vec2 warp(vec2 uv)
            {
                uv.y += sin (uv.x * 10.0 + time *2.0 ) / amplitude;
                return uv;
            }

            void main()
            {
                vec2 uv = vTextureCoord;
                uv = mapCoord(uv) / res;
                uv = warp( uv );
                uv = unmapCoord(uv * res);
                gl_FragColor = texture2D(uSampler, uv);
            }
        `,
        // custom uniforms
        {
            res: { type: 'v2', value: { x: 0, y: 0 } },
            time: { type: '1f', value: 0 },
            amplitude: { type: '1f', value: 10.0 },
            noiseTexture: { type: 'sampler2D', value: null }
        }
    )

    this.uniforms.time = 0
    this.uniforms.amplitude = 10
    this.uniforms.noiseTexture  = null

}

DistortFilter.prototype = Object.create(PIXI.Filter.prototype)
DistortFilter.prototype.constructor = DistortFilter

