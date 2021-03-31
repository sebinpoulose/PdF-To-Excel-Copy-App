import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData, PDFSource, PdfViewerComponent } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDialogComponentComponent } from './download-dialog-component/download-dialog-component.component';
import { ColHeaderEditComponent } from './col-header-edit/col-header-edit.component';
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(public dialog: MatDialog) { }

  title = 'PDFtoExcelApp';

  pdfSrc: string | PDFSource | ArrayBuffer = undefined;

  error: any;
  page = 1;
  rotation = 0;
  zoom = 1.0;
  originalSize = false;
  pdf: any;
  renderText = true;
  progressData: PDFProgressData;
  isLoaded = false;
  stickToPage = true;
  showAll = true;
  autoresize = true;
  fitToPage = true;
  outline: any[];
  isOutlineShown = false;
  pdfQuery = '';
  selectedText: string = "";
  showRowNumbers: boolean = true;
  excelFileName: string = "";
  gridApi: any;
  gridColumnApi: any;

  defaultColDef = {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
  };
  romNumDef={
    headerName: "#",
    valueGetter: "node.rowIndex + 1",
    editable: false, resizable: false, maxWidth: 55, pinned: 'left'
  };
  columnDefs = [
    this.romNumDef,
    // { field: 'make' },
    // { field: 'model' },
    // { field: 'price' }
  ];

  rowData = [
    // { make: 'Toyota', model: 'Celica', price: 35000 },
    // { make: 'Ford', model: 'Mondeo', price: 32000 },
    // { make: 'Porsche', model: 'Boxter', price: 72000 },
    // { make: 'Ford', model: 'Mondeo', price: 32000 },
    // { make: 'Porsche', model: 'Boxter', price: 72000 },
    // { make: 'Ford', model: 'Mondeo' },
    // { make: 'Porsche', model: 'Boxter', price: 72000 },
    // { make: 'Ford', model: 'Mondeo', price: 32000 },
    // { make: 'Porsche', model: 'Boxter', price: 72000 }
    {},{},{},{},{},{},{},{},{},{},{},{},
  ];



  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;

  openLocalFile() {
    jQuery('#file').trigger('click');
  }

  toggleOutline() {
    this.isOutlineShown = !this.isOutlineShown;
  }

  incrementPage(amount: number) {
    if ((this.page == 1) && amount == -1)
      return
    this.page += amount;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  rotate(angle: number) {
    this.rotation += angle;
  }

  /**
   * Render PDF preview on selecting file
   */
  onFileSelected() {
    const $pdf: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };

      reader.readAsArrayBuffer($pdf.files[0]);
    }
  }

  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;

    this.loadOutline();
  }

  /**
   * Get outline
   */
  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  /**
   * Handle error callback
   *
   * @param error
   */
  onError(error: any) {
    this.error = error; // set error

    if (error.name === 'PasswordException') {
      const password = prompt(
        'This document is password protected. Enter the password:'
      );

      if (password) {
        this.error = null;
        this.setPassword(password);
      }
    }
  }

  setPassword(password: string) {
    let newSrc;
    if (this.pdfSrc instanceof ArrayBuffer) {
      newSrc = { data: this.pdfSrc };
    } else if (typeof this.pdfSrc === 'string') {
      newSrc = { url: this.pdfSrc };
    } else {
      newSrc = { ...this.pdfSrc };
    }
    newSrc.password = password;
    this.pdfSrc = newSrc;
  }

  /**
   * Pdf loading progress callback
   * @param {PDFProgressData} progressData
   */
  onProgress(progressData: PDFProgressData) {
    console.log(progressData);
    this.progressData = progressData;
    this.isLoaded = false;
    this.error = null; // clear error
  }

  getInt(value: number): number {
    return Math.round(value);
  }

  /**
   * Navigate to destination
   * @param destination
   */
  navigateTo(destination: any) {
    this.pdfComponent.pdfLinkService.navigateTo(destination);
  }

  /**
   * Scroll view
   */
  scrollToPage() {
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: 3,
    });
  }

  /**
   * Page rendered callback, which is called when a page is rendered (called multiple times)
   *
   * @param {CustomEvent} e
   */
  pageRendered(e: CustomEvent) {
    console.log('(page-rendered)', e);
  }

  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true,
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true,
      });
    }
  }


  @HostListener('window:keydown', ['$event'])
  getCopyedText(event) {
    // console.log(event);

    if (event.key === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      this.selectedText = window.getSelection().toString();
      const cellDefs = this.gridApi.getFocusedCell();
      this.gridApi.startEditingCell({
        rowIndex: cellDefs.rowIndex,
        colKey: cellDefs.column.getId(),
        charPress: this.selectedText,
      });
      this.gridApi.tabToNextCell();
      this.gridApi.stopEditing(true);
    }
  }

  redirectToHome() {
    alert('The changes will be discarded');
    this.pdfSrc = null;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  openDownloadDialog(): void {
    let dialogRef = this.dialog.open(DownloadDialogComponentComponent, {
      width: '300px',
      data: { fileName: this.excelFileName }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.excelFileName = result;
      this.gridApi.exportDataAsCsv({ "fileName": this.excelFileName });
    });
  }

  editColHeadersDialog(): void {

    let dialogRef = this.dialog.open(ColHeaderEditComponent, {
      width: '800px',
      data: this.columnDefs.slice(1)
    });
    dialogRef.afterClosed().subscribe(

      result => {
        console.log(result);
        result.unshift(this.columnDefs[0]);
        this.columnDefs=result;
        this.gridApi.setColumnDefs(this.columnDefs);
      }

    );

  }

  showRowNum():void{  
    if(this.showRowNumbers){
      this.showRowNumbers=false;
      this.columnDefs=this.columnDefs.slice(1);
    }
    else{
      this.showRowNumbers=true;
      this.columnDefs.unshift(this.romNumDef);
    }
    this.gridApi.setColumnDefs(this.columnDefs);
  }

}
