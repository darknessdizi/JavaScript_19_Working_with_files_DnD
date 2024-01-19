import DownloadManager from './DownloadManager';

const downloadComponent = new DownloadManager();

downloadComponent.bindToDOM(document.querySelector('.root'));
downloadComponent.init();
