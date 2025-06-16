export const printPage = (elementId) => {
    const printContent = document.getElementById(elementId);
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(`<html><head><title>Print</title></head><body>${printContent.innerHTML}</body></html>`);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
};