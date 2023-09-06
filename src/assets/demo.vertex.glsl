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