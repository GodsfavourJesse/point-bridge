export const exportToCSV = (data, filename = 'withdrawals.csv') => {
    const csvRows = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};