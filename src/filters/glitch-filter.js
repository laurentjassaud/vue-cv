export function Glitch() {
    const vertexShader = null
    const fragmentShader = `
        precision mediump float;

        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform vec4 filterArea; 
        uniform vec2 dimensions;
        
        uniform float rand;
        uniform float val1;
        uniform float val2;

        vec2 mapCoord( vec2 coord )
        {
            coord *= filterArea.xy;
            return coord;
        }

        vec2 unmapCoord( vec2 coord )
        {
            coord /= filterArea.xy;
            return coord;
        }

        vec2 warp(vec2 pos)
        {
            vec2 posOffset = pos + vec2(floor(sin(pos.y / val1 * rand + rand * rand)) * val2 * rand, 0);
            return posOffset;
        }

        void main (void)
        {
            vec2 coord = vTextureCoord;
            coord = mapCoord(coord) / dimensions;
            coord = warp( coord );
            coord = unmapCoord(coord * dimensions);
            gl_FragColor = texture2D( uSampler, coord );
        }

    `
    PIXI.Filter.call(
        this,
        vertexShader,
        fragmentShader
    )

    this.uniforms.rand = 5
    this.uniforms.val1 = 150
    this.uniforms.val2 = 20
}

Glitch.prototype = Object.create(PIXI.Filter.prototype)
Glitch.prototype.constructor = Glitch

