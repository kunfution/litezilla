

// --- TYPE DEFINITIONS for File System Access API ---
// These interfaces are added to provide type safety for a modern browser API
// without causing errors in environments that don't have up-to-date TS DOM libs.
interface FileSystemFileHandle {
  createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemWritableFileStream extends WritableStream {
    write(data: Blob | string | BufferSource): Promise<void>;
    close(): Promise<void>;
}

interface SaveFilePickerOptions {
    suggestedName?: string;
    types?: {
        description: string;
        accept: Record<string, string[]>;
    }[];
}

// Augment the global Window interface
interface Window {
    showSaveFilePicker?(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>;
}


// --- CONSTANTS ---
const MASK_COLOR = 'mask';
const MASK_DISPLAY_COLOR = '#888888';
const INCH_TO_MM = 25.4;

const LIMITED_PALETTE = [
    '#222222', // Near Black
    '#ffffff', // White
    '#ff0000', // Red
    '#ff9a0d', // Orange
    '#ffff00', // Yellow
    '#29ff0f', // Lime Green
    '#0f8d0f', // Green
    '#0f49ff', // Blue
    '#0fffff', // Cyan
    '#ffb3d7', // Pink
    '#9a0f9a', // Purple
];

const RAINBOW_PALETTE = [
    '#ff0000', // Red
    '#ff9a0d', // Orange
    '#ffff00', // Yellow
    '#29ff0f', // Lime
    '#0f49ff', // Blue
    '#9a0f9a', // Purple
];

const CANVAS_DOT_COLOR_FOR_BLACK = '#333333'; // Make black dots visible on black bg

const SMALL_CIRCLE_PATTERNS = {
    2: [[0,0], [1,0], [0,1], [1,1]],
    3: [[0,1], [1,0], [1,1], [1,2], [2,1]],
    4: [[0,1],[0,2],[1,0],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[3,1],[3,2]],
    5: [[0,2],[1,1],[1,2],[1,3],[2,0],[2,1],[2,2],[2,3],[2,4],[3,1],[3,2],[3,3],[4,2]],
};

// New font based on user-provided images. Proportional, chunky, and stylized.
const PIXEL_FONT: { [key: string]: number[][] } = {
    // Uppercase - Generally 8 rows high
    'A': [[0,1,1,1,1,0],[1,0,0,0,0,1],[1,0,0,0,0,1],[1,1,1,1,1,1],[1,0,0,0,0,1],[1,0,0,0,0,1],[1,0,0,0,0,1],[0,0,0,0,0,0]],
    'B': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[0,0,0,0,0]],
    'C': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,1],[0,0,0,0,0]],
    'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[0,0,0,0,0]],
    'E': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0]],
    'F': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0]],
    'G': [[0,1,1,1,1,0],[1,0,0,0,0,0],[1,0,0,0,0,0],[1,0,0,1,1,1],[1,0,0,0,0,1],[1,0,0,0,0,1],[0,1,1,1,1,0],[0,0,0,0,0,0]],
    'H': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,0,0,0,0]],
    'I': [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1],[0,0,0]],
    'J': [[0,0,1,1,1],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[0,1,1,0,0],[0,0,0,0,0]],
    'K': [[1,0,0,1,0],[1,0,1,0,0],[1,1,0,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,1,0],[0,0,0,0,0]],
    'L': [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,1,1],[0,0,0,0]],
    'M': [[1,0,0,0,0,0,1],[1,1,0,0,0,1,1],[1,0,1,0,1,0,1],[1,0,0,1,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[0,0,0,0,0,0,0]],
    'N': [[1,0,0,0,0,1],[1,1,0,0,0,1],[1,0,1,0,0,1],[1,0,0,1,0,1],[1,0,0,0,1,1],[1,0,0,0,0,1],[1,0,0,0,0,1],[0,0,0,0,0,0]],
    'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    'P': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0]],
    'Q': [[0,1,1,1,0,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[1,0,1,0,1,0],[1,0,0,1,0,0],[0,1,1,0,1,1],[0,0,0,0,0,0]],
    'R': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1],[0,0,0,0,0]],
    'S': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0],[0,0,0,0,0]],
    'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],
    'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    'V': [[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[0,1,0,0,0,1,0],[0,1,0,0,0,1,0],[0,0,1,0,1,0,0],[0,0,1,0,1,0,0],[0,0,0,1,0,0,0],[0,0,0,0,0,0,0]],
    'W': [[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,0,0,0,1],[1,0,0,1,0,0,1],[1,0,1,0,1,0,1],[1,1,0,0,0,1,1],[0,1,0,0,0,1,0],[0,0,0,0,0,0,0]],
    'X': [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,0,0,0,0]],
    'Y': [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],
    'Z': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0]],
    // Lowercase - Placed to sit on baseline, generally 8 rows total height to match uppercase
    'a': [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,1,0,0],[1,0,0,0,1,0],[0,1,1,1,1,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[0,1,1,1,1,0]],
    'b': [[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[0,0,0,0,0]],
    'c': [[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0]],
    'd': [[0,0,0,0,1],[0,0,0,0,1],[0,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,0]],
    'e': [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,1,0,0],[1,0,0,0,1,0],[1,1,1,1,1,0],[1,0,0,0,0,0],[0,1,1,1,0,0],[0,0,0,0,0,0]],
    'f': [[0,0,1,1,0],[0,1,0,0,0],[1,1,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,0,0,0,0]],
    'g': [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,1,1,0],[1,0,0,0,1,0],[0,1,1,1,1,0],[0,0,0,0,1,0],[1,1,1,1,0,0],[0,0,0,0,0,0]],
    'h': [[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,0,0,0,0]],
    'i': [[1],[1],[0],[1],[1],[1],[1],[0]],
    'j': [[0,1],[0,1],[0,0],[0,1],[0,1],[1,1],[1,1],[0,1]],
    'k': [[1,0,0,0,0],[1,0,0,0,0],[1,0,1,0,0],[1,1,0,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0],[0,0,0,0,0]],
    'l': [[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,1],[0,0]],
    'm': [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,0,1,0,1,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[0,0,0,0,0,0,0]],
    'n': [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,1,1,1,0,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[0,0,0,0,0,0]],
    'o': [[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    'p': [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,1,1,1,0,0],[1,0,0,0,1,0],[1,1,1,1,0,0],[1,0,0,0,0,0],[1,0,0,0,0,0],[0,0,0,0,0,0]],
    'q': [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,1,1,0],[1,0,0,0,1,0],[0,1,1,1,1,0],[0,0,0,0,1,0],[0,0,0,0,1,1],[0,0,0,0,0,0]],
    'r': [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,0,0,0,0]],
    's': [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,1,0,0],[1,0,0,0,0,0],[0,1,1,1,0,0],[0,0,0,0,1,0],[1,1,1,1,0,0],[0,0,0,0,0,0]],
    't': [[0,1,0,0],[1,1,1,0],[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,1],[0,0,1,0],[0,0,0,0]],
    'u': [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[0,1,1,1,1,0],[0,0,0,0,0,0]],
    'v': [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[0,1,0,1,0,0],[0,1,0,1,0,0],[0,0,1,0,0,0],[0,0,0,0,0,0]],
    'w': [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[1,0,1,0,1,0,1],[0,1,0,1,0,1,0],[0,0,0,0,0,0,0]],
    'x': [[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1],[0,0,0,0,0]],
    'y': [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,0,0,0,1,0],[1,0,0,0,1,0],[0,1,1,1,1,0],[0,0,0,0,1,0],[0,1,1,1,0,0],[0,0,0,0,0,0]],
    'z': [[0,0,0,0,0,0],[0,0,0,0,0,0],[1,1,1,1,0,0],[0,0,0,1,0,0],[0,0,1,0,0,0],[0,1,0,0,0,0],[1,1,1,1,0,0],[0,0,0,0,0,0]],
    // Numbers - Same height as uppercase
    '0': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    '1': [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,1,1,1],[0,0,0,0]],
    '2': [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1],[0,0,0,0,0]],
    '3': [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,1,0],[0,0,1,1,0],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    '4': [[0,0,0,1,0],[0,0,1,1,0],[0,1,0,1,0],[1,0,0,1,0],[1,1,1,1,1],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,0,0]],
    '5': [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    '6': [[0,0,1,1,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    '7': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,0,0,0,0]],
    '8': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,0]],
    '9': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,1,1,0,0],[0,0,0,0,0]],
    // Punctuation
    ' ': [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
    '.': [[0],[0],[0],[0],[0],[0],[1],[0]],
    ',': [[0,0],[0,0],[0,0],[0,0],[0,0],[0,1],[1,0],[0,1]],
    '!': [[1],[1],[1],[1],[1],[0],[1],[0]],
    '?': [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,0,1],[0,0,1,1,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]],
    '\'': [[1,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    '(': [[0,1],[1,0],[1,0],[1,0],[1,0],[1,0],[0,1],[0,0]],
    ')': [[1,0],[0,1],[0,1],[0,1],[0,1],[0,1],[1,0],[0,0]],
    '[': [[1,1],[1,0],[1,0],[1,0],[1,0],[1,0],[1,1],[0,0]],
    ']': [[1,1],[0,1],[0,1],[0,1],[0,1],[0,1],[1,1],[0,0]],
    '{': [[0,1,1],[1,0,0],[1,0,1],[0,1,0],[1,0,1],[1,0,0],[0,1,1],[0,0,0]],
    '}': [[1,1,0],[0,0,1],[1,0,1],[0,1,0],[1,0,1],[0,0,1],[1,1,0],[0,0,0]],
    ':': [[0],[0],[1],[0],[1],[0],[0],[0]],
    ';': [[0,0],[0,0],[0,1],[0,0],[0,1],[1,0],[0,1],[0,0]],
    '=': [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
    '>': [[1,0,0],[0,1,0],[0,0,1],[0,1,0],[1,0,0],[0,0,0],[0,0,0],[0,0,0]],
    '<': [[0,0,1],[0,1,0],[1,0,0],[0,1,0],[0,0,1],[0,0,0],[0,0,0],[0,0,0]],
    '/': [[0,0,1],[0,0,1],[0,1,0],[0,1,0],[1,0,0],[1,0,0],[0,0,0],[0,0,0]],
};

// --- DOM ELEMENTS ---
const modeGenerateBtn = document.getElementById('mode-generate-btn') as HTMLButtonElement;
const modeLogoTopBtn = document.getElementById('mode-logo-top-btn') as HTMLButtonElement;
const generateSections = document.getElementById('generate-sections') as HTMLDivElement;
const logoTopSections = document.getElementById('logo-top-sections') as HTMLDivElement;

const newProjectBtn = document.getElementById('new-project-btn') as HTMLButtonElement;
const uploadInput = document.getElementById('upload-input') as HTMLInputElement;
const fileBtn = document.querySelector('.file-btn') as HTMLButtonElement;
const fileNameSpan = document.querySelector('.file-name') as HTMLSpanElement;
const sizeSelect = document.getElementById('size-select') as HTMLSelectElement;
const customSizeContainer = document.getElementById('custom-size-container') as HTMLDivElement;
const customWidthInput = document.getElementById('custom-width-input') as HTMLInputElement;
const customHeightInput = document.getElementById('custom-height-input') as HTMLInputElement;
const applyCustomSizeBtn = document.getElementById('apply-custom-size-btn') as HTMLButtonElement;
const canvas = document.getElementById('pixel-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const canvasWrapper = document.querySelector('.canvas-wrapper') as HTMLDivElement;
const originalImagePreview = document.getElementById('original-image-preview') as HTMLDivElement;
const sourceImageEl = document.getElementById('source-image') as HTMLImageElement;
const colorPaletteContainer = document.getElementById('color-palette') as HTMLDivElement;
const downloadBtn = document.getElementById('download-btn') as HTMLButtonElement;
const downloadSvgBtn = document.getElementById('download-svg-btn') as HTMLButtonElement;
const saveProjectBtn = document.getElementById('save-project-btn') as HTMLButtonElement;
const scaleSlider = document.getElementById('scale-slider') as HTMLInputElement;
const scaleValueSpan = document.getElementById('scale-value') as HTMLSpanElement;
const panModeBtn = document.getElementById('pan-mode-btn') as HTMLButtonElement;
const selectToolBtn = document.getElementById('select-tool-btn') as HTMLButtonElement;
const brushToolSelect = document.getElementById('brush-tool-select') as HTMLSelectElement;
const brushSizeInput = document.getElementById('brush-size') as HTMLInputElement;
const undoBtn = document.getElementById('undo-btn') as HTMLButtonElement;
const redoBtn = document.getElementById('redo-btn') as HTMLButtonElement;
const generateBgBtn = document.getElementById('generate-bg-btn') as HTMLButtonElement;
const strokeSelectionBtn = document.getElementById('stroke-selection-btn') as HTMLButtonElement;
const canvasPreview = document.getElementById('canvas-preview') as HTMLCanvasElement;
const ctxPreview = canvasPreview?.getContext('2d');
const lightEffectBtn = document.getElementById('light-effect-btn') as HTMLButtonElement;
const textInput = document.getElementById('text-input') as HTMLInputElement;
const textSizeInput = document.getElementById('text-size-input') as HTMLInputElement;
const placeTextBtn = document.getElementById('place-text-btn') as HTMLButtonElement;
const hotkeyHelpBtn = document.getElementById('hotkey-help-btn') as HTMLButtonElement;
const hotkeyPopover = document.getElementById('hotkey-popover') as HTMLDivElement;
const topRulerCanvas = document.getElementById('top-ruler') as HTMLCanvasElement;
const topRulerCtx = topRulerCanvas.getContext('2d');
const leftRulerCanvas = document.getElementById('left-ruler') as HTMLCanvasElement;
const leftRulerCtx = leftRulerCanvas.getContext('2d');
const overlayUploadInput = document.getElementById('overlay-upload-input') as HTMLInputElement;
const overlayFileNameSpan = document.querySelector('.overlay-file-name') as HTMLSpanElement;
const overlayOpacitySlider = document.getElementById('overlay-opacity-slider') as HTMLInputElement;
const toggleOverlayBtn = document.getElementById('toggle-overlay-btn') as HTMLButtonElement;
const fitToGridBtn = document.getElementById('fit-to-grid-btn') as HTMLButtonElement;
const adjustOverlayBtn = document.getElementById('adjust-overlay-btn') as HTMLButtonElement;
const overlayCanvas = document.getElementById('overlay-canvas') as HTMLCanvasElement;
const overlayCtx = overlayCanvas.getContext('2d');
const zoomControls = document.getElementById('zoom-controls') as HTMLDivElement;
const zoomSlider = document.getElementById('zoom-slider') as HTMLInputElement;
const zoomInBtn = document.getElementById('zoom-in-btn') as HTMLButtonElement;
const zoomOutBtn = document.getElementById('zoom-out-btn') as HTMLButtonElement;
const saveConfirmModal = document.getElementById('save-confirm-modal') as HTMLDivElement;
const modalSaveBtn = document.getElementById('modal-save-btn') as HTMLButtonElement;
const modalDontSaveBtn = document.getElementById('modal-dont-save-btn') as HTMLButtonElement;
const modalCancelBtn = document.getElementById('modal-cancel-btn') as HTMLButtonElement;

// Logo Top DOM Elements
const logoUploadInput = document.getElementById('logo-upload-input') as HTMLInputElement;
const logoFileNameSpan = document.getElementById('logo-file-name') as HTMLSpanElement;
const logoPreviewBox = document.getElementById('logo-preview-box') as HTMLDivElement;
const logoPreviewImage = document.getElementById('logo-preview-image') as HTMLImageElement;
const logoCircleSizeSelect = document.getElementById('logo-circle-size') as HTMLSelectElement;
const logoCircleSeparationInput = document.getElementById('logo-circle-separation') as HTMLInputElement;
const logoFillPatternSelect = document.getElementById('logo-fill-pattern') as HTMLSelectElement;
const logoSensitivitySlider = document.getElementById('logo-sensitivity-slider') as HTMLInputElement;
const logoSensitivityValue = document.getElementById('logo-sensitivity-value') as HTMLSpanElement;
const generateLogoTopBtn = document.getElementById('generate-logo-top-btn') as HTMLButtonElement;
const generateLogoTopEdgesBtn = document.getElementById('generate-logo-top-edges-btn') as HTMLButtonElement;
const adjustLogoBtn = document.getElementById('adjust-logo-btn') as HTMLButtonElement;
const hideLogoBtn = document.getElementById('hide-logo-btn') as HTMLButtonElement;
const logoInvertCheckbox = document.getElementById('logo-invert-checkbox') as HTMLInputElement;
const logoTopSizeSelect = document.getElementById('logo-top-size-select') as HTMLSelectElement;
const logoTopCustomSizeContainer = document.getElementById('logo-top-custom-size-container') as HTMLDivElement;
const logoTopCustomWidthInput = document.getElementById('logo-top-custom-width-input') as HTMLInputElement;
const logoTopCustomHeightInput = document.getElementById('logo-top-custom-height-input') as HTMLInputElement;
const applyLogoTopCustomSizeBtn = document.getElementById('apply-logo-top-custom-size-btn') as HTMLButtonElement;


// Curve Tool DOM Elements
const curveToolControls = document.getElementById('curve-tool-controls') as HTMLDivElement;
const fillPathBtn = document.getElementById('fill-path-btn') as HTMLButtonElement;
const clearPathBtn = document.getElementById('clear-path-btn') as HTMLButtonElement;


// --- APP STATE ---
// Logo Top Physical Dimensions
let artboardWidthInches = 23;
let artboardHeightInches = 23;
let artboardWidthMM = artboardWidthInches * INCH_TO_MM;
let artboardHeightMM = artboardHeightInches * INCH_TO_MM;

let originalImage: HTMLImageElement | null = null;
let logoTopState: {
    image: HTMLImageElement;
    artboardX: number; // in mm
    artboardY: number; // in mm
    widthMM: number;   // in mm
    heightMM: number;  // in mm
} | null = null;
let isLogoGuideVisible = false;
let logoTopCircles: { x: number; y: number; color: string; }[] | null = null;
// Performance optimization: Spatial hash grid for circle collision detection
let logoTopCircleGrid: Map<string, { x: number, y: number, color: string }[]> | null = null;
let logoTopGridCellSize = 0;
let gridWidth = 51; // Viewport width
let gridHeight = 26; // Viewport height
let pixelData = new Map<string, string>(); // Use a Map for a sparse, infinite grid. Key: "x,y", Value: hex color
let artboardOffset = { x: 0, y: 0 }; // Viewport's top-left corner on the infinite artboard.
let generatedBackgroundData: string[][] | null = null; // Temp layer for masked generation
// State for Logo Top viewport
let logoTopView = {
    scale: 1.0,   // Zoom level (pixels per mm)
    offsetX: artboardWidthMM / 2,   // Pan offset in artboard mm (center of view)
    offsetY: artboardHeightMM / 2,
};


// Selection State
let lassoPoints: { x: number; y: number }[] | null = null; // Polygon vertices
let lassoPreviewPoint: { x: number; y: number } | null = null; // For rubber-band line
type PixelSelection = {
    path: { x: number; y: number }[]; // The absolute artboard coordinates of the selection path
    bounds: { minX: number; minY: number; maxX: number; maxY: number };
    relativePixelData: Map<string, string>; // Key: "relX,relY", Value: hex color
};
let selection: PixelSelection | null = null;

type FloatingSelection = {
    artboardX: number; // Top-left corner of the floating selection on the artboard
    artboardY: number;
    width: number;
    height: number;
    pixelData: Map<string, string>; // Key: "relX,relY", Value: hex color
};
let floatingSelection: FloatingSelection | null = null;
let floatingSelectionStartPos = { x: 0, y: 0 };
let internalClipboard: {
    width: number;
    height: number;
    pixelData: Map<string, string>;
} | null = null;

type HistoryState = {
    pixelData: Map<string, string>;
    artboardOffset: { x: number, y: number };
    logoTopCircles: typeof logoTopCircles;
    selection: PixelSelection | null;
    floatingSelection: FloatingSelection | null;
    logoTopView: typeof logoTopView;
    artboardWidthInches: number;
    artboardHeightInches: number;
}
let historyStack: HistoryState[] = [];
let redoStack: HistoryState[] = [];

const MAX_HISTORY_SIZE = 50;
let selectedColor: string = LIMITED_PALETTE[1]; // Default to white
let resizeAnimationFrameId: number | null = null;
let labPaletteCache: { hex: string, lab: { l: number, a: number, b: number } }[] = [];
let overlayImage: {
    image: HTMLImageElement;
    artboardX: number;
    artboardY: number;
    widthInCells: number;
    heightInCells: number;
    opacity: number;
    isVisible: boolean;
} | null = null;


// Transform and Drawing State
let scale = 1.0;
let panOffset = { x: 0, y: 0 }; // Used for panning gesture preview in pixels
let isPanMode = false;
let isSelectionMode = false;
let isGlowEnabled = false;
let isDrawing = false; // For drawing tools or polygonal lasso creation
let isDragging = false; // For panning or moving selections
let dragStart = { x: 0, y: 0 }; // For panning/selection gesture origin
let logoTopViewPanStart = { offsetX: 0, offsetY: 0 }; // State for smooth logo top panning
let isTextPlacementMode = false;
let hoveredCoords: { x: number; y: number } | null = null; // For ruler highlighting
let lastDrawnCirclePos: { x: number; y: number; } | null = null;
let logoTopPreviewPoint: { x: number; y: number } | null = null; // For eraser preview


// Curve Tool State
type CurvePoint = {
    p: { x: number; y: number };  // anchor point
    h1: { x: number; y: number }; // handle 1 (controls curve arriving at p)
    h2: { x: number; y: number }; // handle 2 (controls curve leaving p)
};
let curvePath: CurvePoint[] = [];
let isCurvePathFinalized = false;
let isCurveClosed = false;
let isCreatingCurvePoint = false; // For click-and-drag creation


// Overlay manipulation state
let isAdjustingOverlay = false;
let isMovingOverlay = false;
let isResizingOverlay = false;
let resizeHandle: string | null = null;
let overlayDragStart = { x: 0, y: 0 };
let overlayStartRect = { artboardX: 0, artboardY: 0, widthInCells: 0, heightInCells: 0, isVisible: true, opacity: 0, image: new Image() };

// Logo manipulation state
let isAdjustingLogo = false;
let isMovingLogo = false;
let isResizingLogo = false;
let logoResizeHandle: string | null = null;
let logoDragStart = { x: 0, y: 0 };
// The rect stores dimensions in MM
let logoStartRect = { artboardX: 0, artboardY: 0, widthMM: 0, heightMM: 0, image: new Image() };


// --- CORE FUNCTIONS ---

function init() {
    // Mode switcher
    modeGenerateBtn.addEventListener('click', () => switchMode('generate'));
    modeLogoTopBtn.addEventListener('click', () => switchMode('logo-top'));
    
    newProjectBtn.addEventListener('click', handleNewProject);
    fileBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', handleImageUpload);
    sizeSelect.addEventListener('change', handleSizeChange);
    applyCustomSizeBtn.addEventListener('click', applyCustomSize);
    
    // Downloads are now mode-dependent
    downloadBtn.addEventListener('click', () => {
        if (modeLogoTopBtn.classList.contains('active')) {
            handleDownloadLogoTopPNG();
        } else {
            handleDownloadGridPNG();
        }
    });
    downloadSvgBtn.addEventListener('click', () => {
        if (modeLogoTopBtn.classList.contains('active')) {
            handleDownloadLogoTopSVG();
        } else {
            handleDownloadGridSVG();
        }
    });

    saveProjectBtn.addEventListener('click', handleSaveProject);
    scaleSlider.addEventListener('input', handleScaleChange);
    
    panModeBtn.addEventListener('click', togglePanMode);
    selectToolBtn.addEventListener('click', toggleSelectionMode);
    generateBgBtn.addEventListener('click', handleGenerateBackground);
    strokeSelectionBtn.addEventListener('click', handleStrokeSelection);
    lightEffectBtn.addEventListener('click', toggleLightEffect);
    placeTextBtn.addEventListener('click', toggleTextPlacementMode);

    // Logo Top Listeners
    const logoUploadWrapper = document.getElementById('logo-upload-input')?.parentElement;
    if (logoUploadWrapper) {
        logoUploadWrapper.addEventListener('click', (e) => {
            // Prevent the click from bubbling up if it came from the input itself
            if (e.target !== logoUploadInput) {
                logoUploadInput.click();
            }
        });
    }
    logoUploadInput.addEventListener('change', handleLogoUpload);
    logoTopSizeSelect.addEventListener('change', handleLogoTopSizeChange);
    applyLogoTopCustomSizeBtn.addEventListener('click', applyLogoTopCustomSize);
    logoSensitivitySlider.addEventListener('input', () => {
        if (logoSensitivityValue) logoSensitivityValue.textContent = logoSensitivitySlider.value;
    });
    adjustLogoBtn.addEventListener('click', handleToggleAdjustLogo);
    generateLogoTopBtn.addEventListener('click', () => handleGenerateLogoTop(false));
    generateLogoTopEdgesBtn.addEventListener('click', () => handleGenerateLogoTop(true));
    hideLogoBtn.addEventListener('click', handleToggleLogoVisibility);
    fillPathBtn.addEventListener('click', handleFillCurvePath);
    clearPathBtn.addEventListener('click', () => handleClearCurvePath());


    // Overlay Listeners
    overlayUploadInput.parentElement?.addEventListener('click', () => overlayUploadInput.click());
    overlayUploadInput.addEventListener('change', handleOverlayUpload);
    overlayOpacitySlider.addEventListener('input', handleOverlayOpacityChange);
    toggleOverlayBtn.addEventListener('click', handleToggleOverlayVisibility);
    fitToGridBtn.addEventListener('click', handleFitToGrid);
    adjustOverlayBtn.addEventListener('click', handleToggleAdjustOverlay);

    // Modal Listeners
    modalSaveBtn.addEventListener('click', async () => {
        await handleSaveProject(); // Let user save or cancel
        resetProject();
        hideSaveConfirmModal();
    });
    modalDontSaveBtn.addEventListener('click', () => {
        resetProject();
        hideSaveConfirmModal();
    });
    modalCancelBtn.addEventListener('click', hideSaveConfirmModal);
    saveConfirmModal.addEventListener('click', (e) => {
        if (e.target === saveConfirmModal) {
            hideSaveConfirmModal();
        }
    });

    // Brush tool listeners
    brushToolSelect.addEventListener('change', handleToolChange);
    undoBtn.addEventListener('click', handleUndo);
    redoBtn.addEventListener('click', handleRedo);

    // Canvas Listeners for Drawing and Panning
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('dblclick', handleDoubleClick);
    
    // Zoom listeners for Logo Top mode
    zoomSlider.addEventListener('input', handleZoomSliderInput);
    zoomSlider.addEventListener('change', () => saveState());
    zoomInBtn.addEventListener('click', handleZoomIn);
    zoomOutBtn.addEventListener('click', handleZoomOut);

    // Overlay manipulation listeners
    overlayCanvas.addEventListener('mousedown', handleOverlayMouseDown);
    overlayCanvas.addEventListener('mousemove', handleOverlayMouseMove);
    overlayCanvas.addEventListener('mouseleave', handleOverlayMouseLeave);


    // Hotkey Popover Listeners
    hotkeyHelpBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent this click from being caught by the document listener
        hotkeyPopover.classList.toggle('hidden');
        hotkeyHelpBtn.classList.toggle('active', !hotkeyPopover.classList.contains('hidden'));
    });

    document.addEventListener('click', (e) => {
        // Hide popover if click is outside of it and not on the help button itself
        if (!hotkeyPopover.classList.contains('hidden')) {
            const target = e.target as Node;
            if (!hotkeyPopover.contains(target) && !hotkeyHelpBtn.contains(target)) {
                 hotkeyPopover.classList.add('hidden');
                 hotkeyHelpBtn.classList.remove('active');
            }
        }
    });
    document.addEventListener('keydown', handleHotkeys);


    const resizeObserver = new ResizeObserver(() => {
        if (resizeAnimationFrameId) {
            window.cancelAnimationFrame(resizeAnimationFrameId);
        }
        resizeAnimationFrameId = window.requestAnimationFrame(renderCanvas);
    });
    resizeObserver.observe(canvasWrapper);

    cacheLabPalette();
    updateSliderValues();
    setupCollapsibleSections();
    updateGridSizeFromSelect();
    updateColorPalette();
    updateUndoRedoButtons();
    updateControlStates();
    switchMode('generate'); // Set initial mode and tool visibility
    renderCanvas();
}

/**
 * Initializes the collapsible sidebar sections.
 */
function setupCollapsibleSections() {
    const sectionsToOpenByDefault = ['section-image', 'section-size', 'section-brush', 'section-export'];

    document.querySelectorAll('.sidebar-header').forEach(header => {
        const section = header.closest('.sidebar-section');
        if (!section) return;

        // Set initial state
        if (!sectionsToOpenByDefault.includes(section.id)) {
            section.classList.add('collapsed');
        }

        header.addEventListener('click', () => {
            section.classList.toggle('collapsed');
        });
    });
}

/**
 * Calculates the uniform spacing for grid cells to fit within the wrapper.
 */
function getSpacing(): number {
    if (!canvasWrapper) return 1;
    const wrapperWidth = canvasWrapper.clientWidth;
    const wrapperHeight = canvasWrapper.clientHeight;
    const spacingX = wrapperWidth / gridWidth;
    const spacingY = wrapperHeight / gridHeight;
    return Math.min(spacingX, spacingY);
}


/**
 * Converts screen coordinates to absolute artboard grid coordinates.
 */
function screenToGrid(event: MouseEvent): {x: number, y: number} | null {
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const spacing = getSpacing();
    
    // Mouse coordinates relative to the canvas element's top-left corner
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    // Account for the grid being centered on the larger canvas
    const artboardWidth = gridWidth * spacing;
    const artboardHeight = gridHeight * spacing;
    const offsetX = (canvas.width - artboardWidth) / 2;
    const offsetY = (canvas.height - artboardHeight) / 2;

    const gridRelativeX = canvasX - offsetX;
    const gridRelativeY = canvasY - offsetY;

    // The grid cell on the visible canvas
    const viewGridX = Math.floor(gridRelativeX / spacing);
    const viewGridY = Math.floor(gridRelativeY / spacing);


    // Check if the coordinates are within the grid bounds
    if (viewGridX < 0 || viewGridX >= gridWidth || viewGridY < 0 || viewGridY >= gridHeight) {
        return null;
    }
    
    // Return the absolute coordinate on the infinite artboard
    return { x: viewGridX + artboardOffset.x, y: viewGridY + artboardOffset.y };
}

/**
 * Gets the scale and offset for rendering the Logo Top artboard on the canvas.
 */
function getLogoTopViewMetrics() {
    if (!ctx) return null;

    // viewScale is the zoom level. It's how many pixels per mm.
    const viewScale = logoTopView.scale;

    // The screen coordinates of the artboard's origin (0,0)
    const artboardOriginScreenX = (0 - logoTopView.offsetX) * viewScale + (canvas.width / 2);
    const artboardOriginScreenY = (0 - logoTopView.offsetY) * viewScale + (canvas.height / 2);

    const scaledArtboardWidth = artboardWidthMM * viewScale;
    const scaledArtboardHeight = artboardHeightMM * viewScale;
    
    // Return offsetX and offsetY as the screen coordinates of the artboard's top-left corner.
    return {
        viewScale,
        offsetX: artboardOriginScreenX,
        offsetY: artboardOriginScreenY,
        scaledArtboardWidth,
        scaledArtboardHeight
    };
}

/**
 * Converts screen coordinates to Logo Top artboard coordinates (in mm).
 */
function screenToLogoArtboard(event: MouseEvent): { x: number, y: number } | null {
    const metrics = getLogoTopViewMetrics();
    const rect = canvas.getBoundingClientRect();
    if (!metrics || !rect) return null;

    const { viewScale, offsetX, offsetY } = metrics;
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    if (viewScale === 0) return null;

    const artboardX = (canvasX - offsetX) / viewScale;
    const artboardY = (canvasY - offsetY) / viewScale;

    return { x: artboardX, y: artboardY };
}


/**
 * Main render function. Orchestrates rendering all components of the artboard.
 */
function renderCanvas() {
    if (!ctx || !canvasWrapper || !overlayCtx) return;
    if(resizeAnimationFrameId) resizeAnimationFrameId = null;

    const spacing = getSpacing();
    
    const artboardWidth = gridWidth * spacing;
    const artboardHeight = gridHeight * spacing;
    
    // Size the main pixel canvas to fill its container
    if (canvas.width !== canvasWrapper.clientWidth) canvas.width = canvasWrapper.clientWidth;
    if (canvas.height !== canvasWrapper.clientHeight) canvas.height = canvasWrapper.clientHeight;
    

    // Size and position the overlay canvas to match the grid area
    if (overlayCanvas.width !== artboardWidth) overlayCanvas.width = artboardWidth;
    if (overlayCanvas.height !== artboardHeight) overlayCanvas.height = artboardHeight;
    const wrapperWidth = canvasWrapper.clientWidth;
    const wrapperHeight = canvasWrapper.clientHeight;
    const canvasLeft = (wrapperWidth - artboardWidth) / 2;
    const canvasTop = (wrapperHeight - artboardHeight) / 2;
    overlayCanvas.style.left = `${canvasLeft}px`;
    overlayCanvas.style.top = `${canvasTop}px`;
    overlayCanvas.style.width = `${artboardWidth}px`;
    overlayCanvas.style.height = `${artboardHeight}px`;

    // This offset is for the rulers, which are outside the flex wrapper
    const horizontalRulerOffset = (wrapperWidth - artboardWidth) / 2;
    const verticalRulerOffset = (wrapperHeight - artboardHeight) / 2;

    // Pan preview offset in grid cells
    const panPreviewX = isDragging && isPanMode && !modeLogoTopBtn.classList.contains('active') ? Math.round(panOffset.x / spacing) : 0;
    const panPreviewY = isDragging && isPanMode && !modeLogoTopBtn.classList.contains('active') ? Math.round(panOffset.y / spacing) : 0;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Clear overlay canvas separately
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    if (modeLogoTopBtn.classList.contains('active')) {
        renderLogoTopPreview();
    } else {
        // Render the individual components for Generate mode
        renderGrid(spacing, panPreviewX, panPreviewY);
        renderOverlay(spacing, panPreviewX, panPreviewY);
        renderRulers(spacing, horizontalRulerOffset, verticalRulerOffset);
        renderBrushPreview(spacing);
    }
    
    renderCanvasPreview();
    updateColorCounts();
}

/**
 * Renders the pixel art grid onto the main canvas.
 */
function renderGrid(spacing: number, panPreviewX: number, panPreviewY: number) {
    if (!ctx) return;

    const artboardWidth = gridWidth * spacing;
    const artboardHeight = gridHeight * spacing;
    const offsetX = (canvas.width - artboardWidth) / 2;
    const offsetY = (canvas.height - artboardHeight) / 2;
    
    ctx.save();
    ctx.translate(offsetX, offsetY);

    const dotRadius = spacing * 0.35;

    for (let y = 0; y < gridHeight; y++) { // y is the viewport row
        for (let x = 0; x < gridWidth; x++) { // x is the viewport col
            
            // Find the source pixel on the infinite artboard
            const sourceX = x + artboardOffset.x - panPreviewX;
            const sourceY = y + artboardOffset.y - panPreviewY;

            let color = getPixel(sourceX, sourceY);

            // If there's a temporary background, show it over the mask
            if (color === MASK_COLOR && generatedBackgroundData) {
                 color = generatedBackgroundData[y]?.[x] || MASK_COLOR;
            }

            // Always draw the dot. `getPixel` returns white for empty cells, creating the "light board" effect.
            drawDot(ctx, x, y, color, dotRadius, spacing);
        }
    }

    // Draw the floating selection on top of the grid
    if (floatingSelection) {
        for (const [key, color] of floatingSelection.pixelData.entries()) {
            const [relX, relY] = key.split(',').map(Number);
            
            const absX = floatingSelection.artboardX + relX;
            const absY = floatingSelection.artboardY + relY;

            const viewX = absX - (artboardOffset.x - panPreviewX);
            const viewY = absY - (artboardOffset.y - panPreviewY);
            
            if (viewX >= 0 && viewX < gridWidth && viewY >= 0 && viewY < gridHeight) {
                drawDot(ctx, viewX, viewY, color, dotRadius, spacing);
            }
        }
    }
    
    ctx.restore();
}

/**
 * Renders the generated circle pattern for the Logo Top mode.
 * This function handles layering the guide, the circles, and the adjustment handles.
 */
function renderLogoTopPreview() {
    if (!ctx) return;
    const metrics = getLogoTopViewMetrics();
    if (!metrics) return;

    const { viewScale, offsetX, offsetY, scaledArtboardWidth, scaledArtboardHeight } = metrics;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the artboard boundary rectangle
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 1;
    ctx.strokeRect(offsetX, offsetY, scaledArtboardWidth, scaledArtboardHeight);

    // --- PAINTING / IDLE VIEW ---
    // 1. Draw logo as a faint guide if visible
    if (logoTopState && isLogoGuideVisible && !isAdjustingLogo) {
        const screenX = logoTopState.artboardX * viewScale + offsetX;
        const screenY = logoTopState.artboardY * viewScale + offsetY;
        const screenWidth = logoTopState.widthMM * viewScale;
        const screenHeight = logoTopState.heightMM * viewScale;
        ctx.globalAlpha = 0.4;
        ctx.drawImage(logoTopState.image, screenX, screenY, screenWidth, screenHeight);
        ctx.globalAlpha = 1.0;
    }
    
    // 2. Draw circles on top
    if (logoTopCircles && !isAdjustingLogo) {
        const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
        const circleDiameterMM = circleSizeInches * INCH_TO_MM;
        const circleRadiusPx = (circleDiameterMM / 2) * viewScale;

        for (const circle of logoTopCircles) {
            let finalColor = circle.color;
            if (finalColor === MASK_COLOR) {
                finalColor = MASK_DISPLAY_COLOR;
            }

            if (isGlowEnabled && circle.color !== MASK_COLOR) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = finalColor;
            }

            ctx.fillStyle = finalColor;
            const canvasX = circle.x * viewScale + offsetX;
            const canvasY = circle.y * viewScale + offsetY;
            
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, circleRadiusPx, 0, Math.PI * 2);
            ctx.fill();

            if (isGlowEnabled && circle.color !== MASK_COLOR) {
                ctx.shadowBlur = 0;
            }
        }
    }

    // --- DRAWING PREVIEWS ---
    if (!isAdjustingLogo) {
        const tool = brushToolSelect.value;
        if (tool === 'eraser' && logoTopPreviewPoint) {
             ctx.save();
             const brushSize = parseInt(brushSizeInput.value, 10) || 1;
             const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
             const circleDiameterMM = circleSizeInches * INCH_TO_MM;
             const separationMM = parseFloat(logoCircleSeparationInput.value) || 0;
             const stepMM = circleDiameterMM + separationMM;
             const brushRadiusPx = (brushSize / 2) * stepMM * viewScale;
             const previewX = logoTopPreviewPoint.x * viewScale + offsetX;
             const previewY = logoTopPreviewPoint.y * viewScale + offsetY;

             ctx.setLineDash([]);
             ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
             ctx.beginPath();
             ctx.arc(previewX, previewY, brushRadiusPx, 0, 2 * Math.PI);
             ctx.stroke();
             ctx.restore();
        }
    }

    // --- CURVE TOOL PREVIEW ---
    if (curvePath.length > 0) {
        ctx.save();
        // Draw the curve
        ctx.strokeStyle = '#00aaff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(curvePath[0].p.x * viewScale + offsetX, curvePath[0].p.y * viewScale + offsetY);
        
        for (let i = 0; i < curvePath.length - 1; i++) {
            const p0 = curvePath[i];
            const p1 = curvePath[i+1];
            ctx.bezierCurveTo(
                p0.h2.x * viewScale + offsetX, p0.h2.y * viewScale + offsetY,
                p1.h1.x * viewScale + offsetX, p1.h1.y * viewScale + offsetY,
                p1.p.x * viewScale + offsetX, p1.p.y * viewScale + offsetY
            );
        }

        if (isCurveClosed && curvePath.length > 1) {
            const p_last = curvePath[curvePath.length - 1];
            const p_first = curvePath[0];
             ctx.bezierCurveTo(
                p_last.h2.x * viewScale + offsetX, p_last.h2.y * viewScale + offsetY,
                p_first.h1.x * viewScale + offsetX, p_first.h1.y * viewScale + offsetY,
                p_first.p.x * viewScale + offsetX, p_first.p.y * viewScale + offsetY
            );
        }

        ctx.stroke();

        // Draw rubber band line to cursor
        if (logoTopPreviewPoint && !isCurvePathFinalized && curvePath.length > 0) {
             const lastPoint = curvePath[curvePath.length - 1];
             ctx.beginPath();
             ctx.strokeStyle = 'rgba(0, 170, 255, 0.5)';
             ctx.setLineDash([3, 3]);
             ctx.moveTo(lastPoint.p.x * viewScale + offsetX, lastPoint.p.y * viewScale + offsetY);
             ctx.lineTo(logoTopPreviewPoint.x * viewScale + offsetX, logoTopPreviewPoint.y * viewScale + offsetY);
             ctx.stroke();
             ctx.setLineDash([]);
        }

        // Draw points and handles
        const handleSize = 8 / viewScale; // Make handles appear constant size
        curvePath.forEach((pt, index) => {
            const pX = pt.p.x * viewScale + offsetX;
            const pY = pt.p.y * viewScale + offsetY;
            const h1X = pt.h1.x * viewScale + offsetX;
            const h1Y = pt.h1.y * viewScale + offsetY;
            const h2X = pt.h2.x * viewScale + offsetX;
            const h2Y = pt.h2.y * viewScale + offsetY;
            
            // Lines for handles
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(h1X, h1Y);
            ctx.lineTo(pX, pY);
            ctx.lineTo(h2X, h2Y);
            ctx.stroke();

            // Anchor point
            ctx.fillStyle = index === 0 ? '#44ff44' : '#ffffff';
            ctx.fillRect(pX - handleSize/2, pY - handleSize/2, handleSize, handleSize);

            // Handles
            ctx.fillStyle = '#00aaff';
            ctx.beginPath();
            ctx.arc(h1X, h1Y, handleSize/2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(h2X, h2Y, handleSize/2, 0, 2 * Math.PI);
            ctx.fill();
        });

        ctx.restore();
    }


    // --- ADJUSTMENT VIEW ---
    // This is drawn on top of everything else if active.
    if (isAdjustingLogo && logoTopState) {
        const screenX = logoTopState.artboardX * viewScale + offsetX;
        const screenY = logoTopState.artboardY * viewScale + offsetY;
        const screenWidth = logoTopState.widthMM * viewScale;
        const screenHeight = logoTopState.heightMM * viewScale;

        // Draw the logo more prominently for adjustment
        ctx.globalAlpha = 0.75;
        ctx.drawImage(logoTopState.image, screenX, screenY, screenWidth, screenHeight);
        ctx.globalAlpha = 1.0;

        // Draw border and handles
        ctx.strokeStyle = 'rgba(0, 122, 204, 0.9)';
        ctx.fillStyle = 'rgba(0, 122, 204, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, screenY, screenWidth, screenHeight);

        const handleSize = 10;
        const handles = {
            'top-left':     { x: screenX, y: screenY },
            'top':          { x: screenX + screenWidth / 2, y: screenY },
            'top-right':    { x: screenX + screenWidth, y: screenY },
            'left':         { x: screenX, y: screenY + screenHeight / 2 },
            'right':        { x: screenX + screenWidth, y: screenY + screenHeight / 2 },
            'bottom-left':  { x: screenX, y: screenY + screenHeight },
            'bottom':       { x: screenX + screenWidth / 2, y: screenY + screenHeight },
            'bottom-right': { x: screenX + screenWidth, y: screenY + screenHeight },
        };

        for (const pos of Object.values(handles)) {
            ctx.fillRect(pos.x - handleSize/2, pos.y - handleSize/2, handleSize, handleSize);
        }
    }
}



