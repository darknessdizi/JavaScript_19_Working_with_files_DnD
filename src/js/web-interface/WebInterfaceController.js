import book1 from '../../files/Storage Standard.pdf';
import book2 from '../../files/Streams Standard.pdf';
import book3 from '../../files/XMLHttpRequest Standard.pdf';

export default class WebInterfaceController {
  constructor(edit) {
    this.edit = edit;
    this.memory = [
      { file: new File([book1], 'Storage_Standard'), href: book1 },
      { file: new File([book2], 'Streams_Standard'), href: book2 },
      { file: new File([book3], 'XMLHttpRequest_Standard'), href: book3 },
    ];
  }

  init() {
    console.log(this.memory[0])
    this.edit.bindToDOM(this.memory);
  }

}
