import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPDF = (data) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.text(`Withdrawal Records (${date})`, 14, 10);

    const tableColumn = ["Email", "Amount", "Status", "Date"];
    const tableRows = [];

    data.forEach((item) => {
        const row = [
            item.email || "N/A",
            item.amount || "N/A",
            item.status || "N/A",
            new Date(item.createdAt?.seconds * 1000 || Date.now()).toLocaleDateString(),
        ];
        tableRows.push(row);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [0, 123, 255] },
    });

    doc.save(`Withdrawals_${date.replace(/\//g, "-")}.pdf`);
};