/**
 * Renders the tracing overlay image and selection outlines.
 */
function renderOverlay(spacing: number, panPreviewX: number, panPreviewY: number) {
    if (!overlayCtx) return;
    
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Draw tracing image first, if it exists
    if (overlayImage && overlayImage.isVisible) {
        const screenX = (overlayImage.artboardX - (artboardOffset.x - panPreviewX)) * spacing;
        const screenY = (overlayImage.artboardY - (artboardOffset.y - panPreviewY)) * spacing;
        const screenWidth = overlayImage.widthInCells * spacing;
        const screenHeight = overlayImage.heightInCells * spacing;
        overlayCtx.globalAlpha = overlayImage.opacity;
        overlayCtx.drawImage(overlayImage.image, screenX, screenY, screenWidth, screenHeight);
        overlayCtx.globalAlpha = 1.0;
        if (isAdjustingOverlay) {
            overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            overlayCtx.fillStyle = 'rgba(0, 122, 204, 0.8)';
            overlayCtx.lineWidth = 1.5;
            const handleSize = 10;
            const handles = {
                'top-left':     { x: screenX, y: screenY },
                'top':          { x: screenX + screenWidth / 2, y: screenY },
                'top-right':    { x: screenX + screenWidth, y: screenY },
                'left':         { x: screenX, y: screenY + screenHeight / 2 },
                'right':        { x: screenX + screenWidth, y: screenY + screenHeight / 2 },
                'bottom-left':  { x: screenX, y: screenY + screenHeight },
                'bottom':       { x: screenX + screenWidth / 2, y: screenY + screenHeight },
                'bottom-right': { x: screenX + screenWidth, y: screenY + screenHeight },
            };
            for (const pos of Object.values(handles)) {
                overlayCtx.fillRect(pos.x - handleSize/2, pos.y - handleSize/2, handleSize, handleSize);
                overlayCtx.strokeRect(pos.x - handleSize/2, pos.y - handleSize/2, handleSize, handleSize);
            }
        }
    }

    // --- SELECTION RENDERING ---
    
    const buildAndApplyPath = (path: { x: number; y: number }[]) => {
        if (!path || path.length === 0) return;
        overlayCtx.beginPath();
        const startPoint = path[0];
        overlayCtx.moveTo(
            (startPoint.x - (artboardOffset.x - panPreviewX) + 0.5) * spacing,
            (startPoint.y - (artboardOffset.y - panPreviewY) + 0.5) * spacing
        );
        for (let i = 1; i < path.length; i++) {
            const point = path[i];
            overlayCtx.lineTo(
                (point.x - (artboardOffset.x - panPreviewX) + 0.5) * spacing,
                (point.y - (artboardOffset.y - panPreviewY) + 0.5) * spacing
            );
        }
    };

    // Draw the in-progress polygonal lasso path
    if (lassoPoints && lassoPoints.length > 0) {
        // Draw lines between vertices
        buildAndApplyPath(lassoPoints);
        overlayCtx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        overlayCtx.lineWidth = 1;
        overlayCtx.stroke();

        // Draw "rubber band" line from last vertex to cursor
        if (lassoPreviewPoint) {
            const lastPoint = lassoPoints[lassoPoints.length - 1];
            overlayCtx.beginPath();
            overlayCtx.moveTo(
                (lastPoint.x - (artboardOffset.x - panPreviewX) + 0.5) * spacing,
                (lastPoint.y - (artboardOffset.y - panPreviewY) + 0.5) * spacing
            );
            overlayCtx.lineTo(
                (lassoPreviewPoint.x - (artboardOffset.x - panPreviewX) + 0.5) * spacing,
                (lassoPreviewPoint.y - (artboardOffset.y - panPreviewY) + 0.5) * spacing
            );
            overlayCtx.setLineDash([3, 4]);
            overlayCtx.strokeStyle = 'rgba(0, 122, 204, 0.9)';
            overlayCtx.stroke();
            overlayCtx.setLineDash([]);
        }

        // Draw vertices (points)
        const handleSize = 6;
        lassoPoints.forEach((point, index) => {
            const screenX = (point.x - (artboardOffset.x - panPreviewX) + 0.5) * spacing;
            const screenY = (point.y - (artboardOffset.y - panPreviewY) + 0.5) * spacing;
            overlayCtx.fillStyle = index === 0 ? 'rgba(40, 200, 40, 0.9)' : 'rgba(0, 122, 204, 0.9)';
            overlayCtx.fillRect(screenX - handleSize / 2, screenY - handleSize / 2, handleSize, handleSize);
        });
    }

    // Draw the high-contrast dashed line for a finalized selection
    if (selection && !floatingSelection) {
        overlayCtx.save();
        buildAndApplyPath(selection.path);
        overlayCtx.closePath();
        overlayCtx.lineWidth = 3;
        overlayCtx.strokeStyle = 'black';
        overlayCtx.stroke();
        overlayCtx.lineWidth = 1;
        overlayCtx.setLineDash([4, 4]);
        overlayCtx.strokeStyle = 'white';
        overlayCtx.stroke();
        overlayCtx.restore();
    }
}


