import { Component, OnInit, signal, computed, inject, ElementRef, ViewChild, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isAuth } from './auth';
import { Navbar } from './navbar';

// ==========================================
// 1. MODELOS E INTERFACES
// ==========================================
export interface User {
  _id: string;
  name: string;
  email: string;
  rol: string;
}

export interface JournalInfo {
  YEAR?: string;
  TITLE?: string;
  SUBTITLE?: string;
  PARAGRAPHS?: string[];
  FRASE?: string;
  COMITE?: any;
  INSTITUTION?: string;
  INSTITUTIONABREV?: string;
  LOCATION?: string;
  ISSN_PRINT?: string;
  ISSN_ONLINE?: string;
  DOI_PREFIX?: string;
  VOL?: string;
  NUM?: string;
  LICENSE?: string;
  WEB?: string;
}

export interface ArticleTrack {
  _id?: string;
  title: string;
  volumen?: string;
  number?: string;
  description?: string;
  filename?: string;
  user?: any;
  email?: string;
  page?: string;
  arTicles?: ArticleTrack[];
}

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
const MAX_FILE_SIZE = 105048576; // 100MB
const INITIAL_FILE_STATE = { file: null as File | null, name: '', size: 0, type: '' };

// ==========================================
// 2. SERVICIO DE AUTENTICACIÓN
// ==========================================
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _currentUser = signal<User | null>(isAuth());

  isAuth(): User | null {
    return this._currentUser();
  }
}

