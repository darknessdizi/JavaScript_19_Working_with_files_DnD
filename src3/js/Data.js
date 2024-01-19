import book1 from '../files/Storage Standard.pdf';
import book2 from '../files/Streams Standard.pdf';
import book3 from '../files/XMLHttpRequest Standard.pdf';

export default class Data {
  constructor() {
    this.memory = [
      { file: new File([book1], 'Storage_Standard'), href: book1 },
      { file: new File([book2], 'Streams_Standard'), href: book2 },
      { file: new File([book3], 'XMLHttpRequest_Standard'), href: book3 },
    ];
  }

  static getContentName(name) {
    return name.split('_').join(' ');
  }

  static getDownloadName(contentName) {
    return contentName.split(' ').join('_');
  }

  static getMb(size) {
    this.mb = (size / 1024 / 1024).toFixed(2);
    return this.mb;
  }

  getItem(contentName) {
    if (this.memory.find((e) => e.file.name === Data.getDownloadName(contentName))) {
      return this.memory.find((e) => e.file.name === Data.getDownloadName(contentName));
    }
    return null;
  }
}