/**
 * Renders a preview of the brush shape on the canvas.
 */
function renderBrushPreview(spacing: number) {
    if (!ctx || isDrawing || !hoveredCoords || isPanMode || isSelectionMode || isTextPlacementMode || selection || floatingSelection) {
        return;
    }

    const tool = brushToolSelect.value;
    if (tool !== 'square' && tool !== 'circle') {
        return;
    }

    const brushSize = parseInt(brushSizeInput.value, 10) || 1;
    // Don't show preview for the default 1x1 pencil-like brush
    if (tool === 'square' && brushSize <= 1) {
        return;
    }
    
    const artboardWidth = gridWidth * spacing;
    const artboardHeight = gridHeight * spacing;
    const offsetX = (canvas.width - artboardWidth) / 2;
    const offsetY = (canvas.height - artboardHeight) / 2;

    // The absolute grid coordinates of the center of the brush
    const centerX = hoveredCoords.x;
    const centerY = hoveredCoords.y;

    ctx.save();
    ctx.translate(offsetX, offsetY); // Apply the same offset as the grid
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 1.5;
    
    if (tool === 'square') {
        const halfSize = Math.floor(brushSize / 2);
        // Top-left corner of the brush square in absolute coords
        const startAbsX = centerX - halfSize;
        const startAbsY = centerY - halfSize;

        // Convert to viewport pixel coordinates for drawing
        const viewPxX = (startAbsX - artboardOffset.x) * spacing;
        const viewPxY = (startAbsY - artboardOffset.y) * spacing;
        const sizePx = brushSize * spacing;

        ctx.strokeRect(viewPxX, viewPxY, sizePx, sizePx);

    } else if (tool === 'circle') {
        // Re-use the circle drawing logic, but stroke instead of fill
        if (brushSize in SMALL_CIRCLE_PATTERNS) {
            const pattern = SMALL_CIRCLE_PATTERNS[brushSize as keyof typeof SMALL_CIRCLE_PATTERNS];
            const offset = Math.floor(brushSize / 2);
            for (const p of pattern) {
                // Absolute coordinates of the cell to draw
                const absX = centerX + p[0] - offset;
                const absY = centerY + p[1] - offset;
                
                // Convert to viewport pixel coordinates and stroke the cell's rect
                const viewPxX = (absX - artboardOffset.x) * spacing;
                const viewPxY = (absY - artboardOffset.y) * spacing;
                
                // Only draw if the cell is within the viewport bounds
                if (viewPxX >= -spacing && viewPxX <= canvas.width && viewPxY >= -spacing && viewPxY <= canvas.height) {
                    ctx.strokeRect(viewPxX, viewPxY, spacing, spacing);
                }
            }
        } else {
            const radiusPx = (brushSize / 2) * spacing;
            // Center of the brush in viewport pixel coordinates
            const viewCenterX = hoveredCoords.x - artboardOffset.x;
            const viewCenterY = hoveredCoords.y - artboardOffset.y;
            const centerPxX = viewCenterX * spacing + spacing / 2;
            const centerPxY = viewCenterY * spacing + spacing / 2;
            
            ctx.beginPath();
            // Subtract half the line width to keep the stroke within the boundary
            ctx.arc(centerPxX, centerPxY, radiusPx - (ctx.lineWidth / 2), 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
    
    ctx.restore();
}

/**
 * Renders the top and left coordinate rulers.
 */
function renderRulers(spacing: number, horizontalOffset: number, verticalRulerOffset: number) {
    if (!topRulerCtx || !leftRulerCtx || !canvasWrapper) return;

    const RULER_BREADTH = 35; // Matches CSS
    const FONT_COLOR = '#a0a0a0';
    const FONT_STYLE = '11px Inter, sans-serif';
    const HIGHLIGHT_BG = '#007acc';
    const HIGHLIGHT_FG = '#ffffff';

    // --- Top Ruler (Horizontal) ---
    const topRulerWidth = canvasWrapper.clientWidth;
    if (topRulerCanvas.width !== topRulerWidth) topRulerCanvas.width = topRulerWidth;
    if (topRulerCanvas.height !== RULER_BREADTH) topRulerCanvas.height = RULER_BREADTH;
    topRulerCanvas.style.width = `${topRulerWidth}px`;
    topRulerCanvas.style.height = `${RULER_BREADTH}px`;
    
    topRulerCtx.clearRect(0, 0, topRulerCanvas.width, topRulerCanvas.height);
    topRulerCtx.font = FONT_STYLE;
    topRulerCtx.textAlign = 'center';
    topRulerCtx.textBaseline = 'middle';

    for (let x = 0; x < gridWidth; x++) {
        // The absolute artboard coordinate for this column
        const absoluteCoordX = x + artboardOffset.x;
        // The display number is always relative to the viewport (e.g., 1, 2, 3...)
        const displayNumber = x + 1;
        const isHighlighted = hoveredCoords !== null && hoveredCoords.x === absoluteCoordX;
        const canvasX = horizontalOffset + x * spacing + (spacing / 2);

        if (isHighlighted) {
            topRulerCtx.fillStyle = HIGHLIGHT_BG;
            topRulerCtx.fillRect(horizontalOffset + x * spacing, 0, spacing, RULER_BREADTH);
            topRulerCtx.fillStyle = HIGHLIGHT_FG;
        } else {
            topRulerCtx.fillStyle = FONT_COLOR;
        }
        
        topRulerCtx.fillText(String(displayNumber), canvasX, RULER_BREADTH / 2);
    }

    // --- Left Ruler (Vertical) ---
    const leftRulerHeight = canvasWrapper.clientHeight;
    if (leftRulerCanvas.height !== leftRulerHeight) leftRulerCanvas.height = leftRulerHeight;
    if (leftRulerCanvas.width !== RULER_BREADTH) leftRulerCanvas.width = RULER_BREADTH;
    leftRulerCanvas.style.height = `${leftRulerHeight}px`;
    leftRulerCanvas.style.width = `${RULER_BREADTH}px`;

    leftRulerCtx.clearRect(0, 0, leftRulerCanvas.width, leftRulerCanvas.height);
    leftRulerCtx.font = FONT_STYLE;
    leftRulerCtx.textAlign = 'center';
    leftRulerCtx.textBaseline = 'middle';
    
    for (let y = 0; y < gridHeight; y++) {
        // The absolute artboard coordinate for this row
        const absoluteCoordY = y + artboardOffset.y;
        // The display number is always relative to the viewport (e.g., 1, 2, 3...)
        const displayNumber = y + 1;
        const isHighlighted = hoveredCoords !== null && hoveredCoords.y === absoluteCoordY;
        const canvasY = verticalRulerOffset + y * spacing + (spacing / 2);
        
        if (isHighlighted) {
            leftRulerCtx.fillStyle = HIGHLIGHT_BG;
            leftRulerCtx.fillRect(0, verticalRulerOffset + y * spacing, RULER_BREADTH, spacing);
            leftRulerCtx.fillStyle = HIGHLIGHT_FG;
        } else {
            leftRulerCtx.fillStyle = FONT_COLOR;
        }
        
        leftRulerCtx.fillText(String(displayNumber), RULER_BREADTH / 2, canvasY);
    }
}


/**
 * Renders a small preview of the current viewport.
 */
function renderCanvasPreview() {
    if (!ctxPreview || !canvasPreview) { return; };
    ctxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height);
    
    // Use the main canvas as the source for the preview
    // This correctly captures both Generate and Logo Top modes
    const mainCanvasWidth = canvas.width;
    const mainCanvasHeight = canvas.height;

    const previewDisplayWidth = 160;
    const previewDisplayHeight = 100;

    // Calculate aspect ratios
    const mainAspect = mainCanvasWidth / mainCanvasHeight;
    const previewAspect = previewDisplayWidth / previewDisplayHeight;

    let drawWidth, drawHeight, dx, dy;

    if (mainAspect > previewAspect) {
        // Main canvas is wider, fit to preview width
        drawWidth = previewDisplayWidth;
        drawHeight = drawWidth / mainAspect;
        dx = 0;
        dy = (previewDisplayHeight - drawHeight) / 2;
    } else {
        // Main canvas is taller or same ratio, fit to preview height
        drawHeight = previewDisplayHeight;
        drawWidth = drawHeight * mainAspect;
        dy = 0;
        dx = (previewDisplayWidth - drawWidth) / 2;
    }
    
    canvasPreview.width = previewDisplayWidth;
    canvasPreview.height = previewDisplayHeight;

    // Fill background of preview
    ctxPreview.fillStyle = '#000000';
    ctxPreview.fillRect(0, 0, previewDisplayWidth, previewDisplayHeight);

    // Draw the main canvas content into the preview canvas
    ctxPreview.drawImage(canvas, dx, dy, drawWidth, drawHeight);
}



/**
 * Draws a single dot on a given canvas context.
 */
function drawDot(
    context: CanvasRenderingContext2D,
    x: number, y: number,
    color: string,
    radius: number,
    spacing: number
) {
    const centerX = x * spacing + spacing / 2;
    const centerY = y * spacing + spacing / 2;
    
    let finalColor = color;
    if (color === MASK_COLOR) {
        finalColor = MASK_DISPLAY_COLOR;
    }

    // Apply glow effect if enabled
    if (isGlowEnabled && color !== MASK_COLOR) {
        context.shadowBlur = 8;
        context.shadowColor = finalColor;
    }

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = finalColor;
    context.fill();

    // Reset shadow effect to not affect subsequent drawings in the same frame
    if (isGlowEnabled && color !== MASK_COLOR) {
        context.shadowBlur = 0;
    }
}


// --- EVENT HANDLERS ---

function handleNewProject() {
    // If there's no work on the canvas, reset immediately.
    if (pixelData.size === 0 && !logoTopCircles && !logoTopState) {
        resetProject();
        return;
    }

    // If there is work, show the confirmation modal.
    showSaveConfirmModal();
}

function resetProject() {
    cancelTextPlacementMode();
    deselect(true); // Hard deselect without saving state
    
    // Clear main data
    pixelData.clear();
    logoTopCircles = null;
    logoTopState = null;
    logoTopCircleGrid = null;
    generatedBackgroundData = null;
    isLogoGuideVisible = false;
    
    // Reset history
    resetHistory();

    // Reset file/image state
    originalImage = null;
    originalImagePreview.classList.add('hidden');
    sourceImageEl.src = '';
    fileNameSpan.textContent = 'No file chosen...';
    uploadInput.value = '';

    // Reset logo top state
    artboardWidthInches = 23;
    artboardHeightInches = 23;
    artboardWidthMM = artboardWidthInches * INCH_TO_MM;
    artboardHeightMM = artboardHeightInches * INCH_TO_MM;
    logoTopSizeSelect.value = '23x23';
    logoTopCustomSizeContainer.classList.add('hidden');

    logoUploadInput.value = '';
    logoFileNameSpan.textContent = 'No file chosen...';
    logoPreviewBox.classList.add('hidden');
    logoPreviewImage.src = '';
    logoSensitivitySlider.disabled = true;
    generateLogoTopBtn.disabled = true;
    generateLogoTopEdgesBtn.disabled = true;
    adjustLogoBtn.disabled = true;
    hideLogoBtn.disabled = true;
    hideLogoBtn.textContent = 'Hide Logo';
    logoFillPatternSelect.value = 'hexagonal';
    logoFillPatternSelect.disabled = true;
    logoInvertCheckbox.checked = false;
    logoInvertCheckbox.disabled = true;
    logoTopPreviewPoint = null;
    logoTopView = {
        scale: 1.0,
        offsetX: artboardWidthMM / 2,
        offsetY: artboardHeightMM / 2,
    };
    zoomSlider.value = '1.0';
    handleClearCurvePath();


    if (isAdjustingLogo) {
        handleToggleAdjustLogo();
    }
    // Keep logoCircleSizeSelect enabled in logo-top mode
    if (modeGenerateBtn.classList.contains('active')) {
        logoCircleSizeSelect.disabled = true;
        logoCircleSeparationInput.disabled = true;
    }
    logoCircleSizeSelect.value = '0.5';
    logoCircleSeparationInput.value = '12';


    // Reset tracing overlay
    handleClearOverlay();

    // Reset transforms and viewport
    resetTransforms();
    
    // Reset UI controls to their default state
    scaleSlider.value = '1';
    logoSensitivitySlider.value = '20';
    sizeSelect.value = '51x26'; // Default size
    customSizeContainer.classList.add('hidden');
    textInput.value = '';
    textSizeInput.value = '1';
    
    // Apply changes from UI controls
    updateGridSizeFromSelect();
    updateTransformControlsState(false);
    updateSliderValues();
    
    // Toggle off optional modes
    if (isGlowEnabled) {
        toggleLightEffect();
    }
    
    // Update button states
    updateControlStates();
    
    // Final render
    renderCanvas();
}

function handleHotkeys(event: KeyboardEvent) {
    if (event.key === 'Escape') {
        if (!saveConfirmModal.classList.contains('hidden')) {
            hideSaveConfirmModal();
            event.preventDefault(); return;
        }
        if (!hotkeyPopover.classList.contains('hidden')) {
            hotkeyPopover.classList.add('hidden');
            hotkeyHelpBtn.classList.remove('active');
            event.preventDefault(); return;
        }
        if (modeLogoTopBtn.classList.contains('active') && brushToolSelect.value === 'curve' && curvePath.length > 0) {
            handleClearCurvePath();
            event.preventDefault(); return;
        }
        if (selection || floatingSelection || lassoPoints) {
            deselect();
            event.preventDefault(); return;
        }
    }
    
    if (event.key === 'Backspace') {
        if (lassoPoints && lassoPoints.length > 0) {
            lassoPoints.pop();
            renderCanvas();
            event.preventDefault(); return;
        }
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selection && !floatingSelection) {
            handleDeleteSelection();
            event.preventDefault(); return;
        }
    }

    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || !saveConfirmModal.classList.contains('hidden')) {
        return;
    }

    if (event.key === 'Enter') {
        if (modeLogoTopBtn.classList.contains('active') && brushToolSelect.value === 'curve' && !isCurvePathFinalized) {
             finalizeCurvePath(false); // Finalize as open path
             event.preventDefault(); return;
        }
    }
    
    if (event.ctrlKey || event.metaKey) {
         switch (event.key.toLowerCase()) {
            case 'z': event.preventDefault(); undoBtn.click(); break;
            case 'y': event.preventDefault(); redoBtn.click(); break;
        }
    }

    // Allow panning hotkey in both modes
    if (event.key.toLowerCase() === 'h') {
        panModeBtn.click();
    }

    if(modeLogoTopBtn.classList.contains('active')) {
        return; // Don't process generate-mode hotkeys
    };

    if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
            case 'c': event.preventDefault(); handleCopy(); break;
            case 'x': event.preventDefault(); handleCut(); break;
            case 'v': event.preventDefault(); handlePaste(); break;
            case 's':
                event.preventDefault();
                if (event.altKey) {
                    downloadBtn.click();
                } else {
                    handleSaveProject();
                }
                break;
        }
        return;
    }

    let toolChanged = false;
    switch (event.key.toLowerCase()) {
        case 'b': brushToolSelect.value = 'pencil'; toolChanged = true; break;
        case 'm': brushToolSelect.value = event.shiftKey ? 'circle' : 'square'; toolChanged = true; break;
        case 'g': brushToolSelect.value = event.shiftKey ? 'bucket-global' : 'bucket-area'; toolChanged = true; break;
        case 's': selectToolBtn.click(); break;
        case 'l': lightEffectBtn.click(); break;
    }
    
    if (toolChanged) {
        handleToolChange();
    }
}

function handleOverlayUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            overlayImage = {
                image: img,
                artboardX: artboardOffset.x, // Place at current view origin
                artboardY: artboardOffset.y,
                widthInCells: gridWidth,
                heightInCells: gridHeight,
                opacity: parseFloat(overlayOpacitySlider.value),
                isVisible: true
            };
            overlayFileNameSpan.textContent = file.name;
            overlayOpacitySlider.disabled = false;
            toggleOverlayBtn.disabled = false;
            toggleOverlayBtn.textContent = 'Hide Overlay';
            fitToGridBtn.disabled = false;
            adjustOverlayBtn.disabled = false;
            renderCanvas();
        };
        img.onerror = () => {
            alert('Could not load the overlay image.');
            overlayFileNameSpan.textContent = 'Error loading file.';
        };
        img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    
    // Reset input
    overlayUploadInput.value = '';
}