// ==========================================
// 3. COMPONENTE PRINCIPAL (ANGULAR 21)
// ==========================================
@Component({
  selector: 'app-scientific-articles-manager',
  standalone: true,
  imports: [CommonModule, Navbar, FormsModule],
  template: `
    <app-navbar></app-navbar>
    <div class="py-5"></div>
    
    <div class="container my-4">
      <!-- Encabezado Principal -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i class="bi bi-journal-text text-primary me-2"></i>
          Gestión de Artículos y Publicaciones Científicas
        </h2>

        @if (currentUser()?.rol === '1') {
          <button
            class="btn btn-primary d-flex align-items-center gap-2"
            (click)="openModal('numberblock', null, { tipoarticulo: 'numberblock', parentId: currentUser()?._id })"
          >
            <i class="bi bi-plus-circle fs-5"></i> Nuevo número
          </button>
        }
      </div>

      <!-- Notificaciones Toast Integradas -->
      @if (toastMessage()) {
        <div class="alert alert-{{ toastType() }} alert-dismissible fade show shadow-sm mb-4" role="alert">
          {{ toastMessage() }}
        </div>
      }

      <!-- Listado de Números y Artículos -->
      @for (group of articles(); track group._id; let i = $index) {
        <div class="card shadow border-0 mb-5 border bg-info">
          <div class="card-header bg-info py-3 d-flex justify-content-between align-items-center">
            <div>
              <h4 class="text-light m-0">N.{{ i + 1 }} V.{{ group.volumen==='2026'?'1':'2' }}: {{ group.title }}</h4>
            </div>
            <div class="d-flex align-items-center gap-2">
             <button
  class="btn d-flex align-items-center gap-1"
  [disabled]="isMerging()"
  (click)="handleAddGeneratedSections(i, group.title)"
>
  <i class="bi bi-printer"></i>
  <span>{{ isMerging() ? 'Procesando...' : 'Generar' }}</span>
</button>

              @if (currentUser()) {
                <button
                  class="btn"
                  title="Añadir Artículo"
                  (click)="openModal('create', null, { number: i + 1, tipoarticulo: 'articulo', parentId: group._id })"
                >
                  <i class="bi bi-plus-circle"></i>
                </button>
              }
              @if (currentUser()?.rol === '1') {
                <button class="btn" title="Editar Metadatos" (click)="openModal('update', group)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn" title="Retirar Publicación" (click)="handleDelete(group._id)">
                  <i class="bi bi-trash"></i>
                </button>
              }
            </div>
          </div>

          <div class="card-body p-0">
            <!-- 1. VISTA DE TABLA TRADICIONAL -->
            <div class="table-responsive d-none d-md-block">
              <table class="table table-hover mb-0 align-middle">
                <thead>
                  <tr>
                    <th class="ps-3">Título del Artículo</th>
                    <th>Autor</th>
                    <th>Editor / Revisor Asignado</th>
                    <th class="text-center pe-3">Gestión</th>
                  </tr>
                </thead>
                <tbody>
                  @if (group.arTicles && group.arTicles.length > 0) {
                    @for (article of group.arTicles; track article._id) {
                      <tr>
                        <td class="ps-3">{{ article.title }}</td>
                        <td>{{ getUserName(article.user) }}</td>
                        <td>{{ article.email || 'Comité Editorial' }} {{ article.filename }}</td>
                        <td class="text-center pe-3">
                          <div class="btn-group btn-group-sm">
                            <a
                              class="btn"
                              target="_blank"
                              rel="noopener noreferrer"
                              [href]="apiUrlfile + '/article/' + article.filename"
                              title="Ver Archivo"
                            >
                              <i class="bi bi-arrows-angle-expand"></i>
                            </a>

                            @if (currentUser()?.email === article.email || currentUser()?.rol === '1') {
                              <button class="btn" title="Editar Metadatos" (click)="openModal('update', article)">
                                <i class="bi bi-pencil"></i>
                              </button>
                              <button class="btn" title="Retirar Publicación" (click)="handleDelete(article._id)">
                                <i class="bi bi-trash"></i>
                              </button>
                            }
                          </div>
                        </td>
                      </tr>
                    }
                  } @else {
                    <tr>
                      <td colspan="6" class="text-center text-muted py-4">
                        No se registran artículos activos en este número.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

            <!-- 2. VISTA DE TARJETAS (Móvil) -->
            <div class="d-block d-md-none p-3">
              @if (group.arTicles && group.arTicles.length > 0) {
                @for (article of group.arTicles; track article._id) {
                  <div class="card mb-3 border-secondary bg-dark text-white shadow-sm">
                    <div class="card-body">
                      <h6 class="fw-bold text-warning mb-2">{{ article.title }}</h6>
                      <p class="mb-1 small text-secondary">
                        <strong class="text-light">Autor:</strong> {{ getUserName(article.user) }}
                      </p>
                      <p class="mb-1 small text-secondary">
                        <strong class="text-light">Vol / Núm:</strong> Vol. {{ article.volumen }} - N° {{ article.number }}
                      </p>
                      <p class="mb-3 small text-secondary">
                        <strong class="text-light">Editor/Revisor:</strong> {{ article.email || 'Comité Editorial' }} {{ article.filename }}
                      </p>

                      <div class="d-flex justify-content-end gap-2 pt-2 border-top border-secondary">
                        <a
                          class="btn"
                          target="_blank"
                          rel="noopener noreferrer"
                          [href]="apiUrlfile + '/article/' + article.filename"
                          title="Ver Artículo"
                        >
                          <i class="bi bi-arrows-angle-expand"></i> Ver
                        </a>

                        @if (currentUser()?.email === article.email || currentUser()?.rol === '1') {
                          <button class="btn" title="Editar Metadatos" (click)="openModal('update', article)">
                            <i class="bi bi-pencil"></i> Editar
                          </button>
                          <button class="btn" title="Retirar Publicación" (click)="handleDelete(article._id)">
                            <i class="bi bi-trash"></i> Retirar
                          </button>
                        }
                      </div>
                    </div>
                  </div>
                }
              } @else {
                <div class="text-center text-muted py-4">
                  No se registran artículos activos en este número.
                </div>
              }
            </div>
          </div>
        </div>
      }
    </div>

    <!-- Modal Formulario -->
    @if (showModal()) {
      <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content shadow-lg border-0">
            <form (ngSubmit)="onSubmitForm()">
              <div class="modal-header bg-dark text-white py-3">
                <h5 class="modal-title">
                  {{ modalType() === 'create' || modalType() === 'numberblock' ? 'Indexar Nuevo Artículo' : 'Actualizar Metadatos del Artículo' }}
                </h5>
                <button type="button" class="btn-close btn-close-white" aria-label="Cerrar" (click)="closeModal()"></button>
              </div>

              <div class="modal-body p-4">
                <div class="mb-3">
                  <label class="form-label fw-semibold">Título del Artículo</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Ej: Avances en Computación Cuántica Aplicada"
                    [(ngModel)]="formTitle"
                    name="title"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label fw-semibold">Descripción</label>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Breve resumen o descripción del artículo..."
                    [(ngModel)]="formDescription"
                    name="description"
                  ></textarea>
                </div>

                @if (modalType() === 'create' || modalType() === 'update') {
                  <div class="mb-2">
                    <label class="form-label fw-semibold">Archivo Adjunto (PDF o Imagen)</label>
                    <input
                      #fileInput
                      type="file"
                      class="form-control"
                      accept=".pdf, .jpg, .jpeg, .png"
                      (change)="handleFileSelect($event)"
                    />
                    @if (fileData().name) {
                      <small class="text-muted mt-2 d-block">Seleccionado: {{ fileData().name }}</small>
                    }
                  </div>
                }
              </div>

              <div class="modal-footer bg-light py-3">
                <button type="button" class="btn btn-secondary" (click)="closeModal()">Cancelar</button>
                <button
                  type="submit"
                  class="btn"
                  [ngClass]="modalType() === 'create' || modalType() === 'numberblock' ? 'btn-primary' : 'btn-warning'"
                >
                  {{ modalType() === 'create' || modalType() === 'numberblock' ? 'Registrar Artículo' : 'Guardar Cambios' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    }
  `
})
export class ScientificArticlesManagerComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  auth: any = isAuth();

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  readonly apiUrl = `${environment.apiURL}/api`;
  readonly apiUrlfile = `${environment.apiURL}`;

  articles = signal<any[]>([]);
  filesToMerge = signal<any[]>([]);
  isMerging = signal(false);

  showModal = signal(false);
  modalType = signal<'create' | 'update' | 'numberblock'>('create');
  selectedArticleId = signal<string | null>(null);

  formTitle = '';
  formVolumen = new Date().getFullYear().toString();
  formNumber = '1';
  formDescription = '';
  tipoarticulo = '';
  parentArticuloId = '';

  fileData = signal(INITIAL_FILE_STATE);
  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'warning' | 'danger' | 'info'>('info');

  currentUser = computed(() => this.authService.isAuth());
  private downloadedFiles = new Set<string>();

  ngOnInit(): void {
    this.getArticles();
  }

  showToast(msg: string, type: 'success' | 'warning' | 'danger' | 'info' = 'info') {
    this.toastMessage.set(msg);
    this.toastType.set(type);
    setTimeout(() => this.toastMessage.set(null), 4000);
  }

  getArticles(): void {
    this.http.get<any[]>(`${this.apiUrl}/articles`).subscribe({
      next: (data) => this.articles.set(data),
      error: (err) => {
        console.error(err);
        this.showToast('Error al sincronizar el repositorio de artículos', 'danger');
      }
    });
  }

  getUserName(user: any): string {
    if (typeof user === 'string') return user;
    return user?.name || 'N/A';
  }

  handleFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFile = input.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.size <= MAX_FILE_SIZE && ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      this.fileData.set({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });
      this.showToast('Archivo adjuntado correctamente', 'success');
    } else {
      this.showToast('Formatos permitidos: PDF, JPG, PNG (máx. 100MB)', 'warning');
      input.value = '';
    }
  }

  openModal(type: 'create' | 'update' | 'numberblock', article: any = null, extraProps: any = {}): void {
    this.modalType.set(type);
    this.resetFormState();

    if (extraProps.tipoarticulo) this.tipoarticulo = extraProps.tipoarticulo;
    if (extraProps.parentId) this.parentArticuloId = extraProps.parentId;
    if (extraProps.number) this.formNumber = extraProps.number.toString();

    if (type === 'update' && article) {
      this.selectedArticleId.set(article._id);
      this.formTitle = article.title || '';
      this.formVolumen = article.volumen || new Date().getFullYear().toString();
      this.formNumber = article.number || '1';
      this.formDescription = article.description || '';
    }

    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.resetFormState();
  }

  private resetFormState(): void {
    this.formTitle = '';
    this.formVolumen = new Date().getFullYear().toString();
    this.formNumber = '1';
    this.formDescription = '';
    this.fileData.set(INITIAL_FILE_STATE);
    this.selectedArticleId.set(null);
  }

  onSubmitForm(): void {
    if (this.modalType() === 'create' || this.modalType() === 'numberblock') {
      this.handleCreate();
    } else {
      this.handleUpdate();
    }
  }

  private handleCreate(): void {
    const user = this.currentUser();
    if (!user) {
      this.showToast('Se requiere autenticación de comité editorial', 'danger');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.formTitle);
    formData.append('volumen', this.formVolumen);
    formData.append('number', this.formNumber);
    formData.append('description', this.formDescription);
    formData.append('tipoarticulo', this.tipoarticulo);
    formData.append('parentArticuloId', this.parentArticuloId);
    formData.append('user', user.name);
    formData.append('email', user.email);
    formData.append('userid', user._id);

    const currentFile = this.fileData();
    if (currentFile.file) {
      formData.append('archivo', currentFile.file);
      formData.append('size', currentFile.size.toString());
      formData.append('type', currentFile.type);
    }

    this.http.post(`${this.apiUrl}/articles`, formData).subscribe({
      next: () => {
        this.getArticles();
        this.showToast('Artículo indexado exitosamente', 'success');
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        this.showToast('Error al registrar la publicación', 'danger');
      }
    });
  }

  private handleUpdate(): void {
    const id = this.selectedArticleId();
    if (!id) return;

    const formData = new FormData();
    formData.append('title', this.formTitle);
    formData.append('volumen', this.formVolumen);
    formData.append('number', this.formNumber);
    formData.append('description', this.formDescription);

    const currentFile = this.fileData();
    if (currentFile.file) {
      formData.append('archivo', currentFile.file);
      formData.append('size', currentFile.size.toString());
      formData.append('type', currentFile.type);
    }

    this.http.put(`${this.apiUrl}/articles/${id}`, formData).subscribe({
      next: () => {
        this.getArticles();
        this.showToast('Metadatos actualizados correctamente', 'info');
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        this.showToast('Error al actualizar la información del artículo', 'danger');
      }
    });
  }

  handleDelete(id: string): void {
    if (confirm('¿Confirma que desea retirar esta publicación del repositorio activo?')) {
      this.http.delete(`${this.apiUrl}/articles/${id}`).subscribe({
        next: () => {
          this.getArticles();
          this.showToast('Publicación retirada del sistema', 'info');
        },
        error: (err) => {
          console.error(err);
          this.showToast('Error al procesar la solicitud de eliminación', 'danger');
        }
      });
    }
  }

  private async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: 'application/pdf' });
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
    const raw = window.atob(cleanBase64.trim());
    const array = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  async mergePdfs(filesToMerge: any[]): Promise<void> {
    if (!filesToMerge || filesToMerge.length < 2) {
      this.showToast('Por favor, se necesitan al menos 2 archivos PDF para fusionar.', 'warning');
      return;
    }

    this.isMerging.set(true);
    this.showToast('Uniendo archivos PDF y aplicando numeración de páginas...', 'info');

    try {
      const [pdfLibModule, fontkitModule, lmodernModule] = await Promise.all([
        import('pdf-lib'),
        import('@pdf-lib/fontkit'),
        import('./FONTlmodern') as Promise<any>
      ]);

      const { PDFDocument, StandardFonts, PageSizes } = pdfLibModule;
      const fontkit = fontkitModule.default;
      const wwfont = lmodernModule.wwfont;

      const mergedPdf = await PDFDocument.create();
      mergedPdf.registerFontkit(fontkit);

      let customFont;
      try {
        const fontBytes = this.base64ToUint8Array(wwfont);
        customFont = await mergedPdf.embedFont(fontBytes);
      } catch (fontError) {
        console.warn("No se pudo embeber fuente, usando Courier:", fontError);
        customFont = await mergedPdf.embedFont(StandardFonts.Courier);
      }

      const loadedPdfs = [];

      for (const item of filesToMerge) {
        if (!item) continue;
        let pdfDoc: any = null;

        try {
          if (typeof item.arrayBuffer === 'function') {
            const fileBuffer = await item.arrayBuffer();
            pdfDoc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
          } else if (item instanceof ArrayBuffer || item instanceof Uint8Array) {
            pdfDoc = await PDFDocument.load(item, { ignoreEncryption: true });
          } else if (item.blob && typeof item.blob.arrayBuffer === 'function') {
            const fileBuffer = await item.blob.arrayBuffer();
            pdfDoc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
          } else if (typeof item === 'string') {
            const bytes = this.base64ToUint8Array(item);
            pdfDoc = await PDFDocument.load(bytes, { ignoreEncryption: true });
          } else if (item.getPageCount && typeof item.getPageCount === 'function') {
            pdfDoc = item;
          } else {
            continue;
          }

          if (pdfDoc) {
            loadedPdfs.push({ file: item, pdfDoc });
          }
        } catch (itemError) {
          console.error('Error al procesar PDF individual:', itemError);
        }
      }

      if (loadedPdfs.length === 0) {
        throw new Error('No se pudo cargar ningún documento PDF válido.');
      }

      const pageMetadata = [];
      const [targetWidth, targetHeight] = PageSizes.A4;

      for (const { file, pdfDoc } of loadedPdfs) {
        const authorName = file.user || (typeof file.user === 'string' ? file.user : '');
        const idarticle = file.id || (typeof file.id === 'string' ? file.id : '');
        const fileName = file.name || 'Documento';

        // Si el total de páginas acumuladas es impar, se inserta una página en blanco de relleno
        if (mergedPdf.getPageCount() % 2 !== 0 && mergedPdf.getPageCount() > 0) {
          const blankPage = mergedPdf.addPage(PageSizes.A4);
          pageMetadata.push({ newPage: blankPage, idarticle, fileName, authorName, isBlankPage: true });
        }

        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());

        for (const page of copiedPages) {
          const { width: originalWidth, height: originalHeight } = page.getSize();
          const newPage = mergedPdf.addPage(PageSizes.A4);
          const scale = Math.min(targetWidth / originalWidth, targetHeight / originalHeight);

          //  Asegúrate de usar await aquí:
          const embeddedPage = await mergedPdf.embedPage(page);

          const scaledWidth = originalWidth * scale;
          const scaledHeight = originalHeight * scale;

          newPage.drawPage(embeddedPage, {
            x: (targetWidth - scaledWidth) / 2,
            y: (targetHeight - scaledHeight) / 2,
            width: scaledWidth,
            height: scaledHeight
          });

          pageMetadata.push({ newPage, idarticle, fileName, authorName, isBlankPage: false });
        }
      }

      const totalPages = mergedPdf.getPageCount();

      pageMetadata.forEach(({ newPage, fileName, authorName, idarticle, isBlankPage }, index) => {
        const currentPageNumber = index + 1;
        const shouldDrawHeaderFooter = currentPageNumber > 4 && currentPageNumber <= totalPages - 2;

        if (shouldDrawHeaderFooter) {
          const isOdd = currentPageNumber % 2 !== 0;

          // Si es una página en blanco de relleno, no imprimimos autor ni fileName
          const text = isBlankPage ? 'Revista Científica' : (authorName ? `Autor - ${authorName}` : `Autor - ${fileName}`);
          const idArticle = isBlankPage ? '' : (idarticle ? `ID - ${idarticle}` : `Autor - ${fileName}`);

          const fontSize = 11;
          const textWidth = customFont.widthOfTextAtSize(text, fontSize);
          const numberpage = `${currentPageNumber}`;
          const numberpageWidth = customFont.widthOfTextAtSize(numberpage, fontSize);

          if (isOdd) {
            if (!isBlankPage) {
              newPage.drawText(text, {
                x: targetWidth - 56 - textWidth,
                y: targetHeight - 45,
                size: fontSize,
                font: customFont
              });
              newPage.drawText(`${idArticle}`, {
                x: 85,
                y: targetHeight - 45,
                size: fontSize,
                font: customFont
              });
            }
            newPage.drawText(numberpage, {
              x: targetWidth - 56 - numberpageWidth,
              y: 41,
              size: fontSize,
              font: customFont
            });
          } else {
            // En páginas pares si es blanca, solo mostramos el título genérico sin el fileName
            const headerEvenLabel = isBlankPage ? 'Revista Científica' : `Revista Científica - ${fileName}`;

            newPage.drawText(headerEvenLabel, {
              x: 57,
              y: targetHeight - 45,
              size: fontSize,
              font: customFont
            });
            newPage.drawText(numberpage, {
              x: targetWidth - 84 - numberpageWidth,
              y: 42,
              size: fontSize,
              font: customFont
            });
          }
        }
      });

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `documento-fusionado-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      this.downloadedFiles.clear();
      this.showToast('PDF fusionado y descargado con éxito', 'success');
    } catch (error) {
      console.error('Error al fusionar PDFs:', error);
      this.showToast('Ocurrió un error general al fusionar los archivos PDF.', 'danger');
    } finally {
      this.isMerging.set(false);
    }
  }

  journalData: JournalInfo = {
    TITLE: 'Onto-epistemologías de la Creación: El arte como producción de mundos',
    SUBTITLE: 'Publicación Arbitrada de Investigación, Epistemología Visual y Ciencias del Arte',
    INSTITUTION: 'ESCUELA SUPERIOR DE FORMACIÓN ARTÍSTICA "Felipe Guamán Poma de Ayala"',
    INSTITUTIONABREV: 'ESFAP "Felipe Guamán Poma de Ayala"',
    LOCATION: 'Ayacucho, Perú',
    COMITE: [
      { label: 'DIRECTOR CIENTÍFICO', val: 'Dr. Mario Aguilar Ramos\n(Química Aplicada al Arte, ESFAP)' },
      { label: 'EDITORA EN JEFE', val: 'Dra. Elena Mendoza Castro\n(Semiótica e Iconografía, UNMSM)' },
      { label: 'COMITÉ EVALUADOR STEAM', val: 'Dr. Carlos Holguín V. (Física Óptica, UNAM)\nMtr. Rosa Palomino K. (Restauración, USP)\nDr. Javier Ríos T. (Geometría, PUCP)' },
      { label: 'DISEÑO Y METADATOS', val: 'Unidad de Publicaciones Científicas' },
      { label: 'INDIZACIÓN Y OJS', val: 'Oficina de Biblioteca y Repositorio' },
      { label: 'CONTACTO EDITORIAL', val: 'revista.artes@esfapayacucho.edu.pe\nJr. 28 de Julio Nº 448, Ayacucho' }
    ],
    FRASE: 'La presente edición de la Revista Científica de Artes & Visión aborda la producción artística...',
    PARAGRAPHS: [
      'La presente edición de la Revista Científica de Artes & Visión aborda la producción artística no solo como expresión estética, sino como una disciplina metodológica e interconectada con las ciencias exactas y humanas.',
      'A través de los laboratorios de conservación de materiales, caracterización fisicoquímica de aglutinantes orgánicos y análisis iconográfico, nuestros estudiantes y docentes consolidan proyectos que integran la innovación científica con la tradición plástica regional.'
    ],
    ISSN_PRINT: '2708-8324',
    ISSN_ONLINE: '2708-8332',
    DOI_PREFIX: '10.5281/zenodo.artesvision',
    VOL: 'Vol. 1',
    YEAR: '2026',
    NUM: 'No. 1',
    LICENSE: 'CC BY-NC-SA 4.0 Internacional',
    WEB: 'www.esfapa.edu.pe/articulo'
  };

  async handleAddGeneratedSections(i: number, groupTitle?: string): Promise<void> {
    try {
      this.showToast('Iniciando la generación de secciones y lectura de publicaciones...', 'info');

      // Asignar el título del grupo actual a JournalInfo.TITLE si se proporciona
      if (groupTitle) {
        this.journalData.TITLE = groupTitle;
      }

      if (i) {
        this.journalData.NUM = `No. ${i+1}`;
      }

      const [{ generateMagazineNewSections }, { generateMagazineSections }, pdfLibModule] = await Promise.all([
        import('./articulofront') as Promise<any>,
        import('./articuloback') as Promise<any>,
        import('pdf-lib')
      ]);

      const articlesSection = this.articles()[i]?.arTicles || [];

      if (articlesSection.length === 0) {
        this.showToast('Este bloque no contiene artículos para generar la revista.', 'warning');
        return;
      }

      const filePromises = articlesSection.map(async (art: any, index: number) => {
        if (art.filename?.endsWith('.pdf')) {
          const url = `${this.apiUrlfile}/article/${art.filename}`;
          const fileKey = `${i}_${index + 1}_${art.filename}`;

          if (!this.downloadedFiles.has(fileKey)) {
            this.downloadedFiles.add(fileKey);
          }

          const file: any = await this.urlToFile(url, fileKey);
          file.user = typeof art.user === 'string' ? art.user : art.user?.name || 'Comité Editorial';
          file.id = typeof art._id === 'string' ? art._id : art._id?.name || 'Comité Editorial';
          return file;
        }
        return null;
      });

      const fetchedFiles = (await Promise.all(filePromises)).filter(Boolean);

      const inicioTemp = await generateMagazineNewSections(articlesSection, i, this.journalData);
      const inicioArrayBuffer = await inicioTemp.arrayBuffer();
      const inicioPdfDoc = await pdfLibModule.PDFDocument.load(inicioArrayBuffer);

      let currentStartPage = inicioPdfDoc.getPageCount() + 1;

      for (let idx = 0; idx < fetchedFiles.length; idx++) {
        if (currentStartPage % 2 === 0) {
          currentStartPage += 1;
        }

        const pageFormatted = currentStartPage.toString().padStart(2, '0');
        if (articlesSection[idx]) {
          articlesSection[idx].page = pageFormatted;
        }

        const pdfBytes = await fetchedFiles[idx].arrayBuffer();
        const pdfDoc = await pdfLibModule.PDFDocument.load(pdfBytes);
        currentStartPage += pdfDoc.getPageCount();
      }

      const Inicio = await generateMagazineNewSections(articlesSection, 'I', this.journalData);
      const Last = generateMagazineSections(articlesSection, 'I', this.journalData);

      if (Inicio && typeof Inicio === 'object') Inicio.user = 'Editorial';
      if (Last && typeof Last === 'object') Last.user = 'Editorial';

      const finalFileList = [Inicio, ...fetchedFiles, Last];
      this.showToast('Secciones y tabla de contenidos generadas correctamente.', 'success');

      await this.mergePdfs(finalFileList);

    } catch (error) {
      console.error('Error al generar secciones y fusionar:', error);
      this.showToast('Ocurrió un error al preparar las secciones de la revista.', 'danger');
    }
  }
}