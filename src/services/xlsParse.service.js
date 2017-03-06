import XLSX from 'xlsx';

function format_column_type(cell) {
  return cell ? cell.t : 'u'
}

function format_first_row(cell) {
  return cell ? cell.v : ''
}

function format_column_name(name) {
  return name.toString()
    .toLowerCase()
    .replace(/\s(.)/g, function($$,$1) { return $1.toUpperCase()})
    .replace(/[.*+?^${}()|[\]\\]/g, '')
}


export class XlsParseService {

  constructor() {

  }

  readXls(workbook) {

  }

  buildHeaders(sheet, rowSkip, rowColumnName) {

    let headers = [];

    let ws = sheet.ws;

    let range = XLSX.utils.decode_range(ws['!ref']);
    let R = rowSkip || 0;

    for(let C = range.s.c; C <= range.e.c; ++C) {
      let addr = XLSX.utils.encode_cell({r:R, c:C});
      let cell = ws[addr];

      let addrT = XLSX.utils.encode_cell({r: rowColumnName ? R+1 : R, c:C});
      let cellT = ws[addrT];
      if(cell && cell.v && rowColumnName) {
        headers.push({name: format_column_name(cell.v), firstRow: format_first_row(cellT), type: format_column_type(cellT), selected: true})
      } else {
        headers.push({name: String.fromCharCode('A'.charCodeAt() + C), firstRow: format_first_row(cell), type: format_column_type(cellT), selected: true});
      }
    }

    return headers;

  }

}