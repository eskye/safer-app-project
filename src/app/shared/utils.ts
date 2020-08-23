
export class Utils {
  private static fileExtension: any;
  private static maxSize = 1; // 5MB

  static isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }

  static fileValidator(file: any, isImage: boolean = false, isDocument: boolean = false) {
    let allowedExtensions: any;
    const allowedExtensionForDocument =
      ['csv', 'CSV', 'pdf', 'PDF', 'doc', 'DOC', 'DOCX', 'docx'];
    const allowedExtensionForImage = ['jpg', 'JPG', 'png', 'PNG', 'gif', 'GIF', 'jpeg', 'JPEG'];
    this.fileExtension = file.name.split('.').pop();
    if (isImage) {
      allowedExtensions = allowedExtensionForImage;
    } else if (isDocument) {
      allowedExtensions = allowedExtensionForDocument;
    } else {
      return false;
    }
    return this.isInArray(allowedExtensions, this.fileExtension);
  }

  static isValidFileSize(file) {
    const fileSizeInMB = file.size / (1024 * 1000);
    const  size = Math.round(fileSizeInMB * 100) / 100; // convert upto 2 decimal place
    return size <= this.maxSize;
  }

  static getMonth(monthNumber: number): string {
    const monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthNumber];
  }


}
