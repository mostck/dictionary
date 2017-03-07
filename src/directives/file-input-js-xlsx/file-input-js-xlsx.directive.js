import XLSX from 'xlsx';

export default ngInstance => {

  ngInstance.directive('fileInputJsXlsx', function () {
    return {
      restrict: 'E',
      template: `<label class="btn-bs-file btn btn-primary">
                    Import
                    <input id="file-selector" type="file" />
                </label>`,
      replace: true,
      link: function (scope, element, attrs) {

        scope.fileEl = angular.element(element[0].querySelector('#file-selector'));
        scope.fileEl.on('change', handleSelect);

        function handleSelect() {
          let files = this.files;
          for (let i = 0, f = files[i]; i != files.length; ++i) {
            let reader = new FileReader();
            let name = f.name;
            reader.onload = function (e) {
              let data;
              if (!e) {
                data = reader.content;
              } else {
                data = e.target.result;
              }

              /* if binary string, read with type 'binary' */
              try {
                let workbook = XLSX.read(data, { type: 'binary' });

                if (attrs.onread) {
                  let handleRead = scope[attrs.onread];
                  if (typeof handleRead === "function") {
                    handleRead(workbook);
                  }
                }
              } catch (e) {
                if (attrs.onerror) {
                  let handleError = scope[attrs.onerror];
                  if (typeof handleError === "function") {
                    handleError(e);
                  }
                }
              }

              // Clear input file
              scope.fileEl.val('');
            };

            //extend FileReader
            if (!FileReader.prototype.readAsBinaryString) {
              FileReader.prototype.readAsBinaryString = function (fileData) {
                let binary = "";
                let pt = this;
                let reader = new FileReader();
                reader.onload = function (e) {
                  let bytes = new Uint8Array(reader.result);
                  let length = bytes.byteLength;
                  for (let i = 0; i < length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                  }
                  //pt.result  - readonly so assign binary
                  pt.content = binary;
                  $(pt).trigger('onload'); // TODO: get rid of these jquery use

                };
                reader.readAsArrayBuffer(fileData);
              }
            }

            reader.readAsBinaryString(f);

          }
        }

      }
    };
  });
};