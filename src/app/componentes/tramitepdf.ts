import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import { Tramite, Remiter } from './tramite';
import { logoperu, logo } from './logo';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  async generateTramiteReport(
    tramite: Tramite,
    remiter?: Remiter | null,
    pdfUrlLink?: string
  ): Promise<void> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const lineHeight = 4.2; // Altura estándar y compacta para tamaño de fuente 9

    // -------------------------------------------------------------
    // 1. ENCABEZADO CON LOGOS
    // -------------------------------------------------------------
    if (logoperu) {
      doc.addImage(logoperu, 'PNG', margin, 8, 21, 21);
    }

    if (logo) {
      doc.addImage(logo, 'PNG', pageWidth - margin - 21, 8, 22, 21);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('COMPROBANTE DE TRAMITE DOCUMENTARIO', pageWidth / 2, 22, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('DOCUMENTO OFICIAL DE SEGUIMIENTO', pageWidth / 2, 27, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, 31, pageWidth - margin, 31);

    // -------------------------------------------------------------
    // 2. GENERACIÓN DE CÓDIGO QR
    // -------------------------------------------------------------
    const qrData = pdfUrlLink || `https://tuservicio.gob.pe/tramite/${tramite._id || tramite.dni}`;
    const qrDataUrl = await QRCode.toDataURL(qrData, {
      width: 150,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' }
    });

    doc.addImage(qrDataUrl, 'PNG', pageWidth - margin - 28, 34, 28, 28);

    // -------------------------------------------------------------
    // 3. INFORMACIÓN GENERAL
    // -------------------------------------------------------------
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN GENERAL', margin, 36);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    const nombresCompleto = remiter
      ? `${remiter.nombres} ${remiter.apellidoPaterno} ${remiter.apellidoMaterno}`
      : `${tramite.nombres || ''} ${tramite.apellidopaterno || ''} ${tramite.apellidomaterno || ''}`.trim();

    const dniUsuario = remiter?.dni || tramite.dni || 'N/A';
    const fechaCreacion = tramite.createdAt
      ? new Date(tramite.createdAt).toLocaleString('es-PE')
      : new Date().toLocaleString('es-PE');

    let currentY = 42;
    doc.text(`Solicitante: ${nombresCompleto}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`DNI / Documento: ${dniUsuario}`, margin, currentY);
    currentY += lineHeight;
    doc.text(`Fecha de Emisión: ${fechaCreacion}`, margin, currentY);
    currentY += lineHeight;

    const splitTitle = doc.splitTextToSize(`Asunto: ${tramite.title}`, pageWidth - margin * 2 - 32);
    doc.text(splitTitle, margin, currentY);
    currentY += (splitTitle.length * lineHeight) + 4;

    // -------------------------------------------------------------
    // 4. DETALLE DEL TRÁMITE
    // -------------------------------------------------------------
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('DETALLE / RESUMEN', margin, currentY);
    currentY += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    const formattedDetail = this.parseHtmlToPlainText(tramite.detail || '');
    const splitDetail = doc.splitTextToSize(formattedDetail || 'Sin detalle provisto.', pageWidth - (margin * 2));
    
    doc.text(splitDetail, margin, currentY);
    currentY += (splitDetail.length * lineHeight) + 6;

    // -------------------------------------------------------------
    // 5. TABLA DE SEGUIMIENTO Y PROVEÍDOS (AUTOTABLE)
    // -------------------------------------------------------------
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('HISTORIAL DE PROVEÍDOS Y DEPENDENCIAS', margin, currentY);
    currentY += 2;

    const tableRows = (tramite.proveido || []).map((p, index) => [
      (index + 1).toString(),
      p.dependencel || 'General',
      p.user || 'Sistema',
      p.createdAt ? new Date(p.createdAt).toLocaleDateString('es-PE') : '-',
      p.recibido ? new Date(p.recibido).toLocaleDateString('es-PE') : 'Pendiente',
      p.archivado ? new Date(p.archivado).toLocaleDateString('es-PE') : 'En Tránsito'
    ]);

    autoTable(doc, {
      startY: currentY,
      head: [['#', 'Dependencia Destino', 'Enviado por', 'Fecha Envío', 'Recibido', 'Estado/Archivado']],
      body: tableRows,
      theme: 'striped',
      headStyles: {
        fillColor: [30, 60, 114],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
        cellPadding: 2
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: 2
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250]
      },
      margin: { left: margin, right: margin }
    });

    // -------------------------------------------------------------
    // 6. PIE DE PÁGINA Y NÚMERO DE PÁGINAS
    // -------------------------------------------------------------
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text(
        `Página ${i} de ${totalPages} - Escanee el código QR para validar la autenticidad del documento.`,
        pageWidth / 2,
        pageHeight - 8,
        { align: 'center' }
      );
    }

    doc.save(`Tramite_${dniUsuario}_${Date.now()}.pdf`);
  }

  /**
   * Convierte HTML limpio evitando saltos de línea excesivos.
   */
  private parseHtmlToPlainText(html: string): string {
    if (!html) return '';

    let cleanText = html
      .replace(/<\/p>/gi, '\n')
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<li>/gi, '  • ')
      .replace(/<p>/gi, '- ')
      .replace(/<\/li>/gi, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    cleanText = cleanText.replace(/<[^>]*>?/gm, '');

    // Limpia saltos múltiples y deja un espaciado limpio y compacto
    return cleanText.replace(/\n\s*\n/g, '\n').trim();
  }
}