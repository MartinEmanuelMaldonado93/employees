export class GLSL {
  static fragmentShaderMimeType = 'x-shader/x-fragment';
  static vertexShaderMimeType = 'x-shader/x-vertex';
}

export const FRAGMENT = /*glsl*/ `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;

export const VERTEX = /*glsl*/ `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;
  // globals
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  // varyings
  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
`;