function handleOverlayOpacityChange(event: Event) {
    if (!overlayImage) return;
    const newOpacity = parseFloat((event.target as HTMLInputElement).value);
    overlayImage.opacity = newOpacity;
    renderCanvas();
}

function handleToggleOverlayVisibility() {
    if (!overlayImage) return;
    overlayImage.isVisible = !overlayImage.isVisible;
    toggleOverlayBtn.textContent = overlayImage.isVisible ? 'Hide Overlay' : 'Show Overlay';
    renderCanvas();
}

function handleClearOverlay() {
    overlayImage = null;
    overlayUploadInput.value = '';
    if (overlayFileNameSpan) {
        overlayFileNameSpan.textContent = 'No file chosen...';
    }
    overlayOpacitySlider.disabled = true;
    toggleOverlayBtn.disabled = true;
    toggleOverlayBtn.textContent = 'Hide Overlay';
    fitToGridBtn.disabled = true;
    adjustOverlayBtn.disabled = true;
    if (isAdjustingOverlay) {
        handleToggleAdjustOverlay(); // Turn off adjust mode if it was on
    }
    renderCanvas();
}

function handleFitToGrid() {
    if (!overlayImage) return;
    overlayImage.artboardX = artboardOffset.x;
    overlayImage.artboardY = artboardOffset.y;
    overlayImage.widthInCells = gridWidth;
    overlayImage.heightInCells = gridHeight;
    renderCanvas();
}

// --- OVERLAY MANIPULATION ---

/** Toggles the adjustment mode for the overlay. */
function handleToggleAdjustOverlay() {
    if (!overlayImage) return;
    isAdjustingOverlay = !isAdjustingOverlay;
    adjustOverlayBtn.classList.toggle('active', isAdjustingOverlay);
    renderCanvas();
}


/** Handles mouse down events on the overlay canvas for moving and resizing. */
function handleOverlayMouseDown(event: MouseEvent) {
    if (!isAdjustingOverlay || !overlayImage || event.button !== 0) return;

    const rect = overlayCanvas.getBoundingClientRect();
    const spacing = getSpacing();
    
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const screenX = (overlayImage.artboardX - artboardOffset.x) * spacing;
    const screenY = (overlayImage.artboardY - artboardOffset.y) * spacing;
    const screenWidth = overlayImage.widthInCells * spacing;
    const screenHeight = overlayImage.heightInCells * spacing;
    const handleSize = 10;
    const halfHandle = handleSize / 2;

    const handles = {
        'top-left':     { x: screenX, y: screenY },
        'top-right':    { x: screenX + screenWidth, y: screenY },
        'bottom-left':  { x: screenX, y: screenY + screenHeight },
        'bottom-right': { x: screenX + screenWidth, y: screenY + screenHeight },
        'top':          { x: screenX + screenWidth/2, y: screenY },
        'bottom':       { x: screenX + screenWidth/2, y: screenY + screenHeight },
        'left':         { x: screenX, y: screenY + screenHeight/2 },
        'right':        { x: screenX + screenWidth, y: screenY + screenHeight/2 },
    };

    let handleFound = null;
    for (const [name, pos] of Object.entries(handles)) {
        if (mouseX >= pos.x - halfHandle && mouseX <= pos.x + halfHandle &&
            mouseY >= pos.y - halfHandle && mouseY <= pos.y + halfHandle) {
            handleFound = name;
            break;
        }
    }

    if (handleFound) {
        isResizingOverlay = true;
        resizeHandle = handleFound;
    } else if (mouseX >= screenX && mouseX <= screenX + screenWidth &&
               mouseY >= screenY && mouseY <= screenY + screenHeight) {
        isMovingOverlay = true;
    }

    if (isMovingOverlay || isResizingOverlay) {
        overlayDragStart = { x: event.clientX, y: event.clientY };
        overlayStartRect = { ...overlayImage };
    }
}

/** Handles mouse move for overlay adjustments. */
function handleOverlayMouseMove(event: MouseEvent) {
    if (!isAdjustingOverlay || !overlayImage) {
        // Update cursor style on hover even when not dragging
        updateHoverState(screenToGrid(event));
        return;
    }

    if (!isMovingOverlay && !isResizingOverlay) return;

    const spacing = getSpacing();
    if (spacing === 0) return;

    const dxCells = (event.clientX - overlayDragStart.x) / spacing;
    const dyCells = (event.clientY - overlayDragStart.y) / spacing;
    
    let { artboardX, artboardY, widthInCells, heightInCells } = overlayStartRect;
    
    if (isMovingOverlay) {
        overlayImage.artboardX = Math.round(artboardX + dxCells);
        overlayImage.artboardY = Math.round(artboardY + dyCells);
    } else if (isResizingOverlay) {
        if (resizeHandle?.includes('left')) {
            const dw = Math.round(dxCells);
            overlayImage.artboardX = artboardX + dw;
            overlayImage.widthInCells = Math.max(1, widthInCells - dw);
        }
        if (resizeHandle?.includes('right')) {
            overlayImage.widthInCells = Math.max(1, widthInCells + Math.round(dxCells));
        }
        if (resizeHandle?.includes('top')) {
            const dh = Math.round(dyCells);
            overlayImage.artboardY = artboardY + dh;
            overlayImage.heightInCells = Math.max(1, heightInCells - dh);
        }
        if (resizeHandle?.includes('bottom')) {
            overlayImage.heightInCells = Math.max(1, heightInCells + Math.round(dyCells));
        }
    }

    renderCanvas();
}

/** Handles mouse leave/up for overlay adjustments. */
function handleOverlayMouseLeave() {
    if (isMovingOverlay || isResizingOverlay) {
        isMovingOverlay = false;
        isResizingOverlay = false;
        resizeHandle = null;
    }
    overlayCanvas.style.cursor = 'default';
}

function handleImageUpload(event: Event) {
    cancelTextPlacementMode();
    deselect();
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.pixelart')) {
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const projectData = JSON.parse(text);
                
                // --- Load GENERATE project ---
                resetProject();
                switchMode('generate');

                if (!projectData.gridWidth || !projectData.gridHeight || !projectData.pixelData) {
                    throw new Error("Invalid project file format.");
                }
                
                gridWidth = projectData.gridWidth;
                gridHeight = projectData.gridHeight;
                let loadedPixelData = new Map<string, string>(projectData.pixelData);
                artboardOffset = projectData.artboardOffset || {x: 0, y: 0};
                
                if (loadedPixelData.size > 0) {
                    let minX = Infinity; let minY = Infinity;
                    for (const key of loadedPixelData.keys()) {
                        const [x, y] = key.split(',').map(Number);
                        if (x < minX) minX = x; if (y < minY) minY = y;
                    }
                    if (minX !== 0 || minY !== 0) {
                        const shiftX = -minX; const shiftY = -minY;
                        const newPixelData = new Map<string, string>();
                        for (const [key, color] of loadedPixelData.entries()) {
                            const [x, y] = key.split(',').map(Number);
                            newPixelData.set(`${x + shiftX},${y + shiftY}`, color);
                        }
                        loadedPixelData = newPixelData;
                        artboardOffset.x += shiftX; artboardOffset.y += shiftY;
                    }
                }
                pixelData = loadedPixelData;

                const sizeValue = `${gridWidth}x${gridHeight}`;
                if ([...sizeSelect.options].some(opt => opt.value === sizeValue)) {
                    sizeSelect.value = sizeValue;
                    customSizeContainer.classList.add('hidden');
                } else {
                     sizeSelect.value = 'custom';
                     customWidthInput.value = String(gridWidth);
                     customHeightInput.value = String(gridHeight);
                     customSizeContainer.classList.remove('hidden');
                }
                originalImage = null;
                originalImagePreview.classList.add('hidden');
                fileNameSpan.textContent = file.name;
                generatedBackgroundData = null;
                scale = 1.0;
                scaleSlider.value = '1';
                panOffset = { x: 0, y: 0 };
                if (isPanMode) {
                    isPanMode = false;
                    panModeBtn.classList.remove('active');
                }
                updateTransformControlsState(false);
                updateSliderValues();
                resetHistory();
                updateControlStates();
                renderCanvas();
            } catch (error) {
                console.error("Error loading project file:", error);
                alert("Could not load project file. It may be corrupt or in the wrong format.");
                fileNameSpan.textContent = "Error loading project.";
            }
        };
        reader.readAsText(file);
    } else { // This is an image file
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                switchMode('generate'); 
                sourceImageEl.src = originalImage!.src;
                originalImagePreview.classList.remove('hidden');
                fileNameSpan.textContent = file.name;
                resetTransforms();
                updateTransformControlsState(true);
                updateSliderValues();
                processImage();
            };
            originalImage.onerror = () => {
                console.error("Error loading image.");
                fileNameSpan.textContent = "Error loading file.";
            };
            originalImage.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
    
    // Reset file input to allow uploading the same file again
    uploadInput.value = '';
}

function handleSizeChange() {
    // If user selects "Custom...", just show the controls and wait for them to click "Apply".
    if (sizeSelect.value === 'custom') {
        // Pre-fill inputs with current grid size
        customWidthInput.value = String(gridWidth);
        customHeightInput.value = String(gridHeight);
        customSizeContainer.classList.remove('hidden');
        return;
    }

    // Otherwise, it's a standard size change. Hide custom controls.
    customSizeContainer.classList.add('hidden');
    
    cancelTextPlacementMode();
    deselect();
    saveState(); // Save the current artwork so the resize is undoable.

    updateGridSizeFromSelect();

    // The main pixelData is preserved, but we clear related states
    // that are dependent on the old size or are part of the image import flow.
    generatedBackgroundData = null; // Clear temp background as it's size-dependent
    originalImage = null;
    originalImagePreview.classList.add('hidden');
    fileNameSpan.textContent = 'No file chosen...';
    uploadInput.value = ''; // Reset file input

    resetTransforms(); // Reset pan/zoom and image scale to defaults
    updateTransformControlsState(false); // Disable image controls since the source image is cleared
    updateSliderValues(); // Update UI labels for sliders

    // By not clearing pixelData, the user's work is kept.
    // By not resetting history, the resize operation can be undone.

    updateControlStates(); // Update enabled/disabled state of buttons
    renderCanvas();
}

function applyCustomSize() {
    const width = parseInt(customWidthInput.value, 10);
    const height = parseInt(customHeightInput.value, 10);

    if (isNaN(width) || isNaN(height) || width < 1 || height < 1 || width > 200 || height > 200) {
        alert("Please enter valid dimensions for width and height (1-200).");
        return;
    }

    // If size hasn't changed, do nothing.
    if (width === gridWidth && height === gridHeight) {
        return;
    }

    cancelTextPlacementMode();
    deselect();
    saveState();

    gridWidth = width;
    gridHeight = height;

    // This logic is duplicated from handleSizeChange for consistency
    generatedBackgroundData = null;
    originalImage = null;
    originalImagePreview.classList.add('hidden');
    fileNameSpan.textContent = 'No file chosen...';
    uploadInput.value = '';

    resetTransforms();
    updateTransformControlsState(false);
    updateSliderValues();

    updateControlStates();
    renderCanvas();
}

// --- MASTER MOUSE HANDLERS (DISPATCHERS) ---

function handleMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;

    if (isPanMode) {
        handlePanStart(event);
        return;
    }

    if (modeLogoTopBtn.classList.contains('active')) {
        handleLogoTopMouseDown(event);
    } else {
        handleGenerateMouseDown(event);
    }
}

function handleMouseMove(event: MouseEvent) {
    if (isPanMode && isDragging) {
        handlePanMove(event);
        return;
    }

    if (modeLogoTopBtn.classList.contains('active')) {
        handleLogoTopMouseMove(event);
    } else {
        handleGenerateMouseMove(event);
    }
}

function handleMouseUp(event: MouseEvent) {
    if (isPanMode && isDragging) {
        handlePanEnd();
        return;
    }

    if (modeLogoTopBtn.classList.contains('active')) {
        handleLogoTopMouseUp(event);
    } else {
        handleGenerateMouseUp(event);
    }
}

// --- GENERATE MODE MOUSE HANDLERS ---

function handleGenerateMouseDown(event: MouseEvent) {
    const coords = screenToGrid(event);

    if (floatingSelection) {
        if (coords && isPointInFloatingSelection(coords.x, coords.y)) {
            isDragging = true;
            dragStart = { x: event.clientX, y: event.clientY };
            floatingSelectionStartPos = { x: floatingSelection.artboardX, y: floatingSelection.artboardY };
            return;
        } else {
            deselect();
        }
    }

    if (selection) {
        if (coords && isPointInSelection(coords.x, coords.y)) {
            isDragging = true;
            dragStart = { x: event.clientX, y: event.clientY };
            return;
        } else {
            deselect();
        }
    }
    
    if (isSelectionMode) {
        if (!coords) return;
        isDrawing = true; // Stay in "drawing" mode while creating the polygon
        if (!lassoPoints) {
            deselect();
            lassoPoints = [];
        }
        const startPoint = lassoPoints[0];
        if (lassoPoints.length >= 3 && startPoint &&
            Math.abs(startPoint.x - coords.x) <= 0 && Math.abs(startPoint.y - coords.y) <= 0) {
            finalizeLassoSelection();
        } else {
            lassoPoints.push(coords);
        }
        renderCanvas();
        return;
    }

    if (event.shiftKey) { handleEyedropper(event); return; }
    if (isTextPlacementMode) { placeTextOnCanvas(event); return; }

    isDrawing = true;
    saveState();
    commitGeneratedBackground();
    applyToolAt(event);
    renderCanvas();
}

function handleGenerateMouseMove(event: MouseEvent) {
    const coords = screenToGrid(event);

    if (isDragging && floatingSelection) {
        const spacing = getSpacing();
        const dx = Math.round((event.clientX - dragStart.x) / spacing);
        const dy = Math.round((event.clientY - dragStart.y) / spacing);
        floatingSelection.artboardX = floatingSelectionStartPos.x + dx;
        floatingSelection.artboardY = floatingSelectionStartPos.y + dy;
        renderCanvas();
        return;
    }

    if (isDragging && selection && !floatingSelection) {
        liftSelection();
        floatingSelectionStartPos = { x: floatingSelection!.artboardX, y: floatingSelection!.artboardY };
        return;
    }

    if (isSelectionMode && lassoPoints) {
        lassoPreviewPoint = coords;
        renderCanvas();
        return;
    }
    
    if (!isDrawing) { updateHoverState(coords); }

    if (isDrawing) {
        const tool = brushToolSelect.value;
        if (['pencil', 'square', 'circle'].includes(tool)) {
            applyToolAt(event);
        }
    }
}

function handleGenerateMouseUp(event: MouseEvent) {
    if (isSelectionMode) {
        // Do not end drawing on mouse up for polygonal lasso
        return;
    }
    if (isDragging) { isDragging = false; }
    if (isDrawing) {
        updateControlStates();
    }
    isDrawing = false;
    renderCanvas();
}

// --- LOGO TOP MODE MOUSE HANDLERS ---

function handleLogoTopMouseDown(event: MouseEvent) {
    if (isAdjustingLogo) {
        handleLogoTopAdjustmentMouseDown(event);
        return;
    }

    const coords = screenToLogoArtboard(event);
    if (!coords) return;

    const tool = brushToolSelect.value;

    switch (tool) {
        case 'freehand':
            if (selectedColor === MASK_COLOR) {
                alert("Please select a color before adding circles.");
                return;
            }
            isDrawing = true;
            saveState();
            if (!logoTopCircles) logoTopCircles = [];
            buildLogoTopCircleGrid(); // Ensure grid is up-to-date before drawing
            drawFreehandStroke(coords); // Add the first circle
            break;
        
        case 'eraser':
            isDrawing = true;
            saveState();
            applyLogoTopEraser(coords);
            break;
        case 'curve':
            if (isCurvePathFinalized) return;
            saveState();
    
            // Check if closing path
            if (curvePath.length >= 2) {
                 const firstPoint = curvePath[0];
                 const distSq = (coords.x - firstPoint.p.x)**2 + (coords.y - firstPoint.p.y)**2;
                 const closeThreshold = 10 / logoTopView.scale; // 10px click radius
                 if (distSq < closeThreshold * closeThreshold) {
                     finalizeCurvePath(true);
                     return;
                 }
            }
            
            isCreatingCurvePoint = true;
            const newPoint: CurvePoint = {
                p: { ...coords },
                h1: { ...coords },
                h2: { ...coords }
            };
            
            // If there's a previous point, connect the curves smoothly
            if (curvePath.length > 0) {
                const prevPoint = curvePath[curvePath.length - 1];
                newPoint.h1.x = prevPoint.p.x * 2 - prevPoint.h2.x;
                newPoint.h1.y = prevPoint.p.y * 2 - prevPoint.h2.y;
            }
    
            curvePath.push(newPoint);
            break;
    }
    renderCanvas();
}

function handleLogoTopMouseMove(event: MouseEvent) {
    if (isAdjustingLogo) {
        handleLogoTopAdjustmentMouseMove(event);
        return;
    }
    
    const coords = screenToLogoArtboard(event);
    logoTopPreviewPoint = coords; // Update preview for all tools

    const tool = brushToolSelect.value;
    if (coords && isDrawing) {
        switch (tool) {
            case 'freehand':
                drawFreehandStroke(coords);
                break;
            case 'eraser':
                if (coords) applyLogoTopEraser(coords);
                break;
            case 'curve':
                 if (isCreatingCurvePoint && curvePath.length > 0) {
                    const currentPoint = curvePath[curvePath.length - 1];
                    // User is dragging to create a smooth point. Set the outgoing handle.
                    currentPoint.h2.x = coords.x;
                    currentPoint.h2.y = coords.y;
        
                    // Make the incoming handle a reflection for a smooth curve
                    currentPoint.h1.x = currentPoint.p.x * 2 - currentPoint.h2.x;
                    currentPoint.h1.y = currentPoint.p.y * 2 - currentPoint.h2.y;
                }
                break;
        }
    }
    renderCanvas();
}

function handleLogoTopMouseUp(event: MouseEvent) {
    if (isAdjustingLogo) {
        handleLogoTopAdjustmentMouseUp();
    } else {
        const tool = brushToolSelect.value;
        if (tool === 'eraser' && isDrawing) {
            buildLogoTopCircleGrid(); // Rebuild grid after erasing is done
        }
        if (tool === 'curve') {
            isCreatingCurvePoint = false;
        }
    }
    isDrawing = false;
    lastDrawnCirclePos = null; // For freehand tool
}

// --- LOGO MANIPULATION ---
function handleLogoTopAdjustmentMouseDown(event: MouseEvent) {
    if (!isAdjustingLogo || !logoTopState || event.button !== 0) return;

    const metrics = getLogoTopViewMetrics();
    if (!metrics) return;
    const { viewScale, offsetX, offsetY } = metrics;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const screenX = logoTopState.artboardX * viewScale + offsetX;
    const screenY = logoTopState.artboardY * viewScale + offsetY;
    const screenWidth = logoTopState.widthMM * viewScale;
    const screenHeight = logoTopState.heightMM * viewScale;
    const handleSize = 10;
    const halfHandle = handleSize / 2;

    const handles = {
        'top-left':     { x: screenX, y: screenY },
        'top-right':    { x: screenX + screenWidth, y: screenY },
        'bottom-left':  { x: screenX, y: screenY + screenHeight },
        'bottom-right': { x: screenX + screenWidth, y: screenY + screenHeight },
        'top':          { x: screenX + screenWidth/2, y: screenY },
        'bottom':       { x: screenX + screenWidth/2, y: screenY + screenHeight },
        'left':         { x: screenX, y: screenY + screenHeight/2 },
        'right':        { x: screenX + screenWidth, y: screenY + screenHeight/2 },
    };

    let handleFound = null;
    for (const [name, pos] of Object.entries(handles)) {
        if (mouseX >= pos.x - halfHandle && mouseX <= pos.x + halfHandle &&
            mouseY >= pos.y - halfHandle && mouseY <= pos.y + halfHandle) {
            handleFound = name;
            break;
        }
    }

    if (handleFound) {
        isResizingLogo = true;
        logoResizeHandle = handleFound;
    } else if (mouseX >= screenX && mouseX <= screenX + screenWidth &&
               mouseY >= screenY && mouseY <= screenY + screenHeight) {
        isMovingLogo = true;
    }

    if (isMovingLogo || isResizingLogo) {
        logoDragStart = { x: event.clientX, y: event.clientY };
        logoStartRect = { ...logoTopState };
    }
}

function handleLogoTopAdjustmentMouseMove(event: MouseEvent) {
    if (!isAdjustingLogo || !logoTopState) {
        // Update cursor style on hover even when not dragging
        // TODO: This logic is complex, maybe just set a default move cursor for now.
        canvas.style.cursor = 'move';
        return;
    }
    
    if (!isMovingLogo && !isResizingLogo) return;

    const metrics = getLogoTopViewMetrics();
    if (!metrics) return;
    const { viewScale } = metrics;
    if (viewScale === 0) return;

    const dxMM = (event.clientX - logoDragStart.x) / viewScale;
    const dyMM = (event.clientY - logoDragStart.y) / viewScale;
    
    let { artboardX, artboardY, widthMM, heightMM } = logoStartRect;
    
    if (isMovingLogo) {
        logoTopState.artboardX = artboardX + dxMM;
        logoTopState.artboardY = artboardY + dyMM;
    } else if (isResizingLogo) {
        const aspect = logoStartRect.widthMM / logoStartRect.heightMM;
        
        if (logoResizeHandle?.includes('left')) {
            const dw = dxMM;
            logoTopState.artboardX = artboardX + dw;
            logoTopState.widthMM = Math.max(1, widthMM - dw);
            if (event.shiftKey) logoTopState.heightMM = logoTopState.widthMM / aspect;
        }
        if (logoResizeHandle?.includes('right')) {
            logoTopState.widthMM = Math.max(1, widthMM + dxMM);
            if (event.shiftKey) logoTopState.heightMM = logoTopState.widthMM / aspect;
        }
        if (logoResizeHandle?.includes('top')) {
            const dh = dyMM;
            logoTopState.artboardY = artboardY + dh;
            logoTopState.heightMM = Math.max(1, heightMM - dh);
             if (event.shiftKey) {
                const newWidth = logoTopState.heightMM * aspect;
                logoTopState.artboardX += logoTopState.widthMM - newWidth;
                logoTopState.widthMM = newWidth;
            }
        }
        if (logoResizeHandle?.includes('bottom')) {
            logoTopState.heightMM = Math.max(1, heightMM + dyMM);
            if (event.shiftKey) logoTopState.widthMM = logoTopState.heightMM * aspect;
        }
    }

    renderCanvas();
}

