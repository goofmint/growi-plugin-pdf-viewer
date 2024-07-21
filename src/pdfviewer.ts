import sha256 from 'crypto-js/sha256';
import { TsPdfViewer, TsPdfViewerOptions } from 'ts-pdf';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

interface GrowiNode extends Node {
  name: string;
  type: string;
  attributes: {[key: string]: string}
  children: GrowiNode[];
  value: string;
}

export const plugin: Plugin = function() {
  return (tree) => {
    visit(tree, (node) => {
      const n = node as unknown as GrowiNode;
      try {
        if (n.type === 'leafGrowiPluginDirective' && n.name === 'pdfviewer') {
          const filePath = Object.keys(n.attributes)[0];
          const { width, height } = n.attributes;
          const key = sha256(filePath);
          const containerSelector = `#pdf-${key}`;
          const options: TsPdfViewerOptions = {
            containerSelector,
            workerSource: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js',
          };
          n.type = 'html';
          n.value = `<div id="pdf-${key}" style="width: ${width}; height: ${height};"></div>`;
          setTimeout(() => {
            if (!document.querySelector(containerSelector)?.shadowRoot) {
              const viewer = new TsPdfViewer(options);
              viewer.openPdfAsync(filePath);
            }
          }, 500);
        }
      }
      catch (e) {
        n.type = 'html';
        n.value = `<div style="color: red;">Error: ${(e as Error).message}</div>`;
      }
    });
  };
};
