declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      filename?: string;
      html2canvas?: object;  // This can be more specific if needed
      jsPDF?: object;  // This can be more specific if needed
      margin?: number;
      pageSize?: string;
      [key: string]: string | number | boolean | object | undefined;  // Allow other options
    }
  
    interface Html2Pdf {
      from(element: HTMLElement): Html2Pdf;
      toPdf(): object;  // You can replace this with a more specific type
      save(filename?: string): void;
      options: Html2PdfOptions;
    }
  
    // html2pdf is a callable function, so we declare it as a function
    const html2pdf: {
      (options?: Html2PdfOptions): Html2Pdf;
      options: Html2PdfOptions;
    };
  
    export default html2pdf;
  }
  
  