
import upyun from 'upyun'
import axios from 'axios'
import sha256 from 'js-sha256'
import { upyunConfig } from '../config/config'

const YUN_ROOT = upyunConfig.rootDir
const SERVICE = upyunConfig.service
const URL = upyunConfig.cdnUrl
const SIGN_URL = upyunConfig.signUrl

var bucket = new upyun.Bucket(SERVICE)
function getHeaderSign(bucket, method, path) {
  var params = 'bucket=' + bucket.bucketName + '&method=' + method + '&path=' + path
  return axios.get(`${SIGN_URL}?${params}`)
    .then(function (res) {
      console.log(res.data.data.data)
      return res.data.data.data
    })
}
var client = new upyun.Client(bucket, getHeaderSign)

function upload(path, file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onload = function (e) {
      let buffer = e.target.result
      const fileName = sha256(buffer)
      client.putFile(`${YUN_ROOT}${path}/${fileName}`, buffer).then(function (result) {
        if (result) {
          resolve({
            status: true,
            data: {
              meta: result,
              url: `${URL}${YUN_ROOT}${path}/${fileName}`
            }
          })
        }
        resolve({
          ...result
        })
      })
    }
    reader.readAsArrayBuffer(file)
  })
}
export default {
  uploadGoodsPic(file) {
    return upload('/goods', file)
  },
  uploadGoodGalleryPic(file) {
    return upload('/good_gallery', file)
  },
  uploadChannelPic(file) {
    return upload('/channel', file)
  },
  uploadBrandPic(file) {
    return upload('/brand', file)
  },
  uploadTopicPic(file) {
    return upload('/topic', file)
  },
  uploadAdPic(file) {
    return upload('/ad', file)
  }
}