function handleLogoTopAdjustmentMouseUp() {
    if (isMovingLogo || isResizingLogo) {
        saveState();
        isMovingLogo = false;
        isResizingLogo = false;
        logoResizeHandle = null;
    }
}

function handleLogoTopAdjustmentMouseLeave() {
    if (isMovingLogo || isResizingLogo) {
        handleLogoTopAdjustmentMouseUp();
    }
    canvas.style.cursor = 'default';
}

// --- OTHER EVENT HANDLERS ---

function handleDoubleClick() {
    if (isSelectionMode && lassoPoints && lassoPoints.length >= 3) {
        finalizeLassoSelection();
    }
}

function handleMouseLeave() {
    if (isPanMode && isDragging) {
        handlePanEnd();
    }
    isDragging = false;
    isDrawing = false;
    isCreatingCurvePoint = false;
    lastDrawnCirclePos = null;
    lassoPreviewPoint = null;
    logoTopPreviewPoint = null;

    if (hoveredCoords) {
        hoveredCoords = null;
    }
    
    // Mode-specific leave logic
    if (modeLogoTopBtn.classList.contains('active')) {
        handleLogoTopAdjustmentMouseLeave();
    }
    renderCanvas();
}

function handleZoomSliderInput() {
    logoTopView.scale = parseFloat(zoomSlider.value);
    renderCanvas();
}

function handleZoomIn() {
    saveState();
    const currentScale = logoTopView.scale;
    const newScale = Math.min(20, currentScale + 0.5);
    logoTopView.scale = newScale;
    zoomSlider.value = String(newScale);
    renderCanvas();
}

function handleZoomOut() {
    saveState();
    const currentScale = logoTopView.scale;
    const newScale = Math.max(0.1, currentScale - 0.5);
    logoTopView.scale = newScale;
    zoomSlider.value = String(newScale);
    renderCanvas();
}

/**
 * Updates the hovered grid coordinate and canvas cursor style.
 */
function updateHoverState(coords: { x: number, y: number } | null) {
    let newCursor = 'default';
    
    if (isPanMode) {
        newCursor = isDragging ? 'grabbing' : 'grab';
    } else if (isTextPlacementMode) {
        newCursor = 'copy';
    } else if (isSelectionMode) {
        newCursor = 'crosshair';
    } else if (coords && selection && !floatingSelection && isPointInSelection(coords.x, coords.y)) {
        newCursor = 'move';
    } else if (coords && floatingSelection && isPointInFloatingSelection(coords.x, coords.y)) {
        newCursor = 'move';
    }
    
    canvas.style.cursor = newCursor;

    if (!coords && !hoveredCoords) return;
    if (coords && hoveredCoords && coords.x === hoveredCoords.x && coords.y === hoveredCoords.y) return;

    hoveredCoords = coords;
    renderCanvas();
}

function handleEyedropper(event: MouseEvent) {
    const coords = screenToGrid(event);
    if (!coords) return;
    
    const { x, y } = coords;
    const pickedColor = getPixel(x, y);

    if (pickedColor) {
        if ([...LIMITED_PALETTE, MASK_COLOR].includes(pickedColor)) {
            selectColor(pickedColor);
        }
    }
}

function applyLogoTopEraser(coords: { x: number; y: number; }) {
    if (!logoTopCircles) return;
    
    const brushSize = parseInt(brushSizeInput.value, 10) || 1;
    const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
    const circleDiameterMM = circleSizeInches * INCH_TO_MM;
    const separationMM = parseFloat(logoCircleSeparationInput.value) || 0;
    const stepMM = circleDiameterMM + separationMM;
    const brushRadiusMM = (brushSize / 2) * stepMM;
    const brushRadiusSq = brushRadiusMM * brushRadiusMM;

    let needsRender = false;
    const initialCount = logoTopCircles.length;

    logoTopCircles = logoTopCircles.filter(circle => {
        const dx = circle.x - coords.x;
        const dy = circle.y - coords.y;
        return (dx * dx + dy * dy) > brushRadiusSq;
    });

    if (logoTopCircles.length !== initialCount) {
        needsRender = true;
        // Optimization: if a lot of circles were removed, it's faster to just rebuild
        // the grid now instead of waiting for mouseup.
        if (initialCount > logoTopCircles.length + 10) {
            buildLogoTopCircleGrid();
        }
    }

    if (needsRender) {
        renderCanvas();
    }
}

/**
 * Draws a freehand stroke, interpolating circles between mouse events to ensure consistent spacing.
 * @param coords The current mouse coordinates on the artboard.
 */
function drawFreehandStroke(coords: { x: number, y: number }) {
    if (!logoTopCircles) return;

    const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
    const circleDiameterMM = circleSizeInches * INCH_TO_MM;
    const separationMM = parseFloat(logoCircleSeparationInput.value) || 0;
    const step = circleDiameterMM + separationMM;
    if (step <= 0) return;
    const stepSq = step * step;
    let needsRender = false;

    // Helper to add a single circle, returns true if added, false if collision
    const addSingleCircle = (x: number, y: number): boolean => {
        if (logoTopCircleGrid && logoTopGridCellSize > 0) {
            const gridX = Math.floor(x / logoTopGridCellSize);
            const gridY = Math.floor(y / logoTopGridCellSize);
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const key = `${gridX + i},${gridY + j}`;
                    const cell = logoTopCircleGrid.get(key);
                    if (cell) {
                        for (const otherCircle of cell) {
                            const dx_coll = x - otherCircle.x;
                            const dy_coll = y - otherCircle.y;
                            if ((dx_coll * dx_coll + dy_coll * dy_coll) < stepSq) {
                                return false; // Collision
                            }
                        }
                    }
                }
            }
        }
        
        const newCircle = { x, y, color: selectedColor };
        logoTopCircles.push(newCircle);
        needsRender = true;

        if (logoTopCircleGrid && logoTopGridCellSize > 0) {
            const gridX = Math.floor(x / logoTopGridCellSize);
            const gridY = Math.floor(y / logoTopGridCellSize);
            const key = `${gridX},${gridY}`;
            if (!logoTopCircleGrid.has(key)) logoTopCircleGrid.set(key, []);
            logoTopCircleGrid.get(key)!.push(newCircle);
        }
        return true;
    };

    if (!lastDrawnCirclePos) {
        // First point of the stroke
        if (addSingleCircle(coords.x, coords.y)) {
            lastDrawnCirclePos = { ...coords };
        }
    } else {
        const dx = coords.x - lastDrawnCirclePos.x;
        const dy = coords.y - lastDrawnCirclePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist >= step) {
            const unitX = dx / dist;
            const unitY = dy / dist;
            
            const numCirclesToDraw = Math.floor(dist / step);
            
            for (let i = 1; i <= numCirclesToDraw; i++) {
                const newX = lastDrawnCirclePos.x + unitX * i * step;
                const newY = lastDrawnCirclePos.y + unitY * i * step;
                
                if (addSingleCircle(newX, newY)) {
                    lastDrawnCirclePos = { x: newX, y: newY };
                } else {
                    break; // Collision, stop this line segment
                }
            }
        }
    }
    
    if(needsRender) {
        renderCanvas();
    }
}


function applyToolAt(event: MouseEvent) {
    // Do not allow drawing while a selection is being moved.
    if (floatingSelection) return;

    const coords = screenToGrid(event);
    if (!coords) return;

    const { x, y } = coords;
    const tool = brushToolSelect.value;

    switch (tool) {
        case 'pencil':
            drawPencil(x, y);
            break;
        case 'square':
            drawSquare(x, y);
            break;
        case 'circle':
            drawCircle(x, y);
            break;
        case 'bucket-area':
            floodFill(x, y);
            break;
        case 'bucket-global':
            globalFill(x, y);
            break;
    }

    renderCanvas();
}

// --- BACKGROUND GENERATION ---

/** Fills the grid with a horizontal rainbow gradient. */
function generateHorizontalRainbow(grid: string[][]) {
    for (let x = 0; x < gridWidth; x++) {
        const colorIndex = Math.floor((x / gridWidth) * RAINBOW_PALETTE.length);
        const color = RAINBOW_PALETTE[colorIndex];
        for (let y = 0; y < gridHeight; y++) {
            grid[y][x] = color;
        }
    }
}

/** Fills the grid with a vertical rainbow gradient. */
function generateVerticalRainbow(grid: string[][]) {
    for (let y = 0; y < gridHeight; y++) {
        const colorIndex = Math.floor((y / gridHeight) * RAINBOW_PALETTE.length);
        const color = RAINBOW_PALETTE[colorIndex];
        for (let x = 0; x < gridWidth; x++) {
            grid[y][x] = color;
        }
    }
}

/** Fills the grid with random horizontal bands of color. */
function generateHorizontalBands(grid: string[][]) {
    const numBands = Math.floor(Math.random() * 5) + 2;
    let y = 0;
    while (y < gridHeight) {
        const bandHeight = Math.floor(Math.random() * (gridHeight / numBands)) + 1;
        const color = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
        for (let i = y; i < y + bandHeight && i < gridHeight; i++) {
            for (let x = 0; x < gridWidth; x++) {
                grid[i][x] = color;
            }
        }
        y += bandHeight;
    }
}

/** Fills the grid with random vertical bands of color. */
function generateVerticalBands(grid: string[][]) {
    const numBands = Math.floor(Math.random() * 5) + 2;
    let x = 0;
    while (x < gridWidth) {
        const bandWidth = Math.floor(Math.random() * (gridWidth / numBands)) + 2;
        const color = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
        for (let i = x; i < x + bandWidth && i < gridWidth; i++) {
            for (let y = 0; y < gridHeight; y++) {
                grid[y][i] = color;
            }
        }
        x += bandWidth;
    }
}

/** Fills the grid with a checkerboard pattern. */
function generateCheckerboard(grid: string[][]) {
    const color1 = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    let color2 = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    while (color2 === color1) {
        color2 = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    }
    const tileSize = Math.floor(Math.random() * 4) + 1;
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const tileX = Math.floor(x / tileSize);
            const tileY = Math.floor(y / tileSize);
            grid[y][x] = (tileX + tileY) % 2 === 0 ? color1 : color2;
        }
    }
}

/** Fills the grid with a border and a fill color. */
function generateBorder(grid: string[][]) {
    const borderColor = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    let fillColor = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    while (fillColor === borderColor) {
        fillColor = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    }
    const thickness = Math.floor(Math.random() * 3) + 1;

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            if (x < thickness || x >= gridWidth - thickness || y < thickness || y >= gridHeight - thickness) {
                grid[y][x] = borderColor;
            } else {
                grid[y][x] = fillColor;
            }
        }
    }
}

/** Fills the grid with random rectangles (the original method). */
function generateRandomRects(grid: string[][]) {
     let baseColor = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
     if (baseColor === '#ffffff') {
          baseColor = LIMITED_PALETTE[0]; // Black
     }
     for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            grid[y][x] = baseColor;
        }
    }
    const numShapes = Math.floor(Math.random() * (gridWidth / 2)) + (gridWidth / 4);
    for (let i = 0; i < numShapes; i++) {
        const shapeColor = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
        if(shapeColor === baseColor) continue;
        const startX = Math.floor(Math.random() * gridWidth);
        const startY = Math.floor(Math.random() * gridHeight);
        const shapeWidth = Math.floor(Math.random() * (gridWidth / 3)) + 2;
        const shapeHeight = Math.floor(Math.random() * (gridHeight / 3)) + 2;
        for (let y = startY; y < startY + shapeHeight && y < gridHeight; y++) {
            for (let x = startX; x < startX + shapeWidth && x < gridWidth; x++) {
                grid[y][x] = shapeColor;
            }
        }
    }
}

/** Fills the canvas with a tiling of Tetris-like pieces. */
function generateTetrisPattern(grid: string[][]) {
    // 1. Define shapes and all their rotations
    const shapes = {
        'I': [
            [[1, 1, 1, 1]],
            [[1], [1], [1], [1]]
        ],
        'O': [
            [[1, 1], [1, 1]]
        ],
        'T': [
            [[0, 1, 0], [1, 1, 1]],
            [[1, 0], [1, 1], [1, 0]],
            [[1, 1, 1], [0, 1, 0]],
            [[0, 1], [1, 1], [0, 1]]
        ],
        'J': [
            [[1, 0, 0], [1, 1, 1]],
            [[1, 1], [1, 0], [1, 0]],
            [[1, 1, 1], [0, 0, 1]],
            [[0, 1], [0, 1], [1, 1]]
        ],
        'L': [
            [[0, 0, 1], [1, 1, 1]],
            [[1, 0], [1, 0], [1, 1]],
            [[1, 1, 1], [1, 0, 0]],
            [[1, 1], [0, 1], [0, 1]]
        ],
        'S': [
            [[0, 1, 1], [1, 1, 0]],
            [[1, 0], [1, 1], [0, 1]]
        ],
        'Z': [
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1], [1, 1], [1, 0]]
        ],
    };

    const allPieceMatrices: number[][][] = Object.values(shapes).flat();
    const pieceColors = LIMITED_PALETTE.filter(c => c !== '#222222' && c !== '#ffffff');
    const fallbackColor = '#0f8d0f'; // Dark Green as a fallback instead of black/grey

    // 2. Work on a smaller grid where each cell represents a 2x2 block
    const tileGridHeight = Math.floor(gridHeight / 2);
    const tileGridWidth = Math.floor(gridWidth / 2);
    
    if (tileGridHeight === 0 || tileGridWidth === 0) {
        // Grid is too small to tile, just fill with a color
        const color = pieceColors[0] || fallbackColor;
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                grid[y][x] = color;
            }
        }
        return;
    }

    // This grid stores the color for each TILE
    const tempTileGrid: (string | null)[][] = Array.from({ length: tileGridHeight }, () => Array(tileGridWidth).fill(null));

    // 3. Main tiling loop on the tile grid
    for (let y = 0; y < tileGridHeight; y++) {
        for (let x = 0; x < tileGridWidth; x++) {
            if (tempTileGrid[y][x] !== null) continue;

            const shuffledPieces = [...allPieceMatrices].sort(() => Math.random() - 0.5);
            let pieceWasPlaced = false;

            for (const pieceMatrix of shuffledPieces) {
                const pieceHeight = pieceMatrix.length;
                const pieceWidth = pieceMatrix[0].length;

                for (let py = 0; py < pieceHeight; py++) {
                    for (let px = 0; px < pieceWidth; px++) {
                        if (pieceMatrix[py][px] === 0) continue;

                        const anchorY = y - py;
                        const anchorX = x - px;

                        if (anchorY < 0 || anchorX < 0 || anchorY + pieceHeight > tileGridHeight || anchorX + pieceWidth > tileGridWidth) {
                            continue;
                        }

                        let hasOverlap = false;
                        for (let cy = 0; cy < pieceHeight; cy++) {
                            for (let cx = 0; cx < pieceWidth; cx++) {
                                if (pieceMatrix[cy][cx] === 1 && tempTileGrid[anchorY + cy][anchorX + cx] !== null) {
                                    hasOverlap = true;
                                    break;
                                }
                            }
                            if (hasOverlap) break;
                        }

                        if (hasOverlap) continue;

                        const color = pieceColors[Math.floor(Math.random() * pieceColors.length)];
                        for (let cy = 0; cy < pieceHeight; cy++) {
                            for (let cx = 0; cx < pieceWidth; cx++) {
                                if (pieceMatrix[cy][cx] === 1) {
                                    tempTileGrid[anchorY + cy][anchorX + cx] = color;
                                }
                            }
                        }
                        
                        pieceWasPlaced = true;
                        break;
                    }
                    if (pieceWasPlaced) break;
                }
                if (pieceWasPlaced) break;
            }

            if (!pieceWasPlaced) {
                tempTileGrid[y][x] = fallbackColor;
            }
        }
    }

    // 4. Render the scaled-up tile grid onto the final output grid
    // Pre-fill with fallback color to handle odd dimensions
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            grid[y][x] = fallbackColor;
        }
    }

    for (let ty = 0; ty < tileGridHeight; ty++) {
        for (let tx = 0; tx < tileGridWidth; tx++) {
            const color = tempTileGrid[ty][tx] || fallbackColor;
            const startY = ty * 2;
            const startX = tx * 2;
            
            grid[startY][startX] = color;
            grid[startY+1][startX] = color;
            grid[startY][startX+1] = color;
            grid[startY+1][startX+1] = color;
        }
    }
}

/** Fills the grid with concentric circles of color. */
function generateConcentricCircles(grid: string[][]) {
    const centerX = gridWidth / 2;
    const centerY = gridHeight / 2;
    const bandWidth = Math.floor(Math.random() * 3) + 2; // Width of each color ring

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const colorIndex = Math.floor(distance / bandWidth) % RAINBOW_PALETTE.length;
            grid[y][x] = RAINBOW_PALETTE[colorIndex];
        }
    }
}

/** Fills the grid with rays of color from the center. */
function generateStarburst(grid: string[][]) {
    const centerX = gridWidth / 2;
    const centerY = gridHeight / 2;
    const numSlices = RAINBOW_PALETTE.length * (Math.floor(Math.random() * 2) + 1); // e.g., 6 or 12 slices

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            let angle = Math.atan2(y - centerY, x - centerX);
            if (angle < 0) {
                angle += 2 * Math.PI; // Normalize angle to 0-2PI
            }
            const sliceIndex = Math.floor((angle / (2 * Math.PI)) * numSlices);
            const colorIndex = sliceIndex % RAINBOW_PALETTE.length;
            grid[y][x] = RAINBOW_PALETTE[colorIndex];
        }
    }
}

/** Fills the grid with a radial checkerboard pattern (triangular wedges). */
function generateTriangularWedges(grid: string[][]) {
    const centerX = gridWidth / 2;
    const centerY = gridHeight / 2;
    const numWedges = (Math.floor(Math.random() * 4) + 4) * 2; // e.g., 8, 10, 12, 14 wedges
    const ringWidth = Math.floor(Math.random() * 3) + 3; // e.g., 3, 4, 5

    const color1 = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    let color2 = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    while (color2 === color1) {
        color2 = LIMITED_PALETTE[Math.floor(Math.random() * LIMITED_PALETTE.length)];
    }

    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            let angle = Math.atan2(dy, dx);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }

            const ringIndex = Math.floor(distance / ringWidth);
            const wedgeIndex = Math.floor((angle / (2 * Math.PI)) * numWedges);

            grid[y][x] = (ringIndex + wedgeIndex) % 2 === 0 ? color1 : color2;
        }
    }
}


function handleGenerateBackground() {
    cancelTextPlacementMode();
    deselect();
    const originalBtnText = generateBgBtn.textContent;
    generateBgBtn.disabled = true;
    generateBgBtn.textContent = 'Generating...';

    const generators = [
        generateHorizontalRainbow,
        generateVerticalRainbow,
        generateHorizontalBands,
        generateVerticalBands,
        generateCheckerboard,
        generateBorder,
        generateRandomRects,
        generateTetrisPattern,
        generateConcentricCircles,
        generateStarburst,
        generateTriangularWedges,
    ];

    try {
        setTimeout(() => {
            let hasMaskInViewport = false;
            for (let y = 0; y < gridHeight; y++) {
                for (let x = 0; x < gridWidth; x++) {
                    if (getPixel(x + artboardOffset.x, y + artboardOffset.y) === MASK_COLOR) {
                        hasMaskInViewport = true;
                        break;
                    }
                }
                if (hasMaskInViewport) break;
            }

            const newPattern: string[][] = Array.from({ length: gridHeight }, () => Array(gridWidth).fill('#ffffff'));
            const generator = generators[Math.floor(Math.random() * generators.length)];
            generator(newPattern);

            if (hasMaskInViewport) {
                generatedBackgroundData = newPattern;
            } else {
                generatedBackgroundData = null;
                saveState();
                for (let y = 0; y < gridHeight; y++) {
                    for (let x = 0; x < gridWidth; x++) {
                        setPixel(x + artboardOffset.x, y + artboardOffset.y, newPattern[y][x]);
                    }
                }
                updateControlStates();
            }

            renderCanvas();

            generateBgBtn.disabled = false;
            generateBgBtn.textContent = originalBtnText;
        }, 50); // Small delay for UX
    } catch (error) {
        console.error("Error generating background:", error);
        alert(`Sorry, there was an error generating the background. Please try again.`);
        generateBgBtn.disabled = false;
        generateBgBtn.textContent = originalBtnText;
    }
}

/**
 * Calculates the bounding box of the current artwork.
 * @returns An object with min/max coordinates, or null if no art exists.
 */
function getArtBounds(): { minX: number, minY: number, maxX: number, maxY: number } | null {
    if (pixelData.size === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const key of pixelData.keys()) {
        const [x, y] = key.split(',').map(Number);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    }
    return { minX, minY, maxX, maxY };
}

