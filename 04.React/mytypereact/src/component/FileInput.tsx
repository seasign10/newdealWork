import React, {ChangeEvent, FC} from 'react';

// FileListProps : 파일 리스트의 길이와 파일 객체를 정의
interface FileListProps {
  readonly length: number;
  item(index:number):File|null;
  [index:number]:File|null;
}

interface FileInputProps {
  onChangeFile:(e:ChangeEvent<HTMLInputElement>)=>void;
}

const FileInput:FC<FileInputProps> = ({onChangeFile})=>{

  return (
    <div>
      <input type="file" name='attach' 
      accept='images/*' 
      multiple
      onChange={onChangeFile}
       />
    </div>
  );
}

export default FileInput;