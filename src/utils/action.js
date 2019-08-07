import axios from 'axios';

const getHeaders = (callback, accessToken) => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Bearer ${accessToken}`,
  },
  onUploadProgress: (ProgressEvent) => {
    callback(Math.trunc(ProgressEvent.loaded / ProgressEvent.total * 100));
  },
});

const uploadImg = (data, value, callback) => new Promise((resolved, rejected) => {
  const { uploadServerLink, accessToken } = data;
  axios.post(uploadServerLink, value, getHeaders((progress) => {
    if (callback) callback(progress);
  }, accessToken))
    .then((response) => {
      resolved(response.data);
    })
    .catch((err) => {
      rejected(err);
    });
});

export default uploadImg;