function handleStrokeSelection() {
    cancelTextPlacementMode();
    deselect();
    commitGeneratedBackground();

    if (selectedColor === MASK_COLOR) {
        alert("Please select a color for the stroke, not the mask tool itself.");
        return;
    }

    const artBounds = getArtBounds();
    
    let minX, minY, maxX, maxY;
    
    // Define the area to check for masks. Prioritize art bounds, fallback to viewport.
    if (artBounds) {
        minX = artBounds.minX;
        minY = artBounds.minY;
        maxX = artBounds.maxX;
        maxY = artBounds.maxY;
    } else {
        minX = artboardOffset.x;
        minY = artboardOffset.y;
        maxX = artboardOffset.x + gridWidth - 1;
        maxY = artboardOffset.y + gridHeight - 1;
    }

    const borderPixels: { x: number; y: number }[] = [];
    let hasMask = false;

    // Iterate one pixel outside the bounds to catch strokes around the entire shape.
    for (let y = minY - 1; y <= maxY + 1; y++) {
        for (let x = minX - 1; x <= maxX + 1; x++) {
            if (getPixel(x, y) === MASK_COLOR) {
                hasMask = true;
                const neighbors = [
                    [x, y - 1], [x, y + 1], [x - 1, y], [x + 1, y]
                ];

                let isBorder = false;
                for (const [nx, ny] of neighbors) {
                    if (getPixel(nx, ny) !== MASK_COLOR) {
                        isBorder = true;
                        break;
                    }
                }

                if (isBorder) {
                    borderPixels.push({ x, y });
                }
            }
        }
    }

    if (!hasMask) {
        alert("Please create a mask selection first to use the stroke tool.");
        return;
    }

    if (borderPixels.length === 0) return;
    
    saveState();
    
    for (const { x, y } of borderPixels) {
        setPixel(x, y, selectedColor);
    }

    renderCanvas();
    updateControlStates();
}


function placeTextOnCanvas(event: MouseEvent) {
    const coords = screenToGrid(event);
    if (!coords) return;

    drawTextAt(coords.x, coords.y);
    cancelTextPlacementMode();
}

function drawTextAt(startX: number, startY: number) {
    const text = textInput.value;
    if (!text) {
        alert("Please enter some text to add.");
        return;
    }
    
    if (selectedColor === MASK_COLOR) {
        alert("Please select a color for the text, not the mask tool itself.");
        return;
    }

    const textSize = parseInt(textSizeInput.value, 10);
    if (isNaN(textSize) || textSize < 1) {
        alert("Please enter a valid text size (1 or greater).");
        return;
    }

    saveState();
    commitGeneratedBackground();

    let currentX = startX;

    for (const char of text) {
        const charBitmap = PIXEL_FONT[char] || PIXEL_FONT['?'];
        const charHeight = charBitmap.length;
        const charWidth = charBitmap[0].length;

        for (let y = 0; y < charHeight; y++) {
            for (let x = 0; x < charWidth; x++) {
                if (charBitmap[y][x] === 1) {
                    for (let scaleY = 0; scaleY < textSize; scaleY++) {
                        for (let scaleX = 0; scaleX < textSize; scaleX++) {
                            const gridX = currentX + (x * textSize) + scaleX;
                            const gridY = startY + (y * textSize) + scaleY;
                            setPixel(gridX, gridY, selectedColor);
                        }
                    }
                }
            }
        }
        currentX += (charWidth * textSize) + (1 * textSize);
    }

    renderCanvas();
    updateControlStates();
}


/**
 * Generic file saving function. Uses the File System Access API if available,
 * otherwise falls back to the traditional anchor link download method.
 */
async function saveFile(
    suggestedName: string,
    fileTypes: { description: string; accept: { [mimeType: string]: string[] } }[],
    blob: Blob
) {
    // Feature detection for the API
    if (window.showSaveFilePicker) {
        try {
            // Show the "Save As" dialog
            const handle = await window.showSaveFilePicker({
                suggestedName,
                types: fileTypes,
            });
            // Write the blob to the file
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return; // Exit after successful save
        } catch (err) {
            // This error is thrown if the user clicks "Cancel"
            if ((err as DOMException).name === 'AbortError') {
                return;
            }
            console.error('Error using showSaveFilePicker:', err);
            // Fall through to the fallback method if there's an unexpected error
        }
    }

    // Fallback for browsers that don't support the API
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = suggestedName;
    link.href = url;
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

async function handleDownloadGridPNG() {
    commitGeneratedBackground();
    deselect();

    // Check if there's any non-masked art in the current viewport to export.
    let hasArtInView = false;
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            if (getPixel(x + artboardOffset.x, y + artboardOffset.y) !== MASK_COLOR) {
                hasArtInView = true;
                break;
            }
        }
        if (hasArtInView) break;
    }

    if (!hasArtInView) {
        alert("There is no visible artwork in the current view to export. Try removing the mask or drawing something.");
        return;
    }

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // --- Proportions & Sizing ---
    const diameter_px = 40;
    const radius_px = diameter_px / 2;

    // These are from the user's SVG spec.
    const diameter_mm = 1.68;
    const horizontal_space_between_mm = 0.923;
    const vertical_space_between_mm = horizontal_space_between_mm;
    const horizontal_step_mm = diameter_mm + horizontal_space_between_mm;
    const vertical_step_mm = diameter_mm + vertical_space_between_mm;

    // Calculate pixel step sizes based on the millimeter ratios
    const horizontal_step_px = (horizontal_step_mm / diameter_mm) * diameter_px;
    const vertical_step_px = (vertical_step_mm / diameter_mm) * diameter_px;

    const RULER_GUTTER = 40; // Space for numbers, slightly bigger than radius
    const PADDING = 20;      // Outer padding around everything

    // Calculate the total size of the artwork area (from first circle center to last circle center)
    const artAreaWidth_px = (gridWidth > 1) ? (gridWidth - 1) * horizontal_step_px : 0;
    const artAreaHeight_px = (gridHeight > 1) ? (gridHeight - 1) * vertical_step_px : 0;

    // Total pixel span of the circles themselves, from edge to edge
    const artPixelWidth = artAreaWidth_px + diameter_px;
    const artPixelHeight = artAreaHeight_px + diameter_px;

    // Calculate final canvas dimensions
    tempCanvas.width = RULER_GUTTER + artPixelWidth + PADDING;
    tempCanvas.height = RULER_GUTTER + artPixelHeight + PADDING;

    // Draw background
    tempCtx.fillStyle = '#000000';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // --- Drawing Coordinates & Art ---
    // The top-left corner of where the first circle's center will be
    const artOriginX = RULER_GUTTER + radius_px;
    const artOriginY = RULER_GUTTER + radius_px;

    // --- Draw Ruler Numbers ---
    const FONT_COLOR = '#e0e0e0'; // Light gray, like UI text
    tempCtx.fillStyle = FONT_COLOR;
    tempCtx.font = `${radius_px * 0.9}px Inter, sans-serif`; // Font size relative to circle size

    // Top ruler (X axis)
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    for (let x = 0; x < gridWidth; x++) {
        const coordX = x + 1; // Use viewport-relative coordinate
        const textX = artOriginX + x * horizontal_step_px;
        const textY = RULER_GUTTER / 2;
        tempCtx.fillText(String(coordX), textX, textY);
    }

    // Left ruler (Y axis)
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    for (let y = 0; y < gridHeight; y++) {
        const coordY = y + 1; // Use viewport-relative coordinate
        const textX = RULER_GUTTER / 2;
        const textY = artOriginY + y * vertical_step_px;
        tempCtx.fillText(String(coordY), textX, textY);
    }

    // --- Draw Circles ---
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const artX = x + artboardOffset.x;
            const artY = y + artboardOffset.y;
            const color = getPixel(artX, artY);

            if (color !== MASK_COLOR) {
                // Calculate circle center position in pixels
                const cx = artOriginX + x * horizontal_step_px;
                const cy = artOriginY + y * vertical_step_px;
                
                tempCtx.beginPath();
                tempCtx.arc(cx, cy, radius_px, 0, 2 * Math.PI, false);
                tempCtx.fillStyle = '#ffffff';
                tempCtx.fill();
            }
        }
    }

    const blob = await new Promise<Blob | null>(resolve => tempCanvas.toBlob(resolve, 'image/png'));
    if (!blob) {
        alert("Failed to create image blob for download.");
        return;
    }

    await saveFile('pixel-art.png', [{
        description: 'PNG Image',
        accept: { 'image/png': ['.png'] }
    }], blob);
}

async function handleDownloadGridSVG() {
    commitGeneratedBackground();
    deselect();

    // Check if there's any non-masked art in the current viewport to export.
    let hasArtInView = false;
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            if (getPixel(x + artboardOffset.x, y + artboardOffset.y) !== MASK_COLOR) {
                hasArtInView = true;
                break;
            }
        }
        if (hasArtInView) break;
    }

    if (!hasArtInView) {
        alert("There is no visible artwork in the current view to export. Try removing the mask or drawing something.");
        return;
    }

    // Physical dimensions in millimeters as per user request
    const diameter_mm = 1.68;
    const radius_mm = diameter_mm / 2;
    const horizontal_space_between_mm = 0.923;
    const vertical_space_between_mm = horizontal_space_between_mm;

    // Center-to-center distance for the circles
    const horizontal_step_mm = diameter_mm + horizontal_space_between_mm; // 2.603 mm
    const vertical_step_mm = diameter_mm + vertical_space_between_mm; // 2.603 mm

    // A margin around the artwork
    const margin_mm = Math.max(horizontal_step_mm, vertical_step_mm);

    // Calculate the total size of the artwork area (from first circle center to last circle center)
    const artAreaWidth = (gridWidth > 1) ? (gridWidth - 1) * horizontal_step_mm : 0;
    const artAreaHeight = (gridHeight > 1) ? (gridHeight - 1) * vertical_step_mm : 0;

    // Calculate the final SVG dimensions including margins
    const totalWidth_mm = artAreaWidth + 2 * margin_mm;
    const totalHeight_mm = artAreaHeight + 2 * margin_mm;

    let svgContent = `<svg width="${totalWidth_mm.toFixed(3)}mm" height="${totalHeight_mm.toFixed(3)}mm" viewBox="0 0 ${totalWidth_mm.toFixed(3)} ${totalHeight_mm.toFixed(3)}" xmlns="http://www.w3.org/2000/svg">\n`;
    svgContent += `  <rect width="100%" height="100%" fill="#000000" />\n`;

    // Iterate through the current viewport
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const artX = x + artboardOffset.x;
            const artY = y + artboardOffset.y;
            const color = getPixel(artX, artY);

            if (color !== MASK_COLOR) {
                // Calculate circle center position
                const cx = margin_mm + x * horizontal_step_mm;
                const cy = margin_mm + y * vertical_step_mm;
                
                svgContent += `  <circle cx="${cx.toFixed(3)}" cy="${cy.toFixed(3)}" r="${radius_mm}" fill="#ffffff" />\n`;
            }
        }
    }
    
    svgContent += '</svg>';

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    
    await saveFile('pixel-art.svg', [{
        description: 'SVG Image',
        accept: { 'image/svg+xml': ['.svg'] }
    }], blob);
}

async function handleDownloadLogoTopPNG() {
    if (!logoTopCircles || logoTopCircles.length === 0) {
        alert("There is no artwork to export.");
        return;
    }

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Use a fixed high resolution for good quality, e.g., 4000px width
    const exportWidth = 4000;
    const scale = exportWidth / artboardWidthMM;
    const exportHeight = artboardHeightMM * scale;
    
    tempCanvas.width = exportWidth;
    tempCanvas.height = exportHeight;

    tempCtx.fillStyle = '#000000';
    tempCtx.fillRect(0, 0, exportWidth, exportHeight);

    const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
    const circleDiameterMM = circleSizeInches * INCH_TO_MM;
    const circleRadiusPx = (circleDiameterMM / 2) * scale;

    for (const circle of logoTopCircles) {
        let finalColor = circle.color;
        if (finalColor === MASK_COLOR) continue; // Don't draw mask color

        tempCtx.fillStyle = finalColor;
        const canvasX = circle.x * scale;
        const canvasY = circle.y * scale;
        
        tempCtx.beginPath();
        tempCtx.arc(canvasX, canvasY, circleRadiusPx, 0, Math.PI * 2);
        tempCtx.fill();
    }
    
    const blob = await new Promise<Blob | null>(resolve => tempCanvas.toBlob(resolve, 'image/png'));
    if (!blob) {
        alert("Failed to create image blob for download.");
        return;
    }

    await saveFile('logo-top-art.png', [{
        description: 'PNG Image',
        accept: { 'image/png': ['.png'] }
    }], blob);
}

async function handleDownloadLogoTopSVG() {
    if (!logoTopCircles || logoTopCircles.length === 0) {
        alert("There is no artwork to export.");
        return;
    }

    const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
    const circleDiameterMM = circleSizeInches * INCH_TO_MM;
    const circleRadiusMM = circleDiameterMM / 2;
    
    let svgContent = `<svg width="${artboardWidthMM.toFixed(3)}mm" height="${artboardHeightMM.toFixed(3)}mm" viewBox="0 0 ${artboardWidthMM.toFixed(3)} ${artboardHeightMM.toFixed(3)}" xmlns="http://www.w3.org/2000/svg">\n`;
    svgContent += `  <rect width="100%" height="100%" fill="#000000" />\n`;

    for (const circle of logoTopCircles) {
        if (circle.color !== MASK_COLOR) {
            svgContent += `  <circle cx="${circle.x.toFixed(3)}" cy="${circle.y.toFixed(3)}" r="${circleRadiusMM.toFixed(3)}" fill="${circle.color}" />\n`;
        }
    }

    svgContent += '</svg>';

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    
    await saveFile('logo-top-art.svg', [{
        description: 'SVG Image',
        accept: { 'image/svg+xml': ['.svg'] }
    }], blob);
}


async function handleSaveProject() {
    commitGeneratedBackground();
    deselect();

    const isLogoTopMode = modeLogoTopBtn.classList.contains('active');
    let projectData;
    let suggestedName;
    let fileTypes;

    if (isLogoTopMode) {
        if (!logoTopCircles && !logoTopState) {
            alert("There is nothing to save in the Logo Top project.");
            return;
        }
        projectData = {
            mode: 'logo-top',
            artboardWidthInches: artboardWidthInches,
            artboardHeightInches: artboardHeightInches,
            logoTopCircles: logoTopCircles || [],
            logoTopState: logoTopState ? {
                imageDataUrl: logoTopState.image.src,
                artboardX: logoTopState.artboardX,
                artboardY: logoTopState.artboardY,
                widthMM: logoTopState.widthMM,
                heightMM: logoTopState.heightMM,
            } : null,
            logoTopView: logoTopView,
            settings: {
                circleSize: logoCircleSizeSelect.value,
                circleSeparation: logoCircleSeparationInput.value,
            }
        };
        suggestedName = 'logo-top-project.ltjproj';
        fileTypes = [{
            description: 'Logo Top Project File',
            accept: { 'application/json': ['.ltjproj'] }
        }];

    } else { // Generate Mode
        if (pixelData.size === 0) {
            alert("There is nothing to save. Create some art first!");
            return;
        }
        projectData = {
            mode: 'generate',
            gridWidth,
            gridHeight,
            artboardOffset,
            pixelData: Array.from(pixelData.entries()),
        };
        suggestedName = 'pixel-art-project.pixelart';
        fileTypes = [{
            description: 'Pixel Art Project File',
            accept: { 'application/json': ['.pixelart'] }
        }];
    }

    const jsonString = JSON.stringify(projectData);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    await saveFile(suggestedName, fileTypes, blob);
}

function handleScaleChange(event: Event) {
    if (!originalImage) return;
    scale = parseFloat((event.target as HTMLInputElement).value);
    updateSliderValues();
    processImage();
}

function handleToolChange() {
    if (isSelectionMode) {
        isSelectionMode = false;
        selectToolBtn.classList.remove('active');
    }
    deselect();
    cancelTextPlacementMode();

    const selectedTool = brushToolSelect.value;
    const isLogoTopMode = modeLogoTopBtn.classList.contains('active');
    const isCurveTool = selectedTool === 'curve';

    curveToolControls.classList.toggle('hidden', !isCurveTool);
    if (!isCurveTool && curvePath.length > 0) {
        handleClearCurvePath(); // Clear path if we switch away
    }
    
    if (isLogoTopMode) {
        brushSizeInput.disabled = selectedTool !== 'eraser';
    } else { // Generate Mode
        brushSizeInput.disabled = !['square', 'circle'].includes(selectedTool);
    }

    if (!isPanMode) {
        canvas.style.cursor = 'default';
    }

    renderCanvas(); // Redraw canvas to show/hide brush preview
}

function togglePanMode() {
    isPanMode = !isPanMode;
    if (isPanMode) {
        if (isSelectionMode) {
            isSelectionMode = false;
            selectToolBtn.classList.remove('active');
        }
        cancelTextPlacementMode();
        deselect();
    }
    panModeBtn.classList.toggle('active', isPanMode);
    canvas.style.cursor = isPanMode ? 'grab' : 'default';
}

function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;
    selectToolBtn.classList.toggle('active', isSelectionMode);

    if (isSelectionMode) {
        // Deactivate other exclusive modes
        if (isPanMode) {
            isPanMode = false;
            panModeBtn.classList.remove('active');
        }
        if (isTextPlacementMode) {
            cancelTextPlacementMode();
        }
        deselect(); // Clear any existing selection state like a half-drawn lasso
        canvas.style.cursor = 'crosshair';
    } else {
        // Revert to default cursor, will be overridden by other tools if they are active
        canvas.style.cursor = 'default';
    }
}

function toggleLightEffect() {
    isGlowEnabled = !isGlowEnabled;
    lightEffectBtn.classList.toggle('active', isGlowEnabled);
    renderCanvas();
}

function handlePanStart(event: MouseEvent) {
    if (!isPanMode) return;
    isDragging = true;
    dragStart = { x: event.clientX, y: event.clientY };
    canvas.style.cursor = 'grabbing';
    hoveredCoords = null; 

    if (modeLogoTopBtn.classList.contains('active')) {
        logoTopViewPanStart = { offsetX: logoTopView.offsetX, offsetY: logoTopView.offsetY };
    } else {
        generatedBackgroundData = null; 
    }
}

function handlePanMove(event: MouseEvent) {
    if (!isDragging || !isPanMode) return;
    
    if (modeLogoTopBtn.classList.contains('active')) {
        const dx = event.clientX - dragStart.x;
        const dy = event.clientY - dragStart.y;
        
        const currentScale = logoTopView.scale;
        if (currentScale === 0) return;

        const dxMM = dx / currentScale;
        const dyMM = dy / currentScale;

        logoTopView.offsetX = logoTopViewPanStart.offsetX - dxMM;
        logoTopView.offsetY = logoTopViewPanStart.offsetY - dyMM;
    } else {
        panOffset.x = event.clientX - dragStart.x;
        panOffset.y = event.clientY - dragStart.y;
    }
    
    if (resizeAnimationFrameId) {
        window.cancelAnimationFrame(resizeAnimationFrameId);
    }
    resizeAnimationFrameId = window.requestAnimationFrame(renderCanvas);
}

function handlePanEnd() {
    if (!isPanMode || !isDragging) return;
    isDragging = false;
    canvas.style.cursor = 'grab';

    if (modeLogoTopBtn.classList.contains('active')) {
        // State was updated live, just save it.
        if (logoTopView.offsetX !== logoTopViewPanStart.offsetX || logoTopView.offsetY !== logoTopViewPanStart.offsetY) {
            saveState();
        }
    } else { // Generate mode
        const spacing = getSpacing();
        if (spacing === 0) return;
        const panCellsX = Math.round(panOffset.x / spacing);
        const panCellsY = Math.round(panOffset.y / spacing);

        if (panCellsX !== 0 || panCellsY !== 0) {
            saveState();
            artboardOffset.x -= panCellsX;
            artboardOffset.y -= panCellsY;
        }
    }

    panOffset = { x: 0, y: 0 };
    renderCanvas();
}


function handleUndo() {
    if (historyStack.length === 0) return;
    generatedBackgroundData = null;
    
    const currentState: HistoryState = {
        pixelData: new Map(pixelData),
        artboardOffset: { ...artboardOffset },
        logoTopCircles: logoTopCircles ? logoTopCircles.map(c => ({...c})) : null,
        selection: selection,
        floatingSelection: floatingSelection,
        logoTopView: { ...logoTopView },
        artboardWidthInches: artboardWidthInches,
        artboardHeightInches: artboardHeightInches,
    };
    redoStack.push(currentState);

    const previousState = historyStack.pop()!;
    pixelData = new Map(previousState.pixelData);
    artboardOffset = { ...previousState.artboardOffset };
    logoTopCircles = previousState.logoTopCircles ? previousState.logoTopCircles.map(c => ({...c})) : null,
    selection = previousState.selection;
    floatingSelection = previousState.floatingSelection;
    logoTopView = { ...previousState.logoTopView };
    
    if (modeLogoTopBtn.classList.contains('active')) {
        artboardWidthInches = previousState.artboardWidthInches;
        artboardHeightInches = previousState.artboardHeightInches;
        artboardWidthMM = artboardWidthInches * INCH_TO_MM;
        artboardHeightMM = artboardHeightInches * INCH_TO_MM;
        buildLogoTopCircleGrid();
        zoomSlider.value = String(logoTopView.scale);
    }

    renderCanvas();
    updateUndoRedoButtons();
    updateControlStates();
}

