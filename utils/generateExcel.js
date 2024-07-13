const XLSX = require('xlsx');
const filePath="../files/empty_Invigilator_claim_VSP.xlsx";
function generateWorkdaysExcel(workdays, filePath) {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [['TypeOfTest','Date', 'Start Time', 'End Time']];
    
    workdays.forEach(workday => {
        worksheetData.push([
            new Date(workday.date).toLocaleDateString(),
            workday.startTime,
            workday.endTime,
        ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Workdays');
    XLSX.writeFile(workbook, filePath);
}

module.exports = generateWorkdaysExcel;
