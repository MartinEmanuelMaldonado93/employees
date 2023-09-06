import { Injectable } from '@angular/core';
import * as matrix from 'gl-matrix';
import { fromEvent, tap, throttleTime } from 'rxjs';
import { FRAGMENT, GLSL, VERTEX } from './Constants';

@Injectable({
  providedIn: 'root',
})
export class WebglService {
  private _renderingContext: RenderingContext | null | undefined;
  private fieldOfView = (45 * Math.PI) / 180; // in radians
  private aspect = 1;
  private zNear = 0.1;
  private zFar = 100.0;
  private projectionMatrix = matrix.mat4.create();
  private modelViewMatrix = matrix.mat4.create();
  private buffers: any;
  private programInfo: any;
  private resizeTimeout?: NodeJS.Timeout;

  initialiseWebGLContext(canvas: HTMLCanvasElement) {
    this.gl = canvas.getContext('webgl');

    if (!this.gl) {
      throw new Error(
        'Unable to initialize WebGL. Your browser may not support it.'
      );
    }

    this.setWebGLCanvasDimensions(canvas);
    this.initialiseWebGLCanvas();

    // initialise shaders into WebGL / compile shaders into a program
    let shaderProgram = this.initializeShaders();

    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(
          shaderProgram,
          'aVertexPosition'
        ),
        vertexColor: this.gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      },
      uniformLocations: {
        projectionMatrix: this.gl.getUniformLocation(
          shaderProgram,
          'uProjectionMatrix'
        ),
        modelViewMatrix: this.gl.getUniformLocation(
          shaderProgram,
          'uModelViewMatrix'
        ),
      },
    };
    this.buffers = this.initialiseBuffers(); //add content to a buffers

    this.prepareScene(); //runs one frame

    // document.addEventListener('resize',() => {
    //   this.onResizeWebGlCanvas();
    // });
    this.onResizeWebGlCanvasObservable();
    return this.gl;
  }
  onResizeWebGLCanvasTimeout() {
    clearTimeout(this.resizeTimeout);

    // Schedule the function to be executed after a delay (e.g., 300 milliseconds)
    this.resizeTimeout = setTimeout(() => {
      console.log('computing...');
      const { clientWidth, clientHeight } = this.clientCanvas;

      this.gl.canvas.width = clientWidth;
      this.gl.canvas.height = clientHeight;
    }, 300); // Adjust the delay as needed
  }
  onResizeWebGlCanvasObservable() {
    const { clientCanvas } = this;

    // Create an observable from the resize event of the clientCanvas
    const resizeObservable = fromEvent<'resize'>(clientCanvas, 'resize');

    // Throttle the observable to limit the rate of execution
    resizeObservable
      .pipe(
        throttleTime(300),
        tap(() => console.log('computation...'))
      ) // Adjust the throttle time (in milliseconds) as needed
      .subscribe(() => {
        // console.log('computation...');
        // const { clientWidth, clientHeight } = this.clientCanvas;
        // this.gl.canvas.width = clientWidth;
        // this.gl.canvas.height = clientHeight;
      });
  }
  resizeWebGLCanvas() {
    const width = this.clientCanvas.clientWidth;
    const height = this.clientCanvas.clientHeight;

    if (this.gl.canvas.width !== width) this.gl.canvas.width = width;
    if (this.gl.canvas.height !== height) this.gl.canvas.height = height;
  }
  updateWebGLCanvas() {
    this.initialiseWebGLCanvas();
    this.aspect =
      this.clientCanvas.clientWidth / this.clientCanvas.clientHeight;
    this.projectionMatrix = matrix.mat4.create();

    matrix.mat4.perspective(
      this.projectionMatrix,
      this.fieldOfView,
      this.aspect,
      this.zNear,
      this.zFar
    );
    // Set the drawing position to the "identity" point, which is the center of the scene.
    this.modelViewMatrix = matrix.mat4.create();
  }
  bindVertexPosition(programInfo: any, buffers: any) {
    const bufferSize = 2;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.position);
    this.gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      bufferSize,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  setWebGLCanvasDimensions(canvas: HTMLCanvasElement) {
    // set width and height based on canvas width and height - good practice to use clientWidth and clientHeight
    this.gl.canvas.width = canvas.clientWidth;
    this.gl.canvas.height = canvas.clientHeight;
  }
  /** Basic default settigs */
  initialiseWebGLCanvas() {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Enable depth testing
    this.gl.enable(this.gl.DEPTH_TEST);
    // Near things obscure far things
    this.gl.depthFunc(this.gl.LEQUAL);
    // Clear the colour as well as the depth buffer.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }
  initialiseBuffers(): any {
    // Create a buffer for the square's positions.
    const positionBuffer = this.gl.createBuffer();
    // bind the buffer to WebGL and tell it to accept an ARRAY of data
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // create an array of positions for the square.
    const positions = new Float32Array([
      1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0,
    ]);
    // Pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // array, then use it to fill the current buffer.

    // We tell WebGL that the data supplied is an ARRAY and
    // to handle the data as a statically drawn shape.
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

    let colors = new Uint16Array([
      1.0,
      1.0,
      1.0,
      1.0, // white
      1.0,
      0.0,
      0.0,
      1.0, // red
      0.0,
      1.0,
      0.0,
      1.0, // green
      0.0,
      0.0,
      1.0,
      1.0, // blue
    ]);
    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(colors),
      this.gl.STATIC_DRAW
    );

    return {
      position: positionBuffer,
      color: colorBuffer,
    };
  }
  bindVertexColor(programInfo: any, buffers: any) {
    const bufferSize = 4;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffers.color);
    this.gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      bufferSize,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  prepareScene() {
    //this.resizeWebGLCanvas();
    this.updateWebGLCanvas();
    // move the camera position a bit backwards to a position where
    // we can observe the content that will be drawn from a distance
    matrix.mat4.translate(
      this.modelViewMatrix, // destination matrix
      this.modelViewMatrix, // matrix to translate
      [0.0, 0.0, -6.0] // amount to translate
    );
    // tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    this.bindVertexPosition(this.programInfo, this.buffers);
    // tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    this.bindVertexColor(this.programInfo, this.buffers);
    // tell WebGL to use our program when drawing
    this.gl.useProgram(this.programInfo.program);

    // set the shader uniforms
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.projectionMatrix,
      false,
      this.projectionMatrix
    );
    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.modelViewMatrix,
      false,
      this.modelViewMatrix
    );
  }
  initializeShaders(): WebGLProgram {
    // 1. Create the shader program
    let shaderProgram = this.gl.createProgram()!;

    // 2. compile the shaders
    const compiledShaders: WebGLShader[] = [];
    let fragmentShader = this.loadShader(FRAGMENT, GLSL.fragmentShaderMimeType);
    let vertexShader = this.loadShader(VERTEX, GLSL.vertexShaderMimeType);

    fragmentShader && compiledShaders.push(fragmentShader);
    vertexShader && compiledShaders.push(vertexShader);
    // TODO: Refactor
    // 3. attach the shaders to the shader program using our WebGLContext
    if (compiledShaders.length > 0) {
      for (let i = 0; i < compiledShaders.length; i++) {
        const compiledShader = compiledShaders[i];
        if (compiledShader) {
          this.gl.attachShader(shaderProgram, compiledShader);
        }
      }
    } else throw new Error('shaders not provided');

    // 4. link the shader program to our gl context
    this.gl.linkProgram(shaderProgram);

    // 5. check if everything went ok
    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.log(
        'Unable to initialize the shader program: ' +
          this.gl.getProgramInfoLog(shaderProgram)
      );
    }

    // 6. return shader
    return shaderProgram;
  }
  loadShader(shaderSource: string, shaderType: string): WebGLShader | null {
    const shaderTypeAsNumber = this.determineShaderType(shaderType);

    // Create the gl shader
    const glShader = this.gl.createShader(shaderTypeAsNumber);
    if (!glShader) return null;

    // Load the source into the shader
    this.gl.shaderSource(glShader, shaderSource);

    // Compile the shaders
    this.gl.compileShader(glShader);

    // Check the compile status
    const compiledShader: WebGLShader = this.gl.getShaderParameter(
      glShader,
      this.gl.COMPILE_STATUS
    );
    return this.checkCompiledShader(compiledShader) ? glShader : null;
  }
  determineShaderType(shaderMimeType: string | null): number {
    if (!shaderMimeType) throw new Error('shaderMimeType not provided');

    if (GLSL.vertexShaderMimeType === shaderMimeType) {
      return this.gl.VERTEX_SHADER;
      // TODO: refactor this
    } else if (GLSL.fragmentShaderMimeType === shaderMimeType) {
      return this.gl.FRAGMENT_SHADER;
    } else {
      throw new Error('Error: could not determine the shader type');
    }
  }
  updateViewport() {
    if (this.gl) {
      this.gl.viewport(
        0,
        0,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
      this.initialiseWebGLCanvas();
    } else {
      alert(
        'Error! WebGL has not been initialised! Ignoring updateViewport() call...'
      );
    }
  }
  checkCompiledShader(compiledShader: WebGLShader): boolean {
    if (!compiledShader) {
      // shader failed to compile, get the last error
      const lastError = this.gl.getShaderInfoLog(compiledShader);
      console.log("couldn't compile the shader due to: " + lastError);
      this.gl.deleteShader(compiledShader);
      return false;
    }

    return true;
  }
  /**
   * Gets the {@link gl.canvas} as a {@link Element} client.
   */
  private get clientCanvas(): Element {
    return this.gl.canvas as Element;
  }
  private set gl(el: RenderingContext | null | undefined) {
    this._renderingContext = el;
  }
  private get gl(): WebGLRenderingContext {
    return this._renderingContext as WebGLRenderingContext;
  }
}