function handleRedo() {
    if (redoStack.length === 0) return;
    generatedBackgroundData = null;
    
    const currentState: HistoryState = {
        pixelData: new Map(pixelData),
        artboardOffset: { ...artboardOffset },
        logoTopCircles: logoTopCircles ? logoTopCircles.map(c => ({...c})) : null,
        selection: selection,
        floatingSelection: floatingSelection,
        logoTopView: { ...logoTopView },
        artboardWidthInches: artboardWidthInches,
        artboardHeightInches: artboardHeightInches,
    };
    historyStack.push(currentState);
    if (historyStack.length > MAX_HISTORY_SIZE) {
        historyStack.shift();
    }
    
    const nextState = redoStack.pop()!;
    pixelData = new Map(nextState.pixelData);
    artboardOffset = { ...nextState.artboardOffset };
    logoTopCircles = nextState.logoTopCircles ? nextState.logoTopCircles.map(c => ({...c})) : null,
    selection = nextState.selection;
    floatingSelection = nextState.floatingSelection;
    logoTopView = { ...nextState.logoTopView };


    if (modeLogoTopBtn.classList.contains('active')) {
        artboardWidthInches = nextState.artboardWidthInches;
        artboardHeightInches = nextState.artboardHeightInches;
        artboardWidthMM = artboardWidthInches * INCH_TO_MM;
        artboardHeightMM = artboardHeightInches * INCH_TO_MM;
        buildLogoTopCircleGrid();
        zoomSlider.value = String(logoTopView.scale);
    }

    renderCanvas();
    updateUndoRedoButtons();
    updateControlStates();
}


// --- TOOL IMPLEMENTATIONS ---

function getPixel(x: number, y: number): string {
    return pixelData.get(`${x},${y}`) || '#ffffff'; // Default to white
}

function setPixel(x: number, y: number, color: string) {
    const key = `${x},${y}`;
    // Revert to the default background color by deleting the key.
    if (color === '#ffffff') {
        pixelData.delete(key);
    } else {
        // Otherwise, explicitly set the color (including the mask).
        pixelData.set(key, color);
    }
}

function drawPencil(x: number, y: number) {
    if (selection && !isPointInSelection(x, y)) return;
    setPixel(x, y, selectedColor);
}

function drawSquare(x: number, y: number) {
    const brushSize = parseInt(brushSizeInput.value, 10) || 1;
    const startX = x - Math.floor(brushSize / 2);
    const startY = y - Math.floor(brushSize / 2);
    const endX = startX + brushSize;
    const endY = startY + brushSize;

    for (let i = startY; i < endY; i++) {
        for (let j = startX; j < endX; j++) {
            if (!selection || isPointInSelection(j, i)) {
                setPixel(j, i, selectedColor);
            }
        }
    }
}

function drawCircle(centerX: number, centerY: number) {
    const brushSize = parseInt(brushSizeInput.value, 10) || 1;

    if (brushSize in SMALL_CIRCLE_PATTERNS) {
        const pattern = SMALL_CIRCLE_PATTERNS[brushSize as keyof typeof SMALL_CIRCLE_PATTERNS];
        const offset = Math.floor(brushSize / 2);
        for (const p of pattern) {
            const x = centerX + p[0] - offset;
            const y = centerY + p[1] - offset;
            if (!selection || isPointInSelection(x, y)) {
                setPixel(x, y, selectedColor);
            }
        }
        return;
    }

    const radius = brushSize / 2;
    const startY = Math.floor(centerY - radius);
    const endY = Math.ceil(centerY + radius);
    const startX = Math.floor(centerX - radius);
    const endX = Math.ceil(centerX + radius);

    for (let i = startY; i < endY; i++) {
        for (let j = startX; j < endX; j++) {
            const dx = j - centerX;
            const dy = i - centerY;
            if (Math.sqrt(dx * dx + dy * dy) < radius) {
                 if (!selection || isPointInSelection(j, i)) {
                    setPixel(j, i, selectedColor);
                }
            }
        }
    }
}

function drawPixelEraser(x: number, y: number) {
    const brushSize = parseInt(brushSizeInput.value, 10) || 1;
    const startX = x - Math.floor(brushSize / 2);
    const startY = y - Math.floor(brushSize / 2);
    const endX = startX + brushSize;
    const endY = startY + brushSize;

    for (let i = startY; i < endY; i++) {
        for (let j = startX; j < endX; j++) {
            if (!selection || isPointInSelection(j, i)) {
                setPixel(j, i, '#ffffff'); // Erase by setting to white
            }
        }
    }
}


function globalFill(x: number, y: number) {
    const targetColor = getPixel(x, y);
    if (targetColor === selectedColor) return;

    if (selection) { // Constrained global fill
        if (!isPointInSelection(x, y)) return; // Clicked outside selection
        const { bounds } = selection;
        for (let j = bounds.minY; j <= bounds.maxY; j++) {
            for (let i = bounds.minX; i <= bounds.maxX; i++) {
                if (getPixel(i, j) === targetColor && isPointInSelection(i, j)) {
                    setPixel(i, j, selectedColor);
                }
            }
        }
    } else { // Original global fill
        const keysToUpdate: string[] = [];
        for (const [key, color] of pixelData.entries()) {
            if (color === targetColor) {
                keysToUpdate.push(key);
            }
        }
        for (const key of keysToUpdate) {
            pixelData.set(key, selectedColor);
        }
    }
}

function floodFill(startX: number, startY: number) {
    const targetColor = getPixel(startX, startY);
    if (targetColor === selectedColor) return;
    if (selection && !isPointInSelection(startX, startY)) return;

    const q: [number, number][] = [[startX, startY]];
    const visited = new Set<string>([`${startX},${startY}`]);
    let processed = 0;
    const limit = gridWidth * gridHeight; // Safety limit is now the size of the viewport

    // Define viewport boundaries in absolute coordinates
    const minX = artboardOffset.x;
    const minY = artboardOffset.y;
    const maxX = artboardOffset.x + gridWidth;
    const maxY = artboardOffset.y + gridHeight;

    while (q.length > 0) {
        const [x, y] = q.shift()!;
        setPixel(x, y, selectedColor);
        processed++;
        if (processed > limit) {
            console.warn("Flood fill limit reached.");
            break;
        }

        const neighbors: [number, number][] = [
            [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
        ];
        for (const [nx, ny] of neighbors) {
            // Boundary check: ensure the neighbor is within the viewport AND selection
            if (nx < minX || nx >= maxX || ny < minY || ny >= maxY) continue;
            if (selection && !isPointInSelection(nx, ny)) continue;

            const key = `${nx},${ny}`;
            if (!visited.has(key) && getPixel(nx, ny) === targetColor) {
                visited.add(key);
                q.push([nx, ny]);
            }
        }
    }
}

// --- SELECTION & CLIPBOARD ---

/**
 * Checks if a point is inside the current floating selection's bounding box.
 */
function isPointInFloatingSelection(x: number, y: number): boolean {
    if (!floatingSelection) return false;
    return x >= floatingSelection.artboardX &&
           x < floatingSelection.artboardX + floatingSelection.width &&
           y >= floatingSelection.artboardY &&
           y < floatingSelection.artboardY + floatingSelection.height;
}

/**
 * Checks if a point is inside a polygon using the ray-casting algorithm.
 * @param point The point to check { x, y } in artboard coordinates.
 * @param polygon An array of vertices { x, y } for the polygon.
 * @returns True if the point is inside the polygon.
 */
function isPointInPolygon(point: { x: number, y: number }, polygon: { x: number, y: number }[]): boolean {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect = ((yi > point.y) !== (yj > point.y))
            && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
}

/** Checks if an artboard coordinate is within the current selection path. */
function isPointInSelection(x: number, y: number): boolean {
    if (!selection) return false;
    // Check bounding box first for a quick exit
    const bounds = selection.bounds;
    if (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY) {
        return false;
    }
    // If in bounds, do the more expensive polygon check
    return isPointInPolygon({ x, y }, selection.path);
}

/**
 * Stamps the floating selection onto the main pixel data and clears all selection state.
 * @param isActionPreventingSave If true, will not save state (e.g., during a project reset).
 */
function deselect(isActionPreventingSave = false) {
    if (!selection && !floatingSelection && !lassoPoints) {
        return; // Nothing to deselect
    }

    if (!isActionPreventingSave && (selection || floatingSelection)) {
        saveState();
    }
    
    if (floatingSelection) {
        for (const [key, color] of floatingSelection.pixelData.entries()) {
            const [relX, relY] = key.split(',').map(Number);
            const absX = floatingSelection.artboardX + relX;
            const absY = floatingSelection.artboardY + relY;
            setPixel(absX, absY, color);
        }
    }
    
    selection = null;
    floatingSelection = null;
    lassoPoints = null;
    lassoPreviewPoint = null;
    isDrawing = false;
    
    renderCanvas();
    updateControlStates();
}

/**
 * Finalizes the polygonal lasso path into a selection.
 */
function finalizeLassoSelection() {
    if (!lassoPoints || lassoPoints.length < 3) {
        lassoPoints = null;
        lassoPreviewPoint = null;
        isDrawing = false;
        renderCanvas();
        return;
    }

    saveState();

    const path = [...lassoPoints];
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    path.forEach(p => {
        minX = Math.min(minX, p.x);
        minY = Math.min(minY, p.y);
        maxX = Math.max(maxX, p.x);
        maxY = Math.max(maxY, p.y);
    });

    const bounds = { minX, minY, maxX, maxY };

    const relativePixelData = new Map<string, string>();
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            if (isPointInPolygon({ x, y }, path)) {
                const color = getPixel(x, y);
                if (color !== '#ffffff') {
                    relativePixelData.set(`${x - minX},${y - minY}`, color);
                }
            }
        }
    }
    
    selection = { path, bounds, relativePixelData };
    
    lassoPoints = null;
    lassoPreviewPoint = null;
    isDrawing = false;
    
    renderCanvas();
}

/**
 * "Lifts" the current selection into a floating selection that can be moved.
 */
function liftSelection() {
    if (!selection) return;

    saveState();
    
    const { bounds, relativePixelData } = selection;
    const width = bounds.maxX - bounds.minX + 1;
    const height = bounds.maxY - bounds.minY + 1;

    floatingSelection = {
        artboardX: bounds.minX,
        artboardY: bounds.minY,
        width: width,
        height: height,
        pixelData: relativePixelData
    };

    for (let y = bounds.minY; y <= bounds.maxY; y++) {
        for (let x = bounds.minX; x <= bounds.maxX; x++) {
            if (isPointInPolygon({ x, y }, selection.path)) {
                setPixel(x, y, '#ffffff');
            }
        }
    }

    selection = null;
    renderCanvas();
}

/** Deletes the pixels within the current selection. */
function handleDeleteSelection() {
    if (!selection) return;
    saveState();

    const { path, bounds } = selection;
     for (let y = bounds.minY; y <= bounds.maxY; y++) {
        for (let x = bounds.minX; x <= bounds.maxX; x++) {
            if (isPointInPolygon({ x, y }, path)) {
                 setPixel(x, y, '#ffffff');
            }
        }
    }
    deselect();
}

/** Copies the current selection to the internal clipboard. */
function handleCopy() {
    if (!selection && !floatingSelection) return;
    
    let pixelDataSource: Map<string, string>;
    let width: number;
    let height: number;

    if (floatingSelection) {
        pixelDataSource = floatingSelection.pixelData;
        width = floatingSelection.width;
        height = floatingSelection.height;
    } else { // selection is not null here
        pixelDataSource = selection.relativePixelData;
        width = selection.bounds.maxX - selection.bounds.minX + 1;
        height = selection.bounds.maxY - selection.bounds.minY + 1;
    }

    internalClipboard = {
        width,
        height,
        pixelData: new Map(pixelDataSource)
    };
    console.log("Copied to clipboard.");
}

/** Cuts the current selection to the internal clipboard. */
function handleCut() {
    if (!selection && !floatingSelection) return;
    
    saveState();
    handleCopy();

    if (floatingSelection) {
        floatingSelection = null;
    } else if (selection) {
        handleDeleteSelection();
    }

    renderCanvas();
    updateControlStates();
}

/** Pastes the content from the internal clipboard. */
function handlePaste() {
    if (!internalClipboard) return;

    deselect();
    saveState();

    floatingSelection = {
        artboardX: artboardOffset.x + Math.floor((gridWidth - internalClipboard.width) / 2),
        artboardY: artboardOffset.y + Math.floor((gridHeight - internalClipboard.height) / 2),
        width: internalClipboard.width,
        height: internalClipboard.height,
        pixelData: new Map(internalClipboard.pixelData)
    };
    
    renderCanvas();
}

// --- IMAGE PROCESSING ---

/**
 * Finds the closest color in the LIMITED_PALETTE to a given RGB color.
 * @param r Red channel (0-255)
 * @param g Green channel (0-255)
 * @param b Blue channel (0-255)
 * @returns The hex string of the closest palette color.
 */
function findClosestPaletteColor(r: number, g: number, b: number): string {
    const currentLab = rgbToLab({ r, g, b });
    let closestColor = '#ffffff';
    let minDistance = Infinity;

    for (const color of labPaletteCache) {
        const distance = colorDistance(currentLab, color.lab);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color.hex;
        }
    }
    return closestColor;
}

function processImage() {
    if (!originalImage || !ctx) {
        pixelData.clear();
        renderCanvas();
        return;
    };
    saveState(); // Save before processing, so it's undoable

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Scale the image while maintaining aspect ratio to fit within the grid
    const imgAspect = originalImage.width / originalImage.height;
    const gridAspect = gridWidth / gridHeight;
    let drawWidth, drawHeight;

    if (imgAspect > gridAspect) {
        drawWidth = gridWidth * scale;
        drawHeight = drawWidth / imgAspect;
    } else {
        drawHeight = gridHeight * scale;
        drawWidth = drawHeight * imgAspect;
    }
    
    drawWidth = Math.max(1, Math.round(drawWidth));
    drawHeight = Math.max(1, Math.round(drawHeight));

    tempCanvas.width = drawWidth;
    tempCanvas.height = drawHeight;
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(originalImage, 0, 0, drawWidth, drawHeight);

    const imageData = tempCtx.getImageData(0, 0, drawWidth, drawHeight);
    const pixels = imageData.data;
    
    pixelData.clear();
    generatedBackgroundData = null; // Clear temp background
    
    const startX = artboardOffset.x + Math.floor((gridWidth - drawWidth) / 2);
    const startY = artboardOffset.y + Math.floor((gridHeight - drawHeight) / 2);

    // Convert every pixel of the scaled image to the limited palette.
    // This provides a high-quality, full-frame conversion without attempting
    // to remove the background, which aligns with the user's request.
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const alpha = pixels[i + 3];

        // Respect transparency from the source image (e.g., PNGs).
        // Pixels that are mostly transparent will not be added to the artboard.
        // A threshold of 128 is a good balance.
        if (alpha < 128) {
            continue;
        }

        const fillColor = findClosestPaletteColor(r, g, b);
        
        const pixelIndex = i / 4;
        const x = pixelIndex % drawWidth;
        const y = Math.floor(pixelIndex / drawWidth);
        setPixel(startX + x, startY + y, fillColor);
    }

    resetHistory();
    updateControlStates();
    renderCanvas();
}


// --- COLOR UTILITIES ---
function rgbToLab({ r, g, b }: { r: number, g: number, b: number }): { l: number, a: number, b: number } {
    r /= 255; g /= 255; b /= 255;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return { l: (116 * y) - 16, a: 500 * (x - y), b: 200 * (y - z) };
}

function colorDistance(lab1: { l: number, a: number, b: number }, lab2: { l: number, a: number, b: number }): number {
    const deltaL = lab1.l - lab2.l;
    const deltaA = lab1.a - lab2.a;
    const deltaB = lab1.b - lab2.b;
    return Math.sqrt(deltaL * deltaL + deltaA * deltaA + deltaB * deltaB);
}

function cacheLabPalette() {
    labPaletteCache = LIMITED_PALETTE.map(hex => {
        const rgb = hexToRgb(hex);
        return { hex, lab: rgbToLab(rgb) };
    });
}

function hexToRgb(hex: string): { r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

// --- HISTORY MANAGEMENT ---
function saveState() {
    // If the new state is identical to the last, don't save.
    const lastState = historyStack[historyStack.length - 1];
    if (lastState && areStatesEqual(lastState, { pixelData, artboardOffset, logoTopCircles, selection, floatingSelection, logoTopView, artboardWidthInches, artboardHeightInches })) {
        return;
    }

    const state: HistoryState = {
        pixelData: new Map(pixelData),
        artboardOffset: { ...artboardOffset },
        logoTopCircles: logoTopCircles ? logoTopCircles.map(c => ({...c})) : null,
        selection: selection, // These can be shallow copies
        floatingSelection: floatingSelection,
        logoTopView: { ...logoTopView },
        artboardWidthInches: artboardWidthInches,
        artboardHeightInches: artboardHeightInches,
    };
    historyStack.push(state);
    if (historyStack.length > MAX_HISTORY_SIZE) {
        historyStack.shift();
    }
    redoStack = []; // Clear redo stack on new action
    updateUndoRedoButtons();
}

function areStatesEqual(s1: HistoryState, s2: HistoryState): boolean {
    if (s1.pixelData.size !== s2.pixelData.size) return false;
    for (const [key, val] of s1.pixelData) {
        if (s2.pixelData.get(key) !== val) return false;
    }
    // Simple checks for other properties
    return s1.artboardOffset.x === s2.artboardOffset.x &&
           s1.artboardOffset.y === s2.artboardOffset.y &&
           JSON.stringify(s1.logoTopCircles) === JSON.stringify(s2.logoTopCircles) &&
           s1.selection === s2.selection &&
           s1.floatingSelection === s2.floatingSelection &&
           s1.logoTopView.scale === s2.logoTopView.scale &&
           s1.logoTopView.offsetX === s2.logoTopView.offsetX &&
           s1.logoTopView.offsetY === s2.logoTopView.offsetY &&
           s1.artboardWidthInches === s2.artboardWidthInches &&
           s1.artboardHeightInches === s2.artboardHeightInches;
}

function resetHistory() {
    historyStack = [];
    redoStack = [];
    updateUndoRedoButtons();
}


// --- UI & STATE UPDATERS ---
function updateSliderValues() {
    if (scaleValueSpan) scaleValueSpan.textContent = `${Math.round(scale * 100)}%`;
    if (logoSensitivityValue) logoSensitivityValue.textContent = logoSensitivitySlider.value;
}

function updateColorPalette() {
    colorPaletteContainer.innerHTML = '';
    const colors = [...LIMITED_PALETTE, MASK_COLOR];
    colors.forEach(color => {
        const wrapper = document.createElement('div');
        wrapper.className = 'color-swatch-wrapper';
        wrapper.dataset.color = color;
        wrapper.onclick = () => selectColor(color);

        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        if (color === MASK_COLOR) {
            swatch.classList.add('mask-swatch');
        } else {
            swatch.style.backgroundColor = color;
        }

        const countSpan = document.createElement('span');
        countSpan.className = 'color-count';
        countSpan.id = `count-${color.replace('#', '')}`;
        countSpan.textContent = '0';

        wrapper.appendChild(swatch);
        wrapper.appendChild(countSpan);
        colorPaletteContainer.appendChild(wrapper);
    });
    selectColor(selectedColor); // Re-apply selection
}

function selectColor(color: string) {
    selectedColor = color;
    document.querySelectorAll('.color-swatch-wrapper').forEach(sw => {
        sw.classList.toggle('selected', (sw as HTMLElement).dataset.color === color);
    });
}

function updateColorCounts() {
    const counts: { [key: string]: number } = {};
    LIMITED_PALETTE.forEach(c => counts[c] = 0);
    counts[MASK_COLOR] = 0;

    for (const color of pixelData.values()) {
        if (color in counts) {
            counts[color]++;
        }
    }
    
    if (logoTopCircles) {
        for (const circle of logoTopCircles) {
             if (circle.color in counts) {
                counts[circle.color]++;
            }
        }
    }

    for (const color in counts) {
        const span = document.getElementById(`count-${color.replace('#', '')}`);
        if (span) {
            span.textContent = String(counts[color]);
        }
    }
}

function updateUndoRedoButtons() {
    undoBtn.disabled = historyStack.length === 0;
    redoBtn.disabled = redoStack.length === 0;
}

function updateGridSizeFromSelect() {
    if (sizeSelect.value !== 'custom') {
        const [width, height] = sizeSelect.value.split('x').map(Number);
        gridWidth = width;
        gridHeight = height;
    }
}

function updateTransformControlsState(isEnabled: boolean) {
    scaleSlider.disabled = !isEnabled;
}

function resetTransforms() {
    scale = 1.0;
    panOffset = { x: 0, y: 0 };
    artboardOffset = { x: 0, y: 0 };
    if (isPanMode) togglePanMode();
}

function commitGeneratedBackground() {
    if (!generatedBackgroundData) return;
    saveState();
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            const absX = x + artboardOffset.x;
            const absY = y + artboardOffset.y;
            if (getPixel(absX, absY) === MASK_COLOR) {
                setPixel(absX, absY, generatedBackgroundData[y][x]);
            }
        }
    }
    generatedBackgroundData = null;
}

function updateControlStates() {
    const hasArt = pixelData.size > 0 || (logoTopCircles && logoTopCircles.length > 0);
    downloadBtn.disabled = !hasArt;
    downloadSvgBtn.disabled = !hasArt;
    saveProjectBtn.disabled = !hasArt;
}

function toggleTextPlacementMode() {
    isTextPlacementMode = !isTextPlacementMode;
    if (isTextPlacementMode) {
        if (isSelectionMode) {
            isSelectionMode = false;
            selectToolBtn.classList.remove('active');
        }
        placeTextBtn.classList.add('active');
        placeTextBtn.textContent = 'Cancel Text';
        canvas.style.cursor = 'copy';
        if (isPanMode) togglePanMode();
        deselect();
    } else {
        cancelTextPlacementMode();
    }
}

function cancelTextPlacementMode() {
    if (!isTextPlacementMode) return;
    isTextPlacementMode = false;
    placeTextBtn.classList.remove('active');
    placeTextBtn.textContent = 'Add Text';
    canvas.style.cursor = 'default';
}

