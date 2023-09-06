import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { WebglService } from './services/webgl.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css'],
})
export class SceneComponent implements AfterViewInit {
  webglService = inject(WebglService);
  @ViewChild('sceneCanvas') private canvas!: ElementRef<HTMLCanvasElement>;
  private gl?: WebGLRenderingContext;

  ngAfterViewInit() {
    if (!this.canvas) {
      throw new Error('canvas not supplied! cannot bind WebGL context!');
    }

    this.gl = this.webglService.initialiseWebGLContext(
      this.canvas.nativeElement
    );

    this._RAF();
  }
  /**
   * Draws the scene
   */
  private drawScene() {
    if (!this.gl) return;
    // prepare the scene and update the viewport
    this.webglService.updateViewport();
    this.webglService.prepareScene();

    // draw the scene
    const offset = 0;
    const vertexCount = 4;
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, offset, vertexCount);
  }
  _RAF() {
    requestAnimationFrame(() => {
      this.drawScene();
      this._RAF();
    });
  }
}
