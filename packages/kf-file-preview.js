import { renderAsync } from "docx-preview"
import luckySheet from "luckysheet"
import 'luckysheet/dist/luckysheet.css';

const FILE_TYPE_ENUM = {
    'image': [
        'jpg', 
        'jpeg', 
        'png', 
        'gif', 
        'bmp', 
        'image/jpeg', 
        'image/jpg', 
        'image/png', 
        'image/gif', 
        'image/bmp'
    ],
    'video': [
        'mp4', 
        'avi',
        'mov', 
        'wmv', 
        'rmvb', 
        'flv',
        'video/mp4',
        'video/x-msvideo',
        'video/quicktime',
        'video/wmv',
        'application/vnd.rn-realmedia',
        'video/x-flv'
    ],
    'audio': [
        'mp3', 
        'wav', 
        'wma', 
        'aac', 
        'flac',
        'audio/mpeg',
        'audio/wav',
        'audio/x-ms-wma',
        'audio/mp4',
        'audio/flac',
        'audio/x-flac'
    ],
    'pdf': [
        'pdf', 
        "application/pdf"
    ],
    'word': [
        'doc',
        'docx',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
    ],
    'excel': [
        'xls', 
        'xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ],
    'ppt': [
        'ppt', 
        'pptx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint'
    ],
    'txt': [
        'txt', 
        'log', 
        'csv', 
        'json', 
        'xml', 
        'yml', 
        'yaml',
        'text/plain',
        'text/csv',
        'application/json',
        'application/xml',
        'text/yml',
        'text/yaml'
    ],
}

const FILE_TYPE_RENDER_FUNC = {
    'image': 'previewImg',
    'video': 'previewVideo',
    'audio': 'previewAudio',
    'pdf': 'previewPdf',
    'word': 'previewWord',
    'excel': 'previewExcel',
    'ppt': 'previewPpt',
    'txt': 'previewTxt',
}

function validatePreviewArgs(file, fileType) {
    if (!file) {
        return 'file is necessary'
    }

    if (!(file instanceof Blob)) {
        return 'respect file is a blob'
    }

    if (!fileType) {
        return 'fileType is necessary'
    }
}

function getFileExecuterByFileType(fileType) {
    let fileCategory = ''
    for (let key in FILE_TYPE_ENUM) {
        if (FILE_TYPE_ENUM[key].includes(fileType)) {
            fileCategory = key
            break
        }
    }

    if (!fileCategory) {
        return null
    }
    return FILE_TYPE_RENDER_FUNC[fileCategory]
}


class PreviewPlugin {
    constructor(container, options) {
        this.options = options;
        this.container = container
    }

    // 由于blob文件是无法获取文件类型的，所以实际需要手动传入文件类型
    preview (file, fileType) {
        return new Promise((resolve, reject)=> {
            let error = validatePreviewArgs(file, fileType)
            if (error) {
                reject(error)
                return
            }
            let executer = getFileExecuterByFileType(fileType)
            if (executer) {
                this[executer](file)
            } else {
                this.previewUnsupported()
            }
        })
    }

    previewImg (blob) {
        // 通过img标签来预览图片
        const url = URL.createObjectURL(blob)
        const wrapper = document.createElement('div')
        const img = document.createElement('img')
        img.src = url
        wrapper.appendChild(img)
        this.container.innerHTML = ''
        this.container.appendChild(wrapper)
    }

    previewVideo (blob) {
        // 通过video标签来预览视频
        const url = URL.createObjectURL(blob)
        const wrapper = document.createElement('div')
        const video = document.createElement('video')
        wrapper.style.width = '100%'
        wrapper.style.height = '100%'
        video.src = url
        video.controls = true
        video.style.maxWidth = '100%'
        video.style.maxHeight = '100%'
        wrapper.appendChild(video)
        this.container.innerHTML = ''
        this.container.appendChild(wrapper)
    }

    previewAudio (blob) {
        // 通过audio标签来预览音频
        const url = URL.createObjectURL(blob)
        const wrapper = document.createElement('div')
        const audio = document.createElement('audio')
        audio.src = url
        audio.controls = true
        wrapper.appendChild(audio)
        this.container.innerHTML = ''
        this.container.appendChild(wrapper)
    }

    previewPdf (blob) {
        // 通过iframe标签来预览pdf
        const url = URL.createObjectURL(blob)
        const wrapper = document.createElement('div')
        const iframe = document.createElement('iframe')
        wrapper.style.width = '100%'
        wrapper.style.height = '100%'
        iframe.src = url
        iframe.style.width = '100%'
        iframe.style.height = '100%'
        wrapper.appendChild(iframe)
        this.container.innerHTML = ''
        this.container.appendChild(wrapper)
    }

    previewUnsupported () {
        // 通过img标签来预览图片
        const wrapper = document.createElement('div')
        const desc = document.createElement('span')
        desc.textContent = '暂不支持预览文件类型'
        wrapper.appendChild(desc)
        this.container.innerHTML = ''
        this.container.appendChild(wrapper)
    }

    previewWord (blob) {
        renderAsync(blob, { container: this.container })
    }


    previewExcel (blob) {
        luckySheet.importExcel(blob, { container: this.container })
    }
}


export default PreviewPlugin