function switchMode(mode: 'generate' | 'logo-top') {
    const isGenerate = mode === 'generate';
    modeGenerateBtn.classList.toggle('active', isGenerate);
    modeLogoTopBtn.classList.toggle('active', !isGenerate);
    
    generateSections.classList.toggle('hidden', !isGenerate);
    logoTopSections.classList.toggle('hidden', isGenerate);
    zoomControls.classList.toggle('hidden', isGenerate);

    // Toggle tool options visibility
    document.querySelectorAll('#brush-tool-select option').forEach(option => {
        const opt = option as HTMLOptionElement;
        const optionMode = opt.dataset.mode;
        opt.classList.toggle('hidden', optionMode !== mode);
    });

    // Set a default tool for the new mode
    if (isGenerate) {
        if (!['pencil', 'square', 'circle', 'bucket-area', 'bucket-global'].includes(brushToolSelect.value)) {
            brushToolSelect.value = 'pencil';
        }
    } else { // logo-top
        if (!['freehand', 'eraser', 'curve'].includes(brushToolSelect.value)) {
            brushToolSelect.value = 'freehand';
        }
    }
    
    handleToolChange(); 

    logoCircleSizeSelect.disabled = isGenerate;
    logoCircleSeparationInput.disabled = isGenerate;

    renderCanvas();
}

function showSaveConfirmModal() {
    saveConfirmModal.classList.remove('hidden');
}

function hideSaveConfirmModal() {
    saveConfirmModal.classList.add('hidden');
}

// --- CURVE TOOL FUNCTIONS ---
function handleClearCurvePath() {
    curvePath = [];
    isCurvePathFinalized = false;
    isCurveClosed = false;
    fillPathBtn.disabled = true;
    renderCanvas();
}

function finalizeCurvePath(shouldClose: boolean) {
    if (curvePath.length < 2) {
        handleClearCurvePath();
        return;
    }
    isCurvePathFinalized = true;
    isCurveClosed = shouldClose;
    isDrawing = false;
    isCreatingCurvePoint = false;

    // Automatically fill the path with circles along the stroke
    handleFillCurvePath();
}


function handleFillCurvePath() {
    if (curvePath.length < 2) {
        alert("Please create a path with at least two points first.");
        return;
    }

    saveState();

    if (!logoTopCircles) logoTopCircles = [];
    const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
    const circleDiameterMM = circleSizeInches * INCH_TO_MM;
    const separationMM = parseFloat(logoCircleSeparationInput.value) || 0;
    const step = circleDiameterMM + separationMM;

    if (step <= 0.01) { // Avoid infinite loops with zero/tiny step
        handleClearCurvePath();
        return;
    }

    const selectedFillColor = selectedColor === MASK_COLOR ? '#ffffff' : selectedColor;

    const getBezierPoint = (t: number, p0: CurvePoint, p1: CurvePoint) => {
        const c = (p: {x:number, y:number}) => ({x: p.x, y: p.y});
        const pt0 = c(p0.p), pt1 = c(p0.h2), pt2 = c(p1.h1), pt3 = c(p1.p);
        const t1 = 1 - t;
        const x = t1**3 * pt0.x + 3 * t1**2 * t * pt1.x + 3 * t1 * t**2 * pt2.x + t**3 * pt3.x;
        const y = t1**3 * pt0.y + 3 * t1**2 * t * pt1.y + 3 * t1 * t**2 * pt2.y + t**3 * pt3.y;
        return { x, y };
    };

    const segments = [];
    for (let i = 0; i < curvePath.length - 1; i++) {
        segments.push({ p0: curvePath[i], p1: curvePath[i+1] });
    }
    if (isCurveClosed && curvePath.length > 1) {
        segments.push({ p0: curvePath[curvePath.length - 1], p1: curvePath[0] });
    }
    
    if (segments.length === 0) {
        handleClearCurvePath();
        return;
    }
    
    // Add the very first point of the entire path
    logoTopCircles.push({ ...segments[0].p0.p, color: selectedFillColor });
    let lastPlacedPoint = { ...segments[0].p0.p };
    
    // Walk along each segment of the curve
    for (const seg of segments) {
        const p0 = seg.p0;
        const p1 = seg.p1;
        
        let t = 0;
        // Estimate segment length for adaptive step size, coarse but effective
        const dx_est = p1.p.x - p0.p.x;
        const dy_est = p1.p.y - p0.p.y;
        const estimatedLength = Math.sqrt(dx_est*dx_est + dy_est*dy_est);
        // Use a smaller dt for longer/curvier segments to improve accuracy
        const dt = Math.min(0.005, 1 / (estimatedLength * 2)); 

        let lastCheckPoint = p0.p;

        while (t < 1) {
            t += dt;
            const currentPoint = getBezierPoint(Math.min(t, 1), p0, p1);
            
            const dist_dx = currentPoint.x - lastPlacedPoint.x;
            const dist_dy = currentPoint.y - lastPlacedPoint.y;
            const distanceFromLast = Math.sqrt(dist_dx*dist_dx + dist_dy*dist_dy);

            if (distanceFromLast >= step) {
                // We've moved far enough. Place a new circle.
                // We need to place it exactly `step` away from the last point,
                // so we interpolate backwards along the line segment we just traveled.
                const overshoot = distanceFromLast - step;
                const ratio = overshoot / distanceFromLast;
                
                const newPoint = {
                    x: currentPoint.x - dist_dx * ratio,
                    y: currentPoint.y - dist_dy * ratio,
                };

                logoTopCircles.push({ ...newPoint, color: selectedFillColor });
                lastPlacedPoint = newPoint;

                // Adjust `t` to effectively start the next search from the new point.
                // This improves accuracy by accounting for the interpolation.
                const traveledRatio = (distanceFromLast - overshoot) / Math.sqrt( (currentPoint.x - lastCheckPoint.x)**2 + (currentPoint.y - lastCheckPoint.y)**2 );
                t = t - dt + (dt * traveledRatio);
            }
            lastCheckPoint = currentPoint;
        }
    }

    buildLogoTopCircleGrid();
    handleClearCurvePath();
    renderCanvas();
}


// --- LOGO TOP MODE FUNCTIONS ---

function handleLogoUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (file.name.endsWith('.ltjproj')) {
        // Handle project loading
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const projectData = JSON.parse(text);
                
                if (projectData.mode !== 'logo-top') {
                    throw new Error("This is not a Logo Top project file.");
                }

                resetProject();
                switchMode('logo-top');

                logoTopCircles = projectData.logoTopCircles || null;
                artboardWidthInches = projectData.artboardWidthInches || 95.1;
                artboardHeightInches = projectData.artboardHeightInches || 18;
                artboardWidthMM = artboardWidthInches * INCH_TO_MM;
                artboardHeightMM = artboardHeightInches * INCH_TO_MM;
                
                logoTopView = projectData.logoTopView || { scale: 1.0, offsetX: artboardWidthMM / 2, offsetY: artboardHeightMM / 2 };
                zoomSlider.value = String(logoTopView.scale);

                if (projectData.settings) {
                    logoCircleSizeSelect.value = projectData.settings.circleSize || '0.5';
                    logoCircleSeparationInput.value = projectData.settings.circleSeparation || '12';
                }

                const sizeValue = `${artboardWidthInches}x${artboardHeightInches}`;
                if ([...logoTopSizeSelect.options].some(opt => opt.value === sizeValue)) {
                    logoTopSizeSelect.value = sizeValue;
                    logoTopCustomSizeContainer.classList.add('hidden');
                } else {
                    logoTopSizeSelect.value = 'custom';
                    logoTopCustomWidthInput.value = String(artboardWidthInches);
                    logoTopCustomHeightInput.value = String(artboardHeightInches);
                    logoTopCustomSizeContainer.classList.remove('hidden');
                }

                if (projectData.logoTopState && projectData.logoTopState.imageDataUrl) {
                    const img = new Image();
                    img.onload = () => {
                        logoTopState = {
                            image: img,
                            artboardX: projectData.logoTopState.artboardX,
                            artboardY: projectData.logoTopState.artboardY,
                            widthMM: projectData.logoTopState.widthMM,
                            heightMM: projectData.logoTopState.heightMM,
                        };
                        logoFileNameSpan.textContent = file.name;
                        logoPreviewImage.src = img.src;
                        logoPreviewBox.classList.remove('hidden');
                        [logoFillPatternSelect, logoSensitivitySlider, generateLogoTopBtn, generateLogoTopEdgesBtn, adjustLogoBtn, hideLogoBtn, logoInvertCheckbox].forEach(el => el.disabled = false);
                        isLogoGuideVisible = true;
                        hideLogoBtn.textContent = 'Hide Logo';
                        buildLogoTopCircleGrid();
                        renderCanvas();
                    };
                    img.onerror = () => alert('Failed to load the guide image from the project file.');
                    img.src = projectData.logoTopState.imageDataUrl;
                } else {
                    buildLogoTopCircleGrid();
                    renderCanvas();
                }
                
                resetHistory();
                updateControlStates();

            } catch (error) {
                console.error("Error loading Logo Top project:", error);
                alert("Could not load project file. It may be corrupt or in the wrong format.");
                logoFileNameSpan.textContent = "Error loading project.";
            }
        };
        reader.readAsText(file);

    } else { // Handle image loading for guide
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const imgAspect = img.width / img.height;
                const targetWidthMM = artboardWidthMM / 2;
                const targetHeightMM = targetWidthMM / imgAspect;

                const startX = (artboardWidthMM - targetWidthMM) / 2;
                const startY = (artboardHeightMM - targetHeightMM) / 2;

                logoTopState = {
                    image: img,
                    artboardX: startX,
                    artboardY: startY,
                    widthMM: targetWidthMM,
                    heightMM: targetHeightMM,
                };

                logoFileNameSpan.textContent = file.name;
                logoPreviewImage.src = img.src;
                logoPreviewBox.classList.remove('hidden');

                [logoFillPatternSelect, logoSensitivitySlider, generateLogoTopBtn, generateLogoTopEdgesBtn, adjustLogoBtn, hideLogoBtn, logoInvertCheckbox].forEach(el => el.disabled = false);
                isLogoGuideVisible = true;
                hideLogoBtn.textContent = 'Hide Logo';
                
                saveState();
                renderCanvas();
            };
            img.onerror = () => {
                alert('Could not load the logo image.');
                logoFileNameSpan.textContent = 'Error loading file.';
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
    logoUploadInput.value = '';
}

function handleLogoTopSizeChange() {
    if (logoTopSizeSelect.value === 'custom') {
        logoTopCustomWidthInput.value = String(artboardWidthInches);
        logoTopCustomHeightInput.value = String(artboardHeightInches);
        logoTopCustomSizeContainer.classList.remove('hidden');
        return;
    }

    logoTopCustomSizeContainer.classList.add('hidden');
    saveState();

    const [width, height] = logoTopSizeSelect.value.split('x').map(Number);
    artboardWidthInches = width;
    artboardHeightInches = height;
    artboardWidthMM = artboardWidthInches * INCH_TO_MM;
    artboardHeightMM = artboardHeightInches * INCH_TO_MM;
    
    // Recenter view
    logoTopView.offsetX = artboardWidthMM / 2;
    logoTopView.offsetY = artboardHeightMM / 2;
    
    renderCanvas();
}

function applyLogoTopCustomSize() {
    const width = parseFloat(logoTopCustomWidthInput.value);
    const height = parseFloat(logoTopCustomHeightInput.value);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0 || width > 500 || height > 500) {
        alert("Please enter valid dimensions (1-500 inches).");
        return;
    }

    if (width === artboardWidthInches && height === artboardHeightInches) return;
    
    saveState();
    artboardWidthInches = width;
    artboardHeightInches = height;
    artboardWidthMM = artboardWidthInches * INCH_TO_MM;
    artboardHeightMM = artboardHeightInches * INCH_TO_MM;

    // Recenter view
    logoTopView.offsetX = artboardWidthMM / 2;
    logoTopView.offsetY = artboardHeightMM / 2;
    
    renderCanvas();
}

function handleToggleAdjustLogo() {
    isAdjustingLogo = !isAdjustingLogo;
    adjustLogoBtn.classList.toggle('active', isAdjustingLogo);
    // When adjusting, we want the logo to be visible
    if (isAdjustingLogo) {
        isLogoGuideVisible = true;
        hideLogoBtn.textContent = 'Hide Logo';
    }
    renderCanvas();
}

function handleToggleLogoVisibility() {
    // Cannot hide logo while adjusting it
    if (isAdjustingLogo) return;

    isLogoGuideVisible = !isLogoGuideVisible;
    hideLogoBtn.textContent = isLogoGuideVisible ? 'Hide Logo' : 'Show Logo';
    renderCanvas();
}

/**
 * Rebuilds the spatial hash grid for fast circle collision detection.
 */
function buildLogoTopCircleGrid() {
    if (!logoTopCircles) {
        logoTopCircleGrid = null;
        return;
    }

    const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
    const circleDiameterMM = circleSizeInches * INCH_TO_MM;
    const separationMM = parseFloat(logoCircleSeparationInput.value) || 0;
    const step = circleDiameterMM + separationMM;
    
    // A good cell size for a spatial hash is usually the size of the objects being checked.
    logoTopGridCellSize = step > 0 ? step : 1; 
    
    logoTopCircleGrid = new Map<string, { x: number, y: number, color: string }[]>();

    for (const circle of logoTopCircles) {
        const gridX = Math.floor(circle.x / logoTopGridCellSize);
        const gridY = Math.floor(circle.y / logoTopGridCellSize);
        const key = `${gridX},${gridY}`;
        
        if (!logoTopCircleGrid.has(key)) {
            logoTopCircleGrid.set(key, []);
        }
        logoTopCircleGrid.get(key)!.push(circle);
    }
}

function handleGenerateLogoTop(isEdgeDetection: boolean = false) {
    if (!logoTopState) {
        alert("Please upload a logo image first.");
        return;
    }
    saveState();

    const sensitivity = parseInt(logoSensitivitySlider.value, 10) / 100;
    const isInverted = logoInvertCheckbox.checked;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    // Use a reasonable resolution for processing
    const processWidth = 200;
    const processHeight = Math.round(processWidth * (logoTopState.heightMM / logoTopState.widthMM));
    tempCanvas.width = processWidth;
    tempCanvas.height = processHeight;

    tempCtx.drawImage(logoTopState.image, 0, 0, processWidth, processHeight);
    const imageData = tempCtx.getImageData(0, 0, processWidth, processHeight).data;

    const mmPerPixelX = logoTopState.widthMM / processWidth;
    const mmPerPixelY = logoTopState.heightMM / processHeight;

    const circleSizeInches = parseFloat(logoCircleSizeSelect.value);
    const circleDiameterMM = circleSizeInches * INCH_TO_MM;
    const separationMM = parseFloat(logoCircleSeparationInput.value) || 0;
    const stepMM = circleDiameterMM + separationMM;
    if (stepMM <= 0) return;

    if (!logoTopCircles) logoTopCircles = [];
    buildLogoTopCircleGrid(); // Start with existing circles

    // This function checks the processed image data
    const isPixelSolid = (x: number, y: number, data: Uint8ClampedArray) => {
        if (x < 0 || x >= processWidth || y < 0 || y >= processHeight) return false;
        const index = (y * processWidth + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const alpha = data[index + 3];
        const brightness = (r + g + b) / (255 * 3);
        
        if (alpha < 128) return false; 
        
        return isInverted ? (brightness > sensitivity) : (brightness < sensitivity);
    };
    
    // This function checks the artboard position against the processed image
    const isArtboardPosSolid = (artboardX: number, artboardY: number, data: Uint8ClampedArray) => {
        const relativeX = artboardX - logoTopState!.artboardX;
        const relativeY = artboardY - logoTopState!.artboardY;
        
        if (relativeX < 0 || relativeY < 0 || relativeX >= logoTopState!.widthMM || relativeY >= logoTopState!.heightMM) {
            return false;
        }

        const processX = Math.round(relativeX / mmPerPixelX);
        const processY = Math.round(relativeY / mmPerPixelY);
        
        return isPixelSolid(processX, processY, data);
    };
    
    const addCircleIfNoCollision = (x: number, y: number, color: string) => {
        let hasCollision = false;
        if (logoTopCircleGrid && logoTopGridCellSize > 0) {
             const checkGridX = Math.floor(x / logoTopGridCellSize);
             const checkGridY = Math.floor(y / logoTopGridCellSize);
             
             for (let i = -1; i <= 1; i++) {
                 for (let j = -1; j <= 1; j++) {
                     const key = `${checkGridX + i},${checkGridY + j}`;
                     const cell = logoTopCircleGrid!.get(key);
                     if (cell) {
                         for (const other of cell) {
                             const dx = x - other.x;
                             const dy = y - other.y;
                             if ((dx * dx + dy * dy) < (stepMM * stepMM * 0.99)) { // use 0.99 to avoid floating point errors on grid
                                 hasCollision = true;
                                 break;
                             }
                         }
                     }
                     if (hasCollision) break;
                 }
                 if (hasCollision) break;
             }
        }

        if (!hasCollision) {
            const newCircle = { x, y, color };
            logoTopCircles!.push(newCircle);
            
            if (logoTopCircleGrid && logoTopGridCellSize > 0) {
                const gridX = Math.floor(x / logoTopGridCellSize);
                const gridY = Math.floor(y / logoTopGridCellSize);
                const key = `${gridX},${gridY}`;
                if (!logoTopCircleGrid.has(key)) {
                    logoTopCircleGrid.set(key, []);
                }
                logoTopCircleGrid.get(key)!.push(newCircle);
            }
        }
    };
    
    const chosenColor = selectedColor === MASK_COLOR ? '#ffffff' : selectedColor;
    const pattern = logoFillPatternSelect.value;
    
    // --- PATTERN GENERATION LOGIC ---
    
    if (pattern === 'hexagonal' || pattern === 'square') {
        const yStep = pattern === 'hexagonal' ? stepMM * Math.sqrt(3) / 2 : stepMM;
        
        const startGridY = Math.floor(logoTopState.artboardY / yStep);
        const endGridY = Math.ceil((logoTopState.artboardY + logoTopState.heightMM) / yStep);
        
        const startGridX = Math.floor(logoTopState.artboardX / stepMM) - 1; // -1 for hex offset
        const endGridX = Math.ceil((logoTopState.artboardX + logoTopState.widthMM) / stepMM) + 1;

        for (let gridY = startGridY; gridY <= endGridY; gridY++) {
            const isOddRow = gridY % 2 !== 0;
            const xOffset = (pattern === 'hexagonal' && isOddRow) ? stepMM / 2 : 0;

            for (let gridX = startGridX; gridX <= endGridX; gridX++) {
                const circleCenterX = gridX * stepMM + xOffset;
                const circleCenterY = gridY * yStep;

                if (!isArtboardPosSolid(circleCenterX, circleCenterY, imageData)) continue;
                
                if (isEdgeDetection) {
                    // Check neighbors in artboard space
                    const isEdge = !isArtboardPosSolid(circleCenterX + mmPerPixelX, circleCenterY, imageData) ||
                                   !isArtboardPosSolid(circleCenterX - mmPerPixelX, circleCenterY, imageData) ||
                                   !isArtboardPosSolid(circleCenterX, circleCenterY + mmPerPixelY, imageData) ||
                                   !isArtboardPosSolid(circleCenterX, circleCenterY - mmPerPixelY, imageData);
                    if (!isEdge) continue;
                }
                
                addCircleIfNoCollision(circleCenterX, circleCenterY, chosenColor);
            }
        }
    } else if (pattern === 'disordered') {
        const areaMM = logoTopState.widthMM * logoTopState.heightMM;
        const circleArea = Math.PI * (circleDiameterMM/2)**2;
        const maxCircles = Math.floor(areaMM / circleArea) * 2; // Attempt to place twice the theoretical max
        
        for (let i = 0; i < maxCircles; i++) {
            const randX = logoTopState.artboardX + Math.random() * logoTopState.widthMM;
            const randY = logoTopState.artboardY + Math.random() * logoTopState.heightMM;
            
            if (isArtboardPosSolid(randX, randY, imageData)) {
                 if (isEdgeDetection) {
                    const isEdge = !isArtboardPosSolid(randX + mmPerPixelX, randY, imageData) ||
                                   !isArtboardPosSolid(randX - mmPerPixelX, randY, imageData) ||
                                   !isArtboardPosSolid(randX, randY + mmPerPixelY, imageData) ||
                                   !isArtboardPosSolid(randX, randY - mmPerPixelY, imageData);
                    if (!isEdge) continue;
                }
                addCircleIfNoCollision(randX, randY, chosenColor);
            }
        }
    } else if (pattern === 'concentric') {
        let currentImageData = new Uint8ClampedArray(imageData);
        let pixelsChanged = true;
        
        while (pixelsChanged) {
            pixelsChanged = false;
            let edgePixels = [];
            // Find edges on the current version of the image
            for (let y = 0; y < processHeight; y++) {
                for (let x = 0; x < processWidth; x++) {
                    if (isPixelSolid(x, y, currentImageData)) {
                         const isEdge = !isPixelSolid(x + 1, y, currentImageData) || !isPixelSolid(x - 1, y, currentImageData) ||
                                        !isPixelSolid(x, y + 1, currentImageData) || !isPixelSolid(x, y - 1, currentImageData);
                        if (isEdge) {
                            edgePixels.push({x, y});
                        }
                    }
                }
            }
            
            if (edgePixels.length === 0) break;
            
            // Place circles along the found edge
            for (const { x, y } of edgePixels) {
                const artboardX = logoTopState.artboardX + x * mmPerPixelX;
                const artboardY = logoTopState.artboardY + y * mmPerPixelY;
                addCircleIfNoCollision(artboardX, artboardY, chosenColor);
            }
            
            if (isEdgeDetection) break; // Only do one pass for edge detection mode
            
            // Erode the image for the next pass
            let nextImageData = new Uint8ClampedArray(currentImageData);
            for (const { x, y } of edgePixels) {
                const index = (y * processWidth + x) * 4;
                // "Erase" the pixel by setting alpha to 0, which `isPixelSolid` will reject
                nextImageData[index+3] = 0; 
                pixelsChanged = true;
            }
            currentImageData = nextImageData;
        }
    }

    renderCanvas();
    updateControlStates();
}


// --- INITIALIZATION ---
init();