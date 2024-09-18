import 'cropperjs/dist/cropper.css';

import { Button, Image, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { createRef, useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';

import { getFileService } from '../../libs/file';

const CropperModal = (props: { isOpen: boolean; onClose?: (url: string | null) => void; url: string }) => {
  const cropperRef = createRef<ReactCropperElement>();

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined' && props.onClose) {
      const result = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      props.onClose(result);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => {
        if (props.onClose) {
          props.onClose(null);
        }
      }}>
      <ModalOverlay />
      <ModalContent className="flex flex-col">
        <ModalBody>
          <Cropper
            ref={cropperRef}
            style={{ width: '100%', height: 300 }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={props.url}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides
          />
          <div className="flex flex-row p-2">
            <Button onClick={getCropData} className="mr-2" type="button">
              confirm
            </Button>
            <Button onClick={() => props.onClose && props.onClose(null)}>cancel</Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const UploadAvatar = (props: { url: string; onChoosed: (v: any) => void; enableUpload: boolean }) => {
  const [image, setImage] = useState(props.url);
  const inputRef = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const onClose = (val: string | null) => {
    if (val) {
      setImage(val);
      props.onChoosed(val);
    }
    setVisible(false);
  };

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
    setVisible(true);
  };

  useEffect(() => {
    if (props.url && !props.url.startsWith('data') && props.url.length > 0) {
      getFileService()
        .fileUrl(props.url)
        .then((res) => {
          setImage(res);
        });
    }
  }, [props.url]);

  return (
    <div>
      <div className="flex">
        <Image
          width={32}
          height={32}
          src={image}
          onClick={() => {
            if (props.enableUpload) {
              inputRef?.current?.click();
            }
          }}
          alt={props.enableUpload ? '点击上传' : '暂无头像'}
          textAlign={'center'}
          className="flex flex-col items-center justify-center border-1 border-gray-400"
          fontSize={12}
          backgroundColor={'gray'}
          borderRadius={64}
        />
        <input type="file" ref={inputRef} onChange={onChange} hidden />
        <CropperModal isOpen={visible} onClose={onClose} url={image} />
      </div>
    </div>
  );
};

export default UploadAvatar;
